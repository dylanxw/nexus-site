import nodemailer from 'nodemailer';
import { Quote, EmailType } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { formatPrice, getDaysUntilExpiration } from '../pricing-calculator';
import { siteConfig } from '@/config/site';
import { logger } from '@/lib/logger';

// Create transporter using Hostinger SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Send email with retry logic and exponential backoff
 * @param mailOptions - Nodemailer mail options
 * @param maxRetries - Maximum number of retry attempts (default: 3)
 * @returns Promise<boolean> - true if sent, false if failed
 */
async function sendEmailWithRetry(
  mailOptions: nodemailer.SendMailOptions,
  maxRetries: number = 3
): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      const isLastAttempt = attempt === maxRetries;

      logger.warn(`Email attempt ${attempt}/${maxRetries} failed`, 'EMAIL', {
        to: String(mailOptions.to || 'unknown'),
        subject: String(mailOptions.subject || 'unknown'),
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      if (isLastAttempt) {
        logger.error('Email failed after max retries', 'EMAIL', {
          to: String(mailOptions.to || 'unknown'),
          subject: String(mailOptions.subject || 'unknown')
        }, error as Error);
        return false;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delayMs = 1000 * Math.pow(2, attempt - 1);
      logger.info(`Retrying email in ${delayMs}ms`, 'EMAIL', {
        attempt,
        delayMs,
        to: String(mailOptions.to || 'unknown')
      });

      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  return false;
}

/**
 * Send quote confirmation email to customer
 */
export async function sendQuoteConfirmationEmail(quote: Quote): Promise<boolean> {
  try {
    const daysRemaining = getDaysUntilExpiration(quote.expiresAt);

    const html = `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <title>Your Device Quote</title>
        <!--[if mso]>
        <style type="text/css">
          table, td { font-family: Arial, sans-serif; }
        </style>
        <![endif]-->
        <style>
          :root { color-scheme: light dark; }
          /* Apple Mail / iOS dark mode overrides */
          @media (prefers-color-scheme: dark) {
            .email-bg { background-color: #1a1a1a !important; }
            .email-body { background-color: #232323 !important; }
            /* Keep branded header colors intact */
            .header-bg { background-color: #DB5858 !important; }
            .header-bar { background-color: #c94848 !important; }
            .header-text, .header-subtext { color: #ffffff !important; }
            /* Body text */
            .body-cell { background-color: #232323 !important; }
            .text-heading { color: #f0f0f0 !important; }
            .text-body { color: #cccccc !important; }
            .text-muted { color: #aaaaaa !important; }
            .text-detail-label { color: #aaaaaa !important; }
            .text-detail-value { color: #f0f0f0 !important; }
            .text-section-label { color: #888888 !important; }
            /* Price card */
            .price-card { background-color: #2a2a2a !important; border-color: #3a3a3a !important; }
            .price-text { color: #e86a6a !important; }
            .price-label { color: #aaaaaa !important; }
            .price-sub { color: #888888 !important; }
            /* Detail rows */
            .detail-border { border-bottom-color: #333333 !important; }
            /* Expiration notice */
            .notice-bg { background-color: #342a14 !important; border-left-color: #E8A735 !important; }
            .notice-text { color: #e8c56e !important; }
            /* CTA button - keep as-is */
            .cta-btn { background-color: #DB5858 !important; color: #ffffff !important; }
            /* Divider */
            .divider { border-top-color: #333333 !important; }
            /* Why Nexus */
            .text-why { color: #aaaaaa !important; }
            /* Footer */
            .footer-bg { background-color: #1e1e1e !important; border-top-color: #333333 !important; }
            .footer-name { color: #dddddd !important; }
            .footer-detail { color: #888888 !important; }
            .footer-copy { color: #555555 !important; }
            /* Step text */
            .step-text { color: #cccccc !important; }
          }
        </style>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f4f5; -webkit-font-smoothing:antialiased;">
        <!-- Outer wrapper -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;" class="email-bg">
          <tr>
            <td align="center" style="padding:32px 16px;">

              <!-- Email container -->
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.08);" class="email-body">

                <!-- Header -->
                <tr>
                  <td style="background-color:#DB5858; padding:32px 40px; text-align:center;" class="header-bg">
                    <p style="margin:0 0 4px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; letter-spacing:1.5px; text-transform:uppercase; color:rgba(255,255,255,0.85);" class="header-subtext">Nexus Tech Solutions</p>
                    <h1 style="margin:0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:24px; font-weight:700; color:#ffffff; line-height:1.3;" class="header-text">Your Device Quote is Ready</h1>
                  </td>
                </tr>

                <!-- Quote number bar -->
                <tr>
                  <td style="background-color:#c94848; padding:10px 40px; text-align:center;" class="header-bar">
                    <p style="margin:0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; color:rgba(255,255,255,0.9); letter-spacing:0.5px;" class="header-text">Quote #${quote.quoteNumber}</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:32px 40px;" class="body-cell">

                    <!-- Greeting -->
                    <p style="margin:0 0 8px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:20px; font-weight:700; color:#1a1a1a;" class="text-heading">Hi ${quote.customerName},</p>
                    <p style="margin:0 0 28px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:15px; color:#555555; line-height:1.5;" class="text-body">We've evaluated your device and have an instant cash offer ready for you.</p>

                    <!-- Price card -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      <tr>
                        <td style="background-color:#fafafa; border:1px solid #e5e5e5; border-radius:8px; padding:28px 24px; text-align:center;" class="price-card">
                          <p style="margin:0 0 6px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#777777;" class="price-label">Your ${quote.model} is worth</p>
                          <p style="margin:0 0 6px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:42px; font-weight:700; color:#DB5858; line-height:1.1;" class="price-text">${formatPrice(quote.offerPrice)}</p>
                          <p style="margin:0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; color:#999999;" class="price-sub">Instant cash &mdash; no waiting</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Device details -->
                    <p style="margin:0 0 12px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#999999;" class="text-section-label">Device Details</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      <tr>
                        <td style="padding:10px 0; border-bottom:1px solid #f0f0f0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#777777; width:100px;" class="text-detail-label detail-border">Model</td>
                        <td style="padding:10px 0; border-bottom:1px solid #f0f0f0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; font-weight:600; color:#1a1a1a; text-align:right;" class="text-detail-value detail-border">${quote.model}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0; border-bottom:1px solid #f0f0f0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#777777;" class="text-detail-label detail-border">Storage</td>
                        <td style="padding:10px 0; border-bottom:1px solid #f0f0f0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; font-weight:600; color:#1a1a1a; text-align:right;" class="text-detail-value detail-border">${quote.storage}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0; border-bottom:1px solid #f0f0f0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#777777;" class="text-detail-label detail-border">Network</td>
                        <td style="padding:10px 0; border-bottom:1px solid #f0f0f0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; font-weight:600; color:#1a1a1a; text-align:right;" class="text-detail-value detail-border">${quote.network}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#777777;" class="text-detail-label">Condition</td>
                        <td style="padding:10px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; font-weight:600; color:#1a1a1a; text-align:right;" class="text-detail-value">${quote.condition}</td>
                      </tr>
                    </table>

                    <!-- Expiration notice -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      <tr>
                        <td style="background-color:#FEF9EF; border-left:3px solid #E8A735; border-radius:0 6px 6px 0; padding:14px 16px;" class="notice-bg">
                          <p style="margin:0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#7A5D1E; line-height:1.5;" class="notice-text">
                            <strong>Valid for ${daysRemaining} days.</strong> After ${new Date(quote.expiresAt).toLocaleDateString()}, pricing may change based on market conditions.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- How to get paid -->
                    <p style="margin:0 0 12px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#999999;" class="text-section-label">How to Get Paid</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                      <tr>
                        <td style="width:24px; vertical-align:top; padding:0 10px 0 0;">
                          <span style="display:inline-block; width:22px; height:22px; background-color:#DB5858; color:#ffffff; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:12px; font-weight:700; line-height:22px; text-align:center; border-radius:50%;">1</span>
                        </td>
                        <td style="font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#333333; line-height:1.5; padding-bottom:10px;" class="step-text">
                          <strong>Visit our store</strong> &mdash; Bring your device to our Denton location for instant payment.
                        </td>
                      </tr>
                      <tr>
                        <td style="width:24px; vertical-align:top; padding:0 10px 0 0;">
                          <span style="display:inline-block; width:22px; height:22px; background-color:#DB5858; color:#ffffff; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:12px; font-weight:700; line-height:22px; text-align:center; border-radius:50%;">2</span>
                        </td>
                        <td style="font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#333333; line-height:1.5; padding-bottom:10px;" class="step-text">
                          <strong>Mail it in</strong> &mdash; Call us at ${siteConfig.phoneFormatted} for a prepaid shipping label.
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 28px 0;">
                      <tr>
                        <td align="center">
                          <!--[if mso]>
                          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${siteConfig.phoneHref}" style="height:48px; width:220px; v-text-anchor:middle;" arcsize="10%" fillcolor="#DB5858">
                            <w:anchorlock/>
                            <center style="font-family:Arial,sans-serif; font-size:16px; font-weight:bold; color:#ffffff;">Call Now to Sell</center>
                          </v:roundrect>
                          <![endif]-->
                          <!--[if !mso]><!-->
                          <a href="${siteConfig.phoneHref}" style="display:inline-block; background-color:#DB5858; color:#ffffff; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:16px; font-weight:700; text-decoration:none; padding:14px 36px; border-radius:6px; line-height:1;" class="cta-btn">Call Now to Sell</a>
                          <!--<![endif]-->
                        </td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                      <tr><td style="border-top:1px solid #eee;" class="divider"></td></tr>
                    </table>

                    <!-- Why sell to Nexus -->
                    <p style="margin:0 0 12px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#999999;" class="text-section-label">Why Nexus?</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                      <tr>
                        <td style="padding:4px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#555555; line-height:1.6;" class="text-why">Instant cash payment &bull; Best prices in Denton &bull; Free data wiping &bull; Trusted local shop</td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color:#f9f9f9; border-top:1px solid #eeeeee; padding:24px 40px; text-align:center;" class="footer-bg">
                    <p style="margin:0 0 4px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; font-weight:600; color:#333333;" class="footer-name">${siteConfig.name}</p>
                    <p style="margin:0 0 4px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; color:#888888;" class="footer-detail">${siteConfig.address.full}</p>
                    <p style="margin:0 0 4px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; color:#888888;" class="footer-detail">${siteConfig.phoneFormatted} &nbsp;&bull;&nbsp; ${siteConfig.hours.display}</p>
                    <p style="margin:16px 0 0 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:11px; color:#bbbbbb;" class="footer-copy">&copy; ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.</p>
                  </td>
                </tr>

              </table>
              <!-- /Email container -->

            </td>
          </tr>
        </table>
        <!-- /Outer wrapper -->
      </body>
      </html>
    `;

    // Send with retry logic
    const sent = await sendEmailWithRetry({
      from: `"${siteConfig.name}" <${process.env.EMAIL_USER}>`,
      to: quote.customerEmail,
      subject: `Your Device Quote: ${formatPrice(quote.offerPrice)} - ${siteConfig.name}`,
      html,
    });

    // Log email result
    await prisma.emailLog.create({
      data: {
        quoteId: quote.id,
        type: EmailType.QUOTE_CONFIRMATION,
        status: sent ? 'sent' : 'failed',
        metadata: sent ? null : JSON.stringify({ error: 'Failed after retries' }),
      },
    });

    return sent;
  } catch (error) {
    logger.error('Error sending quote confirmation email', 'EMAIL', { quoteId: quote.id }, error as Error);

    // Log email failure
    await prisma.emailLog.create({
      data: {
        quoteId: quote.id,
        type: EmailType.QUOTE_CONFIRMATION,
        status: 'failed',
        metadata: JSON.stringify({ error: String(error) }),
      },
    });

    return false;
  }
}

/**
 * Send reminder email
 */
export async function sendReminderEmail(
  quote: Quote,
  reminderType: EmailType
): Promise<boolean> {
  try {
    const daysRemaining = getDaysUntilExpiration(quote.expiresAt);

    let subject: string;
    let urgencyMessage: string;

    switch (reminderType) {
      case EmailType.REMINDER_7_DAYS:
        subject = `Don't Miss Out! ${formatPrice(quote.offerPrice)} Waiting for Your ${quote.model}`;
        urgencyMessage = 'Your quote expires in 7 days!';
        break;
      case EmailType.REMINDER_3_DAYS:
        subject = `⏰ Last Chance: ${formatPrice(quote.offerPrice)} for Your ${quote.model}`;
        urgencyMessage = 'Only 3 days left to claim your cash offer!';
        break;
      case EmailType.REMINDER_1_DAY:
        subject = `🚨 URGENT: Your ${formatPrice(quote.offerPrice)} Quote Expires Tomorrow!`;
        urgencyMessage = 'This is your final reminder - your quote expires tomorrow!';
        break;
      default:
        return false;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #DB5858; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-top: none; }
          .urgency-banner { background: #ff6b6b; color: white; padding: 20px; text-align: center; font-size: 20px; border-radius: 8px; margin: 20px 0; }
          .price { font-size: 48px; color: #DB5858; font-weight: bold; text-align: center; }
          .cta-button { display: inline-block; background: #DB5858; color: white; padding: 20px 50px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-size: 20px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${urgencyMessage}</h1>
          </div>

          <div class="content">
            <p>Hi ${quote.customerName},</p>

            <p>Your cash offer is still waiting for you!</p>

            <div class="urgency-banner">
              ⏰ ${daysRemaining} ${daysRemaining === 1 ? 'DAY' : 'DAYS'} LEFT
            </div>

            <div class="price">
              ${formatPrice(quote.offerPrice)}
            </div>
            <p style="text-align: center; font-size: 18px; color: #666;">
              for your ${quote.model}
            </p>

            <p style="font-size: 18px; text-align: center;">
              <strong>Don't let this cash slip away!</strong>
            </p>

            <div style="text-align: center;">
              <a href="${siteConfig.phoneHref}" class="cta-button">Call Now: ${siteConfig.phoneFormatted}</a>
            </div>

            <p style="text-align: center; color: #666;">
              Quote #${quote.quoteNumber}<br>
              Valid until: ${new Date(quote.expiresAt).toLocaleDateString()}
            </p>
          </div>

          <div class="footer">
            <p>${siteConfig.name} | ${siteConfig.address.full}</p>
            <p>© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send with retry logic
    const sent = await sendEmailWithRetry({
      from: `"${siteConfig.name}" <${process.env.EMAIL_USER}>`,
      to: quote.customerEmail,
      subject,
      html,
    });

    // Log email result
    await prisma.emailLog.create({
      data: {
        quoteId: quote.id,
        type: reminderType,
        status: sent ? 'sent' : 'failed',
        metadata: sent ? null : JSON.stringify({ error: 'Failed after retries' }),
      },
    });

    return sent;
  } catch (error) {
    logger.error(`Error sending ${reminderType} email`, 'EMAIL', { quoteId: quote.id, reminderType }, error as Error);

    await prisma.emailLog.create({
      data: {
        quoteId: quote.id,
        type: reminderType,
        status: 'failed',
        metadata: JSON.stringify({ error: String(error) }),
      },
    });

    return false;
  }
}

/**
 * Send admin notification for new quote
 */
export async function sendAdminNotification(quote: Quote): Promise<boolean> {
  try {
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || ['admin@nexusrepair.com'];

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #333; color: white; padding: 20px; }
          .content { padding: 20px; background: #f9f9f9; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 10px; border-bottom: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Buyback Quote Received</h2>
          </div>
          <div class="content">
            <table>
              <tr>
                <td><strong>Quote #:</strong></td>
                <td>${quote.quoteNumber}</td>
              </tr>
              <tr>
                <td><strong>Customer:</strong></td>
                <td>${quote.customerName}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>${quote.customerEmail}</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td>${quote.customerPhone}</td>
              </tr>
              <tr>
                <td><strong>Device:</strong></td>
                <td>${quote.model} (${quote.storage}, ${quote.network})</td>
              </tr>
              <tr>
                <td><strong>Condition:</strong></td>
                <td>${quote.condition}</td>
              </tr>
              <tr>
                <td><strong>Atlas Price:</strong></td>
                <td>${formatPrice(quote.atlasPrice)}</td>
              </tr>
              <tr>
                <td><strong>Our Offer:</strong></td>
                <td>${formatPrice(quote.offerPrice)}</td>
              </tr>
              <tr>
                <td><strong>Margin:</strong></td>
                <td>${formatPrice(quote.margin)} (${((quote.margin / quote.atlasPrice) * 100).toFixed(1)}%)</td>
              </tr>
              <tr>
                <td><strong>Created:</strong></td>
                <td>${new Date(quote.createdAt).toLocaleString()}</td>
              </tr>
            </table>

            <p style="margin-top: 20px;">
              <a href="${process.env.NEXT_PUBLIC_URL}/admin/quotes/${quote.id}"
                 style="background: #333; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                View in Admin Panel
              </a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send with retry logic
    const sent = await sendEmailWithRetry({
      from: `"${siteConfig.name} Buyback System" <${process.env.EMAIL_USER}>`,
      to: adminEmails.join(','),
      subject: `New Buyback Quote: ${quote.model} - ${formatPrice(quote.offerPrice)}`,
      html,
    });

    if (sent) {
      await prisma.emailLog.create({
        data: {
          quoteId: quote.id,
          type: EmailType.ADMIN_NOTIFICATION,
          status: 'sent',
        },
      });
    }

    return sent;
  } catch (error) {
    logger.error('Error sending admin notification', 'EMAIL', { quoteId: quote.id }, error as Error);
    return false;
  }
}

/**
 * Send admin notification when customer email fails
 */
export async function sendAdminEmailFailureNotification(quote: Quote): Promise<boolean> {
  try {
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || ['admin@nexusrepair.com'];

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ff6b6b; color: white; padding: 20px; }
          .warning-banner { background: #fff3cd; border: 2px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .content { padding: 20px; background: #f9f9f9; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 10px; border-bottom: 1px solid #ddd; }
          .action-required { background: #ff6b6b; color: white; padding: 15px; text-align: center; font-weight: bold; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>⚠️ Customer Email Delivery Failed</h2>
          </div>
          <div class="content">
            <div class="action-required">
              ACTION REQUIRED: Customer did not receive quote confirmation email
            </div>

            <div class="warning-banner">
              <strong>⚠️ Email Delivery Issue</strong><br>
              The customer's quote was created successfully, but we were unable to deliver the confirmation email to <strong>${quote.customerEmail}</strong>.
              <br><br>
              Please reach out to the customer directly via phone to provide their quote details.
            </div>

            <h3>Quote Details to Provide:</h3>
            <table>
              <tr>
                <td><strong>Quote #:</strong></td>
                <td><strong>${quote.quoteNumber}</strong></td>
              </tr>
              <tr>
                <td><strong>Customer:</strong></td>
                <td>${quote.customerName}</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td><strong>${quote.customerPhone}</strong></td>
              </tr>
              <tr>
                <td><strong>Email (Failed):</strong></td>
                <td>${quote.customerEmail}</td>
              </tr>
              <tr>
                <td><strong>Device:</strong></td>
                <td>${quote.model} (${quote.storage}, ${quote.network})</td>
              </tr>
              <tr>
                <td><strong>Condition:</strong></td>
                <td>${quote.condition}</td>
              </tr>
              <tr>
                <td><strong>Offer Amount:</strong></td>
                <td><strong style="color: #DB5858; font-size: 18px;">${formatPrice(quote.offerPrice)}</strong></td>
              </tr>
              <tr>
                <td><strong>Valid Until:</strong></td>
                <td>${new Date(quote.expiresAt).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td><strong>Created:</strong></td>
                <td>${new Date(quote.createdAt).toLocaleString()}</td>
              </tr>
            </table>

            <p style="margin-top: 20px;">
              <a href="${process.env.NEXT_PUBLIC_URL}/admin/quotes/${quote.id}"
                 style="background: #DB5858; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                View in Admin Panel
              </a>
            </p>

            <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-left: 4px solid #2196f3;">
              <strong>Next Steps:</strong>
              <ol style="margin: 10px 0;">
                <li>Call the customer at <strong>${quote.customerPhone}</strong></li>
                <li>Provide quote number: <strong>${quote.quoteNumber}</strong></li>
                <li>Confirm offer amount: <strong>${formatPrice(quote.offerPrice)}</strong></li>
                <li>Explain quote is valid until ${new Date(quote.expiresAt).toLocaleDateString()}</li>
                <li>Verify their email address is correct</li>
              </ol>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send with retry logic
    const sent = await sendEmailWithRetry({
      from: `"${siteConfig.name} Buyback System" <${process.env.EMAIL_USER}>`,
      to: adminEmails.join(','),
      subject: `🚨 URGENT: Customer Email Failed - Quote ${quote.quoteNumber}`,
      html,
    });

    return sent;
  } catch (error) {
    logger.error('Error sending admin email failure notification', 'EMAIL', { quoteId: quote.id }, error as Error);
    return false;
  }
}

/**
 * Process email reminders for all active quotes
 * Uses UTC for consistent timezone handling
 */
export async function processEmailReminders(): Promise<void> {
  // Use UTC timestamp for consistent timezone handling
  const nowUTC = new Date(Date.now());

  // Get all pending quotes
  const quotes = await prisma.quote.findMany({
    where: {
      status: 'PENDING',
      expiresAt: { gt: nowUTC },
    },
    include: {
      emailLogs: true,
    },
  });

  for (const quote of quotes) {
    const daysRemaining = getDaysUntilExpiration(quote.expiresAt);

    // Check which reminders have been sent
    const sentReminders = new Set(quote.emailLogs.map(log => log.type));

    // Send 7-day reminder
    if (daysRemaining <= 7 && daysRemaining > 3 && !sentReminders.has(EmailType.REMINDER_7_DAYS)) {
      await sendReminderEmail(quote, EmailType.REMINDER_7_DAYS);
    }

    // Send 3-day reminder
    if (daysRemaining <= 3 && daysRemaining > 1 && !sentReminders.has(EmailType.REMINDER_3_DAYS)) {
      await sendReminderEmail(quote, EmailType.REMINDER_3_DAYS);
    }

    // Send 1-day reminder
    if (daysRemaining === 1 && !sentReminders.has(EmailType.REMINDER_1_DAY)) {
      await sendReminderEmail(quote, EmailType.REMINDER_1_DAY);
    }
  }

  // Mark expired quotes using UTC timestamp
  await prisma.quote.updateMany({
    where: {
      status: 'PENDING',
      expiresAt: { lte: nowUTC },
    },
    data: {
      status: 'EXPIRED',
    },
  });
}