import { prisma } from '@/lib/prisma';
import { calculateOfferPrice, loadMarginSettings } from './offer-calculator';
import { logger } from '@/lib/logger';

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

    // Load margin settings once for all calculations
    const marginSettings = await loadMarginSettings();

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
        // Use centralized calculation with database series field
        offerPrice = Math.round(calculateOfferPrice(atlasPrice, 'gradeA', record.series, marginSettings));
        logger.warn(`Missing cached offer price for ${record.model}`, 'PRICING', {
          model: record.model,
          calculated: offerPrice
        });
      }

      if (offerPrice > maxOfferPrice) {
        maxOfferPrice = offerPrice;
      }
    }

    return Math.round(maxOfferPrice);
  } catch (error) {
    logger.error(`Error getting max price`, 'PRICING', { modelName }, error as Error);
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
    logger.error('Error getting all iPhone max prices', 'PRICING', {}, error as Error);
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
    logger.error('Error getting max prices for models', 'PRICING', {}, error as Error);
    return {};
  }
}
