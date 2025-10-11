import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createBooking } from '@/lib/google-calendar';
import { siteConfig } from '@/config/site';

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
      rejectUnauthorized: process.env.NODE_ENV === 'production',
      minVersion: 'TLSv1.2',
      ciphers: 'HIGH:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!RC4'
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

function formatInternalEmail(data: RepairRequestData, calendarLink?: string): { subject: string; html: string; text: string } {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const subject = `${data.requestType === 'appointment' ? 'New Appointment Booked' : 'New Quote Request'} - ${data.make} ${data.model}`;

  const html = `
    <h2>New Repair ${data.requestType === 'appointment' ? 'Appointment' : 'Quote Request'}</h2>
    <p><strong>Submitted:</strong> ${timestamp}</p>

    ${calendarLink ? `
    <div style="background-color: #f0f9ff; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0;">
      <strong>📅 View in Calendar:</strong><br>
      <a href="${calendarLink}" style="color: #3b82f6; text-decoration: underline;">Open Google Calendar Event</a>
    </div>
    ` : ''}

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
      <li><strong>Date:</strong> ${new Date(data.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
      <li><strong>Time:</strong> ${data.appointmentTime || 'Not specified'}</li>
    </ul>
    ` : ''}

    <hr>
    <p><small>This request was submitted through the Nexus Tech Solutions website.</small></p>
  `;

  const text = `
New Repair ${data.requestType === 'appointment' ? 'Appointment' : 'Quote Request'}
Submitted: ${timestamp}

