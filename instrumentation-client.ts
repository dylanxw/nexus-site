/**
 * Client-side Instrumentation File
 * Replaces sentry.client.config.ts for Next.js 15 + Turbopack compatibility
 * https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client
 */

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Replay sampling rates
  replaysOnErrorSampleRate: 1.0, // Capture 100% of sessions with errors
  replaysSessionSampleRate: 0.1, // Capture 10% of all sessions for replay

  // Session Replay integration
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Environment
  environment: process.env.NODE_ENV,

  // Filter out common noise
  ignoreErrors: [
    // Browser extensions
    /extensions\//i,
    /^Non-Error promise rejection captured/i,
    // Network errors
    'Network request failed',
    'NetworkError',
    // Aborted requests
    'AbortError',
    'cancelled',
  ],

  // Don't send errors for development
  enabled: process.env.NODE_ENV === 'production',
});

// Export router transition hook for navigation instrumentation
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
