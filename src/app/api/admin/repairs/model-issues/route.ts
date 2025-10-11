import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch issues for specific model(s)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const modelId = searchParams.get('modelId');
    const modelIds = searchParams.get('modelIds');

    // Batch request - fetch for multiple models
    if (modelIds) {
      const ids = modelIds.split(',');
      const allIssues = await prisma.repairModelIssue.findMany({
        where: {
          modelId: { in: ids }
        },
        include: {
          issue: true
        }
      });

      // Group by modelId
      const grouped = ids.reduce((acc, id) => {
        acc[id] = allIssues
          .filter(mi => mi.modelId === id)
          .map(mi => ({ issueId: mi.issueId, issue: mi.issue }));
        return acc;
      }, {} as Record<string, any[]>);

      return NextResponse.json({ modelIssues: grouped });
    }

    // Single model request
    if (!modelId) {
      return NextResponse.json(
        { error: 'Model ID or modelIds are required' },
        { status: 400 }
      );
    }

    const issues = await prisma.repairModelIssue.findMany({
      where: { modelId },
      include: {
        issue: true
      }
    });

    return NextResponse.json({ issues });
  } catch (error) {
    console.error('Error fetching model issues:', error);
    return NextResponse.json(
      { error: 'Failed to fetch model issues' },
      { status: 500 }
    );
  }
}

// POST - Update issues for a model
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { modelId, issueIds } = body;

    if (!modelId || !Array.isArray(issueIds)) {
      return NextResponse.json(
        { error: 'modelId and issueIds array are required' },
        { status: 400 }
      );
    }

    // Delete existing mappings
    await prisma.repairModelIssue.deleteMany({
      where: { modelId }
    });

    // Create new mappings
    if (issueIds.length > 0) {
      await prisma.repairModelIssue.createMany({
        data: issueIds.map(issueId => ({
          modelId,
          issueId
        }))
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating model issues:', error);
    return NextResponse.json(
      { error: 'Failed to update model issues' },
      { status: 500 }
    );
  }
}
