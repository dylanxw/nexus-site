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

function formatLeadEmail(leadData: LeadData): { subject: string; html: string; text: string } {
  const timestamp = new Date(leadData.timestamp).toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const subject = `New ${leadData.type} Lead from ${leadData.name || 'Website Visitor'}`;

  const html = `
    <h2>New Lead: ${leadData.type}</h2>
    <p><strong>Lead ID:</strong> ${leadData.id}</p>
    <p><strong>Submitted:</strong> ${timestamp}</p>

    <h3>Contact Information</h3>
    <ul>
      ${leadData.name ? `<li><strong>Name:</strong> ${leadData.name}</li>` : ''}
      ${leadData.phone ? `<li><strong>Phone:</strong> <a href="tel:${leadData.phone}">${leadData.phone}</a></li>` : ''}
      ${leadData.email ? `<li><strong>Email:</strong> <a href="mailto:${leadData.email}">${leadData.email}</a></li>` : ''}
    </ul>

    <h3>Additional Details</h3>
    <pre>${JSON.stringify(leadData, null, 2)}</pre>

    <hr>
    <p><small>This lead was submitted through the Nexus Tech Solutions website.</small></p>
  `;

  const text = `
New Lead: ${leadData.type}
Lead ID: ${leadData.id}
Submitted: ${timestamp}

Contact Information:
${leadData.name ? `- Name: ${leadData.name}` : ''}
${leadData.phone ? `- Phone: ${leadData.phone}` : ''}
${leadData.email ? `- Email: ${leadData.email}` : ''}

Additional Details:
${JSON.stringify(leadData, null, 2)}

This lead was submitted through the Nexus Tech Solutions website.
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
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.BUSINESS_EMAIL,
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
