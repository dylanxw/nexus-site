import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/auth";
import { logger } from "@/lib/logger";

/**
 * GET /api/admin/buyback/pricing/stats
 * Returns summary statistics for ALL pricing data (not paginated)
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
    // Get total counts
    const totalModels = await prisma.pricingData.count();
    const activeModels = await prisma.pricingData.count({ where: { isActive: true } });

    // Get count of models with overrides
    const overrideCount = await prisma.pricingData.count({
      where: {
        OR: [
          { overrideGradeA: { not: null } },
          { overrideGradeB: { not: null } },
          { overrideGradeC: { not: null } },
          { overrideGradeD: { not: null } },
          { overrideDOA: { not: null } },
        ]
      }
    });

    // Get last update timestamp
    const lastUpdated = await prisma.pricingData.findFirst({
      orderBy: { lastUpdated: 'desc' },
      select: { lastUpdated: true }
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalModels,
        activeModels,
        overrideCount,
        lastSync: lastUpdated?.lastUpdated || null,
      },
    });
  } catch (error) {
    logger.error("Pricing stats API error", "API", {}, error as Error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pricing statistics" },
      { status: 500 }
    );
  }
}
