import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/auth";

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
    // Fetch buyback stats
    const totalQuotes = await prisma.quote.count();
    const pendingQuotes = await prisma.quote.count({
      where: { status: "PENDING" },
    });

    // Get start of today in UTC (midnight UTC)
    const nowUTC = new Date();
    const todayUTC = new Date(Date.UTC(nowUTC.getUTCFullYear(), nowUTC.getUTCMonth(), nowUTC.getUTCDate()));

    const completedToday = await prisma.quote.count({
      where: {
        status: { in: ["COMPLETED", "PAID"] },
        updatedAt: { gte: todayUTC },
      },
    });

    const completedQuotes = await prisma.quote.findMany({
      where: { status: { in: ["COMPLETED", "PAID"] } },
      select: { offerPrice: true },
    });

    const totalValue = completedQuotes.reduce(
      (sum, quote) => sum + quote.offerPrice,
      0
    );

    // Fetch inventory stats (from Google Sheets API)
    let inventoryStats = {
      totalItems: 0,
      availableItems: 0,
      draftItems: 0,
    };

    try {
      const inventoryResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/inventory`
      );
      if (inventoryResponse.ok) {
        const inventoryData = await inventoryResponse.json();
        const items = inventoryData.items || [];
        inventoryStats = {
          totalItems: items.length,
          availableItems: items.filter(
            (item: any) => item.websiteStatus === "available"
          ).length,
          draftItems: items.filter(
            (item: any) => !item.websiteStatus || item.websiteStatus === "draft"
          ).length,
        };
      }
    } catch (error) {
      console.error("Error fetching inventory stats:", error);
    }

    return NextResponse.json({
      buyback: {
        totalQuotes,
        pendingQuotes,
        completedToday,
        totalValue,
      },
      inventory: inventoryStats,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
