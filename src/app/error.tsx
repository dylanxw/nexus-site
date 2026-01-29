'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';
import { siteConfig } from '@/config/site';
import { AlertCircle, RefreshCw, Home, Phone } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error, {
      tags: {
        errorBoundary: 'app-error',
      },
      extra: {
        digest: error.digest,
      },
    });
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="max-w-lg w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="h-24 w-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-lg text-muted-foreground mb-6">
          We apologize for the inconvenience. An unexpected error has occurred. Our team has been notified and is working to fix the issue.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-6 p-4 bg-muted/50 rounded-lg text-left">
            <p className="text-sm font-mono text-muted-foreground break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>
        </div>

        {/* Support Information */}
        <div className="border-t pt-6">
          <p className="text-sm text-muted-foreground mb-4">
            If the problem persists, please contact us:
          </p>
          <div className="space-y-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center gap-2 text-primary hover:underline"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">{siteConfig.phoneFormatted}</span>
            </a>
            <p className="text-sm text-muted-foreground">
              {siteConfig.hours.display}
            </p>
            <p className="text-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-primary hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>

        {/* Alternative Actions */}
        <div className="mt-8 p-6 bg-muted/30 rounded-lg">
          <p className="text-sm font-medium mb-3">While we fix this, you can:</p>
          <ul className="text-sm text-left space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Visit us in person at {siteConfig.address.street}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Call us to schedule a repair or inquire about products</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Check back in a few minutes when the issue may be resolved</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}