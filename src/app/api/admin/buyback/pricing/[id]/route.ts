import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/auth";

// PATCH - Update override prices for a pricing item
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminAuth();
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unauthorized' },
      { status: error instanceof Error && error.message.includes('Forbidden') ? 403 : 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { overrides, userId } = body;

    console.log("Updating overrides for ID:", id);
    console.log("Overrides data:", overrides);

    // Build the update object
    const updateData: any = {
      overrideSetAt: new Date(),
      overrideSetBy: userId || "system",
    };

    // Add any override values that were provided
    if (overrides.gradeA !== undefined) updateData.overrideGradeA = overrides.gradeA;
    if (overrides.gradeB !== undefined) updateData.overrideGradeB = overrides.gradeB;
    if (overrides.gradeC !== undefined) updateData.overrideGradeC = overrides.gradeC;
    if (overrides.gradeD !== undefined) updateData.overrideGradeD = overrides.gradeD;
    if (overrides.gradeDOA !== undefined) updateData.overrideDOA = overrides.gradeDOA;

    console.log("Update data:", updateData);

    const updated = await prisma.pricingData.update({
      where: { id },
      data: updateData,
    });

    console.log("Update successful");

    return NextResponse.json({
      success: true,
      pricing: updated,
    });
  } catch (error) {
    console.error("Error updating pricing overrides:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { success: false, error: "Failed to update overrides", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE - Clear specific override or all overrides
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminAuth();
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unauthorized' },
      { status: error instanceof Error && error.message.includes('Forbidden') ? 403 : 401 }
    );
  }

  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get("grade");

    const updateData: any = {};

    if (grade) {
      // Clear specific grade override
      switch (grade) {
        case "gradeA":
          updateData.overrideGradeA = null;
          break;
        case "gradeB":
          updateData.overrideGradeB = null;
          break;
        case "gradeC":
          updateData.overrideGradeC = null;
          break;
        case "gradeD":
          updateData.overrideGradeD = null;
          break;
        case "gradeDOA":
          updateData.overrideDOA = null;
          break;
      }
    } else {
      // Clear all overrides
      updateData.overrideGradeA = null;
      updateData.overrideGradeB = null;
      updateData.overrideGradeC = null;
      updateData.overrideGradeD = null;
      updateData.overrideDOA = null;
      updateData.overrideSetAt = null;
      updateData.overrideSetBy = null;
    }

    const updated = await prisma.pricingData.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      pricing: updated,
    });
  } catch (error) {
    console.error("Error clearing pricing overrides:", error);
    return NextResponse.json(
      { success: false, error: "Failed to clear overrides" },
      { status: 500 }
    );
  }
}
