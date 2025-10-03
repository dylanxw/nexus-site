import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Calculate offer price from Atlas price using margin settings
 * This replicates the exact logic from /api/buyback/pricing
 */
async function calculateOfferPrice(atlasPrice: number, modelName: string): Promise<number> {
  try {
    // Load margin settings from database
    const settingRecord = await prisma.setting.findUnique({
      where: { key: "margin_settings_simple" }
    });

    let marginSettings: any = null;
    if (settingRecord) {
      marginSettings = JSON.parse(settingRecord.value);
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
      const match = modelName.match(/iPhone\s+(\d+|SE|XS|XR|X)/i);
      return match ? match[1] : null;
    };

    const series = extractSeries(modelName);

    // Check for series-specific override first
    let marginsToUse = marginSettings.percentageMargins;
    if (series && marginSettings.seriesOverrides && marginSettings.seriesOverrides[series]?.enabled) {
      marginsToUse = marginSettings.seriesOverrides[series].margins;
    }

    // Calculate margin based on mode
    let margin = 0;

    if (marginSettings.mode === "percentage") {
      // Percentage mode: Simple percentage of Atlas price
      margin = atlasPrice * (marginsToUse.gradeA / 100);
    } else {
      // Tiered mode: Find the right tier and use the dollar amount
      const tiers = marginSettings.tieredMargins;
      let tier = tiers.tier1;

      if (atlasPrice >= tiers.tier5.min) tier = tiers.tier5;
      else if (atlasPrice >= tiers.tier4.min) tier = tiers.tier4;
      else if (atlasPrice >= tiers.tier3.min) tier = tiers.tier3;
      else if (atlasPrice >= tiers.tier2.min) tier = tiers.tier2;
      else tier = tiers.tier1;

      margin = tier.gradeA;
    }

    // Calculate offer price
    return Math.max(0, atlasPrice - margin);
  } catch (error) {
    console.error('Error calculating offer price:', error);
    return atlasPrice; // Fallback to Atlas price if calculation fails
  }
}

/**
 * Calculate the maximum possible price for a given iPhone model
 * Uses cached offer prices from database for performance
 * Priority: Override > Cached Offer Price > Calculated (fallback)
 */
export async function getMaxPriceForModel(modelName: string): Promise<number> {
  try {
    // Extract model part (e.g., "17 Pro Max" from "iPhone 17 Pro Max")
    const modelPart = modelName.replace('iPhone ', '').trim();

    // Get all pricing records for this model
    // We'll filter for exact match in code since SQLite doesn't support case-insensitive equals
    const pricingRecords = await prisma.pricingData.findMany({
      where: {
        modelName: {
          contains: modelPart.split(' ')[0], // Use first word to narrow search (e.g., "17" from "17 Pro Max")
        },
        network: 'Unlocked', // Max price is always for unlocked
        isActive: true,
      },
    });

    if (pricingRecords.length === 0) {
      return 0;
    }

    // Filter for exact match (case-insensitive) to prevent "17 Pro" matching "17 Pro Max"
    const exactMatches = pricingRecords.filter(
      (record) => record.modelName.toLowerCase() === modelPart.toLowerCase()
    );

    if (exactMatches.length === 0) {
      return 0;
    }

    // Find the highest offer price across all storage options
    let maxOfferPrice = 0;

    for (const record of exactMatches) {
      let offerPrice = 0;

      // Priority 1: Check for manual override first
      if (record.overrideGradeA !== null && record.overrideGradeA !== undefined) {
        offerPrice = record.overrideGradeA;
      }
      // Priority 2: Use cached offer price if available
      else if (record.offerGradeA !== null && record.offerGradeA !== undefined) {
        offerPrice = record.offerGradeA;
      }
      // Priority 3: Calculate as fallback (shouldn't happen if sync/margins work correctly)
      else if (record.priceGradeA) {
        const atlasPrice = record.priceGradeA;
        offerPrice = await calculateOfferPrice(atlasPrice, modelName);
        console.warn(`Missing cached offer price for ${record.model}, calculated: ${offerPrice}`);
      }

      if (offerPrice > maxOfferPrice) {
        maxOfferPrice = offerPrice;
      }
    }

    return Math.round(maxOfferPrice);
  } catch (error) {
    console.error(`Error getting max price for ${modelName}:`, error);
    return 0;
  }
}

/**
 * Get max prices for all iPhone models
 * Returns a map of model name to max price
 */
export async function getAlliPhoneMaxPrices(): Promise<Map<string, number>> {
  try {
    // Get all unique iPhone models
    const models = await prisma.pricingData.findMany({
      where: {
        deviceType: 'iPhone',
        isActive: true,
      },
      select: {
        modelName: true,
      },
      distinct: ['modelName'],
    });

    const maxPrices = new Map<string, number>();

    // Calculate max price for each model (prepend "iPhone " to match full name)
    await Promise.all(
      models.map(async (model) => {
        const fullModelName = `iPhone ${model.modelName}`;
        const maxPrice = await getMaxPriceForModel(fullModelName);
        maxPrices.set(fullModelName, maxPrice);
      })
    );

    return maxPrices;
  } catch (error) {
    console.error('Error getting all iPhone max prices:', error);
    return new Map();
  }
}

/**
 * Get max prices for multiple specific models (optimized)
 * Uses the same logic as individual getMaxPriceForModel
 */
export async function getMaxPricesForModels(modelNames: string[]): Promise<Record<string, number>> {
  try {
    const maxPrices: Record<string, number> = {};

    // Calculate max price for each model using the same logic as single model lookup
    await Promise.all(
      modelNames.map(async (modelName) => {
        const maxPrice = await getMaxPriceForModel(modelName);
        maxPrices[modelName] = maxPrice;
      })
    );

    return maxPrices;
  } catch (error) {
    console.error('Error getting max prices for models:', error);
    return {};
  }
}
