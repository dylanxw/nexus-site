import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/auth";
import { logger } from "@/lib/logger";

/**
 * GET /api/admin/sell-a-device/quotes/stats
 * Returns summary statistics for ALL quotes (not paginated)
 * Used for dashboard summary cards
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth();
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unauthorized' },
      { status: error instanceof Error && error.message.includes('Forbidden') ? 403 : 401 }
    );
  }

  try {
    // Get counts by status (using valid QuoteStatus enum values)
    const totalQuotes = await prisma.quote.count();
    const pendingCount = await prisma.quote.count({ where: { status: 'PENDING' } });
    const acceptedCount = await prisma.quote.count({ where: { status: 'ACCEPTED' } });
    const completedCount = await prisma.quote.count({ where: { status: 'COMPLETED' } });
    const paidCount = await prisma.quote.count({ where: { status: 'PAID' } });
    const expiredCount = await prisma.quote.count({ where: { status: 'EXPIRED' } });
    const cancelledCount = await prisma.quote.count({ where: { status: 'CANCELLED' } });

    // Get total value and margin for completed/paid quotes
    const completedQuotes = await prisma.quote.findMany({
      where: {
        status: { in: ['COMPLETED', 'PAID'] }
      },
      select: {
        offerPrice: true,
        margin: true,
      }
    });

    const totalValue = completedQuotes.reduce((sum, q) => sum + q.offerPrice, 0);
    const totalMargin = completedQuotes.reduce((sum, q) => sum + q.margin, 0);
    const avgQuoteValue = completedQuotes.length > 0 ? totalValue / completedQuotes.length : 0;

    return NextResponse.json({
      success: true,
      stats: {
        totalQuotes,
        byStatus: {
          pending: pendingCount,
          accepted: acceptedCount,
          completed: completedCount,
          paid: paidCount,
          expired: expiredCount,
          cancelled: cancelledCount,
        },
        financial: {
          totalValue,
          totalMargin,
          avgQuoteValue,
        }
      },
    });
  } catch (error) {
    console.error("Quote stats API detailed error:", error);
    logger.error("Quote stats API error", "API", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, error as Error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch quote statistics", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
