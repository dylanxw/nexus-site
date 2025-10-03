import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { createVerificationToken, sendVerificationEmail } from '@/lib/email-verification';

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();

    // Generate verification token
    const token = await createVerificationToken(session.email, 'EMAIL_VERIFY');

    // Send verification email
    const result = await sendVerificationEmail(session.email, token);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send verification email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully',
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    );
  }
}