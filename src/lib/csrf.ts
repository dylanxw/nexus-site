/**
 * CSRF Token Management
 * Simple in-memory store for CSRF tokens
 * For production scale, consider Redis or database
 */

// Simple in-memory CSRF token store
const csrfTokens = new Map<string, number>();

// Clean up expired tokens every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [token, expiry] of csrfTokens.entries()) {
      if (now > expiry) {
        csrfTokens.delete(token);
      }
    }
  }, 10 * 60 * 1000);
}

/**
 * Store a new CSRF token
 */
export function storeCSRFToken(token: string, expiryTime: number): void {
  csrfTokens.set(token, expiryTime);
}

/**
 * Verify CSRF token
 * Used by API routes to validate requests
 */
export function verifyCSRFToken(token: string | null): boolean {
  if (!token) return false;

  const expiry = csrfTokens.get(token);
  if (!expiry) return false;

  // Check if token is expired
  if (Date.now() > expiry) {
    csrfTokens.delete(token);
    return false;
  }

  // Token is valid - remove it (one-time use)
  csrfTokens.delete(token);
  return true;
}

/**
 * Get token count (for testing/debugging)
 */
export function getTokenCount(): number {
  return csrfTokens.size;
}

/**
 * Clear all tokens (for testing)
 */
export function clearAllTokens(): void {
  csrfTokens.clear();
}
