import { NextRequest, NextResponse } from 'next/server';
import { getAvailableTimeSlots } from '@/lib/google-calendar';

// Simple in-memory cache (5 minutes)
const cache = new Map<string, { slots: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');

    if (!dateParam) {
      return NextResponse.json(
        { error: 'Date parameter is required (format: YYYY-MM-DD)' },
        { status: 400 }
      );
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateParam)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    const date = new Date(dateParam + 'T00:00:00');

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date' },
        { status: 400 }
      );
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return NextResponse.json(
        { error: 'Cannot book appointments in the past' },
        { status: 400 }
      );
    }

    // Check cache
    const cacheKey = dateParam;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        date: dateParam,
        slots: cached.slots,
        cached: true,
      });
    }

    // Get available time slots
    const slots = await getAvailableTimeSlots(date);

    // Cache the result
    cache.set(cacheKey, {
      slots,
      timestamp: Date.now(),
    });

    // Clean up old cache entries
    for (const [key, value] of cache.entries()) {
      if (Date.now() - value.timestamp > CACHE_DURATION) {
        cache.delete(key);
      }
    }

    return NextResponse.json({
      date: dateParam,
      slots,
      cached: false,
    });

  } catch (error) {
    console.error('Error fetching availability:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch availability',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
