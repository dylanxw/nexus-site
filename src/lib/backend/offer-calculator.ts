import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { CONDITION_GRADE_MAP } from '@/lib/pricing-calculator';

type GradeType = 'gradeA' | 'gradeB' | 'gradeC' | 'gradeD' | 'gradeDOA';

interface MarginSettings {
  mode: 'percentage' | 'tiered';
  percentageMargins: {
    gradeA: number;
    gradeB: number;
    gradeC: number;
    gradeD: number;
    gradeDOA: number;
  };
  tieredMargins: {
    tier1: { min: number; max: number; gradeA: number; gradeB: number; gradeC: number; gradeD: number; gradeDOA: number };
    tier2: { min: number; max: number; gradeA: number; gradeB: number; gradeC: number; gradeD: number; gradeDOA: number };
    tier3: { min: number; max: number; gradeA: number; gradeB: number; gradeC: number; gradeD: number; gradeDOA: number };
    tier4: { min: number; max: number; gradeA: number; gradeB: number; gradeC: number; gradeD: number; gradeDOA: number };
    tier5: { min: number; max: number; gradeA: number; gradeB: number; gradeC: number; gradeD: number; gradeDOA: number };
  };
  seriesOverrides?: {
    [series: string]: {
      enabled: boolean;
      margins: {
        gradeA: number;
        gradeB: number;
        gradeC: number;
        gradeD: number;
        gradeDOA: number;
      };
    };
  };
}

