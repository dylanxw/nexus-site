import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch brands for a device
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get('deviceId');

    const where: any = {};
    if (deviceId) where.deviceId = deviceId;

    const brands = await prisma.repairBrand.findMany({
      where,
      include: {
        device: true,
        models: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ brands });
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brands' },
      { status: 500 }
    );
  }
}

// POST - Create new brand
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, deviceId } = body;

    if (!name || !deviceId) {
      return NextResponse.json(
        { error: 'Name and deviceId are required' },
        { status: 400 }
      );
    }

    // Check if brand already exists for this device
    const existing = await prisma.repairBrand.findFirst({
      where: {
        name,
        deviceId
      }
    });

    if (existing) {
      return NextResponse.json(
        { error: `Brand "${name}" already exists for this device type` },
        { status: 409 }
      );
    }

    // Get the max order for this device to add at the end
    const maxOrderBrand = await prisma.repairBrand.findFirst({
      where: { deviceId },
      orderBy: { order: 'desc' }
    });
    const newOrder = maxOrderBrand ? maxOrderBrand.order + 1 : 0;

    const brand = await prisma.repairBrand.create({
      data: {
        name,
        deviceId,
        order: newOrder,
      },
      include: {
        device: true,
        models: true
      }
    });

    return NextResponse.json({ brand });
  } catch (error) {
    console.error('Error creating brand:', error);
    return NextResponse.json(
      { error: 'Failed to create brand' },
      { status: 500 }
    );
  }
}

// PATCH - Update brand
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, order } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Brand ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (order !== undefined) updateData.order = order;

    const brand = await prisma.repairBrand.update({
      where: { id },
      data: updateData,
      include: {
        device: true,
        models: true
      }
    });

    return NextResponse.json({ brand });
  } catch (error) {
    console.error('Error updating brand:', error);
    return NextResponse.json(
      { error: 'Failed to update brand' },
      { status: 500 }
    );
  }
}

// DELETE - Delete brand
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Brand ID is required' },
        { status: 400 }
      );
    }

    await prisma.repairBrand.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting brand:', error);
    return NextResponse.json(
      { error: 'Failed to delete brand' },
      { status: 500 }
    );
  }
}
