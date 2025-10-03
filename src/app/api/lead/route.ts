import { NextRequest, NextResponse } from "next/server";
import { rateLimit, RateLimitPresets } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await rateLimit(request, RateLimitPresets.CONTACT_FORM);
  if (rateLimitResult) return rateLimitResult;

  try {
    const body = await request.json();
    const { type, ...data } = body;

    // Log the lead for now - in production, this would integrate with email service
    console.log(`New ${type} lead received:`, {
      timestamp: new Date().toISOString(),
      type,
      ...data,
    });

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // TODO: Store in database if needed
    // TODO: Send notification to business owner

    // For now, just return success
    // In production, you would:
    // 1. Validate the data more thoroughly
    // 2. Send an email notification to the business
    // 3. Optionally store in a database
    // 4. Send confirmation email to customer

    const leadData = {
      id: generateLeadId(),
      timestamp: new Date().toISOString(),
      type,
      ...data,
    };

    // Simulate email sending (replace with actual email service)
    await simulateEmailNotification(leadData);

    return NextResponse.json(
      {
        success: true,
        message: "Lead submitted successfully",
        leadId: leadData.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error processing lead:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process lead"
      },
      { status: 500 }
    );
  }
}

function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function simulateEmailNotification(leadData: Record<string, unknown>): Promise<void> {
  // This is a placeholder for actual email integration
  // In production, replace with actual email service like:
  // - SendGrid
  // - Resend
  // - Nodemailer with SMTP
  // - AWS SES

  console.log("📧 Email notification would be sent:");
  console.log(`To: ${process.env.NOTIFICATION_EMAIL || "owner@nexustechsolutions.com"}`);
  console.log(`Subject: New ${leadData.type} request from ${leadData.name}`);
  console.log("Body:", {
    leadId: leadData.id,
    timestamp: leadData.timestamp,
    name: leadData.name,
    phone: leadData.phone,
    details: leadData,
  });

  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: "Lead API endpoint - use POST to submit leads" },
    { status: 405 }
  );
}