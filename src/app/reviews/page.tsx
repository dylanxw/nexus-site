import { Metadata } from "next";
import { ReviewsHero } from "@/components/reviews/hero";
import { ReviewStats } from "@/components/reviews/review-stats";
import { GoogleReviews } from "@/components/reviews/google-reviews";
import { TrustpilotReviews } from "@/components/reviews/trustpilot-reviews";
import { LeaveReviewCTA } from "@/components/reviews/leave-review-cta";

export const metadata: Metadata = {
  title: "Customer Reviews | 4.9★ Rated Device Repair in Denton, TX | Nexus Tech Solutions",
  description: "Read real customer reviews for Nexus Tech Solutions. 4.9/5 stars from 200+ verified customers. iPhone, Samsung, tablet, computer, and drone repair reviews in Denton, TX.",
  keywords: "Nexus Tech Solutions reviews, device repair reviews Denton TX, iPhone repair reviews, Samsung repair reviews, customer testimonials, Google reviews, Trustpilot reviews",
  openGraph: {
    title: "Customer Reviews | 4.9★ Rated Device Repair in Denton, TX",
    description: "See why customers choose Nexus Tech Solutions for device repair in Denton. Read real reviews from satisfied customers.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Reviews | 4.9★ Rated Device Repair in Denton, TX",
    description: "4.9/5 stars from 200+ verified customers. Read real device repair reviews in Denton, TX.",
  },
  alternates: {
    canonical: "/reviews",
  },
};

export default function ReviewsPage() {
  return (
    <main>
      <ReviewsHero />
      <ReviewStats />
      <GoogleReviews />
      <TrustpilotReviews />
      <LeaveReviewCTA />
    </main>
  );
}