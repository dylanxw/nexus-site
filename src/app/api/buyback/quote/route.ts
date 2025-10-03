import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  generateQuoteNumber,
  getQuoteExpirationDate,
} from "@/lib/pricing-calculator";
import {
  sendQuoteConfirmationEmail,
  sendAdminNotification,
} from "@/lib/backend/email-service";
import { quoteSubmissionSchema } from "@/lib/validations/buyback";
import { rateLimit, RateLimitPresets } from "@/lib/rate-limit";
import { logger, handleApiError } from "@/lib/logger";
import { z } from "zod";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  logger.apiRequest('POST', '/api/buyback/quote');

  // Apply rate limiting
  const rateLimitResult = await rateLimit(request, RateLimitPresets.QUOTE_SUBMISSION);
  if (rateLimitResult) {
    logger.warn('Rate limit exceeded for quote submission', 'BUYBACK');
    return rateLimitResult;
  }

  try {
    const body = await request.json();

    // Validate with Zod schema
    const validationResult = quoteSubmissionSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));

      logger.warn('Quote validation failed', 'BUYBACK', { errors });

      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors
        },
        { status: 400 }
      );
    }

    const {
      model,
      storage,
      network,
      condition,
      name,
      email,
      phone,
      offerPrice,
      atlasPrice,
    } = validationResult.data;

    // Generate quote details
    const quoteNumber = generateQuoteNumber();
    const expiresAt = getQuoteExpirationDate();
    const margin = atlasPrice - offerPrice;

    // Create the quote
    const quote = await prisma.quote.create({
      data: {
        quoteNumber,
        deviceType: "iPhone",
        model,
        storage,
        network,
        condition,
        atlasPrice,
        offerPrice,
        margin,
        customerName: name,
        customerEmail: email.toLowerCase(),
        customerPhone: phone,
        expiresAt,
        status: "PENDING",
      },
    });

    // Send confirmation email to customer
    try {
      await sendQuoteConfirmationEmail(quote);
      logger.emailSent(quote.customerEmail, 'Quote Confirmation', true);
    } catch (emailError) {
      logger.error('Failed to send customer confirmation email', 'BUYBACK', { quoteId: quote.id }, emailError as Error);
      // Don't fail the request if email fails - quote is still created
    }

    // Send notification to admin
    try {
      await sendAdminNotification(quote);
      logger.info('Admin notification sent', 'BUYBACK', { quoteId: quote.id });
    } catch (emailError) {
      logger.error('Failed to send admin notification', 'BUYBACK', { quoteId: quote.id }, emailError as Error);
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        quoteId: quote.id,
        action: "quote_created",
        description: `Quote ${quoteNumber} created for ${model} - ${offerPrice}`,
      },
    });

    logger.info('Quote created successfully', 'BUYBACK', {
      quoteNumber,
      model,
      offerPrice,
      customerEmail: email,
    });

    return NextResponse.json({
      success: true,
      quoteNumber,
      quoteId: quote.id,
      expiresAt,
    });
  } catch (error) {
    const errorResponse = handleApiError(error, 'Quote Creation', { model, storage });

    return NextResponse.json(
      { success: false, error: errorResponse.message },
      { status: errorResponse.status }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const quoteNumber = searchParams.get("quoteNumber");

    if (!quoteNumber) {
      return NextResponse.json(
        { success: false, error: "Quote number required" },
        { status: 400 }
      );
    }

    const quote = await prisma.quote.findUnique({
      where: { quoteNumber },
    });

    if (!quote) {
      return NextResponse.json(
        { success: false, error: "Quote not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      quote,
    });
  } catch (error) {
    console.error("Quote retrieval error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve quote" },
      { status: 500 }
    );
  }
}