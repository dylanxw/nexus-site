import nodemailer from 'nodemailer';
import { PrismaClient, Quote, EmailType } from '@prisma/client';
import { formatPrice, getDaysUntilExpiration } from '../pricing-calculator';
import { siteConfig } from '@/config/site';

const prisma = new PrismaClient();

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
 * Send quote confirmation email to customer
 */
export async function sendQuoteConfirmationEmail(quote: Quote): Promise<boolean> {
  try {
    const daysRemaining = getDaysUntilExpiration(quote.expiresAt);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #DB5858 0%, #c94848 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-top: none; }
          .quote-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #DB5858; }
          .price { font-size: 36px; color: #DB5858; font-weight: bold; }
          .details { margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .cta-button { display: inline-block; background: #DB5858; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-size: 18px; }
          .cta-button:hover { background: #c94848; }
          .urgency { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Device Quote is Ready!</h1>
            <p style="font-size: 18px;">Quote #${quote.quoteNumber}</p>
          </div>

          <div class="content">
            <h2>Great news, ${quote.customerName}!</h2>
            <p>We've evaluated your device and have an instant cash offer ready for you.</p>

            <div class="quote-box">
              <div style="text-align: center;">
                <p style="margin: 0; color: #666;">Your ${quote.model} is worth:</p>
                <div class="price">${formatPrice(quote.offerPrice)}</div>
                <p style="color: #666;">Cash in hand - no waiting!</p>
              </div>
            </div>

            <div class="details">
              <h3>Device Details:</h3>
              <div class="detail-row">
                <span>Model:</span>
                <strong>${quote.model}</strong>
              </div>
              <div class="detail-row">
                <span>Storage:</span>
                <strong>${quote.storage}</strong>
              </div>
              <div class="detail-row">
                <span>Network:</span>
                <strong>${quote.network}</strong>
              </div>
              <div class="detail-row">
                <span>Condition:</span>
                <strong>${quote.condition}</strong>
              </div>
            </div>

            <div class="urgency">
              <strong>⏰ Limited Time Offer!</strong><br>
              Your quote is valid for ${daysRemaining} days. After that, prices may change based on market conditions.
            </div>

            <h3>How to Get Paid:</h3>
            <ol>
              <li><strong>Visit Our Store:</strong> Bring your device to our Denton location for instant payment</li>
              <li><strong>Mail It In:</strong> Call us at ${siteConfig.phoneFormatted} for a prepaid shipping label</li>
            </ol>

            <div style="text-align: center;">
              <a href="${siteConfig.phoneHref}" class="cta-button">Call Now to Sell</a>
            </div>

            <p><strong>Why sell to ${siteConfig.name}?</strong></p>
            <ul>
              <li>✅ Instant cash payment - no waiting for checks</li>
              <li>✅ Best prices in Denton, TX</li>
              <li>✅ Safe, secure, and professional service</li>
              <li>✅ Data wiping included for your security</li>
              <li>✅ Trusted local electronics repair shop</li>
            </ul>

            <p style="margin-top: 30px;">
              <strong>Store Location:</strong><br>
              ${siteConfig.name}<br>
              ${siteConfig.address.full}<br>
              Phone: ${siteConfig.phoneFormatted}<br>
              Hours: ${siteConfig.hours.display}
            </p>
          </div>

          <div class="footer">
            <p>This quote is valid until ${new Date(quote.expiresAt).toLocaleDateString()}.</p>
            <p>Quote reference: ${quote.quoteNumber}</p>
            <p>© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"${siteConfig.name}" <${process.env.EMAIL_USER}>`,
      to: quote.customerEmail,
      subject: `Your Device Quote: ${formatPrice(quote.offerPrice)} - ${siteConfig.name}`,
      html,
    });

    // Log email sent
    await prisma.emailLog.create({
      data: {
        quoteId: quote.id,
        type: EmailType.QUOTE_CONFIRMATION,
        status: 'sent',
      },
    });

    return true;
  } catch (error) {
    console.error('Error sending quote confirmation email:', error);

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

    await transporter.sendMail({
      from: `"${siteConfig.name}" <${process.env.EMAIL_USER}>`,
      to: quote.customerEmail,
      subject,
      html,
    });

    // Log email sent
    await prisma.emailLog.create({
      data: {
        quoteId: quote.id,
        type: reminderType,
        status: 'sent',
      },
    });

    return true;
  } catch (error) {
    console.error(`Error sending ${reminderType} email:`, error);

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

    await transporter.sendMail({
      from: `"${siteConfig.name} Buyback System" <${process.env.EMAIL_USER}>`,
      to: adminEmails.join(','),
      subject: `New Buyback Quote: ${quote.model} - ${formatPrice(quote.offerPrice)}`,
      html,
    });

    await prisma.emailLog.create({
      data: {
        quoteId: quote.id,
        type: EmailType.ADMIN_NOTIFICATION,
        status: 'sent',
      },
    });

    return true;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return false;
  }
}

/**
 * Process email reminders for all active quotes
 */
export async function processEmailReminders(): Promise<void> {
  const now = new Date();

  // Get all pending quotes
  const quotes = await prisma.quote.findMany({
    where: {
      status: 'PENDING',
      expiresAt: { gt: now },
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

  // Mark expired quotes
  await prisma.quote.updateMany({
    where: {
      status: 'PENDING',
      expiresAt: { lte: now },
    },
    data: {
      status: 'EXPIRED',
    },
  });
}