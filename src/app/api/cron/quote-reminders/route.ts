import { NextRequest, NextResponse } from 'next/server';
import { processEmailReminders } from '@/lib/backend/email-service';
import { logger } from '@/lib/logger';

/**
 * Cron job to process quote reminder emails
 * This endpoint should be called on a schedule (e.g., daily)
 *
 * Setup options:
 * 1. Vercel Cron Jobs (recommended for Vercel deployments)
 * 2. External cron service (e.g., cron-job.org, EasyCron)
 * 3. GitHub Actions scheduled workflow
 */

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      logger.warn('Unauthorized cron job attempt', 'CRON');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    logger.info('Starting quote reminder processing', 'CRON');

    // Process reminders and update expired quotes
    await processEmailReminders();

    logger.info('Quote reminder processing completed', 'CRON');

    return NextResponse.json({
      success: true,
      message: 'Quote reminders processed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(
      'Error processing quote reminders',
      'CRON',
      {},
      error as Error
    );

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process quote reminders',
      },
      { status: 500 }
    );
  }
}

// Also allow POST for some cron services
export async function POST(request: NextRequest) {
  return GET(request);
}
