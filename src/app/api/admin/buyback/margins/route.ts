import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recalculateAllOfferPrices } from "@/lib/backend/offer-calculator";
import { requireAdminAuth } from "@/lib/auth";

const SETTINGS_KEY = "margin_settings_simple";

// GET margin settings
export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth(); // Require admin authentication
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unauthorized' },
      { status: error instanceof Error && error.message.includes('Forbidden') ? 403 : 401 }
    );
  }
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: SETTINGS_KEY },
    });

    if (setting) {
      return NextResponse.json({
        success: true,
        settings: JSON.parse(setting.value),
      });
    }

    // Return default settings if none exist
    const defaultSettings = {
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
      }
    };

    return NextResponse.json({
      success: true,
      settings: defaultSettings,
    });
  } catch (error) {
    console.error("Error fetching margin settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// POST (save) margin settings
export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth(); // Require admin authentication
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unauthorized' },
      { status: error instanceof Error && error.message.includes('Forbidden') ? 403 : 401 }
    );
  }

  try {
    const settings = await request.json();

    await prisma.setting.upsert({
      where: { key: SETTINGS_KEY },
      update: {
        value: JSON.stringify(settings),
        category: "pricing",
      },
      create: {
        key: SETTINGS_KEY,
        value: JSON.stringify(settings),
        category: "pricing",
      },
    });

    // Recalculate all offer prices with new margins
    console.log('Recalculating offer prices after margin update...');
    const result = await recalculateAllOfferPrices();
    console.log(`Recalculated ${result.updated} offer prices`);

    return NextResponse.json({
      success: true,
      message: "Settings saved successfully",
      recalculated: result.updated,
    });
  } catch (error) {
    console.error("Error saving margin settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save settings" },
      { status: 500 }
    );
  }
}