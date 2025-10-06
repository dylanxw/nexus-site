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
    const statusFilter = searchParams.get('status') || 'all';

    // Build where clause for search and filters
    const where: any = {};

    // Add search filter (searches across multiple fields)
    // Note: SQLite doesn't support mode: 'insensitive', but contains is case-insensitive by default
    if (search) {
      where.OR = [
        { quoteNumber: { contains: search } },
        { customerName: { contains: search } },
        { customerEmail: { contains: search } },
        { model: { contains: search } },
      ];
    }

    // Add status filter
    if (statusFilter !== 'all') {
      where.status = statusFilter;
    }

    // Get total count with filters applied
    const totalCount = await prisma.quote.count({ where });

    // Fetch paginated quotes with filters
    const quotes = await prisma.quote.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      quotes,
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
    logger.error("Quotes API error", "API", {}, error as Error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}
