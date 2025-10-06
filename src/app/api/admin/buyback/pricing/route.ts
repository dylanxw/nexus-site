import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/auth";
import { logger } from "@/lib/logger";

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
    // Get pagination and search parameters from query string
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50'))); // Max 100 per page
    const skip = (page - 1) * limit;
    const search = searchParams.get('search') || '';

    // Build where clause for search
    const where: any = {};

    // Add search filter (searches across model and device type)
    // Note: SQLite doesn't support mode: 'insensitive', but contains is case-insensitive by default
    if (search) {
      where.OR = [
        { model: { contains: search } },
        { modelName: { contains: search } },
        { deviceType: { contains: search } },
      ];
    }

    // Get total count with filters applied
    const totalCount = await prisma.pricingData.count({ where });

    // Fetch paginated pricing data with filters
    const pricing = await prisma.pricingData.findMany({
      where,
      orderBy: [
        { deviceType: "asc" },
        { modelName: "asc" },
        { storage: "desc" },
      ],
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      pricing,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    logger.error("Pricing API error", "API", {}, error as Error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pricing data" },
      { status: 500 }
    );
  }
}