${calendarLink ? `View in Calendar: ${calendarLink}\n` : ''}

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
- Date: ${new Date(data.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
- Time: ${data.appointmentTime || 'Not specified'}

` : ''}This request was submitted through the Nexus Tech Solutions website.
  `;

  return { subject, html, text };
}

function formatCustomerEmail(data: RepairRequestData): { subject: string; html: string; text: string } {
  const isAppointment = data.requestType === 'appointment';

  if (isAppointment) {
    const appointmentDate = data.appointmentDate ? new Date(data.appointmentDate) : null;
    const formattedDate = appointmentDate ? appointmentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '';

    const subject = `Appointment Confirmed - ${data.make} ${data.model} Repair`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DB5858;">✓ Your Appointment is Confirmed!</h2>
        <p>Hi ${data.firstName},</p>
        <p>Great news! Your repair appointment has been confirmed.</p>

        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #111827;">Appointment Details</h3>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
          <p style="margin: 5px 0;"><strong>Time:</strong> ${data.appointmentTime}</p>
          <p style="margin: 5px 0;"><strong>Device:</strong> ${data.make} ${data.model}</p>
          <p style="margin: 5px 0;"><strong>Issues:</strong> ${data.issues.join(', ')}</p>
        </div>

        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #111827;">Location</h3>
          <p style="margin: 5px 0;"><strong>${siteConfig.name}</strong></p>
          <p style="margin: 5px 0;">${siteConfig.address.street}</p>
          <p style="margin: 5px 0;">${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}</p>
          <p style="margin: 15px 0 5px 0;">
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}"
               style="color: #3b82f6; text-decoration: underline;">Get Directions</a>
          </p>
        </div>

        <div style="border-left: 4px solid #10b981; padding-left: 15px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #059669;">What to Bring:</h4>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Your device (${data.make} ${data.model})</li>
            <li>Charger or charging cable (if available)</li>
            <li>Any accessories related to the repair</li>
            <li>Photo ID</li>
          </ul>
        </div>

        <h3>What Happens Next?</h3>
        <ol style="line-height: 1.8;">
          <li>Bring your device to our store at the scheduled time</li>
          <li>Our technician will diagnose the issue and provide a quote</li>
          <li>Most repairs are completed the same day</li>
          <li>We'll notify you when your device is ready for pickup</li>
        </ol>

        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Need to reschedule?</strong></p>
          <p style="margin: 10px 0 0 0;">Call us at <a href="tel:${siteConfig.phoneHref}" style="color: #DB5858;">${siteConfig.phoneFormatted}</a></p>
        </div>

        <p><strong>Questions?</strong> Feel free to call or text us at <a href="tel:${siteConfig.phoneHref}">${siteConfig.phoneFormatted}</a></p>

        <p style="margin-top: 30px;">Thank you for choosing ${siteConfig.name}!</p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="font-size: 12px; color: #6b7280;">
          ${siteConfig.name}<br>
          ${siteConfig.address.full}<br>
          Phone: ${siteConfig.phoneFormatted}<br>
          <em>This is an automated confirmation. Please do not reply to this email.</em>
        </p>
      </div>
    `;

    const text = `
Your Appointment is Confirmed!

Hi ${data.firstName},

Great news! Your repair appointment has been confirmed.

APPOINTMENT DETAILS:
Date: ${formattedDate}
Time: ${data.appointmentTime}
Device: ${data.make} ${data.model}
Issues: ${data.issues.join(', ')}

LOCATION:
${siteConfig.name}
${siteConfig.address.full}
Get Directions: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}

WHAT TO BRING:
- Your device (${data.make} ${data.model})
- Charger or charging cable (if available)
- Any accessories related to the repair
- Photo ID

WHAT HAPPENS NEXT:
1. Bring your device to our store at the scheduled time
2. Our technician will diagnose the issue and provide a quote
3. Most repairs are completed the same day
4. We'll notify you when your device is ready for pickup

Need to reschedule? Call us at ${siteConfig.phoneFormatted}

Questions? Feel free to call or text us at ${siteConfig.phoneFormatted}

Thank you for choosing ${siteConfig.name}!

---
${siteConfig.name}
${siteConfig.address.full}
Phone: ${siteConfig.phoneFormatted}
This is an automated confirmation. Please do not reply to this email.
    `.trim();

    return { subject, html, text };
  } else {
    // Quote request
    const subject = `Quote Request Received - ${data.make} ${data.model}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DB5858;">✓ Quote Request Received!</h2>
        <p>Hi ${data.firstName},</p>
        <p>Thank you for your quote request. We've received your information and will prepare an estimate for your ${data.make} ${data.model} repair.</p>

        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #111827;">Device Details</h3>
          <p style="margin: 5px 0;"><strong>Device:</strong> ${data.make} ${data.model}</p>
          <p style="margin: 5px 0;"><strong>Type:</strong> ${data.deviceType}</p>
          <p style="margin: 5px 0;"><strong>Issues:</strong> ${data.issues.join(', ')}</p>
        </div>

        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #111827;">What Happens Next?</h3>
          <ol style="line-height: 1.8; margin: 10px 0; padding-left: 20px;">
            <li>Our technician will review your device information</li>
            <li>We'll prepare a detailed quote for the repairs needed</li>
            <li>You'll receive a call or email with the estimate within 2-4 hours during business hours</li>
            <li>Once approved, you can schedule an appointment or drop off your device</li>
          </ol>
        </div>

        <div style="border-left: 4px solid #3b82f6; padding-left: 15px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #1e40af;">Our Business Hours:</h4>
          <p style="margin: 5px 0;">${siteConfig.hours.display}</p>
        </div>

        <p><strong>Need immediate assistance?</strong><br>
        Call us at <a href="tel:${siteConfig.phoneHref}" style="color: #DB5858; text-decoration: underline;">${siteConfig.phoneFormatted}</a></p>

        <p style="margin-top: 30px;">Thank you for choosing ${siteConfig.name}!</p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="font-size: 12px; color: #6b7280;">
          ${siteConfig.name}<br>
          ${siteConfig.address.full}<br>
          Phone: ${siteConfig.phoneFormatted}<br>
          <em>This is an automated confirmation. Please do not reply to this email.</em>
        </p>
      </div>
    `;

    const text = `
Quote Request Received!

Hi ${data.firstName},

Thank you for your quote request. We've received your information and will prepare an estimate for your ${data.make} ${data.model} repair.

DEVICE DETAILS:
Device: ${data.make} ${data.model}
Type: ${data.deviceType}
Issues: ${data.issues.join(', ')}

WHAT HAPPENS NEXT:
1. Our technician will review your device information
2. We'll prepare a detailed quote for the repairs needed
3. You'll receive a call or email with the estimate within 2-4 hours during business hours
4. Once approved, you can schedule an appointment or drop off your device

OUR BUSINESS HOURS:
${siteConfig.hours.display}

Need immediate assistance? Call us at ${siteConfig.phoneFormatted}

Thank you for choosing ${siteConfig.name}!

---
${siteConfig.name}
${siteConfig.address.full}
Phone: ${siteConfig.phoneFormatted}
This is an automated confirmation. Please do not reply to this email.
    `.trim();

    return { subject, html, text };
  }
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