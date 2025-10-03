import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { createVerificationCode, sendVerificationCodeEmail, verifyCode, deleteVerificationToken } from '@/lib/email-verification';
import { z } from 'zod';

const sendCodeSchema = z.object({
  email: z.string().email(),
});

const verifyCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

// POST - Send verification code
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await request.json();
    const validationResult = sendCodeSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Generate and send code
    const code = await createVerificationCode(email, 'EMAIL_VERIFY');
    await sendVerificationCodeEmail(email, code);

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        action: 'EMAIL_VERIFICATION_SENT',
        description: `Verification code sent to ${email}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to email'
    });
  } catch (error) {
    console.error('Error sending verification code:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}

// PATCH - Verify code and update email
export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await request.json();
    const validationResult = verifyCodeSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid code format' },
        { status: 400 }
      );
    }

    const { email, code } = validationResult.data;

    // Verify code
    const verification = await verifyCode(email, code, 'EMAIL_VERIFY');

    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.error },
        { status: 400 }
      );
    }

    // Update user email and mark as verified
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        email: email.toLowerCase(),
        emailVerified: true,
      },
    });

    // Delete used token
    if (verification.tokenId) {
      await deleteVerificationToken(verification.tokenId);
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        action: 'EMAIL_VERIFIED',
        description: `Email verified and changed to ${email}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    );
  }
}
