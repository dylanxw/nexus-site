import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface RepairRequestData {
  deviceType: string;
  make: string;
  model: string;
  issues: string[];
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  description: string;
  appointmentDate?: string;
  appointmentTime?: string;
  requestType: 'quote' | 'appointment';
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
    // Add TLS options for better Hostinger compatibility
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    }
  });

  // Verify connection
  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully');
  } catch (error) {
    console.error('SMTP verification failed:', error);
    throw new Error('Email service configuration error');
  }

  return transporter;
}

function formatRepairRequestEmail(data: RepairRequestData): { subject: string; html: string; text: string } {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const subject = `${data.requestType === 'appointment' ? 'New Appointment Request' : 'New Quote Request'} - ${data.make} ${data.model}`;

  const html = `
    <h2>New Repair Request - ${data.requestType.toUpperCase()}</h2>
    <p><strong>Submitted:</strong> ${timestamp}</p>

    <h3>Device Information</h3>
    <ul>
      <li><strong>Type:</strong> ${data.deviceType}</li>
      <li><strong>Make:</strong> ${data.make}</li>
      <li><strong>Model:</strong> ${data.model}</li>
      <li><strong>Issues:</strong> ${data.issues.join(', ')}</li>
    </ul>

    <h3>Customer Information</h3>
    <ul>
      <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
      <li><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></li>
      <li><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
    </ul>

    <h3>Problem Description</h3>
    <p>${data.description || 'No description provided'}</p>

    ${data.requestType === 'appointment' && data.appointmentDate ? `
    <h3>Appointment Details</h3>
    <ul>
      <li><strong>Preferred Date:</strong> ${data.appointmentDate}</li>
      <li><strong>Preferred Time:</strong> ${data.appointmentTime || 'Not specified'}</li>
    </ul>
    ` : ''}

    <hr>
    <p><small>This request was submitted through the Nexus Tech Solutions website.</small></p>
  `;

  const text = `
New Repair Request - ${data.requestType.toUpperCase()}
Submitted: ${timestamp}

Device Information:
- Type: ${data.deviceType}
- Make: ${data.make}
- Model: ${data.model}
- Issues: ${data.issues.join(', ')}

Customer Information:
- Name: ${data.firstName} ${data.lastName}
- Phone: ${data.phone}
- Email: ${data.email}

Problem Description:
${data.description || 'No description provided'}

${data.requestType === 'appointment' && data.appointmentDate ? `Appointment Details:
- Preferred Date: ${data.appointmentDate}
- Preferred Time: ${data.appointmentTime || 'Not specified'}

` : ''}This request was submitted through the Nexus Tech Solutions website.
  `;

  return { subject, html, text };
}

export async function POST(request: NextRequest) {
  try {
    const data: RepairRequestData = await request.json();

    // Validate required fields
    const requiredFields = ['deviceType', 'make', 'model', 'firstName', 'lastName', 'phone', 'email'];
    for (const field of requiredFields) {
      if (!data[field as keyof RepairRequestData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create email transporter
    const transporter = await createEmailTransporter();

    // Format email content
    const { subject, html, text } = formatRepairRequestEmail(data);

    // Send email to business
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.BUSINESS_EMAIL,
      subject,
      html,
      text,
      replyTo: data.email,
    });

    // Send confirmation email to customer
    const customerSubject = `Thank you for your ${data.requestType} request - Nexus Tech Solutions`;
    const customerHtml = `
      <h2>Thank you for your ${data.requestType} request!</h2>
      <p>Hi ${data.firstName},</p>
      <p>We've received your ${data.requestType} request for your ${data.make} ${data.model}. Our team will review your request and get back to you shortly.</p>

      <h3>What happens next?</h3>
      <ul>
        <li>We'll review your device information and issues</li>
        <li>${data.requestType === 'appointment' ? 'We\'ll confirm your appointment time' : 'We\'ll prepare a detailed quote'}</li>
        <li>We\'ll contact you within 2-4 business hours</li>
      </ul>

      <p><strong>Need immediate assistance?</strong><br>
      Call us at <a href="tel:940-600-1012">940-600-1012</a></p>

      <p>Thank you for choosing Nexus Tech Solutions!</p>

      <hr>
      <p><small>Nexus Tech Solutions<br>
      Phone: 940-600-1012<br>
      This is an automated message, please do not reply directly.</small></p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: data.email,
      subject: customerSubject,
      html: customerHtml,
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Repair request submitted successfully. We\'ll contact you shortly!'
    });

  } catch (error) {
    console.error('Error submitting repair request:', error);

    return NextResponse.json(
      {
        error: 'Failed to submit repair request',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}