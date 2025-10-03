import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const pricing = await prisma.pricingData.findMany({
      orderBy: [
        { deviceType: "asc" },
        { modelName: "asc" },
        { storage: "desc" },
      ],
    });

    return NextResponse.json({
      success: true,
      pricing,
    });
  } catch (error) {
    console.error("Pricing API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pricing data" },
      { status: 500 }
    );
  }
}
