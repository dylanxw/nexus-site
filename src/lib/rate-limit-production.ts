import { NextRequest, NextResponse } from 'next/server';

/**
 * Production-Ready Rate Limiting
 *
 * DEVELOPMENT: Uses in-memory store (fine for single process)
 * PRODUCTION: Uses database for persistence across server restarts
 *
 * For high-scale production with multiple servers, migrate to Upstash Redis:
 * https://upstash.com
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (development only)
const memoryStore: RateLimitStore = {};

// Cleanup old entries every 5 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now();
    Object.keys(memoryStore).forEach((key) => {
      if (memoryStore[key].resetTime < now) {
        delete memoryStore[key];
      }
    });
  }, 5 * 60 * 1000);
}

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests allowed in the window
}

/**
 * Get client identifier from request
 */
function getClientId(request: NextRequest): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare

  const ip = cfConnectingIp || forwarded?.split(',')[0] || realIp || 'anonymous';

  // Create unique key for this endpoint + IP
  const url = new URL(request.url);
  return `${ip}:${url.pathname}`;
}

/**
 * Database-backed rate limiting (production)
 * Uses SQLite for single-server deployments
 */
async function rateLimitDatabase(
  key: string,
  config: RateLimitConfig
): Promise<{ allowed: boolean; resetTime: number; remaining: number }> {
  const { prisma } = await import('@/lib/prisma');
  const now = Date.now();
  const resetTime = now + config.windowMs;

  try {
    // Try to get existing rate limit record
    const existing = await prisma.$queryRawUnsafe<Array<{ key: string; count: number; reset_time: number }>>(
      `SELECT key, count, reset_time FROM rate_limits WHERE key = ? LIMIT 1`,
      key
    );

    if (existing.length === 0) {
      // First request - create record
      await prisma.$executeRawUnsafe(
        `INSERT INTO rate_limits (key, count, reset_time) VALUES (?, 1, ?)`,
        key,
        resetTime
      );

      return {
        allowed: true,
        resetTime,
        remaining: config.maxRequests - 1
      };
    }

    const record = existing[0];

    // Check if window has expired
    if (now > record.reset_time) {
      // Reset window
      await prisma.$executeRawUnsafe(
        `UPDATE rate_limits SET count = 1, reset_time = ? WHERE key = ?`,
        resetTime,
        key
      );

      return {
        allowed: true,
        resetTime,
        remaining: config.maxRequests - 1
      };
    }

    // Increment counter
    const newCount = record.count + 1;
    await prisma.$executeRawUnsafe(
      `UPDATE rate_limits SET count = ? WHERE key = ?`,
      newCount,
      key
    );

    // Check if limit exceeded
    if (newCount > config.maxRequests) {
      return {
        allowed: false,
        resetTime: record.reset_time,
        remaining: 0
      };
    }

    return {
      allowed: true,
      resetTime: record.reset_time,
      remaining: config.maxRequests - newCount
    };
  } catch (error) {
    console.error('Database rate limiting error:', error);
    // Fallback to allow on error (fail open)
    return {
      allowed: true,
      resetTime,
      remaining: config.maxRequests
    };
  }
}

/**
 * In-memory rate limiting (development)
 */
function rateLimitMemory(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; resetTime: number; remaining: number } {
  const now = Date.now();
  const resetTime = now + config.windowMs;

  // Get or create rate limit entry
  if (!memoryStore[key]) {
    memoryStore[key] = {
      count: 1,
      resetTime,
    };
    return {
      allowed: true,
      resetTime,
      remaining: config.maxRequests - 1
    };
  }

  const entry = memoryStore[key];

  // Check if window has expired
  if (now > entry.resetTime) {
    entry.count = 1;
    entry.resetTime = resetTime;
    return {
      allowed: true,
      resetTime,
      remaining: config.maxRequests - 1
    };
  }

  // Increment counter
  entry.count++;

  // Check if limit exceeded
  if (entry.count > config.maxRequests) {
    return {
      allowed: false,
      resetTime: entry.resetTime,
      remaining: 0
    };
  }

  return {
    allowed: true,
    resetTime: entry.resetTime,
    remaining: config.maxRequests - entry.count
  };
}

/**
 * Production-ready rate limiting middleware
 * Automatically uses database in production, memory in development
 */
export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<NextResponse | null> {
  const key = getClientId(request);

  // Use database in production, memory in development
  const result = process.env.NODE_ENV === 'production'
    ? await rateLimitDatabase(key, config)
    : rateLimitMemory(key, config);

  // Add rate limit headers to all responses
  const headers = {
    'X-RateLimit-Limit': config.maxRequests.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.resetTime.toString(),
  };

  if (!result.allowed) {
    const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);

    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
        retryAfter,
      },
      {
        status: 429,
        headers: {
          ...headers,
          'Retry-After': retryAfter.toString(),
        },
      }
    );
  }

  // Request allowed - no response needed
  return null;
}

/**
 * Preset rate limit configurations
 */
export const RateLimitPresets = {
  // For quote submissions - prevent spam
  QUOTE_SUBMISSION: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 quotes per 15 min per IP
  },

  // For pricing requests - prevent scraping
  PRICING_REQUEST: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30, // 30 requests per minute per IP
  },

  // For general API requests
  GENERAL_API: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requests per minute per IP
  },

  // For lead/contact forms
  CONTACT_FORM: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 3, // 3 submissions per 15 min per IP
  },
} as const;

/**
 * Cleanup old rate limit records (run via cron)
 */
export async function cleanupRateLimits(): Promise<number> {
  if (process.env.NODE_ENV !== 'production') {
    return 0; // Only run in production
  }

  const { prisma } = await import('@/lib/prisma');
  const now = Date.now();

  try {
    const result = await prisma.$executeRawUnsafe(
      `DELETE FROM rate_limits WHERE reset_time < ?`,
      now
    );

    console.log(`Cleaned up ${result} expired rate limit records`);
    return result as number;
  } catch (error) {
    console.error('Rate limit cleanup error:', error);
    return 0;
  }
}
