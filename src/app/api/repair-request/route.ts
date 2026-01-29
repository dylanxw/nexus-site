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

  const isAppointment = data.requestType === 'appointment';
  const badgeLabel = isAppointment ? 'APPOINTMENT' : 'QUOTE REQUEST';
  const subject = `[Nexus Internal] ${isAppointment ? 'New Appointment' : 'New Quote Request'} - ${data.make} ${data.model}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isAppointment ? 'New Appointment' : 'New Repair Quote Request'}</title>
    </head>
    <body style="margin:0; padding:0; background-color:#1a1a1a; font-family:'Segoe UI',Roboto,Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;">
        <tr>
          <td align="center" style="padding:32px 16px;">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#232323; border-radius:8px; overflow:hidden; border:1px solid #333;">

              <!-- Header -->
              <tr>
                <td style="background-color:#2a2a2a; padding:24px 32px; border-bottom:3px solid #DB5858;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p style="margin:0; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#DB5858; font-weight:600;">Nexus Internal</p>
                        <h1 style="margin:8px 0 0 0; font-size:22px; font-weight:700; color:#ffffff;">${isAppointment ? 'New Repair Appointment' : 'New Quote Request'}</h1>
                      </td>
                      <td align="right" style="vertical-align:top;">
                        <span style="display:inline-block; background-color:#DB5858; color:#ffffff; padding:6px 12px; border-radius:4px; font-size:11px; font-weight:600; text-transform:uppercase;">${badgeLabel}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Timestamp -->
              <tr>
                <td style="padding:20px 32px 0 32px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="font-size:12px; color:#888888;">
                        <strong style="color:#aaaaaa;">Device:</strong> ${data.make} ${data.model}
                      </td>
                      <td align="right" style="font-size:12px; color:#888888;">
                        ${timestamp}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              ${isAppointment && data.appointmentDate ? `
              <!-- Appointment Details -->
              <tr>
                <td style="padding:24px 32px 0 32px;">
                  <p style="margin:0 0 16px 0; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#666666;">Appointment Details</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#2a2a2a; border-radius:6px; overflow:hidden;">
                    <tr>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333; width:100px;">
                        <span style="font-size:12px; color:#888888; text-transform:uppercase;">Date</span>
                      </td>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333;">
                        <span style="font-size:15px; color:#ffffff; font-weight:600;">${new Date(data.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:14px 16px;">
                        <span style="font-size:12px; color:#888888; text-transform:uppercase;">Time</span>
                      </td>
                      <td style="padding:14px 16px;">
                        <span style="font-size:15px; color:#ffffff; font-weight:600;">${data.appointmentTime ? formatTimeTo12Hour(data.appointmentTime) : 'Not specified'}</span>
                      </td>
                    </tr>
                  </table>
                  ${calendarLink ? `
                  <p style="margin:12px 0 0 0;">
                    <a href="${calendarLink}" style="font-size:13px; color:#DB5858; text-decoration:underline;">View in Google Calendar</a>
                  </p>
                  ` : ''}
                </td>
              </tr>
              ` : ''}

              <!-- Device Information -->
              <tr>
                <td style="padding:24px 32px;">
                  <p style="margin:0 0 16px 0; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#666666;">Device Information</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#2a2a2a; border-radius:6px; overflow:hidden;">
                    <tr>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333; width:100px;">
                        <span style="font-size:12px; color:#888888; text-transform:uppercase;">Type</span>
                      </td>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333;">
                        <span style="font-size:15px; color:#ffffff; font-weight:600;">${data.deviceType}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333;">
                        <span style="font-size:12px; color:#888888; text-transform:uppercase;">Make</span>
                      </td>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333;">
                        <span style="font-size:15px; color:#ffffff;">${data.make}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333;">
                        <span style="font-size:12px; color:#888888; text-transform:uppercase;">Model</span>
                      </td>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333;">
                        <span style="font-size:15px; color:#ffffff;">${data.model}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:14px 16px;">
                        <span style="font-size:12px; color:#888888; text-transform:uppercase;">Issues</span>
                      </td>
                      <td style="padding:14px 16px;">
                        <span style="font-size:15px; color:#DB5858; font-weight:600;">${formatIssues(data.issues)}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Customer Information -->
              <tr>
                <td style="padding:0 32px 24px 32px;">
                  <p style="margin:0 0 16px 0; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#666666;">Customer Information</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#2a2a2a; border-radius:6px; overflow:hidden;">
                    <tr>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333; width:100px;">
                        <span style="font-size:12px; color:#888888; text-transform:uppercase;">Name</span>
                      </td>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333;">
                        <span style="font-size:15px; color:#ffffff; font-weight:600;">${data.firstName} ${data.lastName}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333;">
                        <span style="font-size:12px; color:#888888; text-transform:uppercase;">Phone</span>
                      </td>
                      <td style="padding:14px 16px; border-bottom:1px solid #333333;">
                        <a href="tel:${data.phone}" style="font-size:15px; color:#DB5858; text-decoration:none; font-weight:600;">${data.phone}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:14px 16px;">
                        <span style="font-size:12px; color:#888888; text-transform:uppercase;">Email</span>
                      </td>
                      <td style="padding:14px 16px;">
                        <a href="mailto:${data.email}" style="font-size:15px; color:#DB5858; text-decoration:none;">${data.email}</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              ${data.description ? `
              <!-- Problem Description -->
              <tr>
                <td style="padding:0 32px 24px 32px;">
                  <p style="margin:0 0 12px 0; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#666666;">Problem Description</p>
                  <div style="background-color:#2a2a2a; border-radius:6px; padding:16px; border-left:3px solid #DB5858;">
                    <p style="margin:0; font-size:14px; color:#cccccc; line-height:1.6; white-space:pre-wrap;">${data.description}</p>
                  </div>
                </td>
              </tr>
              ` : ''}

              <!-- Quick Actions -->
              <tr>
                <td style="padding:0 32px 24px 32px;">
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-right:12px;">
                        <a href="tel:${data.phone}" style="display:inline-block; background-color:#DB5858; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-size:14px; font-weight:600;">Call Customer</a>
                      </td>
                      <td>
                        <a href="mailto:${data.email}" style="display:inline-block; background-color:#333333; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-size:14px; font-weight:600; border:1px solid #444444;">Send Email</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color:#1e1e1e; padding:20px 32px; border-top:1px solid #333333;">
                  <p style="margin:0; font-size:12px; color:#666666; text-align:center;">
                    This is an automated notification from the Nexus Tech Solutions website.
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
[NEXUS INTERNAL] New Repair ${isAppointment ? 'Appointment' : 'Quote Request'}
============================================

Submitted: ${timestamp}
Device: ${data.make} ${data.model}

${calendarLink ? `View in Calendar: ${calendarLink}\n` : ''}

DEVICE INFORMATION
------------------
Type: ${data.deviceType}
Make: ${data.make}
Model: ${data.model}
Issues: ${formatIssues(data.issues)}

CUSTOMER INFORMATION
--------------------
Name: ${data.firstName} ${data.lastName}
Phone: ${data.phone}
Email: ${data.email}

${data.description ? `PROBLEM DESCRIPTION
-------------------
${data.description}` : ''}

${isAppointment && data.appointmentDate ? `APPOINTMENT DETAILS
-------------------
Date: ${new Date(data.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${data.appointmentTime ? formatTimeTo12Hour(data.appointmentTime) : 'Not specified'}
` : ''}
---
This request was submitted through the Nexus Tech Solutions website.
  `;

  return { subject, html, text };
}

function formatCustomerEmail(data: RepairRequestData): { subject: string; html: string; text: string } {
  const isAppointment = data.requestType === 'appointment';

  if (isAppointment) {
    const appointmentDate = data.appointmentDate ? new Date(data.appointmentDate) : null;
    // Customer-facing date omits the year for cleaner display
    const customerDate = appointmentDate ? appointmentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }) : '';

    const subject = `Appointment Confirmed - ${data.make} ${data.model} Repair`;

    const html = `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="color-scheme" content="only">
        <meta name="supported-color-schemes" content="only">
        <title>Appointment Confirmed</title>
        <!--[if mso]>
        <style type="text/css">
          table, td { font-family: Arial, sans-serif; }
        </style>
        <![endif]-->
        <style>
          :root { color-scheme: only; }
          [data-ogsc] { background-color: #ffffff !important; }
          @media (prefers-color-scheme: dark) {
            * { color-scheme: only !important; }
          }
        </style>
      </head>
      <body style="margin:0; padding:0; background-color:#ffffff !important; -webkit-font-smoothing:antialiased;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff !important;">
          <tr>
            <td align="center" style="padding:32px 16px;">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#232323 !important; border-radius:8px; overflow:hidden; border:1px solid #333333;">

                <!-- Header -->
                <tr>
                  <td style="background-color:#2a2a2a !important; padding:24px 32px; border-bottom:3px solid #DB5858;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin:0; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#DB5858 !important; font-weight:600;">Nexus Tech Solutions</p>
                          <h1 style="margin:8px 0 0 0; font-size:22px; font-weight:700; color:#ffffff !important;">Appointment Confirmed</h1>
                        </td>
                        <td align="right" style="vertical-align:top;">
                          <span style="display:inline-block; background-color:#34d399 !important; color:#ffffff !important; padding:6px 12px; border-radius:4px; font-size:11px; font-weight:600; text-transform:uppercase;">CONFIRMED</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Appointment Time Bar -->
                <tr>
                  <td style="padding:20px 32px 0 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:12px; color:#888888 !important;">
                          <strong style="color:#aaaaaa !important;">Device:</strong> ${data.make} ${data.model}
                        </td>
                        <td align="right" style="font-size:12px; color:#888888 !important;">
                          ${customerDate} at ${data.appointmentTime ? formatTimeTo12Hour(data.appointmentTime) : ''}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:24px 32px;">

                    <p style="margin:0 0 8px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:18px; font-weight:700; color:#ffffff !important;">Hi ${data.firstName},</p>
                    <p style="margin:0 0 24px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#cccccc !important; line-height:1.5;">Your repair appointment has been confirmed. Here are the details.</p>

                    <!-- Appointment details card -->
                    <p style="margin:0 0 16px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#666666 !important;">Appointment Details</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#2a2a2a !important; border-radius:6px; overflow:hidden; margin-bottom:24px;">
                      <tr>
                        <td style="padding:14px 16px; border-bottom:1px solid #333333 !important; width:100px;">
                          <span style="font-size:12px; color:#888888 !important; text-transform:uppercase;">Date</span>
                        </td>
                        <td style="padding:14px 16px; border-bottom:1px solid #333333 !important;">
                          <span style="font-size:15px; color:#ffffff !important; font-weight:600;">${customerDate}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 16px; border-bottom:1px solid #333333 !important;">
                          <span style="font-size:12px; color:#888888 !important; text-transform:uppercase;">Time</span>
                        </td>
                        <td style="padding:14px 16px; border-bottom:1px solid #333333 !important;">
                          <span style="font-size:15px; color:#ffffff !important; font-weight:600;">${data.appointmentTime ? formatTimeTo12Hour(data.appointmentTime) : ''}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 16px; border-bottom:1px solid #333333 !important;">
                          <span style="font-size:12px; color:#888888 !important; text-transform:uppercase;">Device</span>
                        </td>
                        <td style="padding:14px 16px; border-bottom:1px solid #333333 !important;">
                          <span style="font-size:15px; color:#ffffff !important;">${data.make} ${data.model}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 16px;">
                          <span style="font-size:12px; color:#888888 !important; text-transform:uppercase;">Issues</span>
                        </td>
                        <td style="padding:14px 16px;">
                          <span style="font-size:15px; color:#DB5858 !important; font-weight:600;">${formatIssues(data.issues)}</span>
                        </td>
                      </tr>
                    </table>

                    <!-- Location -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                      <tr>
                        <td style="background-color:#1a2633 !important; border-left:3px solid #5b9bd5 !important; border-radius:0 6px 6px 0; padding:16px;">
                          <p style="margin:0 0 4px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; font-weight:700; color:#8bbde8 !important;"><strong>${siteConfig.name}</strong></p>
                          <p style="margin:0 0 2px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#6a9fd4 !important;">${siteConfig.address.street}</p>
                          <p style="margin:0 0 8px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#6a9fd4 !important;">${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}</p>
                          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}" style="font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; color:#DB5858 !important; text-decoration:underline;">Get Directions</a>
                        </td>
                      </tr>
                    </table>

                    <!-- What to bring -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                      <tr>
                        <td style="background-color:#1a2e1a !important; border-left:3px solid #34d399 !important; border-radius:0 6px 6px 0; padding:14px 16px;">
                          <p style="margin:0 0 6px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; font-weight:700; color:#6ee7a8 !important;">What to Bring</p>
                          <p style="margin:0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#5dd99a !important; line-height:1.6;">Your ${data.make} ${data.model} and any related accessories.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- What happens next -->
                    <p style="margin:0 0 16px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#666666 !important;">What Happens Next</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                      <tr>
                        <td style="width:24px; vertical-align:top; padding:0 10px 0 0;">
                          <span style="display:inline-block; width:22px; height:22px; background-color:#DB5858 !important; color:#ffffff !important; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:12px; font-weight:700; line-height:22px; text-align:center; border-radius:50%;">1</span>
                        </td>
                        <td style="font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#cccccc !important; line-height:1.5; padding-bottom:10px;">Bring your device at the scheduled time.</td>
                      </tr>
                      <tr>
                        <td style="width:24px; vertical-align:top; padding:0 10px 0 0;">
                          <span style="display:inline-block; width:22px; height:22px; background-color:#DB5858 !important; color:#ffffff !important; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:12px; font-weight:700; line-height:22px; text-align:center; border-radius:50%;">2</span>
                        </td>
                        <td style="font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#cccccc !important; line-height:1.5; padding-bottom:10px;">Our technician will diagnose the issue and provide a quote.</td>
                      </tr>
                      <tr>
                        <td style="width:24px; vertical-align:top; padding:0 10px 0 0;">
                          <span style="display:inline-block; width:22px; height:22px; background-color:#DB5858 !important; color:#ffffff !important; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:12px; font-weight:700; line-height:22px; text-align:center; border-radius:50%;">3</span>
                        </td>
                        <td style="font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#cccccc !important; line-height:1.5; padding-bottom:10px;">Most repairs are completed same day.</td>
                      </tr>
                      <tr>
                        <td style="width:24px; vertical-align:top; padding:0 10px 0 0;">
                          <span style="display:inline-block; width:22px; height:22px; background-color:#DB5858 !important; color:#ffffff !important; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:12px; font-weight:700; line-height:22px; text-align:center; border-radius:50%;">4</span>
                        </td>
                        <td style="font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#cccccc !important; line-height:1.5; padding-bottom:10px;">We'll notify you when your device is ready for pickup.</td>
                      </tr>
                    </table>

                    <!-- Reschedule notice -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0 24px 0;">
                      <tr>
                        <td style="background-color:#342a14 !important; border-left:3px solid #E8A735 !important; border-radius:0 6px 6px 0; padding:14px 16px;">
                          <p style="margin:0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#e8c56e !important; line-height:1.5;">
                            <strong>Need to reschedule?</strong> Call us at <a href="${siteConfig.phoneHref}" style="color:#DB5858 !important; text-decoration:underline;">${siteConfig.phoneFormatted}</a>
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 24px 0;">
                      <tr>
                        <td>
                          <a href="${siteConfig.phoneHref}" style="display:inline-block; background-color:#DB5858 !important; color:#ffffff !important; padding:12px 24px; text-decoration:none; border-radius:6px; font-size:14px; font-weight:600;">Call or Text Us</a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color:#1e1e1e !important; padding:20px 32px; border-top:1px solid #333333 !important;">
                    <p style="margin:0 0 4px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; font-weight:600; color:#dddddd !important;">${siteConfig.name}</p>
                    <p style="margin:0 0 4px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; color:#888888 !important;">${siteConfig.address.full}</p>
                    <p style="margin:0 0 4px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; color:#888888 !important;">${siteConfig.phoneFormatted} &nbsp;&bull;&nbsp; ${siteConfig.hours.display}</p>
                    <p style="margin:16px 0 0 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:11px; color:#555555 !important;">&copy; ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.</p>
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
Your Appointment is Confirmed!

Hi ${data.firstName},

Great news! Your repair appointment has been confirmed.

APPOINTMENT DETAILS:
Date: ${customerDate}
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
    const subject = `Repair Quote Request Received - ${data.make} ${data.model}`;

    const html = `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="color-scheme" content="only">
        <meta name="supported-color-schemes" content="only">
        <title>Repair Quote Request Received</title>
        <!--[if mso]>
        <style type="text/css">
          table, td { font-family: Arial, sans-serif; }
        </style>
        <![endif]-->
        <style>
          :root { color-scheme: only; }
          [data-ogsc] { background-color: #ffffff !important; }
          @media (prefers-color-scheme: dark) {
            * { color-scheme: only !important; }
          }
        </style>
      </head>
      <body style="margin:0; padding:0; background-color:#ffffff !important; -webkit-font-smoothing:antialiased;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff !important;">
          <tr>
            <td align="center" style="padding:32px 16px;">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#232323 !important; border-radius:8px; overflow:hidden; border:1px solid #333333;">

                <!-- Header -->
                <tr>
                  <td style="background-color:#2a2a2a !important; padding:24px 32px; border-bottom:3px solid #DB5858;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin:0; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#DB5858 !important; font-weight:600;">Nexus Tech Solutions</p>
                          <h1 style="margin:8px 0 0 0; font-size:22px; font-weight:700; color:#ffffff !important;">Repair Quote Request Received</h1>
                        </td>
                        <td align="right" style="vertical-align:top;">
                          <span style="display:inline-block; background-color:#DB5858 !important; color:#ffffff !important; padding:6px 12px; border-radius:4px; font-size:11px; font-weight:600; text-transform:uppercase;">QUOTE REQUEST</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Device Info Bar -->
                <tr>
                  <td style="padding:20px 32px 0 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:12px; color:#888888 !important;">
                          <strong style="color:#aaaaaa !important;">Device:</strong> ${data.make} ${data.model}
                        </td>
                        <td align="right" style="font-size:12px; color:#888888 !important;">
                          ${data.deviceType}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:24px 32px;">

                    <p style="margin:0 0 8px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:18px; font-weight:700; color:#ffffff !important;">Hi ${data.firstName},</p>
                    <p style="margin:0 0 24px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#cccccc !important; line-height:1.5;">We've received your repair quote request and will prepare an estimate for your ${data.make} ${data.model} repair.</p>

                    <!-- Device details card -->
                    <p style="margin:0 0 16px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#666666 !important;">Device Details</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#2a2a2a !important; border-radius:6px; overflow:hidden; margin-bottom:24px;">
                      <tr>
                        <td style="padding:14px 16px; border-bottom:1px solid #333333 !important; width:100px;">
                          <span style="font-size:12px; color:#888888 !important; text-transform:uppercase;">Device</span>
                        </td>
                        <td style="padding:14px 16px; border-bottom:1px solid #333333 !important;">
                          <span style="font-size:15px; color:#ffffff !important; font-weight:600;">${data.make} ${data.model}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 16px; border-bottom:1px solid #333333 !important;">
                          <span style="font-size:12px; color:#888888 !important; text-transform:uppercase;">Type</span>
                        </td>
                        <td style="padding:14px 16px; border-bottom:1px solid #333333 !important;">
                          <span style="font-size:15px; color:#ffffff !important;">${data.deviceType}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 16px;">
                          <span style="font-size:12px; color:#888888 !important; text-transform:uppercase;">Issues</span>
                        </td>
                        <td style="padding:14px 16px;">
                          <span style="font-size:15px; color:#DB5858 !important; font-weight:600;">${formatIssues(data.issues)}</span>
                        </td>
                      </tr>
                    </table>

                    <!-- What happens next -->
                    <p style="margin:0 0 16px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#666666 !important;">What Happens Next</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                      <tr>
                        <td style="width:24px; vertical-align:top; padding:0 10px 0 0;">
                          <span style="display:inline-block; width:22px; height:22px; background-color:#DB5858 !important; color:#ffffff !important; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:12px; font-weight:700; line-height:22px; text-align:center; border-radius:50%;">1</span>
                        </td>
                        <td style="font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#cccccc !important; line-height:1.5; padding-bottom:10px;">Our technician will review your device information.</td>
                      </tr>
                      <tr>
                        <td style="width:24px; vertical-align:top; padding:0 10px 0 0;">
                          <span style="display:inline-block; width:22px; height:22px; background-color:#DB5858 !important; color:#ffffff !important; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:12px; font-weight:700; line-height:22px; text-align:center; border-radius:50%;">2</span>
                        </td>
                        <td style="font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#cccccc !important; line-height:1.5; padding-bottom:10px;">We'll prepare a detailed quote for the repairs needed.</td>
                      </tr>
                      <tr>
                        <td style="width:24px; vertical-align:top; padding:0 10px 0 0;">
                          <span style="display:inline-block; width:22px; height:22px; background-color:#DB5858 !important; color:#ffffff !important; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:12px; font-weight:700; line-height:22px; text-align:center; border-radius:50%;">3</span>
                        </td>
                        <td style="font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#cccccc !important; line-height:1.5; padding-bottom:10px;">You'll receive a call or email with the estimate within 2-4 hours during business hours.</td>
                      </tr>
                      <tr>
                        <td style="width:24px; vertical-align:top; padding:0 10px 0 0;">
                          <span style="display:inline-block; width:22px; height:22px; background-color:#DB5858 !important; color:#ffffff !important; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:12px; font-weight:700; line-height:22px; text-align:center; border-radius:50%;">4</span>
                        </td>
                        <td style="font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#cccccc !important; line-height:1.5; padding-bottom:10px;">Once approved, schedule an appointment or drop off your device.</td>
                      </tr>
                    </table>

                    <!-- Business hours -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0 24px 0;">
                      <tr>
                        <td style="background-color:#1a2633 !important; border-left:3px solid #5b9bd5 !important; border-radius:0 6px 6px 0; padding:14px 16px;">
                          <p style="margin:0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:14px; color:#8bbde8 !important; line-height:1.5;">
                            <strong>Business Hours:</strong> ${siteConfig.hours.display}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 24px 0;">
                      <tr>
                        <td>
                          <a href="${siteConfig.phoneHref}" style="display:inline-block; background-color:#DB5858 !important; color:#ffffff !important; padding:12px 24px; text-decoration:none; border-radius:6px; font-size:14px; font-weight:600;">Need Immediate Help? Call Us</a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color:#1e1e1e !important; padding:20px 32px; border-top:1px solid #333333 !important;">
                    <p style="margin:0 0 4px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; font-weight:600; color:#dddddd !important;">${siteConfig.name}</p>
                    <p style="margin:0 0 4px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; color:#888888 !important;">${siteConfig.address.full}</p>
                    <p style="margin:0 0 4px 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:13px; color:#888888 !important;">${siteConfig.phoneFormatted} &nbsp;&bull;&nbsp; ${siteConfig.hours.display}</p>
                    <p style="margin:16px 0 0 0; font-family:'Segoe UI',Roboto,Arial,sans-serif; font-size:11px; color:#555555 !important;">&copy; ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.</p>
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
Repair Quote Request Received!

Hi ${data.firstName},

Thank you for your repair quote request. We've received your information and will prepare an estimate for your ${data.make} ${data.model} repair.

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

    // Auto-capitalize first and last name
    data.firstName = data.firstName.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    data.lastName = data.lastName.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

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
      from: `"Nexus Internal" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
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
        : 'Repair quote request submitted successfully. We\'ll contact you within 2-4 hours during business hours.',
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
