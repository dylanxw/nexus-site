import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { generateSecret, generateQRCode, generateBackupCodes, hashBackupCode } from '@/lib/two-factor';

// POST - Generate 2FA secret and QR code
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { email: true, twoFactorEnabled: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.twoFactorEnabled) {
      return NextResponse.json(
        { error: '2FA is already enabled' },
        { status: 400 }
      );
    }

    // Generate secret
    const { secret, otpauthUrl } = generateSecret(user.email);

    // Generate QR code
    const qrCode = await generateQRCode(otpauthUrl!);

    // Generate backup codes
    const backupCodes = generateBackupCodes(8);
    const hashedBackupCodes = backupCodes.map(code => hashBackupCode(code));

    // Store the secret temporarily (not enabled yet)
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        twoFactorSecret: secret,
        backupCodes: JSON.stringify(hashedBackupCodes),
        twoFactorEnabled: false, // Not enabled until verified
      },
    });

    return NextResponse.json({
      secret,
      qrCode,
      backupCodes, // Only shown once
    });
  } catch (error) {
    console.error('Error setting up 2FA:', error);
    return NextResponse.json(
      { error: 'Failed to set up 2FA' },
      { status: 500 }
    );
  }
}