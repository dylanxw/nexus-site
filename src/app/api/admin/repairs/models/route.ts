import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch models for a brand
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brandId');

    const where: any = {};
    if (brandId) where.brandId = brandId;

    const models = await prisma.repairModel.findMany({
      where,
      include: {
        brand: {
          include: {
            device: true
          }
        }
      },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ models });
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}

// POST - Create new model
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, brandId } = body;

    if (!name || !brandId) {
      return NextResponse.json(
        { error: 'Name and brandId are required' },
        { status: 400 }
      );
    }

    // Check if model already exists for this brand
    const existing = await prisma.repairModel.findFirst({
      where: {
        name,
        brandId
      }
    });

    if (existing) {
      return NextResponse.json(
        { error: `Model "${name}" already exists for this brand` },
        { status: 409 }
      );
    }

    // Get the max order for this brand to add at the end
    const maxOrderModel = await prisma.repairModel.findFirst({
      where: { brandId },
      orderBy: { order: 'desc' }
    });
    const newOrder = maxOrderModel ? maxOrderModel.order + 1 : 0;

    const model = await prisma.repairModel.create({
      data: {
        name,
        brandId,
        order: newOrder,
      },
      include: {
        brand: {
          include: {
            device: true
          }
        }
      }
    });

    return NextResponse.json({ model });
  } catch (error) {
    console.error('Error creating model:', error);
    return NextResponse.json(
      { error: 'Failed to create model' },
      { status: 500 }
    );
  }
}

// PATCH - Update model
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, order } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Model ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (order !== undefined) updateData.order = order;

    const model = await prisma.repairModel.update({
      where: { id },
      data: updateData,
      include: {
        brand: {
          include: {
            device: true
          }
        }
      }
    });

    return NextResponse.json({ model });
  } catch (error) {
    console.error('Error updating model:', error);
    return NextResponse.json(
      { error: 'Failed to update model' },
      { status: 500 }
    );
  }
}

// DELETE - Delete model
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Model ID is required' },
        { status: 400 }
      );
    }

    await prisma.repairModel.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting model:', error);
    return NextResponse.json(
      { error: 'Failed to delete model' },
      { status: 500 }
    );
  }
}
