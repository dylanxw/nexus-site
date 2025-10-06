import { NextRequest, NextResponse } from "next/server";
import { calculateQuotePricing } from "@/lib/backend/offer-calculator";
import { rateLimit, RateLimitPresets } from "@/lib/rate-limit-production";
import { logger } from "@/lib/logger";

/**
 * Calculate pricing for a device configuration
 * Uses centralized pricing logic to ensure consistency with quotes
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await rateLimit(request, RateLimitPresets.PRICING_REQUEST);
  if (rateLimitResult) return rateLimitResult;

  try {
    const body = await request.json();
    const { model, storage, network, condition } = body;

    // Validate input
    if (!model || !storage || !network || !condition) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    logger.info('Pricing request', 'BUYBACK', {
      model,
      storage,
      network,
      condition
    });

    // Use centralized pricing calculation (single source of truth)
    const result = await calculateQuotePricing({
      model,
      storage,
      network,
      condition
    });

    if (!result.success) {
      // Clean error for production (no internal details)
      const cleanError = process.env.NODE_ENV === 'production'
        ? 'This device configuration is not available for purchase at this time.'
        : result.error;

      return NextResponse.json(
        {
          success: false,
          error: cleanError
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      atlasPrice: result.atlasPrice,
      offerPrice: result.offerPrice,
      margin: result.margin,
      marginPercentage: result.marginPercentage,
      isOverride: result.isOverride,
      isSeriesOverride: result.isSeriesOverride,
    });
  } catch (error) {
    logger.error("Pricing API error", 'BUYBACK', {}, error as Error);
    return NextResponse.json(
      { success: false, error: "An error occurred while calculating pricing" },
      { status: 500 }
    );
  }
}