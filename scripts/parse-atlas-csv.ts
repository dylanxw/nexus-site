import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

interface ParsedRow {
  model: string;
  swap?: number;
  gradeA?: number;
  gradeB?: number;
  gradeC?: number;
  gradeD?: number;
  doa?: number;
}

async function parseAtlasCSV() {
  try {
    console.log('🚀 Starting Atlas CSV import...');

    // Read CSV file
    const csvPath = path.join('C:', 'Users', 'dylan', 'Downloads', 'atlas-price-sheet.csv');
    const csvContent = await fs.readFile(csvPath, 'utf-8');

    // Split into lines and process
    const lines = csvContent.split('\n');
    const parsedDevices: ParsedRow[] = [];
    let crackedBackAmount = 0;
    let crackedLensAmount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Split by comma but handle values with commas inside quotes
      const cells = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
      const cleanCells = cells.map(cell => cell.replace(/^"|"$/g, '').trim());

      // Skip header rows and info rows
      if (i < 10) continue;
      if (cleanCells[0]?.includes('Model') ||
          cleanCells[0]?.includes('Degraded') ||
          cleanCells[0]?.includes('Cracked')) {

        // Extract deduction amounts from header rows
        if (cleanCells[0]?.includes('Cracked Back')) {
          const match = cleanCells[0].match(/Cracked Back = \$(\d+)/);
          if (match) crackedBackAmount = parseInt(match[1]);

          const lensMatch = cleanCells[0].match(/Cracked Lens = \$(\d+)/);
          if (lensMatch) crackedLensAmount = parseInt(lensMatch[1]);
        }
        continue;
      }

      // Parse device row
      const model = cleanCells[0];
      if (!model || model === '') continue;

      // Skip if it's not a device model
      if (!model.includes('iPhone') && !model.includes('iPad') && !model.includes('Galaxy')) {
        continue;
      }

      const row: ParsedRow = {
        model: model,
        swap: parsePrice(cleanCells[1]),
        gradeA: parsePrice(cleanCells[2]),
        gradeB: parsePrice(cleanCells[3]),
        gradeC: parsePrice(cleanCells[4]),
        gradeD: parsePrice(cleanCells[5]),
        doa: parsePrice(cleanCells[6]),
      };

      // Only add if we have at least one valid price
      if (row.swap || row.gradeA || row.gradeB || row.gradeC || row.gradeD || row.doa) {
        parsedDevices.push(row);
      }
    }

    console.log(`📱 Found ${parsedDevices.length} devices to import`);

    // Import to database
    let added = 0;
    let updated = 0;

    for (const device of parsedDevices) {
      try {
        // Parse device details
        const details = parseDeviceModel(device.model);
        if (!details) continue;

        // Check if exists
        const existing = await prisma.pricingData.findFirst({
          where: {
            model: device.model,
            network: details.network,
          },
        });

        const data = {
          model: device.model,
          deviceType: details.deviceType,
          modelName: details.modelName,
          storage: details.storage,
          network: details.network,
          priceSwap: device.swap || null,
          priceGradeA: device.gradeA || null,
          priceGradeB: device.gradeB || null,
          priceGradeC: device.gradeC || null,
          priceGradeD: device.gradeD || null,
          priceDOA: device.doa || null,
          crackedBack: details.crackedBack || null,
          crackedLens: details.crackedLens || null,
          isActive: true,
        };

        if (existing) {
          await prisma.pricingData.update({
            where: { id: existing.id },
            data: {
              ...data,
              lastUpdated: new Date(),
            },
          });
          updated++;
        } else {
          await prisma.pricingData.create({ data });
          added++;
        }
      } catch (error) {
        console.error(`Error processing ${device.model}:`, error);
      }
    }

    // Log the import
    await prisma.pricingUpdateLog.create({
      data: {
        source: 'manual',
        recordsAdded: added,
        recordsUpdated: updated,
        status: 'success',
      },
    });

    console.log(`\n✅ Import completed!`);
    console.log(`  📊 Records added: ${added}`);
    console.log(`  📊 Records updated: ${updated}`);

    // Show samples
    const samples = await prisma.pricingData.findMany({
      take: 5,
      where: {
        deviceType: 'iPhone',
      },
      orderBy: { lastUpdated: 'desc' },
    });

    if (samples.length > 0) {
      console.log('\n📱 Sample imported iPhones:');
      samples.forEach(device => {
        const price = device.priceGradeA || device.priceGradeB || device.priceGradeC;
        console.log(`  - ${device.model}: $${price || 'N/A'}`);
      });
    }

  } catch (error) {
    console.error('❌ Import failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function parsePrice(value: string | undefined): number | undefined {
  if (!value) return undefined;

  // Remove $ and commas, convert to number
  const cleaned = value.replace(/[$,]/g, '').trim();
  const num = parseFloat(cleaned);

  return isNaN(num) ? undefined : num;
}

function parseDeviceModel(modelString: string): {
  deviceType: string;
  modelName: string;
  storage: string;
  network: string;
  crackedBack?: number;
  crackedLens?: number;
} | null {
  // Handle iPhone models
  if (modelString.includes('iPhone')) {
    // Pattern: iPhone [Model] [Storage] [Network]
    const parts = modelString.split(' ');

    // Find storage (ends with GB or TB)
    let storageIndex = parts.findIndex(p => /^\d+(GB|TB)$/i.test(p));
    if (storageIndex === -1) return null;

    // Model name is everything before storage
    const modelName = parts.slice(0, storageIndex).join(' ');
    const storage = parts[storageIndex];

    // Network is everything after storage
    const network = parts.slice(storageIndex + 1).join(' ') || 'Unlocked';

    // Determine deductions based on model
    let crackedBack = 0;
    let crackedLens = 0;

    if (modelName.includes('17 Pro')) {
      crackedBack = 215;
      crackedLens = 120;
    } else if (modelName.includes('17')) {
      crackedBack = 180;
      crackedLens = 100;
    } else if (modelName.includes('16 Pro')) {
      crackedBack = 180;
      crackedLens = 90;
    } else if (modelName.includes('16')) {
      crackedBack = 120;
      crackedLens = 70;
    } else if (modelName.includes('15 Pro')) {
      crackedBack = 130;
      crackedLens = 80;
    } else if (modelName.includes('15')) {
      crackedBack = 120;
      crackedLens = 70;
    } else if (modelName.includes('14 Pro')) {
      crackedBack = 110;
      crackedLens = 70;
    } else if (modelName.includes('14')) {
      crackedBack = 50;
      crackedLens = 40;
    } else if (modelName.includes('13 Pro')) {
      crackedBack = 60;
      crackedLens = 40;
    } else if (modelName.includes('13')) {
      crackedBack = 50;
      crackedLens = 40;
    }

    return {
      deviceType: 'iPhone',
      modelName,
      storage,
      network,
      crackedBack: crackedBack || undefined,
      crackedLens: crackedLens || undefined,
    };
  }

  return null;
}

// Run the parser
parseAtlasCSV();