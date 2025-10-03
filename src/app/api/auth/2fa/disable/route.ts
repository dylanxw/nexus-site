import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, verifyPassword } from '@/lib/auth';
import { z } from 'zod';

const disableSchema = z.object({
  password: z.string(),
});

// POST - Disable 2FA (requires password confirmation)
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();

    const body = await request.json();
    const validationResult = disableSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Password required' },
        { status: 400 }
      );
    }

    const { password } = validationResult.data;

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        password: true,
        twoFactorEnabled: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.twoFactorEnabled) {
      return NextResponse.json(
        { error: '2FA is not enabled' },
        { status: 400 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Disable 2FA
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
        backupCodes: null,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        action: '2FA_DISABLED',
        description: `2FA disabled for ${user.email}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: '2FA disabled successfully',
    });
  } catch (error) {
    console.error('Error disabling 2FA:', error);
    return NextResponse.json(
      { error: 'Failed to disable 2FA' },
      { status: 500 }
    );
  }
}