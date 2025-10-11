import type { Metadata } from "next";
import { ReviewsHero } from "@/components/reviews/hero";
import { ReviewStats } from "@/components/reviews/review-stats";
import { GoogleReviews } from "@/components/reviews/google-reviews";
// import { TrustpilotReviews } from "@/components/reviews/trustpilot-reviews"; // Commented out until Trustpilot setup is complete
import { LeaveReviewCTA } from "@/components/reviews/leave-review-cta";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Customer Reviews | 4.9★ Device Repair Denton TX",
  description: "Read real customer reviews for Nexus Tech Solutions. 4.9/5 stars from 200+ verified customers. iPhone, Samsung, tablet, computer, and drone repair reviews in Denton, TX.",
  keywords: [
    "Nexus Tech Solutions reviews",
    "device repair reviews Denton TX",
    "iPhone repair reviews Denton",
    "Samsung repair reviews",
    "computer repair testimonials",
    "customer testimonials Denton",
    "Google reviews device repair",
    "phone repair reviews",
    "laptop repair reviews Denton",
    "drone repair reviews",
    "tablet repair reviews",
    "UNT repair reviews",
    "Denton TX repair shop reviews",
    "verified customer reviews",
    "5 star device repair",
  ],
  openGraph: {
    title: "Customer Reviews | 4.9★ Rated Device Repair in Denton, TX",
    description: "See why customers choose Nexus Tech Solutions for device repair in Denton. Read real reviews from satisfied customers.",
    url: `${siteConfig.url}/reviews`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Reviews | 4.9★ Rated Device Repair in Denton, TX",
    description: "4.9/5 stars from 200+ verified customers. Read real device repair reviews in Denton, TX.",
  },
  alternates: {
    canonical: `${siteConfig.url}/reviews`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ReviewsPage() {
  return (
    <main>
      <ReviewsHero />
      <ReviewStats />
      <GoogleReviews />
      {/* <TrustpilotReviews /> */} {/* Commented out until Trustpilot setup is complete */}
      <LeaveReviewCTA />
    </main>
  );
}