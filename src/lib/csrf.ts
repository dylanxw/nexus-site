/**
 * CSRF Token Management
 * Uses HMAC-signed tokens so verification doesn't require shared server-side state.
 * This works reliably across serverless invocations and server restarts.
 */

import { createHmac, randomBytes } from 'crypto';

// Secret used to sign tokens. Falls back to a random value per cold-start,
// which is fine — tokens issued before a restart simply expire naturally.
const CSRF_SECRET = process.env.CSRF_SECRET || randomBytes(32).toString('hex');

/**
 * Generate a new CSRF token.
 * The token format is: <random>.<expiry>.<signature>
 */
export function generateCSRFToken(expiryMs: number = 60 * 60 * 1000): string {
  const nonce = randomBytes(16).toString('hex');
  const expiry = Date.now() + expiryMs;
  const payload = `${nonce}.${expiry}`;
  const signature = createHmac('sha256', CSRF_SECRET)
    .update(payload)
    .digest('hex');
  return `${payload}.${signature}`;
}

/**
 * Store a new CSRF token (kept for backward compatibility — now a no-op)
 */
export function storeCSRFToken(_token: string, _expiryTime: number): void {
  // No-op: tokens are self-verifying via HMAC signature
}

/**
 * Verify CSRF token
 * Checks the HMAC signature and expiry embedded in the token itself.
 */
export function verifyCSRFToken(token: string | null): boolean {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [nonce, expiryStr, signature] = parts;
  if (!nonce || !expiryStr || !signature) return false;

  const expiry = Number(expiryStr);
  if (isNaN(expiry)) return false;

  // Check expiry
  if (Date.now() > expiry) return false;

  // Verify signature
  const payload = `${nonce}.${expiryStr}`;
  const expected = createHmac('sha256', CSRF_SECRET)
    .update(payload)
    .digest('hex');

  // Constant-time comparison to prevent timing attacks
  if (expected.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Get token count (for testing/debugging — always 0 with signed tokens)
 */
export function getTokenCount(): number {
  return 0;
}

/**
 * Clear all tokens (for testing — no-op with signed tokens)
 */
export function clearAllTokens(): void {
  // No-op: no server-side state to clear
}
