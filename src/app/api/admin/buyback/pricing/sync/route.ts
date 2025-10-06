import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateAllOfferPrices } from "@/lib/backend/offer-calculator";
import { requireAdminAuth } from "@/lib/auth";

/**
 * Sync pricing data from Atlas (Google Sheets)
 *
 * This endpoint fetches data from a publicly accessible Atlas pricing Google Sheet
 * and updates the PricingData table in the database.
 */
export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth();
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unauthorized' },
      { status: error instanceof Error && error.message.includes('Forbidden') ? 403 : 401 }
    );
  }

  const startTime = Date.now();

  try {
    const atlasSheetId = process.env.ATLAS_SHEET_ID;
    const atlasSheetName = process.env.ATLAS_SHEET_NAME || "iPhone Used";

    if (!atlasSheetId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing ATLAS_SHEET_ID environment variable",
        },
        { status: 500 }
      );
    }

    // Fetch CSV export directly - simpler than Visualization API
    const url = `https://docs.google.com/spreadsheets/d/${atlasSheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(atlasSheetName)}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Atlas sheet data");
    }

    const csvText = await response.text();

    // Parse CSV manually (simple comma-split since we know the format)
    const lines = csvText.split('\n');
    const rows: string[][] = lines.map(line => {
      // Handle quoted values with commas
      const values: string[] = [];
      let currentValue = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim());
      return values;
    });

    if (rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No data found in Atlas sheet",
      });
    }

    let skipped = 0;
    const validRecords: any[] = [];

    // Parse pricing helper
    const parsePrice = (value: string): number | null => {
      if (!value || value.trim() === "" || value.includes("#REF")) return null;
      const cleaned = value.replace(/[$,]/g, "").trim();
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? null : parsed;
    };

    // STEP 1: Parse and validate all rows (collect in memory)
    console.log('📊 Parsing CSV data...');
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      // Skip empty rows or header/comment rows
      if (!row[1] || row[1].includes("Model") || row[1].includes("Cracked") ||
          row[1].includes("Degraded") || row[1].includes("Contact") ||
          row[1].includes("Used") || row[1].includes("Prices for") ||
          row[1].length < 5) {
        skipped++;
        continue;
      }

      try {
        const modelStr = row[1].trim();

        // Skip if not iPhone or invalid format
        if (!modelStr.includes("iPhone") || !modelStr.match(/iPhone\s+\S+.*\d+(?:GB|TB)/i)) {
          skipped++;
          continue;
        }

        // Extract device info
        const storageMatch = modelStr.match(/(\d+(?:GB|TB))/i);
        const storage = storageMatch ? storageMatch[1] : "";
        const network = modelStr.toLowerCase().includes("unlocked") ? "Unlocked" : "Carrier Locked";

        // Extract model name
        let modelName = "";
        if (storage) {
          const beforeStorage = modelStr.split(storage)[0];
          modelName = beforeStorage.replace("iPhone", "").trim();
        } else {
          const parts = modelStr.split(" ");
          modelName = parts.slice(1, -2).join(" ").trim();
        }

        // Extract series
        let series: string | null = null;
        const seriesMatch = modelName.match(/^(\d+|SE|XS|XR|X)(?:\s|[A-Z]|$)/i);
        if (seriesMatch) {
          series = seriesMatch[1].toUpperCase();
        }

        // Skip if missing required data
        if (!storage || !modelName) {
          skipped++;
          continue;
        }

        // Build pricing data object
        const pricingData = {
          model: modelStr,
          deviceType: "iPhone",
          modelName,
          storage,
          network,
          series,
          priceSwap: parsePrice(row[2]),
          priceGradeA: parsePrice(row[3]),
          priceGradeB: parsePrice(row[4]),
          priceGradeC: parsePrice(row[5]),
          priceGradeD: parsePrice(row[6]),
          priceDOA: parsePrice(row[7]),
          crackedBack: null,
          crackedLens: null,
          lastUpdated: new Date(),
          isActive: true,
        };

        validRecords.push(pricingData);
      } catch (error) {
        console.error(`Error parsing row ${i}:`, error);
        skipped++;
      }
    }

    console.log(`✅ Parsed ${validRecords.length} valid records, skipped ${skipped} invalid rows`);

    // STEP 2: Fetch all existing records in one query
    console.log('🔍 Fetching existing records...');
    const existingRecords = await prisma.pricingData.findMany({
      where: {
        model: { in: validRecords.map(r => r.model) }
      },
      select: {
        model: true,
        network: true,
      }
    });

    // Create a Set for O(1) lookup
    const existingKeys = new Set(
      existingRecords.map(r => `${r.model}::${r.network}`)
    );

    console.log(`📦 Found ${existingRecords.length} existing records in database`);

    // STEP 3: Calculate offer prices for all records and batch upsert
    console.log('💰 Calculating offer prices and preparing batch operations...');

    const batchSize = 50; // Process in batches to avoid overwhelming the database
    let added = 0;
    let updated = 0;

    for (let i = 0; i < validRecords.length; i += batchSize) {
      const batch = validRecords.slice(i, i + batchSize);

      // Use transaction for batch operations
      await prisma.$transaction(async (tx) => {
        for (const record of batch) {
          const isExisting = existingKeys.has(`${record.model}::${record.network}`);

          // Calculate offer prices
          const offerPrices = await calculateAllOfferPrices({
            priceGradeA: record.priceGradeA,
            priceGradeB: record.priceGradeB,
            priceGradeC: record.priceGradeC,
            priceGradeD: record.priceGradeD,
            priceDOA: record.priceDOA,
            series: record.series,
          });

          // Upsert record
          await tx.pricingData.upsert({
            where: {
              model_network: {
                model: record.model,
                network: record.network,
              },
            },
            update: {
              ...record,
              ...offerPrices,
              offersCalculatedAt: new Date(),
            },
            create: {
              ...record,
              ...offerPrices,
              offersCalculatedAt: new Date(),
            },
          });

          if (isExisting) {
            updated++;
          } else {
            added++;
          }
        }
      });

      // Log progress
      console.log(`   Processed ${Math.min(i + batchSize, validRecords.length)}/${validRecords.length} records...`);
    }

    // Log the update
    await prisma.pricingUpdateLog.create({
      data: {
        source: "automated",
        recordsAdded: added,
        recordsUpdated: updated,
        status: "success",
      },
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    // Log summary to console
    console.log(`\n✅ Sync Complete:`);
    console.log(`   Added: ${added} new records`);
    console.log(`   Updated: ${updated} existing records`);
    console.log(`   Skipped: ${skipped} invalid rows`);
    console.log(`   Total synced: ${added + updated}`);
    console.log(`   Duration: ${duration}s\n`);

    return NextResponse.json({
      success: true,
      added,
      updated,
      skipped,
      total: added + updated,
      duration: `${duration}s`,
    });
  } catch (error) {
    console.error("Pricing sync error:", error);

    // Log the failed update
    try {
      await prisma.pricingUpdateLog.create({
        data: {
          source: "automated",
          recordsAdded: 0,
          recordsUpdated: 0,
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
        },
      });
    } catch (logError) {
      console.error("Failed to log pricing update:", logError);
    }

    return NextResponse.json(
      { success: false, error: "Failed to sync pricing data" },
      { status: 500 }
    );
  }
}
