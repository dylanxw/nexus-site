import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, deleteVerificationToken } from '@/lib/email-verification';
import { z } from 'zod';

const verifySchema = z.object({
  token: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = verifySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    const { token } = validationResult.data;

    // Verify the token
    const verification = await verifyToken(token, 'EMAIL_VERIFY');

    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.error },
        { status: 400 }
      );
    }

    // Update user's email verification status
    await prisma.user.update({
      where: { email: verification.email },
      data: { emailVerified: true },
    });

    // Delete the used token
    await deleteVerificationToken(verification.tokenId!);

    // Log activity
    const user = await prisma.user.findUnique({
      where: { email: verification.email },
      select: { id: true },
    });

    if (user) {
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'EMAIL_VERIFIED',
          description: `Email ${verification.email} verified`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
}