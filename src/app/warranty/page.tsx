import type { Metadata } from "next";
import { WarrantyHero } from "@/components/warranty/hero";
import { WarrantyDetails } from "@/components/warranty/warranty-details";
import { WarrantyCTA } from "@/components/warranty/warranty-cta";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "60-Day Warranty Policy | Device Repair Denton TX",
  description: "Learn about our 60-day warranty on all repairs and device sales. We stand behind our work with comprehensive coverage. Parts, labor, no hidden fees.",
  keywords: [
    "warranty policy Denton TX",
    "60-day repair warranty",
    "device repair warranty",
    "electronics repair guarantee",
    "phone repair warranty Denton",
    "computer repair warranty",
    "repair warranty coverage",
    "1-year console warranty",
    "repair guarantee Denton",
    "warranty protection",
    "device warranty policy",
    "repair warranty terms",
    "iPhone repair warranty",
    "Samsung repair warranty",
    "laptop repair warranty"
  ],
  openGraph: {
    title: "60-Day Warranty Policy | Nexus Tech Solutions - Denton, TX",
    description: "Learn about our 60-day warranty coverage for repairs and device sales. We stand behind our work with comprehensive warranty protection.",
    url: `${siteConfig.url}/warranty`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "60-Day Warranty Policy | Device Repair Denton TX",
    description: "Learn about our 60-day warranty on all repairs and device sales. We stand behind our work with comprehensive coverage.",
  },
  alternates: {
    canonical: `${siteConfig.url}/warranty`,
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

export default function WarrantyPage() {
  return (
    <main>
      <WarrantyHero />
      <WarrantyDetails />
      <WarrantyCTA />
    </main>
  );
}
