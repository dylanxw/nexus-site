import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { storeCSRFToken } from '@/lib/csrf';

/**
 * Generate CSRF token
 * GET /api/csrf-token
 */
export async function GET(request: NextRequest) {
  // Generate a cryptographically secure random token
  const token = randomBytes(32).toString('hex');

  // Store token with 1 hour expiry
  const expiry = Date.now() + 60 * 60 * 1000;
  storeCSRFToken(token, expiry);

  return NextResponse.json({
    token,
    expiresIn: 3600, // seconds
  });
}
