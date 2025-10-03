import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import crypto from 'crypto';

// Generate a new 2FA secret
export function generateSecret(email: string) {
  const secret = speakeasy.generateSecret({
    name: `Nexus Admin (${email})`,
    issuer: 'Nexus Tech Solutions',
    length: 32,
  });

  return {
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url,
  };
}

// Generate QR code for 2FA setup
export async function generateQRCode(otpauthUrl: string): Promise<string> {
  try {
    const qrCode = await QRCode.toDataURL(otpauthUrl);
    return qrCode;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

// Verify a TOTP token
export function verifyToken(token: string, secret: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2, // Allow 2 time steps for clock skew
  });
}

// Generate backup codes
export function generateBackupCodes(count: number = 8): string[] {
  const codes: string[] = [];

  for (let i = 0; i < count; i++) {
    // Generate a random 8-character alphanumeric code
    const code = crypto
      .randomBytes(6)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 8)
      .toUpperCase();
    codes.push(code);
  }

  return codes;
}

// Hash backup codes for storage
export function hashBackupCode(code: string): string {
  return crypto
    .createHash('sha256')
    .update(code)
    .digest('hex');
}

// Verify a backup code
export function verifyBackupCode(inputCode: string, storedCodes: string[]): boolean {
  const hashedInput = hashBackupCode(inputCode.toUpperCase());
  return storedCodes.includes(hashedInput);
}

// Remove used backup code
export function removeUsedBackupCode(usedCode: string, storedCodes: string[]): string[] {
  const hashedUsed = hashBackupCode(usedCode.toUpperCase());
  return storedCodes.filter(code => code !== hashedUsed);
}