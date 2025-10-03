import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

/**
 * Load margin settings from database
 */
export async function loadMarginSettings(): Promise<MarginSettings> {
  try {
    const settingRecord = await prisma.setting.findUnique({
      where: { key: "margin_settings_simple" }
    });

    if (settingRecord) {
      return JSON.parse(settingRecord.value);
    }

    return DEFAULT_MARGIN_SETTINGS;
  } catch (error) {
    console.error('Error loading margin settings:', error);
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
