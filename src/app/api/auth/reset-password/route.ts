import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { createVerificationCode, sendPasswordResetCodeEmail, verifyCode, deleteVerificationToken } from '@/lib/email-verification';
import { z } from 'zod';

const requestResetSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
  newPassword: z.string().min(8),
});

// POST - Request password reset code
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = requestResetSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Don't reveal if user exists or not
    if (!user) {
      // Still return success to prevent email enumeration
      return NextResponse.json({
        success: true,
        message: 'If an account exists, a password reset code has been sent'
      });
    }

    // Generate and send code
    const code = await createVerificationCode(email, 'PASSWORD_RESET');
    await sendPasswordResetCodeEmail(email, code);

    // Log activity (no userId since not authenticated)
    await prisma.activityLog.create({
      data: {
        action: 'PASSWORD_RESET_REQUESTED',
        description: `Password reset requested for ${email}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'If an account exists, a password reset code has been sent'
    });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    return NextResponse.json(
      { error: 'Failed to request password reset' },
      { status: 500 }
    );
  }
}

// PATCH - Reset password with code
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = resetPasswordSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    const { email, code, newPassword } = validationResult.data;

    // Verify code
    const verification = await verifyCode(email, code, 'PASSWORD_RESET');

    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.error },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update password
    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Delete used token
    if (verification.tokenId) {
      await deleteVerificationToken(verification.tokenId);
    }

    // Invalidate all sessions for security
    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'PASSWORD_RESET',
        description: `Password reset completed for ${email}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
