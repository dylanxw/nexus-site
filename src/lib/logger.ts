/**
 * Structured Logging Utility
 * Provides consistent logging across the application with different severity levels
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  metadata?: Record<string, any>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatLog(entry: LogEntry): string {
    const parts = [
      `[${entry.timestamp}]`,
      `[${entry.level}]`,
      entry.context ? `[${entry.context}]` : '',
      entry.message,
    ];

    return parts.filter(Boolean).join(' ');
  }

  private createEntry(
    level: LogLevel,
    message: string,
    context?: string,
    metadata?: Record<string, any>,
    error?: Error
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      metadata,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
    };
  }

  private write(entry: LogEntry): void {
    const formatted = this.formatLog(entry);

    // In development, use console with colors
    if (this.isDevelopment) {
      switch (entry.level) {
        case LogLevel.DEBUG:
          console.log('\x1b[36m%s\x1b[0m', formatted, entry.metadata || '');
          break;
        case LogLevel.INFO:
          console.info('\x1b[32m%s\x1b[0m', formatted, entry.metadata || '');
          break;
        case LogLevel.WARN:
          console.warn('\x1b[33m%s\x1b[0m', formatted, entry.metadata || '');
          if (entry.error) console.warn(entry.error);
          break;
        case LogLevel.ERROR:
        case LogLevel.FATAL:
          console.error('\x1b[31m%s\x1b[0m', formatted, entry.metadata || '');
          if (entry.error) console.error(entry.error);
          break;
      }
    } else {
      // In production, log as JSON for log aggregation services
      console.log(JSON.stringify(entry));

      // TODO: Send to external logging service (Sentry, LogRocket, etc.)
      // if (entry.level === LogLevel.ERROR || entry.level === LogLevel.FATAL) {
      //   // Send to Sentry or similar
      // }
    }
  }

  debug(message: string, context?: string, metadata?: Record<string, any>): void {
    if (this.isDevelopment) {
      this.write(this.createEntry(LogLevel.DEBUG, message, context, metadata));
    }
  }

  info(message: string, context?: string, metadata?: Record<string, any>): void {
    this.write(this.createEntry(LogLevel.INFO, message, context, metadata));
  }

  warn(
    message: string,
    context?: string,
    metadata?: Record<string, any>,
    error?: Error
  ): void {
    this.write(this.createEntry(LogLevel.WARN, message, context, metadata, error));
  }

  error(
    message: string,
    context?: string,
    metadata?: Record<string, any>,
    error?: Error
  ): void {
    this.write(this.createEntry(LogLevel.ERROR, message, context, metadata, error));
  }

  fatal(
    message: string,
    context?: string,
    metadata?: Record<string, any>,
    error?: Error
  ): void {
    this.write(this.createEntry(LogLevel.FATAL, message, context, metadata, error));
  }

  // Specialized methods for common use cases
  apiRequest(method: string, path: string, metadata?: Record<string, any>): void {
    this.info(`${method} ${path}`, 'API', metadata);
  }

  apiError(
    method: string,
    path: string,
    error: Error,
    metadata?: Record<string, any>
  ): void {
    this.error(`${method} ${path} failed`, 'API', metadata, error);
  }

  dbQuery(query: string, duration?: number): void {
    this.debug('Database query', 'DB', { query, duration });
  }

  emailSent(to: string, subject: string, success: boolean): void {
    if (success) {
      this.info('Email sent successfully', 'EMAIL', { to, subject });
    } else {
      this.error('Email failed to send', 'EMAIL', { to, subject });
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience function for API route error handling
export function handleApiError(
  error: unknown,
  context: string,
  metadata?: Record<string, any>
): { message: string; status: number } {
  if (error instanceof Error) {
    logger.error(`Unhandled error in ${context}`, context, metadata, error);

    // Don't expose internal errors to clients in production
    if (process.env.NODE_ENV === 'production') {
      return {
        message: 'An unexpected error occurred',
        status: 500,
      };
    }

    return {
      message: error.message,
      status: 500,
    };
  }

  logger.error(`Unknown error in ${context}`, context, {
    ...metadata,
    error: String(error),
  });

  return {
    message: 'An unexpected error occurred',
    status: 500,
  };
}
