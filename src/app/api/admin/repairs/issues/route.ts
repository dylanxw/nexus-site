import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all issues with their device mappings
export async function GET(request: NextRequest) {
  try {
    const issues = await prisma.repairIssue.findMany({
      include: {
        devices: {
          include: {
            device: true
          }
        }
      },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ issues });
  } catch (error) {
    console.error('Error fetching issues:', error);
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    );
  }
}

// POST - Create new issue
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, emoji, deviceIds } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    // Get the max order to add at the end
    const maxOrderIssue = await prisma.repairIssue.findFirst({
      orderBy: { order: 'desc' }
    });
    const newOrder = maxOrderIssue ? maxOrderIssue.order + 1 : 0;

    const issue = await prisma.repairIssue.create({
      data: {
        name,
        slug,
        emoji: emoji || '🔧',
        order: newOrder,
        devices: deviceIds && deviceIds.length > 0 ? {
          create: deviceIds.map((deviceId: string) => ({
            deviceId
          }))
        } : undefined
      },
      include: {
        devices: {
          include: {
            device: true
          }
        }
      }
    });

    return NextResponse.json({ issue });
  } catch (error) {
    console.error('Error creating issue:', error);
    return NextResponse.json(
      { error: 'Failed to create issue' },
      { status: 500 }
    );
  }
}

// PATCH - Update issue
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, emoji, deviceIds, order } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Issue ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name !== undefined) {
      updateData.name = name;
      updateData.slug = name.toLowerCase().replace(/\s+/g, '-');
    }
    if (emoji !== undefined) updateData.emoji = emoji;
    if (order !== undefined) updateData.order = order;

    // Handle device mappings
    if (deviceIds !== undefined) {
      // Delete existing mappings
      await prisma.repairDeviceIssue.deleteMany({
        where: { issueId: id }
      });

      // Create new mappings
      if (deviceIds.length > 0) {
        await prisma.repairDeviceIssue.createMany({
          data: deviceIds.map((deviceId: string) => ({
            issueId: id,
            deviceId
          }))
        });
      }
    }

    const issue = await prisma.repairIssue.update({
      where: { id },
      data: updateData,
      include: {
        devices: {
          include: {
            device: true
          }
        }
      }
    });

    return NextResponse.json({ issue });
  } catch (error) {
    console.error('Error updating issue:', error);
    return NextResponse.json(
      { error: 'Failed to update issue' },
      { status: 500 }
    );
  }
}

// DELETE - Delete issue
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Issue ID is required' },
        { status: 400 }
      );
    }

    await prisma.repairIssue.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting issue:', error);
    return NextResponse.json(
      { error: 'Failed to delete issue' },
      { status: 500 }
    );
  }
}
