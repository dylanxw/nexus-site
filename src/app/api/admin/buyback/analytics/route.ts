import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30d";

    // Calculate date range
    const now = new Date();
    let startDate = new Date();

    switch (range) {
      case "7d":
        startDate.setDate(now.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(now.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(now.getDate() - 90);
        break;
      case "all":
        startDate = new Date(0); // Beginning of time
        break;
    }

    // Fetch all quotes in range
    const quotes = await prisma.quote.findMany({
      where: {
        createdAt: { gte: startDate },
      },
    });

    // Calculate overview metrics
    const totalQuotes = quotes.length;
    const totalValue = quotes
      .filter((q) => q.status === "COMPLETED" || q.status === "PAID")
      .reduce((sum, q) => sum + q.offerPrice, 0);
    const avgQuoteValue = totalQuotes > 0 ? totalValue / totalQuotes : 0;
    const completedQuotes = quotes.filter(
      (q) => q.status === "COMPLETED" || q.status === "PAID"
    ).length;
    const conversionRate =
      totalQuotes > 0 ? (completedQuotes / totalQuotes) * 100 : 0;
    const totalMargin = quotes
      .filter((q) => q.status === "COMPLETED" || q.status === "PAID")
      .reduce((sum, q) => sum + q.margin, 0);

    // Calculate trends (compare to previous period)
    const previousPeriodStart = new Date(startDate);
    previousPeriodStart.setTime(
      startDate.getTime() - (now.getTime() - startDate.getTime())
    );

    const previousQuotes = await prisma.quote.findMany({
      where: {
        createdAt: {
          gte: previousPeriodStart,
          lt: startDate,
        },
      },
    });

    const previousTotalQuotes = previousQuotes.length;
    const previousTotalValue = previousQuotes
      .filter((q) => q.status === "COMPLETED" || q.status === "PAID")
      .reduce((sum, q) => sum + q.offerPrice, 0);
    const previousTotalMargin = previousQuotes
      .filter((q) => q.status === "COMPLETED" || q.status === "PAID")
      .reduce((sum, q) => sum + q.margin, 0);

    const quotesChange =
      previousTotalQuotes > 0
        ? ((totalQuotes - previousTotalQuotes) / previousTotalQuotes) * 100
        : 0;
    const valueChange =
      previousTotalValue > 0
        ? ((totalValue - previousTotalValue) / previousTotalValue) * 100
        : 0;
    const marginChange =
      previousTotalMargin > 0
        ? ((totalMargin - previousTotalMargin) / previousTotalMargin) * 100
        : 0;

    // Group by device type
    const deviceMap = new Map<
      string,
      { count: number; totalValue: number; avgValue: number }
    >();
    quotes.forEach((quote) => {
      const existing = deviceMap.get(quote.deviceType) || {
        count: 0,
        totalValue: 0,
        avgValue: 0,
      };
      existing.count++;
      if (quote.status === "COMPLETED" || quote.status === "PAID") {
        existing.totalValue += quote.offerPrice;
      }
      deviceMap.set(quote.deviceType, existing);
    });

    const byDevice = Array.from(deviceMap.entries()).map(([deviceType, data]) => ({
      deviceType,
      count: data.count,
      totalValue: data.totalValue,
      avgValue: data.count > 0 ? data.totalValue / data.count : 0,
    }));

    // Group by condition
    const conditionMap = new Map<string, number>();
    quotes.forEach((quote) => {
      conditionMap.set(quote.condition, (conditionMap.get(quote.condition) || 0) + 1);
    });

    const byCondition = Array.from(conditionMap.entries()).map(
      ([condition, count]) => ({
        condition,
        count,
        percentage: totalQuotes > 0 ? (count / totalQuotes) * 100 : 0,
      })
    );

    // Group by status
    const statusMap = new Map<string, number>();
    quotes.forEach((quote) => {
      statusMap.set(quote.status, (statusMap.get(quote.status) || 0) + 1);
    });

    const byStatus = Array.from(statusMap.entries()).map(([status, count]) => ({
      status,
      count,
      percentage: totalQuotes > 0 ? (count / totalQuotes) * 100 : 0,
    }));

    // Group by date (for trends chart)
    const dateMap = new Map<string, { count: number; value: number }>();
    quotes.forEach((quote) => {
      const date = quote.createdAt.toISOString().split("T")[0];
      const existing = dateMap.get(date) || { count: 0, value: 0 };
      existing.count++;
      if (quote.status === "COMPLETED" || quote.status === "PAID") {
        existing.value += quote.offerPrice;
      }
      dateMap.set(date, existing);
    });

    const recentQuotes = Array.from(dateMap.entries())
      .map(([date, data]) => ({
        date,
        count: data.count,
        value: data.value,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({
      overview: {
        totalQuotes,
        totalValue,
        avgQuoteValue,
        conversionRate,
        totalMargin,
      },
      trends: {
        quotesChange: Math.round(quotesChange),
        valueChange: Math.round(valueChange),
        marginChange: Math.round(marginChange),
      },
      byDevice,
      byCondition,
      byStatus,
      recentQuotes,
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
