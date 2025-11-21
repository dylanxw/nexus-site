'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class RepairFormErrorBoundary extends React.Component<Props, State> {
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
    console.error('Repair form error caught by boundary:', error, errorInfo);

    // You could send this to Sentry or another error tracking service
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     contexts: { react: errorInfo }
    //   });
    // }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    // Optionally clear localStorage to reset form state
    if (typeof window !== 'undefined') {
      localStorage.removeItem('repairFormData');
      localStorage.removeItem('repairFormExpiry');
    }
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
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                Something went wrong
              </h2>
              <p className="text-gray-600">
                We encountered an error loading the repair form. This is usually temporary and can be fixed by refreshing the page.
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
                Refresh Page
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full sm:w-auto"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us Instead
                </a>
              </Button>
            </div>

            {/* Alternative Contact Info */}
            <div className="text-sm text-gray-500 pt-4 border-t">
              <p>Need help right away?</p>
              <p className="font-medium text-gray-700">
                Call us at {siteConfig.phoneFormatted}
              </p>
              <p>
                Or visit us at {siteConfig.address.street}, {siteConfig.address.city}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}