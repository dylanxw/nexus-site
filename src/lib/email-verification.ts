import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.hostinger.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3004';

// Create email transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

// Generate verification token
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Generate 6-digit verification code
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create verification token in database
export async function createVerificationToken(
  email: string,
  type: 'EMAIL_VERIFY' | 'PASSWORD_RESET'
): Promise<string> {
  const token = generateVerificationToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Delete any existing tokens for this email and type
  await prisma.verificationToken.deleteMany({
    where: {
      email: email.toLowerCase(),
      type,
    },
  });

  // Create new token
  await prisma.verificationToken.create({
    data: {
      email: email.toLowerCase(),
      token,
      type,
      expiresAt,
    },
  });

  return token;
}

// Verify token
export async function verifyToken(token: string, type: string) {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    return { valid: false, error: 'Invalid token' };
  }

  if (verificationToken.type !== type) {
    return { valid: false, error: 'Invalid token type' };
  }

  if (verificationToken.expiresAt < new Date()) {
    // Delete expired token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });
    return { valid: false, error: 'Token expired' };
  }

  return { valid: true, email: verificationToken.email, tokenId: verificationToken.id };
}

// Send verification code email
export async function sendVerificationCodeEmail(email: string, code: string) {
  const mailOptions = {
    from: SMTP_FROM,
    to: email,
    subject: 'Email Verification Code - Nexus Tech Solutions',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #DB5858; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
            .code { font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; background-color: #fff; padding: 20px; border: 2px dashed #DB5858; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Email Verification</h1>
            </div>
            <div class="content">
              <p>Your verification code is:</p>
              <div class="code">${code}</div>
              <p>Enter this code to verify your email address.</p>
              <p><strong>This code will expire in 10 minutes.</strong></p>
              <p>If you didn't request this verification, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>Nexus Tech Solutions<br/>
              3305 S Mayhill Rd, STE 109, Denton, TX 76208</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending verification code email:', error);
    return { success: false, error: 'Failed to send verification code' };
  }
}

// Send verification email (legacy - with URL)
export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${SITE_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: SMTP_FROM,
    to: email,
    subject: 'Verify Your Email - Nexus Tech Solutions',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #DB5858; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
            .button { display: inline-block; background-color: #DB5858; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Verify Your Email Address</h1>
            </div>
            <div class="content">
              <p>Thank you for updating your email address at Nexus Tech Solutions.</p>
              <p>To complete your email verification, please click the button below:</p>
              <center>
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </center>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
              <p>This link will expire in 24 hours.</p>
              <p>If you didn't request this verification, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>Nexus Tech Solutions<br/>
              3305 S Mayhill Rd, STE 109, Denton, TX 76208</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error: 'Failed to send verification email' };
  }
}

// Create verification code in database
export async function createVerificationCode(
  email: string,
  type: 'EMAIL_VERIFY' | 'PASSWORD_RESET'
): Promise<string> {
  const code = generateVerificationCode();
  const token = generateVerificationToken();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Delete any existing codes for this email and type
  await prisma.verificationToken.deleteMany({
    where: {
      email: email.toLowerCase(),
      type,
    },
  });

  // Create new code
  await prisma.verificationToken.create({
    data: {
      email: email.toLowerCase(),
      token,
      code,
      type,
      expiresAt,
    },
  });

  return code;
}

// Verify code
export async function verifyCode(email: string, code: string, type: string) {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      email: email.toLowerCase(),
      code,
      type,
    },
  });

  if (!verificationToken) {
    return { valid: false, error: 'Invalid code' };
  }

  if (verificationToken.expiresAt < new Date()) {
    // Delete expired code
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });
    return { valid: false, error: 'Code expired' };
  }

  return { valid: true, email: verificationToken.email, tokenId: verificationToken.id };
}

// Send password reset code email
export async function sendPasswordResetCodeEmail(email: string, code: string) {
  const mailOptions = {
    from: SMTP_FROM,
    to: email,
    subject: 'Password Reset Code - Nexus Tech Solutions',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #DB5858; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
            .code { font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; background-color: #fff; padding: 20px; border: 2px dashed #DB5858; border-radius: 5px; margin: 20px 0; }
            .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 15px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reset Your Password</h1>
            </div>
            <div class="content">
              <p>We received a request to reset your password. Your password reset code is:</p>
              <div class="code">${code}</div>
              <p>Enter this code to reset your password.</p>
              <div class="warning">
                <p><strong>Security Note:</strong> This code will expire in 10 minutes for security reasons.</p>
              </div>
              <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
            </div>
            <div class="footer">
              <p>Nexus Tech Solutions<br/>
              3305 S Mayhill Rd, STE 109, Denton, TX 76208</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending password reset code email:', error);
    return { success: false, error: 'Failed to send password reset code' };
  }
}

// Send password reset email (legacy - with URL)
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${SITE_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: SMTP_FROM,
    to: email,
    subject: 'Reset Your Password - Nexus Tech Solutions',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #DB5858; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
            .button { display: inline-block; background-color: #DB5858; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .warning { background-color: #fff3cd; border-left: 4px solid: #ffc107; padding: 10px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reset Your Password</h1>
            </div>
            <div class="content">
              <p>We received a request to reset your password for your Nexus Admin account.</p>
              <p>Click the button below to reset your password:</p>
              <center>
                <a href="${resetUrl}" class="button">Reset Password</a>
              </center>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #666;">${resetUrl}</p>
              <div class="warning">
                <p><strong>Security Note:</strong> This link will expire in 24 hours for security reasons.</p>
              </div>
              <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
              <p>For security reasons, we recommend changing your password regularly and using a strong, unique password.</p>
            </div>
            <div class="footer">
              <p>Nexus Tech Solutions<br/>
              3305 S Mayhill Rd, STE 109, Denton, TX 76208</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: 'Failed to send password reset email' };
  }
}

// Delete verification token after use
export async function deleteVerificationToken(tokenId: string) {
  await prisma.verificationToken.delete({
    where: { id: tokenId },
  });
}