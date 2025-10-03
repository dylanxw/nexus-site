import Papa from 'papaparse';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AtlasCSVRow {
  Model: string;
  'SWAP / HSO'?: string;
  'Grade A'?: string;
  'Grade B'?: string;
  'Grade C'?: string;
  'Grade D'?: string;
  'DOA'?: string;
}

/**
 * Parse Atlas Mobile CSV and update pricing database
 */
export async function parseAndUpdatePricing(csvContent: string): Promise<{
  recordsAdded: number;
  recordsUpdated: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let recordsAdded = 0;
  let recordsUpdated = 0;

  try {
    // Parse CSV content
    const result = Papa.parse<AtlasCSVRow>(csvContent, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
    });

    // Process each row
    for (const row of result.data) {
      try {
        // Skip rows without a model
        if (!row.Model || row.Model.trim() === '') continue;

        const model = row.Model.trim();

        // Skip header/information rows
        if (model.includes('Cracked') || model.includes('Degraded') || model.includes('Contact')) {
          continue;
        }

        // Extract device info from model string
        const deviceInfo = parseModelString(model);
        if (!deviceInfo) continue;

        // Parse prices
        const prices = {
          priceSwap: parsePrice(row['SWAP / HSO']),
          priceGradeA: parsePrice(row['Grade A']),
          priceGradeB: parsePrice(row['Grade B']),
          priceGradeC: parsePrice(row['Grade C']),
          priceGradeD: parsePrice(row['Grade D']),
          priceDOA: parsePrice(row['DOA']),
        };

        // Check if any prices exist
        if (Object.values(prices).every(p => p === null)) continue;

        // Upsert pricing data
        const existing = await prisma.pricingData.findFirst({
          where: {
            model: deviceInfo.fullModel,
            network: deviceInfo.network,
          },
        });

        if (existing) {
          await prisma.pricingData.update({
            where: { id: existing.id },
            data: {
              ...prices,
              lastUpdated: new Date(),
            },
          });
          recordsUpdated++;
        } else {
          await prisma.pricingData.create({
            data: {
              model: deviceInfo.fullModel,
              deviceType: deviceInfo.deviceType,
              modelName: deviceInfo.modelName,
              storage: deviceInfo.storage,
              network: deviceInfo.network,
              ...prices,
              crackedBack: deviceInfo.crackedBack,
              crackedLens: deviceInfo.crackedLens,
              isActive: true,
            },
          });
          recordsAdded++;
        }
      } catch (error) {
        errors.push(`Error processing row "${row.Model}": ${error}`);
      }
    }

    // Log the update
    await prisma.pricingUpdateLog.create({
      data: {
        source: 'manual',
        recordsAdded,
        recordsUpdated,
        status: errors.length > 0 ? 'partial' : 'success',
        error: errors.length > 0 ? errors.join('; ') : null,
      },
    });

  } catch (error) {
    errors.push(`CSV parsing error: ${error}`);
    await prisma.pricingUpdateLog.create({
      data: {
        source: 'manual',
        recordsAdded: 0,
        recordsUpdated: 0,
        status: 'failed',
        error: errors.join('; '),
      },
    });
  }

  return { recordsAdded, recordsUpdated, errors };
}

/**
 * Parse model string to extract device information
 */
