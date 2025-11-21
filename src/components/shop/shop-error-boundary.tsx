'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Phone, RefreshCw } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ShopErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to console and error reporting service
    console.error('Shop error caught by boundary:', error, errorInfo);

    // You could send this to Sentry or another error tracking service
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     contexts: { react: errorInfo }
    //   });
    // }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    // Reload the page to get a fresh start
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[500px] flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-orange-600" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                Unable to Load Products
              </h2>
              <p className="text-gray-600">
                We're having trouble loading our inventory. This is usually temporary and can be fixed by refreshing the page.
              </p>
            </div>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-gray-100 rounded-lg p-3 text-left">
                <p className="text-xs font-mono text-gray-700">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Page
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full sm:w-auto"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call to Browse
                </a>
              </Button>
            </div>

            {/* Alternative Contact Info */}
            <div className="text-sm text-gray-500 pt-4 border-t">
              <p className="mb-2">Or visit us in person to browse our inventory:</p>
              <p className="font-medium text-gray-700">
                {siteConfig.address.street}
              </p>
              <p className="text-gray-700">
                {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
              </p>
              <p className="mt-2">
                Open {siteConfig.hours.weekday}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}