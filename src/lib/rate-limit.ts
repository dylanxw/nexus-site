import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (for development/small scale)
// For production at scale, use Redis or Upstash
const rateLimitStore: RateLimitStore = {};

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(rateLimitStore).forEach((key) => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key];
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests allowed in the window
}

/**
 * Rate limiting middleware
 * @param request - Next.js request object
 * @param config - Rate limit configuration
 * @returns NextResponse if rate limited, null if allowed
 */
export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<NextResponse | null> {
  // Get client identifier (IP address or fallback)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'anonymous';

  // Create unique key for this endpoint + IP
  const url = new URL(request.url);
  const key = `${ip}:${url.pathname}`;

  const now = Date.now();
  const resetTime = now + config.windowMs;

  // Get or create rate limit entry
  if (!rateLimitStore[key]) {
    rateLimitStore[key] = {
      count: 1,
      resetTime,
    };
    return null; // First request, allow it
  }

  const entry = rateLimitStore[key];

  // Check if window has expired
  if (now > entry.resetTime) {
    entry.count = 1;
    entry.resetTime = resetTime;
    return null; // Reset window, allow it
  }

  // Increment counter
  entry.count++;

  // Check if limit exceeded
  if (entry.count > config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);

    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
        retryAfter,
      },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': config.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': entry.resetTime.toString(),
        },
      }
    );
  }

  // Add rate limit headers to response (for client info)
  return null; // Request allowed
}

/**
 * Preset rate limit configurations
 */
export const RateLimitPresets = {
  // For quote submissions - prevent spam
  QUOTE_SUBMISSION: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 quotes per 15 min
  },

  // For pricing requests - prevent scraping
  PRICING_REQUEST: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30, // 30 requests per minute
  },

  // For general API requests
  GENERAL_API: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requests per minute
  },

  // For lead/contact forms
  CONTACT_FORM: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 3, // 3 submissions per 15 min
  },
} as const;

/**
 * Helper to add rate limit headers to successful responses
 */
export function addRateLimitHeaders(
  response: NextResponse,
  request: NextRequest,
  config: RateLimitConfig
): NextResponse {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'anonymous';
  const url = new URL(request.url);
  const key = `${ip}:${url.pathname}`;

  const entry = rateLimitStore[key];

  if (entry) {
    const remaining = Math.max(0, config.maxRequests - entry.count);
    response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', entry.resetTime.toString());
  }

  return response;
}
