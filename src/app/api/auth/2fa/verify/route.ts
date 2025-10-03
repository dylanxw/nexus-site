import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { verifyToken } from '@/lib/two-factor';
import { z } from 'zod';

const verifySchema = z.object({
  token: z.string().length(6),
});

// POST - Verify 2FA token and enable 2FA
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();

    const body = await request.json();
    const validationResult = verifySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 400 }
      );
    }

    const { token } = validationResult.data;

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        twoFactorSecret: true,
        twoFactorEnabled: true,
        email: true,
      },
    });

    if (!user || !user.twoFactorSecret) {
      return NextResponse.json(
        { error: '2FA not set up' },
        { status: 400 }
      );
    }

    // Verify the token
    const isValid = verifyToken(token, user.twoFactorSecret);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Enable 2FA
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        twoFactorEnabled: true,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        action: '2FA_ENABLED',
        description: `2FA enabled for ${user.email}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: '2FA enabled successfully',
    });
  } catch (error) {
    console.error('Error verifying 2FA:', error);
    return NextResponse.json(
      { error: 'Failed to verify 2FA' },
      { status: 500 }
    );
  }
}