function parseModelString(model: string): {
  fullModel: string;
  deviceType: string;
  modelName: string;
  storage: string;
  network: string;
  crackedBack?: number;
  crackedLens?: number;
} | null {
  // Remove extra spaces and normalize
  const normalized = model.replace(/\s+/g, ' ').trim();

  // iPhone pattern: "iPhone 17 Pro Max 256GB Unlocked"
  const iphoneMatch = normalized.match(/^(iPhone\s+[\w\s]+?)\s+(\d+(?:GB|TB))\s+(Unlocked|Carrier Locked|Verizon|AT&T|T-Mobile|US Cellular|Other)$/i);

  if (iphoneMatch) {
    const [, modelName, storage, network] = iphoneMatch;

    // Extract deduction values if mentioned in nearby rows
    let crackedBack: number | undefined;
    let crackedLens: number | undefined;

    // These would be parsed from header rows in the CSV
    if (modelName.includes('17 Pro Max')) {
      crackedBack = 215;
      crackedLens = 120;
    } else if (modelName.includes('17 Pro')) {
      crackedBack = 215;
      crackedLens = 120;
    } else if (modelName.includes('17 Air') || modelName.includes('17')) {
      crackedBack = 180;
      crackedLens = 100;
    } else if (modelName.includes('16 Pro Max')) {
      crackedBack = 180;
      crackedLens = 90;
    } else if (modelName.includes('16 Pro')) {
      crackedBack = 180;
      crackedLens = 90;
    } else if (modelName.includes('16 Plus') || modelName.includes('16')) {
      crackedBack = 120;
      crackedLens = 70;
    }

    return {
      fullModel: normalized,
      deviceType: 'iPhone',
      modelName: modelName.trim(),
      storage: storage.trim(),
      network: network.trim() === 'Carrier Locked' ? 'Carrier Locked' : network.trim(),
      crackedBack,
      crackedLens,
    };
  }

  // Add patterns for other device types as needed
  return null;
}

/**
 * Parse price string to number
 */
function parsePrice(priceStr: string | undefined): number | null {
  if (!priceStr) return null;

  // Remove $ and commas, then parse
  const cleaned = priceStr.replace(/[$,]/g, '').trim();
  const price = parseFloat(cleaned);

  return isNaN(price) ? null : price;
}

/**
 * Get pricing for a specific device configuration
 */
export async function getDevicePricing(
  model: string,
  storage: string,
  network: string
): Promise<{
  priceSwap?: number;
  priceGradeA?: number;
  priceGradeB?: number;
  priceGradeC?: number;
  priceGradeD?: number;
  priceDOA?: number;
  crackedBack?: number;
  crackedLens?: number;
} | null> {
  // Construct the full model string
  const fullModel = `${model} ${storage} ${network}`;

  const pricing = await prisma.pricingData.findFirst({
    where: {
      model: fullModel,
      isActive: true,
    },
  });

  if (!pricing) return null;

  return {
    priceSwap: pricing.priceSwap ?? undefined,
    priceGradeA: pricing.priceGradeA ?? undefined,
    priceGradeB: pricing.priceGradeB ?? undefined,
    priceGradeC: pricing.priceGradeC ?? undefined,
    priceGradeD: pricing.priceGradeD ?? undefined,
    priceDOA: pricing.priceDOA ?? undefined,
    crackedBack: pricing.crackedBack ?? undefined,
    crackedLens: pricing.crackedLens ?? undefined,
  };
}

/**
 * Check if pricing data needs update (older than 4 days)
 */
export async function needsPricingUpdate(): Promise<boolean> {
  const lastUpdate = await prisma.pricingUpdateLog.findFirst({
    where: { status: { in: ['success', 'partial'] } },
    orderBy: { executedAt: 'desc' },
  });

  if (!lastUpdate) return true;

  const daysSinceUpdate = (Date.now() - new Date(lastUpdate.executedAt).getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceUpdate >= 4;
}

/**
 * Load CSV from file path and update pricing
 */
export async function loadCSVFromPath(filePath: string): Promise<{
  success: boolean;
  message: string;
  details?: any;
}> {
  try {
    const fs = await import('fs/promises');
    const csvContent = await fs.readFile(filePath, 'utf-8');

    const result = await parseAndUpdatePricing(csvContent);

    return {
      success: result.errors.length === 0,
      message: `Added ${result.recordsAdded} new records, updated ${result.recordsUpdated} existing records`,
      details: result,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to load CSV: ${error}`,
    };
  }
}