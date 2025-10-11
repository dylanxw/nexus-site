import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all device types with their brands and models
export async function GET(request: NextRequest) {
  try {
    const devices = await prisma.repairDevice.findMany({
      include: {
        brands: {
          include: {
            models: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        },
        issues: {
          include: {
            issue: true
          }
        }
      },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ devices });
  } catch (error) {
    console.error('Error fetching devices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch devices' },
      { status: 500 }
    );
  }
}

// POST - Create new device type
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, icon, order, active } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    // Get the max order to add at the end
    const maxOrderDevice = await prisma.repairDevice.findFirst({
      orderBy: { order: 'desc' }
    });
    const newOrder = order !== undefined ? order : (maxOrderDevice ? maxOrderDevice.order + 1 : 0);

    const device = await prisma.repairDevice.create({
      data: {
        name,
        slug,
        icon: icon || 'Package',
        order: newOrder,
        active: active !== undefined ? active : true,
      },
      include: {
        brands: true,
        issues: true
      }
    });

    return NextResponse.json({ device });
  } catch (error) {
    console.error('Error creating device:', error);
    return NextResponse.json(
      { error: 'Failed to create device' },
      { status: 500 }
    );
  }
}

// PATCH - Update device type
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, icon, order, active } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Device ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name !== undefined) {
      updateData.name = name;
      updateData.slug = name.toLowerCase().replace(/\s+/g, '-');
    }
    if (icon !== undefined) updateData.icon = icon;
    if (order !== undefined) updateData.order = order;
    if (active !== undefined) updateData.active = active;

    const device = await prisma.repairDevice.update({
      where: { id },
      data: updateData,
      include: {
        brands: true,
        issues: true
      }
    });

    return NextResponse.json({ device });
  } catch (error) {
    console.error('Error updating device:', error);
    return NextResponse.json(
      { error: 'Failed to update device' },
      { status: 500 }
    );
  }
}

// DELETE - Delete device type
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Device ID is required' },
        { status: 400 }
      );
    }

    await prisma.repairDevice.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting device:', error);
    return NextResponse.json(
      { error: 'Failed to delete device' },
      { status: 500 }
    );
  }
}
