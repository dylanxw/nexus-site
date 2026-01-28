import { NextResponse } from 'next/server';
import { generateCSRFToken } from '@/lib/csrf';

/**
 * Generate CSRF token
 * GET /api/csrf-token
 */
export async function GET() {
  const token = generateCSRFToken();

  return NextResponse.json({
    token,
    expiresIn: 3600, // seconds
  });
}
