'use client';

/**
 * Global Error Handler
 * Catches React rendering errors and reports them to Sentry
 * https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
 */

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">
                Something went wrong
              </h1>
              <p className="text-gray-600">
                We've been notified about this issue and will fix it as soon as possible.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={reset}
                className="w-full"
                size="lg"
              >
                Try again
              </Button>

              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Go to homepage
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 rounded-lg bg-red-50 p-4 text-left">
                <summary className="cursor-pointer font-semibold text-red-900">
                  Error details (dev only)
                </summary>
                <pre className="mt-2 overflow-auto text-xs text-red-800">
                  {error.message}
                  {error.stack && `\n\n${error.stack}`}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