const DEFAULT_MARGIN_SETTINGS: MarginSettings = {
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

// In-memory cache for margin settings — avoids a DB query on every single request
let marginCache: { data: MarginSettings; expiresAt: number } | null = null;
const MARGIN_CACHE_TTL_MS = 60 * 1000; // 1 minute

/**
 * Load margin settings from database (with in-memory cache)
 */
export async function loadMarginSettings(): Promise<MarginSettings> {
  // Return cached value if still fresh
  if (marginCache && Date.now() < marginCache.expiresAt) {
    return marginCache.data;
  }

  try {
    const settingRecord = await prisma.setting.findUnique({
      where: { key: "margin_settings_simple" }
    });

    const settings = settingRecord
      ? JSON.parse(settingRecord.value)
      : DEFAULT_MARGIN_SETTINGS;

    marginCache = { data: settings, expiresAt: Date.now() + MARGIN_CACHE_TTL_MS };
    return settings;
  } catch (error) {
    logger.error('Error loading margin settings', 'BUYBACK', {}, error as Error);
    return DEFAULT_MARGIN_SETTINGS;
  }
}

/**
 * Calculate offer price from Atlas price for a specific grade
 * @param atlasPrice - Atlas price for the grade
 * @param grade - Grade type
 * @param series - Series identifier from database (e.g., "17", "16", "SE")
 * @param marginSettings - Margin settings including series overrides
 */
export function calculateOfferPrice(
  atlasPrice: number,
  grade: GradeType,
  series: string | null,
  marginSettings: MarginSettings
): number {

  // Check for series-specific override first
  let marginsToUse = marginSettings.percentageMargins;
  if (series && marginSettings.seriesOverrides && marginSettings.seriesOverrides[series]?.enabled) {
    marginsToUse = marginSettings.seriesOverrides[series].margins;
  }

  // Calculate margin based on mode
  let margin = 0;

  if (marginSettings.mode === "percentage") {
    // Percentage mode: Simple percentage of Atlas price
    margin = atlasPrice * (marginsToUse[grade] / 100);
  } else {
    // Tiered mode: Find the right tier and use the dollar amount
    const tiers = marginSettings.tieredMargins;
    let tier = tiers.tier1;

    if (atlasPrice >= tiers.tier5.min) tier = tiers.tier5;
    else if (atlasPrice >= tiers.tier4.min) tier = tiers.tier4;
    else if (atlasPrice >= tiers.tier3.min) tier = tiers.tier3;
    else if (atlasPrice >= tiers.tier2.min) tier = tiers.tier2;
    else tier = tiers.tier1;

    margin = tier[grade];
  }

  // Calculate offer price
  return Math.max(0, atlasPrice - margin);
}

/**
 * Calculate all offer prices for a pricing record
 */
export async function calculateAllOfferPrices(pricingRecord: {
  priceGradeA: number | null;
  priceGradeB: number | null;
  priceGradeC: number | null;
  priceGradeD: number | null;
  priceDOA: number | null;
  series: string | null;
}): Promise<{
  offerGradeA: number | null;
  offerGradeB: number | null;
  offerGradeC: number | null;
  offerGradeD: number | null;
  offerDOA: number | null;
}> {
  const marginSettings = await loadMarginSettings();

  return {
    offerGradeA: pricingRecord.priceGradeA
      ? Math.round(calculateOfferPrice(pricingRecord.priceGradeA, 'gradeA', pricingRecord.series, marginSettings))
      : null,
    offerGradeB: pricingRecord.priceGradeB
      ? Math.round(calculateOfferPrice(pricingRecord.priceGradeB, 'gradeB', pricingRecord.series, marginSettings))
      : null,
    offerGradeC: pricingRecord.priceGradeC
      ? Math.round(calculateOfferPrice(pricingRecord.priceGradeC, 'gradeC', pricingRecord.series, marginSettings))
      : null,
    offerGradeD: pricingRecord.priceGradeD
      ? Math.round(calculateOfferPrice(pricingRecord.priceGradeD, 'gradeD', pricingRecord.series, marginSettings))
      : null,
    offerDOA: pricingRecord.priceDOA
      ? Math.round(calculateOfferPrice(pricingRecord.priceDOA, 'gradeDOA', pricingRecord.series, marginSettings))
      : null,
  };
}

/**
 * Recalculate offer prices for all pricing records in the database
 */
export async function recalculateAllOfferPrices(): Promise<{ updated: number }> {
  const marginSettings = await loadMarginSettings();

  const pricingRecords = await prisma.pricingData.findMany({
    where: { isActive: true }
  });

  let updated = 0;

  for (const record of pricingRecords) {
    const offers = await calculateAllOfferPrices(record);

    await prisma.pricingData.update({
      where: { id: record.id },
      data: {
        ...offers,
        offersCalculatedAt: new Date(),
      },
    });

    updated++;
  }

  return { updated };
}

/**
 * Calculate pricing for a quote request (server-side only)
 * This is the single source of truth for quote pricing
 * NEVER trust client-provided prices
 */
export async function calculateQuotePricing(params: {
  model: string;
  storage: string;
  network: string;
  condition: string;
}): Promise<{
  success: boolean;
  atlasPrice?: number;
  offerPrice?: number;
  margin?: number;
  marginPercentage?: string;
  isOverride?: boolean;
  isSeriesOverride?: boolean;
  error?: string;
}> {
  try {
    const { model, storage, network, condition } = params;

    type CustomerCondition = keyof typeof CONDITION_GRADE_MAP;

    // Map condition to Atlas grade
    const gradeField = CONDITION_GRADE_MAP[condition as CustomerCondition];
    if (!gradeField) {
      return { success: false, error: 'Invalid condition' };
    }

    // Map network to database format
    const networkForLookup = network === "Unlocked" ? "Unlocked" : "Carrier Locked";

    // Construct the model string for database lookup
    const fullModel = `${model} ${storage} ${networkForLookup}`;

    // Run pricing lookup and margin settings load in parallel
    // The margin cache usually hits, so this costs nothing extra on the happy path
    const [exactPricing, marginSettings] = await Promise.all([
      prisma.pricingData.findFirst({
        where: {
          model: fullModel,
          isActive: true,
        },
      }),
      loadMarginSettings(),
    ]);

    let pricing = exactPricing;

    // If exact match fails, try finding by modelName, storage, and network
    if (!pricing) {
      const modelPart = model.replace('iPhone ', '').trim();

      const allPricing = await prisma.pricingData.findMany({
        where: {
          storage: storage,
          network: networkForLookup,
          isActive: true,
        },
      });

      pricing = allPricing.find(p =>
        p.modelName.toLowerCase().includes(modelPart.toLowerCase())
      ) || null;
    }

    if (!pricing) {
      return {
        success: false,
        error: `Pricing not available for ${model} ${storage} ${network}`
      };
    }

    // Get the Atlas price for the specific condition
    const gradeValue = pricing[gradeField as keyof typeof pricing];

    // Runtime type validation
    if (typeof gradeValue !== 'number' || gradeValue === null || gradeValue === undefined) {
      return {
        success: false,
        error: 'Pricing not available for this condition'
      };
    }

    const atlasPrice: number = gradeValue;

    // Check for manual override first
    const overrideField = gradeField.replace('price', 'override') as keyof typeof pricing;
    const overridePrice = pricing[overrideField] as number | null;

    // If override exists, use it directly
    if (overridePrice !== null && overridePrice !== undefined) {
      return {
        success: true,
        atlasPrice,
        offerPrice: overridePrice,
        margin: atlasPrice - overridePrice,
        marginPercentage: (((atlasPrice - overridePrice) / atlasPrice) * 100).toFixed(1),
        isOverride: true,
      };
    }

    // Map grade field to grade name
    const gradeMap: { [key: string]: GradeType } = {
      priceGradeA: 'gradeA',
      priceGradeB: 'gradeB',
      priceGradeC: 'gradeC',
      priceGradeD: 'gradeD',
      priceDOA: 'gradeDOA'
    };

    const gradeName = gradeMap[gradeField];

    // Use database series field (not extracted from user input)
    const series = pricing.series;

    // Calculate offer price using centralized logic
    const offerPrice = Math.round(calculateOfferPrice(atlasPrice, gradeName, series, marginSettings));
    const margin = atlasPrice - offerPrice;

    // Check if series override was used
    const isSeriesOverride = !!(series && marginSettings.seriesOverrides?.[series]?.enabled);

    return {
      success: true,
      atlasPrice,
      offerPrice,
      margin,
      marginPercentage: ((margin / atlasPrice) * 100).toFixed(1),
      isSeriesOverride,
    };
  } catch (error) {
    logger.error('Error calculating quote pricing', 'BUYBACK', {}, error as Error);
    return {
      success: false,
      error: 'An error occurred while calculating pricing'
    };
  }
}
