import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * One-time cleanup endpoint to fix database records
 * This will:
 * 1. Delete records with invalid/missing model data
 * 2. Set empty network strings to "Carrier Locked"
 * 3. Fix any records that don't have proper network values
 * 4. Report on what was cleaned up
 */
export async function POST(request: NextRequest) {
  try {
    // First, delete records with invalid or empty model names
    const invalidModelRecords = await prisma.pricingData.findMany({
      where: {
        OR: [
          { model: "" },
          { modelName: "" },
          { storage: "" },
        ],
      },
    });

    console.log(`Found ${invalidModelRecords.length} records with invalid model data`);

    // Delete records that don't have proper model information
    const deleteInvalid = await prisma.pricingData.deleteMany({
      where: {
        OR: [
          { model: "" },
          { modelName: "" },
          { storage: "" },
        ],
      },
    });

    console.log(`Deleted ${deleteInvalid.count} invalid records`);

    // Find records with empty network values
    const emptyNetworkRecords = await prisma.pricingData.findMany({
      where: {
        network: "",
      },
    });

    console.log(`Found ${emptyNetworkRecords.length} records with empty network values`);

    // Update all empty network records to "Carrier Locked"
    const updateResult = await prisma.pricingData.updateMany({
      where: {
        network: "",
      },
      data: {
        network: "Carrier Locked",
      },
    });

    // Find any records with network values that aren't "Unlocked" or "Carrier Locked"
    const invalidNetworkRecords = await prisma.pricingData.findMany({
      where: {
        AND: [
          { network: { not: "Unlocked" } },
          { network: { not: "Carrier Locked" } },
        ],
      },
    });

    console.log(`Found ${invalidNetworkRecords.length} records with invalid network values`);

    // Fix any records with specific carrier names
    const carrierMappings = [
      { from: "Verizon", to: "Carrier Locked" },
      { from: "AT&T", to: "Carrier Locked" },
      { from: "T-Mobile", to: "Carrier Locked" },
      { from: "US Cellular", to: "Carrier Locked" },
      { from: "Other", to: "Carrier Locked" },
    ];

    let carrierFixCount = 0;
    for (const mapping of carrierMappings) {
      const result = await prisma.pricingData.updateMany({
        where: { network: mapping.from },
        data: { network: mapping.to },
      });
      carrierFixCount += result.count;
    }

    // Get summary of network distribution after cleanup
    const networkSummary = await prisma.pricingData.groupBy({
      by: ['network'],
      _count: true,
    });

    // Get summary of device types
    const deviceSummary = await prisma.pricingData.groupBy({
      by: ['deviceType'],
      _count: true,
    });

    return NextResponse.json({
      success: true,
      cleanup: {
        invalidRecordsDeleted: deleteInvalid.count,
        emptyNetworkFixed: updateResult.count,
        carrierSpecificFixed: carrierFixCount,
        totalFixed: deleteInvalid.count + updateResult.count + carrierFixCount,
      },
      summary: {
        networkDistribution: networkSummary.map(item => ({
          network: item.network,
          count: item._count
        })),
        deviceTypes: deviceSummary.map(item => ({
          deviceType: item.deviceType,
          count: item._count
        })),
        totalRecords: await prisma.pricingData.count(),
      },
      message: `Successfully cleaned up ${deleteInvalid.count + updateResult.count + carrierFixCount} records (${deleteInvalid.count} deleted, ${updateResult.count + carrierFixCount} fixed)`,
    });
  } catch (error) {
    console.error("Cleanup error details:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        error: "Failed to clean up pricing data",
        details: errorMessage
      },
      { status: 500 }
    );
  }
}