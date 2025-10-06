import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateQuoteNumber,
  getQuoteExpirationDate,
} from "@/lib/pricing-calculator";
import {
  sendQuoteConfirmationEmail,
  sendAdminNotification,
  sendAdminEmailFailureNotification,
} from "@/lib/backend/email-service";
import { calculateQuotePricing } from "@/lib/backend/offer-calculator";
import { quoteSubmissionSchema } from "@/lib/validations/buyback";
import { rateLimit, RateLimitPresets } from "@/lib/rate-limit-production";
import { logger, handleApiError } from "@/lib/logger";
import { z } from "zod";

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
    } = validationResult.data;

    // SECURITY: Calculate prices SERVER-SIDE (never trust client)
    logger.info('Calculating server-side pricing for quote', 'BUYBACK', {
      model,
      storage,
      network,
      condition
    });

    const pricingResult = await calculateQuotePricing({
      model,
      storage,
      network,
      condition
    });

    if (!pricingResult.success) {
      logger.warn('Server-side pricing calculation failed', 'BUYBACK', {
        error: pricingResult.error,
        model,
        storage,
        network,
        condition
      });

      return NextResponse.json(
        {
          success: false,
          error: pricingResult.error || 'Unable to calculate pricing for this configuration'
        },
        { status: 400 }
      );
    }

    const { atlasPrice, offerPrice, margin } = pricingResult;

    // Validate calculated prices
    if (!atlasPrice || !offerPrice || atlasPrice < 0 || offerPrice < 0) {
      logger.error('Invalid prices calculated', 'BUYBACK', {
        atlasPrice,
        offerPrice,
        margin
      });

      return NextResponse.json(
        { success: false, error: 'Invalid pricing calculated' },
        { status: 500 }
      );
    }

    // Generate quote details
    const quoteNumber = generateQuoteNumber();
    const expiresAt = getQuoteExpirationDate();

    // Create quote with transaction safety
    const quote = await prisma.$transaction(async (tx) => {
      // Create the quote
      const newQuote = await tx.quote.create({
        data: {
          quoteNumber,
          deviceType: "iPhone",
          model,
          storage,
          network,
          condition,
          atlasPrice: atlasPrice!,  // TypeScript: we validated above
          offerPrice: offerPrice!,
          margin: margin!,
          customerName: name,
          customerEmail: email.toLowerCase(),
          customerPhone: phone,
          expiresAt,
          status: "PENDING",
        },
      });

      // Create activity log (atomic with quote)
      await tx.activityLog.create({
        data: {
          quoteId: newQuote.id,
          action: "quote_created",
          description: `Quote ${quoteNumber} created for ${model} - $${offerPrice}`,
        },
      });

      return newQuote;
    });

    // Send confirmation email to customer
    let emailSent = false;
    try {
      emailSent = await sendQuoteConfirmationEmail(quote);
      if (emailSent) {
        logger.emailSent(quote.customerEmail, 'Quote Confirmation', true);
      } else {
        logger.warn('Quote confirmation email returned false', 'BUYBACK', { quoteId: quote.id });
      }
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

    // If customer email failed, send urgent notification to admin
    if (!emailSent) {
      try {
        await sendAdminEmailFailureNotification(quote);
        logger.warn('Admin email failure notification sent', 'BUYBACK', { quoteId: quote.id });
      } catch (notifyError) {
        logger.error('Failed to send admin email failure notification', 'BUYBACK', { quoteId: quote.id }, notifyError as Error);
      }
    }

    // Activity log is now created in transaction above (no need to create again)

    logger.info('Quote created successfully', 'BUYBACK', {
      quoteNumber,
      model,
      offerPrice,
      customerEmail: email,
      emailSent,
    });

    return NextResponse.json({
      success: true,
      quoteNumber,
      quoteId: quote.id,
      expiresAt,
      emailSent,
      ...((!emailSent) && {
        warning: 'Your quote was created successfully, but we had trouble sending the confirmation email. Please save your quote number or contact us directly.'
      })
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