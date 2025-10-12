import { z } from 'zod';

/**
 * Environment variable schema validation
 * Ensures all required environment variables are present and valid
 */
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // SMTP Configuration
  SMTP_HOST: z.string().min(1, 'SMTP_HOST is required'),
  SMTP_PORT: z.string().regex(/^\d+$/, 'SMTP_PORT must be a number'),
  SMTP_SECURE: z.enum(['true', 'false']).optional(),
  SMTP_USER: z.string().email('SMTP_USER must be a valid email'),
  SMTP_PASS: z.string().min(1, 'SMTP_PASS is required'),
  SMTP_FROM: z.string().email('SMTP_FROM must be a valid email').optional(),

  // Business Configuration
  BUSINESS_EMAIL: z.string().email('BUSINESS_EMAIL must be a valid email'),

  // Google Calendar
  GOOGLE_CALENDAR_ID: z.string().min(1, 'GOOGLE_CALENDAR_ID is required').optional(),
  GOOGLE_CLIENT_EMAIL: z.string().email('GOOGLE_CLIENT_EMAIL must be a valid email').optional(),
  GOOGLE_PRIVATE_KEY: z.string().min(1, 'GOOGLE_PRIVATE_KEY is required').optional(),

  // Authentication
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters').optional(),
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL must be a valid URL').optional(),

  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Optional - Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

/**
 * Parse and validate environment variables
 * Throws if validation fails
 */
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missing = error.issues
        .filter((err: z.ZodIssue) => err.message.includes('required'))
        .map((err: z.ZodIssue) => err.path.join('.'));

      const invalid = error.issues
        .filter((err: z.ZodIssue) => !err.message.includes('required'))
        .map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`);

      let errorMessage = '\n❌ Environment variable validation failed:\n\n';

      if (missing.length > 0) {
        errorMessage += '  Missing required variables:\n';
        missing.forEach((key) => {
          errorMessage += `    - ${key}\n`;
        });
      }

      if (invalid.length > 0) {
        errorMessage += '\n  Invalid variables:\n';
        invalid.forEach((msg) => {
          errorMessage += `    - ${msg}\n`;
        });
      }

      errorMessage += '\n  Please check your .env file and ensure all required variables are set.\n';

      console.error(errorMessage);
      throw new Error('Environment validation failed. Check console for details.');
    }
    throw error;
  }
}

/**
 * Validated environment variables
 * Use this instead of process.env directly
 */
export const env = validateEnv();

/**
 * Check if running in production
 */
export const isProduction = env.NODE_ENV === 'production';

/**
 * Check if running in development
 */
export const isDevelopment = env.NODE_ENV === 'development';

/**
 * Check if running in test mode
 */
export const isTest = env.NODE_ENV === 'test';
