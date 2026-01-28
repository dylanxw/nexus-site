import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createBooking } from '@/lib/google-calendar';
import { siteConfig } from '@/config/site';
import { prisma } from '@/lib/prisma';
import { verifyCSRFToken } from '@/lib/csrf';
import { rateLimit, RateLimitPresets } from '@/lib/rate-limit-production';

// Helper function to format issue slugs to readable labels
function formatIssues(issues: string[]): string {
  return issues.map(issue => {
    // Convert kebab-case to Title Case
    return issue
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }).join(', ');
}

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

function formatTimeTo12Hour(time24: string): string {
  if (!time24) return '';
  const [hour, minute] = time24.split(':').map(Number);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
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
      <li><strong>Issues:</strong> ${formatIssues(data.issues)}</li>
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
      <li><strong>Time:</strong> ${data.appointmentTime ? formatTimeTo12Hour(data.appointmentTime) : 'Not specified'}</li>
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
- Issues: ${formatIssues(data.issues)}

Customer Information:
- Name: ${data.firstName} ${data.lastName}
- Phone: ${data.phone}
- Email: ${data.email}

Problem Description:
${data.description || 'No description provided'}

${data.requestType === 'appointment' && data.appointmentDate ? `Appointment Details:
- Date: ${new Date(data.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
- Time: ${data.appointmentTime ? formatTimeTo12Hour(data.appointmentTime) : 'Not specified'}

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
          <p style="margin: 5px 0;"><strong>Time:</strong> ${data.appointmentTime ? formatTimeTo12Hour(data.appointmentTime) : ''}</p>
          <p style="margin: 5px 0;"><strong>Device:</strong> ${data.make} ${data.model}</p>
          <p style="margin: 5px 0;"><strong>Issues:</strong> ${formatIssues(data.issues)}</p>
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
            <li>Any accessories related to the repair</li>
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
Time: ${data.appointmentTime ? formatTimeTo12Hour(data.appointmentTime) : ''}
Device: ${data.make} ${data.model}
Issues: ${formatIssues(data.issues)}

LOCATION:
${siteConfig.name}
${siteConfig.address.full}
Get Directions: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}

WHAT TO BRING:
- Your device (${data.make} ${data.model})
- Any accessories related to the repair

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
          <p style="margin: 5px 0;"><strong>Issues:</strong> ${formatIssues(data.issues)}</p>
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
Issues: ${formatIssues(data.issues)}

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
    // Apply rate limiting - 5 submissions per hour per IP
    const rateLimitResponse = await rateLimit(request, {
      windowMs: 60 * 60 * 1000, // 1 hour
      maxRequests: 5, // 5 repair requests per hour
    });

    if (rateLimitResponse) {
      return rateLimitResponse; // Return 429 Too Many Requests
    }

    // Verify CSRF token after rate limiting
    const csrfToken = request.headers.get('X-CSRF-Token');
    if (!csrfToken || !verifyCSRFToken(csrfToken)) {
      return NextResponse.json(
        { error: 'Invalid security token. Please refresh the page and try again.' },
        { status: 403 }
      );
    }

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

    // Validate appointment-specific fields
    if (data.requestType === 'appointment') {
      if (!data.appointmentDate || !data.appointmentTime) {
        return NextResponse.json(
          { error: 'Appointment date and time are required for appointments' },
          { status: 400 }
        );
      }
    }

    let calendarEvent;
    let calendarEventLink;

    // Create calendar booking for appointments
    if (data.requestType === 'appointment' && data.appointmentDate && data.appointmentTime) {
      try {
        calendarEvent = await createBooking({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          deviceType: data.deviceType,
          make: data.make,
          model: data.model,
          issues: data.issues,
          description: data.description,
          appointmentDate: data.appointmentDate,
          appointmentTime: data.appointmentTime,
        });

        calendarEventLink = calendarEvent.htmlLink;
        console.log('Calendar event created:', calendarEvent.id);

      } catch (calendarError) {
        console.error('Calendar booking failed:', calendarError);
        // Don't fail the entire request, just log the error
        // The email will still be sent
      }
    }

    // Create email transporter
    const transporter = await createEmailTransporter();

    // Send email to business (internal)
    const internalEmail = formatInternalEmail(data, calendarEventLink);
    await transporter.sendMail({
      from: `${siteConfig.name} <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.BUSINESS_EMAIL,
      subject: internalEmail.subject,
      html: internalEmail.html,
      text: internalEmail.text,
      replyTo: data.email,
    });

    // Send confirmation email to customer
    const customerEmail = formatCustomerEmail(data);
    await transporter.sendMail({
      from: `${siteConfig.name} <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
    });

    // Generate booking number
    const year = new Date().getFullYear();
    const count = await prisma.repairBooking.count() + 1;
    const bookingNumber = `REP-${year}-${count.toString().padStart(4, '0')}`;

    // Save booking to database
    const booking = await prisma.repairBooking.create({
      data: {
        bookingNumber,
        deviceType: data.deviceType,
        make: data.make,
        model: data.model,
        issues: JSON.stringify(data.issues),
        description: data.description || '',
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        appointmentDate: data.appointmentDate || null,
        appointmentTime: data.appointmentTime || null,
        requestType: data.requestType,
        status: data.requestType === 'appointment' ? 'CONFIRMED' : 'PENDING',
        calendarEventId: calendarEvent?.id || null,
      },
    });

    console.log('Booking saved to database:', booking.bookingNumber);

    // Return success response
    return NextResponse.json({
      success: true,
      message: data.requestType === 'appointment'
        ? 'Appointment booked successfully! Check your email for confirmation.'
        : 'Quote request submitted successfully. We\'ll contact you within 2-4 hours during business hours.',
      bookingNumber: booking.bookingNumber,
      calendarEventId: calendarEvent?.id,
      redirect: data.requestType === 'appointment' ? '/denton-tx/repair-form/confirmation' : undefined,
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
