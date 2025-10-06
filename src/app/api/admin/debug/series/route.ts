import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdminAuth();
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unauthorized' },
      { status: error instanceof Error && error.message.includes('Forbidden') ? 403 : 401 }
    );
  }

  try {
    // Get sample records with series field
    const samples = await prisma.pricingData.findMany({
      where: {
        modelName: {
          contains: "17"
        }
      },
      select: {
        modelName: true,
        series: true,
        network: true,
        offerGradeA: true,
        priceGradeA: true,
      },
      take: 20,
    });

    return NextResponse.json({
      success: true,
      samples,
      count: samples.length,
    });
  } catch (error) {
    console.error("Debug series error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
