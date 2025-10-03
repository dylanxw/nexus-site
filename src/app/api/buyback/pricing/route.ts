import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  CONDITION_GRADE_MAP,
  CustomerCondition,
} from "@/lib/pricing-calculator";
import { rateLimit, RateLimitPresets } from "@/lib/rate-limit";

const prisma = new PrismaClient();

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

    // Map condition to Atlas grade
    const gradeField = CONDITION_GRADE_MAP[condition as CustomerCondition];
    if (!gradeField) {
      return NextResponse.json(
        { success: false, error: "Invalid condition" },
        { status: 400 }
      );
    }

    // Map network selection to Atlas pricing structure
    // Atlas only has "Unlocked" and "Carrier Locked" pricing
    const networkForLookup = network === "Unlocked" ? "Unlocked" : "Carrier Locked";

    // Construct the model string for database lookup
    const fullModel = `${model} ${storage} ${networkForLookup}`;

    console.log('Pricing lookup:', {
      userNetwork: network,
      lookupNetwork: networkForLookup,
      fullModel,
      condition,
      gradeField
    });

    // Get pricing from database - try exact match first
    let pricing = await prisma.pricingData.findFirst({
      where: {
        model: fullModel,
        isActive: true,
      },
    });

    // If exact match fails, try finding by modelName, storage, and network
    if (!pricing) {
      console.log('Exact match failed, trying modelName search...');

      // Extract just the model number/name from the full model string
      const modelPart = model.replace('iPhone ', '').trim(); // "17 Air" from "iPhone 17 Air"

      // Get all potential matches
      const allPricing = await prisma.pricingData.findMany({
        where: {
          storage: storage,
          network: networkForLookup,
          isActive: true,
        },
      });

      // Find case-insensitive match in modelName
      pricing = allPricing.find(p =>
        p.modelName.toLowerCase().includes(modelPart.toLowerCase())
      ) || null;

      if (pricing) {
        console.log('Found with modelName search:', pricing.model);
      }
    }

    if (!pricing) {
      console.error('Pricing not found for:', fullModel);

      // List available models for debugging
      const availableModels = await prisma.pricingData.findMany({
        where: {
          modelName: {
            contains: model.replace('iPhone ', ''),
          },
          storage: storage,
        },
        select: {
          model: true,
          network: true,
        },
        take: 5,
      });

      console.log('Available similar models:', availableModels);

      return NextResponse.json(
        {
          success: false,
          error: `Pricing not available for ${model} ${storage} ${network}. Please try a different configuration.`,
          debug: {
            searched: fullModel,
            available: availableModels.map(m => m.model)
          }
        },
        { status: 404 }
      );
    }

    // Get the price for the specific condition
    const atlasPrice = pricing[gradeField as keyof typeof pricing] as number | null;

    if (!atlasPrice) {
      return NextResponse.json(
        { success: false, error: "Pricing not available for this condition" },
        { status: 404 }
      );
    }

    // Check for manual override first
    const overrideField = gradeField.replace('price', 'override') as keyof typeof pricing;
    const overridePrice = pricing[overrideField] as number | null;

    // If override exists, use it directly
    if (overridePrice !== null && overridePrice !== undefined) {
      return NextResponse.json({
        success: true,
        atlasPrice,
        offerPrice: overridePrice,
        margin: atlasPrice - overridePrice,
        marginPercentage: (((atlasPrice - overridePrice) / atlasPrice) * 100).toFixed(1),
        isOverride: true,
      });
    }

    // Get simplified margin settings
    let marginSettings: any = null;
    try {
      const settingRecord = await prisma.setting.findUnique({
        where: { key: "margin_settings_simple" }
      });

      if (settingRecord) {
        marginSettings = JSON.parse(settingRecord.value);
      }
    } catch (error) {
      console.log("Could not load margin settings, using defaults");
    }

    // Default settings if none configured
    if (!marginSettings) {
      marginSettings = {
        mode: "percentage",
        percentageMargins: {
          gradeA: 25,
          gradeB: 20,
          gradeC: 12,
          gradeD: 22,
          gradeDOA: 30,
        },
        tieredMargins: {
          tier1: { min: 0, max: 100, gradeA: 30, gradeB: 25, gradeC: 15, gradeD: 35, gradeDOA: 40 },
          tier2: { min: 100, max: 300, gradeA: 60, gradeB: 50, gradeC: 30, gradeD: 55, gradeDOA: 70 },
          tier3: { min: 300, max: 500, gradeA: 100, gradeB: 80, gradeC: 50, gradeD: 85, gradeDOA: 110 },
          tier4: { min: 500, max: 750, gradeA: 140, gradeB: 110, gradeC: 70, gradeD: 120, gradeDOA: 150 },
          tier5: { min: 750, max: 999999, gradeA: 180, gradeB: 150, gradeC: 90, gradeD: 150, gradeDOA: 180 },
        },
        seriesOverrides: {}
      };
    }

    // Extract iPhone series from model name (e.g., "iPhone 17 Pro" -> "17")
    const extractSeries = (modelName: string): string | null => {
      // Match patterns like "iPhone 17", "iPhone 16 Pro", "iPhone SE", "iPhone XS", etc.
      const match = modelName.match(/iPhone\s+(\d+|SE|XS|XR|X)/i);
      return match ? match[1] : null;
    };

    const series = extractSeries(model);
    console.log('Extracted series:', series, 'from model:', model);

    // Map grade field to grade name
    const gradeMap: { [key: string]: string } = {
      priceGradeA: 'gradeA',
      priceGradeB: 'gradeB',
      priceGradeC: 'gradeC',
      priceGradeD: 'gradeD',
      priceDOA: 'gradeDOA'
    };

    const gradeName = gradeMap[gradeField] as 'gradeA' | 'gradeB' | 'gradeC' | 'gradeD' | 'gradeDOA';

    // Check for series-specific override first
    let marginsToUse = marginSettings.percentageMargins;
    let isSeriesOverride = false;

    if (series && marginSettings.seriesOverrides && marginSettings.seriesOverrides[series]?.enabled) {
      marginsToUse = marginSettings.seriesOverrides[series].margins;
      isSeriesOverride = true;
      console.log('Using series override for iPhone', series, ':', marginsToUse);
    }

    // Calculate margin based on mode
    let margin = 0;

    if (marginSettings.mode === "percentage") {
      // Percentage mode: Simple percentage of Atlas price
      margin = atlasPrice * (marginsToUse[gradeName] / 100);
    } else {
      // Tiered mode: Find the right tier and use the dollar amount
      const tiers = marginSettings.tieredMargins;
      let tier = tiers.tier1;

      if (atlasPrice >= tiers.tier5.min) tier = tiers.tier5;
      else if (atlasPrice >= tiers.tier4.min) tier = tiers.tier4;
      else if (atlasPrice >= tiers.tier3.min) tier = tiers.tier3;
      else if (atlasPrice >= tiers.tier2.min) tier = tiers.tier2;
      else tier = tiers.tier1;

      margin = tier[gradeName];
    }

    // Calculate offer price
    const offerPrice = Math.max(0, atlasPrice - margin);

    return NextResponse.json({
      success: true,
      atlasPrice,
      offerPrice,
      margin,
      marginPercentage: ((margin / atlasPrice) * 100).toFixed(1),
      isSeriesOverride,
    });
  } catch (error) {
    console.error("Pricing API error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while calculating pricing" },
      { status: 500 }
    );
  }
}