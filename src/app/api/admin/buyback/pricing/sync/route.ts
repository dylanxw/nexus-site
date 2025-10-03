import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { calculateAllOfferPrices } from "@/lib/backend/offer-calculator";

const prisma = new PrismaClient();

/**
 * Sync pricing data from Atlas (Google Sheets)
 *
 * This endpoint fetches data from a publicly accessible Atlas pricing Google Sheet
 * and updates the PricingData table in the database.
 *
 * No authentication required since the sheet is public.
 */
export async function POST(request: NextRequest) {
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

    let added = 0;
    let updated = 0;
    let skipped = 0;

    // CSV structure: Col B (index 1) = Model, Col C (2) = SWAP, Col D (3) = Grade A,
    // Col E (4) = Grade B, Col F (5) = Grade C, Col G (6) = Grade D, Col H (7) = DOA
    // Process each row
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
        // Parse the model string (e.g., "iPhone 17 Pro Max 256GB Unlocked")
        const modelStr = row[1].trim();

        // Skip if model string doesn't contain iPhone
        if (!modelStr.includes("iPhone")) {
          skipped++;
          continue;
        }

        // Additional validation: must have a valid iPhone model pattern
        // Should contain "iPhone" followed by a model number/name and storage
        if (!modelStr.match(/iPhone\s+\S+.*\d+(?:GB|TB)/i)) {
          console.log(`Skipping invalid model format at row ${i}: "${modelStr}"`);
          skipped++;
          continue;
        }

        // Extract device info
        let deviceType = "iPhone";
        let modelName = "";
        let storage = "";
        let network = "";

        // Extract storage first (e.g., "256GB", "512GB", "1TB", "2TB")
        const storageMatch = modelStr.match(/(\d+(?:GB|TB))/i);
        storage = storageMatch ? storageMatch[1] : "";

        // Extract network status
        network = modelStr.toLowerCase().includes("unlocked") ? "Unlocked" : "Carrier Locked";

        // Extract model name - everything between "iPhone" and storage, trimmed
        // Examples:
        // "iPhone 17 Pro Max 256GB Unlocked" -> "17 Pro Max"
        // "iPhone SE (3rd Gen) 64GB Unlocked" -> "SE (3rd Gen)"
        // "iPhone 16 128GB Carrier Locked" -> "16"
        if (storage) {
          const beforeStorage = modelStr.split(storage)[0]; // "iPhone 17 Pro Max "
          modelName = beforeStorage.replace("iPhone", "").trim(); // "17 Pro Max"
        } else {
          // Fallback if no storage found
          const parts = modelStr.split(" ");
          // Remove "iPhone" and network status
          modelName = parts.slice(1, -2).join(" ").trim();
        }

        // Extract series for series override functionality
        // This is just the numeric/base part (e.g., "17", "16", "SE", "X", "7")
        // Ignores suffixes like "E", "Plus", "Pro", etc.
        let series: string | null = null;
        const seriesMatch = modelName.match(/^(\d+|SE|XS|XR|X)(?:\s|[A-Z]|$)/i);
        if (seriesMatch) {
          series = seriesMatch[1].toUpperCase(); // Normalize to uppercase
        }

        // Log series extraction for first few iPhone 17 models
        if (modelName.includes('17') && added + updated < 5) {
          console.log(`Series extraction: "${modelName}" -> "${series}"`);
        }

        // Parse pricing data - remove $ and , then convert to number
        const parsePrice = (value: string): number | null => {
          if (!value || value.trim() === "" || value.includes("#REF")) return null;
          const cleaned = value.replace(/[$,]/g, "").trim();
          const parsed = parseFloat(cleaned);
          return isNaN(parsed) ? null : parsed;
        };

        // Column mapping for Atlas sheet:
        // Column B (index 1): Model
        // Column C (index 2): SWAP/HSO
        // Column D (index 3): Grade A
        // Column E (index 4): Grade B
        // Column F (index 5): Grade C
        // Column G (index 6): Grade D
        // Column H (index 7): DOA
        const pricingData = {
          model: modelStr,
          deviceType,
          modelName,
          storage,
          network,
          series, // Add series field for bulletproof series override matching
          priceSwap: parsePrice(row[2]), // Column C: SWAP/HSO
          priceGradeA: parsePrice(row[3]), // Column D: Grade A (was incorrectly row[2])
          priceGradeB: parsePrice(row[4]), // Column E: Grade B
          priceGradeC: parsePrice(row[5]), // Column F: Grade C
          priceGradeD: parsePrice(row[6]), // Column G: Grade D
          priceDOA: parsePrice(row[7]), // Column H: DOA
          crackedBack: null, // Not in the sheet directly
          crackedLens: null, // Not in the sheet directly
          lastUpdated: new Date(),
          isActive: true,
        };

        // Skip if we couldn't extract valid data
        if (!storage || !modelName) {
          console.log(`Skipping row ${i}: missing storage or modelName`, { modelStr, storage, modelName });
          skipped++;
          continue;
        }

        // Log first few records for debugging
        if (added + updated < 3) {
          console.log(`Processing row ${i}:`, {
            modelStr,
            deviceType,
            modelName,
            storage,
            network,
            priceGradeA: pricingData.priceGradeA,
          });
        }

        // Check if record exists before upserting
        const existing = await prisma.pricingData.findUnique({
          where: {
            model_network: {
              model: pricingData.model,
              network: pricingData.network,
            },
          },
        });

        // Calculate offer prices based on margins
        const offerPrices = await calculateAllOfferPrices({
          priceGradeA: pricingData.priceGradeA,
          priceGradeB: pricingData.priceGradeB,
          priceGradeC: pricingData.priceGradeC,
          priceGradeD: pricingData.priceGradeD,
          priceDOA: pricingData.priceDOA,
          series: pricingData.series,
        });

        // Upsert the pricing data with calculated offer prices
        await prisma.pricingData.upsert({
          where: {
            model_network: {
              model: pricingData.model,
              network: pricingData.network,
            },
          },
          update: {
            ...pricingData,
            ...offerPrices,
            offersCalculatedAt: new Date(),
          },
          create: {
            ...pricingData,
            ...offerPrices,
            offersCalculatedAt: new Date(),
          },
        });

        if (existing) {
          updated++;
        } else {
          added++;
        }
      } catch (error) {
        console.error(`Error processing row ${i}:`, error, row);
        skipped++;
        // Continue with next row
      }
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

    return NextResponse.json({
      success: true,
      added,
      updated,
      skipped,
      total: added + updated,
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
