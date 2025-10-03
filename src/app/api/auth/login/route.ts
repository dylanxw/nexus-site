import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createSession, checkRateLimit } from '@/lib/auth';
import { verifyToken } from '@/lib/two-factor';
import { generateDeviceFingerprint, getDeviceInfo } from '@/lib/device-fingerprint';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  twoFactorToken: z.string().optional(),
  rememberDevice: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown';
    const userAgent = request.headers.get('user-agent') || undefined;

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid email or password format' },
        { status: 400 }
      );
    }

    const { email, password, twoFactorToken, rememberDevice } = validationResult.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Don't reveal if user exists
      await new Promise(resolve => setTimeout(resolve, 1000)); // Prevent timing attacks
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.active) {
      return NextResponse.json(
        { error: 'Your account has been deactivated. Please contact an administrator.' },
        { status: 403 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      // Log failed attempt
      await prisma.activityLog.create({
        data: {
          action: 'LOGIN_FAILED',
          description: `Failed login attempt for ${email}`,
          ipAddress: ip,
          userAgent,
        },
      });

      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if 2FA is enabled
    if (user.twoFactorEnabled) {
      // Generate device fingerprint
      const deviceFingerprint = generateDeviceFingerprint(userAgent || '', ip);

      // Check if this device is trusted
      const trustedDevice = await prisma.trustedDevice.findFirst({
        where: {
          userId: user.id,
          deviceFingerprint,
          expiresAt: {
            gte: new Date(), // Not expired
          },
        },
      });

      if (!trustedDevice) {
        // Device not trusted, require 2FA
        if (!twoFactorToken) {
          // Password is valid, but need 2FA token
          return NextResponse.json(
            {
              requires2FA: true,
              message: 'Please enter your 2FA code'
            },
            { status: 200 }
          );
        }

        // Verify 2FA token
        if (!user.twoFactorSecret) {
          return NextResponse.json(
            { error: '2FA is enabled but not properly configured' },
            { status: 500 }
          );
        }

        const is2FAValid = verifyToken(twoFactorToken, user.twoFactorSecret);

        if (!is2FAValid) {
          // Log failed 2FA attempt
          await prisma.activityLog.create({
            data: {
              userId: user.id,
              action: 'LOGIN_2FA_FAILED',
              description: `Failed 2FA verification for ${email}`,
              ipAddress: ip,
              userAgent,
            },
          });

          return NextResponse.json(
            { error: 'Invalid 2FA code' },
            { status: 401 }
          );
        }

        // 2FA verified, check if we should remember this device
        if (rememberDevice) {
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

          await prisma.trustedDevice.create({
            data: {
              userId: user.id,
              deviceFingerprint,
              deviceName: getDeviceInfo(userAgent),
              ipAddress: ip,
              expiresAt,
            },
          });

          // Log trusted device creation
          await prisma.activityLog.create({
            data: {
              userId: user.id,
              action: 'DEVICE_TRUSTED',
              description: `Device trusted for 7 days: ${getDeviceInfo(userAgent)}`,
              ipAddress: ip,
              userAgent,
            },
          });
        }
      } else {
        // Device is trusted, update last used
        await prisma.trustedDevice.update({
          where: { id: trustedDevice.id },
          data: { lastUsedAt: new Date() },
        });
      }
    }

    // Create session
    await createSession(user, ip, userAgent);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}