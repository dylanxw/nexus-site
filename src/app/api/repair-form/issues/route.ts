import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Cache for 5 minutes
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const modelId = searchParams.get('model');

    if (!modelId) {
      return NextResponse.json(
        { error: 'Model parameter is required' },
        { status: 400 }
      );
    }

    // Check cache
    const cacheKey = `issues_${modelId}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data);
    }

    // Find the model and its issues
    const model = await prisma.repairModel.findUnique({
      where: { id: modelId },
      include: {
        issues: {
          include: {
            issue: true
          }
        }
      }
    });

    if (!model) {
      return NextResponse.json(
        { error: 'Model not found' },
        { status: 404 }
      );
    }

    // Format issues - filter for active issues only and sort by order
    const formattedIssues = model.issues
      .filter(({ issue }) => issue.active)
      .sort((a, b) => a.issue.order - b.issue.order)
      .map(({ issue }) => ({
        value: issue.slug,
        label: issue.name,
        emoji: issue.emoji
      }));

    const responseData = { issues: formattedIssues };

    // Update cache
    cache.set(cacheKey, {
      data: responseData,
      timestamp: Date.now()
    });

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching issues:', error);
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    );
  }
}
