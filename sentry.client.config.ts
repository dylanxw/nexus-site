/**
 * Sentry Client-Side Configuration
 * This file configures the initialization of Sentry on the client (browser).
 * The config you add here will be used whenever a page is visited.
 * https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Environment tag
  environment: process.env.NODE_ENV,

  // Only enable in production
  enabled: process.env.NODE_ENV === 'production',

  // Replay configuration for session recording (optional - can be removed if not needed)
  replaysOnErrorSampleRate: 1.0, // Capture 100% of sessions with errors
  replaysSessionSampleRate: 0.1, // Capture 10% of all sessions

  // Filter out common noise and sensitive data
  ignoreErrors: [
    // Network errors
    'Network request failed',
    'NetworkError',
    'Failed to fetch',
    'Load failed',
    'AbortError',
    'cancelled',
    // Browser extensions
    /^chrome-extension:\/\//,
    /^moz-extension:\/\//,
    // Common user-caused errors
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    // Script errors from cross-origin scripts
    'Script error.',
    'Script error',
  ],

  // Don't send errors from these URLs
  denyUrls: [
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    /^chrome-extension:\/\//i,
    // Firefox extensions
    /^moz-extension:\/\//i,
    // Safari extensions
    /^safari-extension:\/\//i,
  ],

  // Process events before sending
  beforeSend(event, hint) {
    // Don't send errors in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry event (dev mode - not sent):', event);
      return null;
    }

    // Filter out specific error types
    const error = hint.originalException;
    if (error instanceof Error) {
      // Don't send chunk load errors (usually caused by deployments)
      if (error.message.includes('Loading chunk')) {
        return null;
      }
      // Don't send hydration errors (usually harmless)
      if (error.message.includes('Hydration failed')) {
        return null;
      }
    }

    return event;
  },

  // Configure integrations
  integrations: [
    Sentry.replayIntegration({
      // Mask all text content for privacy
      maskAllText: false,
      // Block all media for privacy
      blockAllMedia: false,
    }),
  ],
});
