import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, verifyPassword, hashPassword } from '@/lib/auth';
import { createVerificationCode, sendPasswordResetCodeEmail, verifyCode, deleteVerificationToken } from '@/lib/email-verification';
import { z } from 'zod';

const requestChangeSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

const verifyChangeSchema = z.object({
  code: z.string().length(6),
  newPassword: z.string().min(8),
});

// POST - Request password change code
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await request.json();
    const validationResult = requestChangeSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid password format' },
        { status: 400 }
      );
    }

    const { oldPassword, newPassword } = validationResult.data;

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify old password
    const isValid = await verifyPassword(oldPassword, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        { error: 'Please verify your email before changing password' },
        { status: 400 }
      );
    }

    // Generate and send code
    const code = await createVerificationCode(user.email, 'PASSWORD_RESET');
    await sendPasswordResetCodeEmail(user.email, code);

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        action: 'PASSWORD_CHANGE_REQUESTED',
        description: `Password change code sent to ${user.email}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to your email'
    });
  } catch (error) {
    console.error('Error requesting password change:', error);
    return NextResponse.json(
      { error: 'Failed to request password change' },
      { status: 500 }
    );
  }
}

// PATCH - Verify code and change password
export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await request.json();
    const validationResult = verifyChangeSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    const { code, newPassword } = validationResult.data;

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify code
    const verification = await verifyCode(user.email, code, 'PASSWORD_RESET');

    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.error },
        { status: 400 }
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

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        action: 'PASSWORD_CHANGED',
        description: `Password changed successfully`,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    );
  }
}
