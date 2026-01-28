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
import { verifyCSRFToken } from "@/lib/csrf";

export async function POST(request: NextRequest) {
  logger.apiRequest('POST', '/api/sell-a-device/quote');

  // Verify CSRF token first
  const csrfToken = request.headers.get('X-CSRF-Token');
  if (!csrfToken || !verifyCSRFToken(csrfToken)) {
    logger.warn('Invalid CSRF token for quote submission', 'BUYBACK');
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid security token. Please refresh the page and try again.'
      },
      { status: 403 }
    );
  }

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
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.map(String).join('.'),
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
          customerName: name.split(/\s+/).map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
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

    // Activity log is now created in transaction above (no need to create again)

    logger.info('Quote created successfully', 'BUYBACK', {
      quoteNumber,
      model,
      offerPrice,
      customerEmail: email,
    });

    // Return response immediately — don't block on email delivery
    const response = NextResponse.json({
      success: true,
      quoteNumber,
      quoteId: quote.id,
      expiresAt,
      // Include quote details so the client can display confirmation instantly
      quote: {
        quoteNumber,
        model,
        storage,
        network,
        condition,
        offerPrice,
        customerName: name.split(/\s+/).map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
        customerEmail: email.toLowerCase(),
        customerPhone: phone,
        expiresAt,
        status: "PENDING",
      },
    });

    // Fire-and-forget: send emails in the background without blocking the response
    // Using waitUntil-style pattern — errors are logged but never block the user
    const sendEmails = async () => {
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
      }

      try {
        await sendAdminNotification(quote);
        logger.info('Admin notification sent', 'BUYBACK', { quoteId: quote.id });
      } catch (emailError) {
        logger.error('Failed to send admin notification', 'BUYBACK', { quoteId: quote.id }, emailError as Error);
      }

      if (!emailSent) {
        try {
          await sendAdminEmailFailureNotification(quote);
          logger.warn('Admin email failure notification sent', 'BUYBACK', { quoteId: quote.id });
        } catch (notifyError) {
          logger.error('Failed to send admin email failure notification', 'BUYBACK', { quoteId: quote.id }, notifyError as Error);
        }
      }
    };

    // Don't await — let emails send after the response is returned
    sendEmails().catch((err) => {
      logger.error('Background email sending failed', 'BUYBACK', { quoteId: quote.id }, err as Error);
    });

    return response;
  } catch (error) {
    const errorResponse = handleApiError(error, 'Quote Creation', {});

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

    // Remove sensitive business data before sending to client
    const {
      atlasPrice,  // Remove internal pricing
      margin,      // Remove business margins
      ...safeQuote
    } = quote;

    return NextResponse.json({
      success: true,
      quote: safeQuote,
    });
  } catch (error) {
    console.error("Quote retrieval error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve quote" },
      { status: 500 }
    );
  }
}