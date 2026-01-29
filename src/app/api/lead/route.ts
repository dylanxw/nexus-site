import { NextRequest, NextResponse } from "next/server";
import { rateLimit, RateLimitPresets } from "@/lib/rate-limit";
import nodemailer from 'nodemailer';

interface LeadData {
  id: string;
  timestamp: string;
  type: string;
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: unknown;
}

async function createEmailTransporter() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production',
      minVersion: 'TLSv1.2',
      ciphers: 'HIGH:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!RC4'
    }
  });

  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully');
  } catch (error) {
    console.error('SMTP verification failed:', error);
    throw new Error('Email service configuration error');
  }

  return transporter;
}

function getInquiryLabel(inquiryType: string): string {
  const labels: Record<string, string> = {
    'schedule-repair': 'Schedule a Repair',
    'buy-device': 'Buy a Device',
    'sell-device': 'Sell a Device',
    'warranty-claim': 'Warranty Claim',
    'job-opportunities': 'Job Opportunities',
    'other-inquiry': 'Other Inquiry',
  };
  return labels[inquiryType] || inquiryType;
}

function formatLeadEmail(leadData: LeadData): { subject: string; html: string; text: string } {
  const timestamp = new Date(leadData.timestamp).toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const inquiryLabel = getInquiryLabel(leadData.inquiryType as string || 'General');
  const subject = `[Nexus Internal] New ${inquiryLabel} Inquiry from ${leadData.name || 'Website Visitor'}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="color-scheme" content="only">
      <meta name="supported-color-schemes" content="only">
      <title>New Lead Notification</title>
      <!--[if mso]>
      <style type="text/css">
        table, td { font-family: Arial, sans-serif; }
      </style>
      <![endif]-->
      <style>
        :root { color-scheme: only; }
        [data-ogsc] { background-color: #1a1a1a !important; }
        @media (prefers-color-scheme: dark) {
          * { color-scheme: only !important; }
        }
      </style>
    </head>
    <body style="margin:0; padding:0; background-color:#1a1a1a !important; font-family:'Segoe UI',Roboto,Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a !important;">
        <tr>
          <td align="center" style="padding:32px 16px;">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#232323 !important; border-radius:8px; overflow:hidden; border:1px solid #333;">

              <!-- Header -->
              <tr>
                <td style="background-color:#2a2a2a !important; padding:24px 32px; border-bottom:3px solid #DB5858;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p style="margin:0; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#DB5858 !important; font-weight:600;">Nexus Internal</p>
                        <h1 style="margin:8px 0 0 0; font-size:22px; font-weight:700; color:#ffffff !important;">New Website Inquiry</h1>
                      </td>
                      <td align="right" style="vertical-align:top;">
                        <span style="display:inline-block; background-color:#DB5858 !important; color:#ffffff !important; padding:6px 12px; border-radius:4px; font-size:11px; font-weight:600; text-transform:uppercase;">${inquiryLabel}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Lead ID & Timestamp -->
              <tr>
                <td style="padding:20px 32px 0 32px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="font-size:12px; color:#888888 !important;">
                        <strong style="color:#aaaaaa !important;">Lead ID:</strong> ${leadData.id}
                      </td>
                      <td align="right" style="font-size:12px; color:#888888 !important;">
                        ${timestamp}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Contact Information -->
              <tr>
                <td style="padding:24px 32px;">
                  <p style="margin:0 0 16px 0; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#666666 !important;">Contact Information</p>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#2a2a2a !important; border-radius:6px; overflow:hidden;">
                    ${leadData.name ? `
                    <tr>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333 !important; width:100px;">
                        <span style="font-size:12px; color:#888888 !important; text-transform:uppercase;">Name</span>
                      </td>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333 !important;">
                        <span style="font-size:15px; color:#ffffff !important; font-weight:600;">${leadData.name}</span>
                      </td>
                    </tr>
                    ` : ''}
                    ${leadData.email ? `
                    <tr>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333 !important;">
                        <span style="font-size:12px; color:#888888 !important; text-transform:uppercase;">Email</span>
                      </td>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333 !important;">
                        <a href="mailto:${leadData.email}" style="font-size:15px; color:#DB5858 !important; text-decoration:none;">${leadData.email}</a>
                      </td>
                    </tr>
                    ` : ''}
                    ${leadData.phone ? `
                    <tr>
                      <td style="padding:14px 16px; ${leadData.message ? 'border-bottom:1px solid #333333 !important;' : ''}">
                        <span style="font-size:12px; color:#888888 !important; text-transform:uppercase;">Phone</span>
                      </td>
                      <td style="padding:14px 16px; ${leadData.message ? 'border-bottom:1px solid #333333 !important;' : ''}">
                        <a href="tel:${leadData.phone}" style="font-size:15px; color:#DB5858 !important; text-decoration:none; font-weight:600;">${leadData.phone}</a>
                      </td>
                    </tr>
                    ` : ''}
                  </table>
                </td>
              </tr>

              ${leadData.message ? `
              <!-- Message -->
              <tr>
                <td style="padding:0 32px 24px 32px;">
                  <p style="margin:0 0 12px 0; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#666666 !important;">Message</p>
                  <div style="background-color:#2a2a2a !important; border-radius:6px; padding:16px; border-left:3px solid #DB5858 !important;">
                    <p style="margin:0; font-size:14px; color:#cccccc !important; line-height:1.6; white-space:pre-wrap;">${leadData.message}</p>
                  </div>
                </td>
              </tr>
              ` : ''}

              <!-- Quick Actions -->
              <tr>
                <td style="padding:0 32px 24px 32px;">
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      ${leadData.phone ? `
                      <td style="padding-right:12px;">
                        <a href="tel:${leadData.phone}" style="display:inline-block; background-color:#DB5858 !important; color:#ffffff !important; padding:12px 24px; text-decoration:none; border-radius:6px; font-size:14px; font-weight:600;">Call Now</a>
                      </td>
                      ` : ''}
                      ${leadData.email ? `
                      <td>
                        <a href="mailto:${leadData.email}" style="display:inline-block; background-color:#333333 !important; color:#ffffff !important; padding:12px 24px; text-decoration:none; border-radius:6px; font-size:14px; font-weight:600; border:1px solid #444444 !important;">Reply via Email</a>
                      </td>
                      ` : ''}
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color:#1e1e1e !important; padding:20px 32px; border-top:1px solid #333333 !important;">
                  <p style="margin:0; font-size:12px; color:#666666 !important; text-align:center;">
                    This is an automated notification from the Nexus Tech Solutions website.<br>
                    Please respond to this inquiry within 30 minutes during business hours.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const text = `
[NEXUS INTERNAL] New ${inquiryLabel} Inquiry
============================================

Lead ID: ${leadData.id}
Submitted: ${timestamp}

CONTACT INFORMATION
-------------------
${leadData.name ? `Name: ${leadData.name}` : ''}
${leadData.email ? `Email: ${leadData.email}` : ''}
${leadData.phone ? `Phone: ${leadData.phone}` : ''}

${leadData.message ? `MESSAGE
-------
${leadData.message}` : ''}

---
This lead was submitted through the Nexus Tech Solutions website.
Please respond within 30 minutes during business hours.
  `;

  return { subject, html, text };
}

async function sendEmailWithRetry(leadData: LeadData, maxRetries = 3): Promise<void> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const transporter = await createEmailTransporter();
      const { subject, html, text } = formatLeadEmail(leadData);

      await transporter.sendMail({
        from: `"Nexus Internal" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: process.env.CONTACT_FORM_EMAIL || process.env.BUSINESS_EMAIL,
        subject,
        html,
        text,
        replyTo: leadData.email as string || undefined,
      });

      console.log(`Email sent successfully for lead ${leadData.id}`);
      return;
    } catch (error) {
      lastError = error as Error;
      console.error(`Email send attempt ${attempt} failed:`, error);

      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(`Failed to send email after ${maxRetries} attempts: ${lastError?.message}`);
}

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await rateLimit(request, RateLimitPresets.CONTACT_FORM);
  if (rateLimitResult) return rateLimitResult;

  try {
    const body = await request.json();
    const { type, ...data } = body;

    // Validate required fields
    if (!type) {
      return NextResponse.json(
        { success: false, message: "Lead type is required" },
        { status: 400 }
      );
    }

    const leadData: LeadData = {
      id: generateLeadId(),
      timestamp: new Date().toISOString(),
      type,
      ...data,
    };

    console.log(`New ${type} lead received:`, leadData);

    // Send email notification with retry logic
    try {
      await sendEmailWithRetry(leadData);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Continue processing - don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead submitted successfully",
        leadId: leadData.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error processing lead:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process lead",
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: "Lead API endpoint - use POST to submit leads" },
    { status: 405 }
  );
}
