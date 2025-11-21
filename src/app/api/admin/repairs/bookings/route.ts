import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Verify authentication and authorization
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    // Check user has appropriate role
    if (!['ADMIN', 'MANAGER', 'EMPLOYEE'].includes(session.role)) {
      return NextResponse.json(
        { error: 'Forbidden - Insufficient permissions' },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const requestType = searchParams.get('requestType');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (requestType) {
      where.requestType = requestType;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { bookingNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Fetch bookings with pagination
    const [bookings, total] = await Promise.all([
      prisma.repairBooking.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.repairBooking.count({ where }),
    ]);

    // Parse issues JSON for each booking with error handling
    const bookingsWithParsedIssues = bookings.map(booking => {
      let parsedIssues;
      try {
        parsedIssues = JSON.parse(booking.issues);
      } catch (error) {
        console.error(`Failed to parse issues for booking ${booking.id}:`, error);
        parsedIssues = [];
      }
      return {
        ...booking,
        issues: parsedIssues,
      };
    });

    return NextResponse.json({
      bookings: bookingsWithParsedIssues,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Verify authentication and authorization
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    // Check user has appropriate role
    if (!['ADMIN', 'MANAGER'].includes(session.role)) {
      return NextResponse.json(
        { error: 'Forbidden - Only managers and admins can update bookings' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, status, notes, staffNotes } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (staffNotes !== undefined) updateData.staffNotes = staffNotes;

    const booking = await prisma.repairBooking.update({
      where: { id },
      data: updateData,
    });

    // Parse issues with error handling
    let parsedIssues;
    try {
      parsedIssues = JSON.parse(booking.issues);
    } catch (error) {
      console.error(`Failed to parse issues for booking ${booking.id}:`, error);
      parsedIssues = [];
    }

    return NextResponse.json({
      success: true,
      booking: {
        ...booking,
        issues: parsedIssues,
      },
    });

  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
