import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? (() => {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET environment variable is required in production');
    }
    return 'dev-jwt-secret-not-for-production-use';
  })()
);

// Add routes that need authentication
const protectedRoutes = [
  '/admin',
  '/api/admin',
];

// Routes that don't need authentication
const publicRoutes = [
  '/api/auth/login',
  '/login',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Function to add security headers to any response
  const addSecurityHeaders = (response: NextResponse) => {
    // Add comprehensive security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    // Only add HSTS in production
    if (process.env.NODE_ENV === 'production') {
      response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }

    // Content Security Policy - adjust based on your needs
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://vercel.live wss://ws-us3.pusher.com",
      "frame-src 'self' https://www.google.com https://vercel.live",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ];

    // Only enforce upgrade-insecure-requests in production
    if (process.env.NODE_ENV === 'production') {
      cspDirectives.push("upgrade-insecure-requests");
    }

    response.headers.set('Content-Security-Policy', cspDirectives.join('; '));
    return response;
  };

  // Check if route needs protection
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  if (!isProtectedRoute || isPublicRoute) {
    // For non-protected routes, just add security headers and continue
    const response = NextResponse.next();
    return addSecurityHeaders(response);
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get('nexus-admin-session');

  if (!sessionCookie) {
    // Redirect to login for web requests, return 401 for API requests
    if (pathname.startsWith('/api/')) {
      const errorResponse = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      return addSecurityHeaders(errorResponse);
    }
    const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
    return addSecurityHeaders(redirectResponse);
  }

  // Verify token
  try {
    const { payload } = await jwtVerify(sessionCookie.value, JWT_SECRET);

    // Add user info to headers for API routes
    if (pathname.startsWith('/api/')) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', payload.userId as string);
      requestHeaders.set('x-user-email', payload.email as string);
      requestHeaders.set('x-user-role', payload.role as string);

      const authenticatedResponse = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      return addSecurityHeaders(authenticatedResponse);
    }

    // For non-API protected routes, just pass through with security headers
    const response = NextResponse.next();
    return addSecurityHeaders(response);
  } catch {
    // Invalid token - clear cookie and redirect
    const errorResponse = pathname.startsWith('/api/')
      ? NextResponse.json({ error: 'Invalid session' }, { status: 401 })
      : NextResponse.redirect(new URL('/login', request.url));

    errorResponse.cookies.delete('nexus-admin-session');
    return addSecurityHeaders(errorResponse);
  }
}

export const config = {
  matcher: [
    // Match all routes to apply security headers
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};