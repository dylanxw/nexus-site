/**
 * Next.js Instrumentation File
 * Used for Sentry initialization on the server
 * https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Sentry = await import('@sentry/nextjs');

    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

      // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,

      // Environment
      environment: process.env.NODE_ENV,

      // Filter out common noise
      ignoreErrors: [
        'Network request failed',
        'NetworkError',
        'AbortError',
        'cancelled',
      ],

      // Don't send errors for development
      enabled: process.env.NODE_ENV === 'production',

      // Capture additional context
      beforeSend(event) {
        // Don't send sensitive data
        if (event.request) {
          delete event.request.cookies;
          delete event.request.headers;
        }
        return event;
      },
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    const Sentry = await import('@sentry/nextjs');

    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      debug: false,
      environment: process.env.NODE_ENV,
      enabled: process.env.NODE_ENV === 'production',
    });
  }
}

export async function onRequestError(
  error: Error,
  request: {
    path: string;
    method: string;
    headers?: Record<string, string | string[] | undefined>;
  },
  context: { routerKind: string; routePath: string; routeType: string }
) {
  if (process.env.NEXT_RUNTIME === 'nodejs' || process.env.NEXT_RUNTIME === 'edge') {
    const Sentry = await import('@sentry/nextjs');
    // Ensure headers is always defined for Sentry
    const requestWithHeaders = {
      ...request,
      headers: request.headers || {}
    };
    Sentry.captureRequestError(error, requestWithHeaders, context);
  }
}
