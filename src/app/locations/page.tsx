import type { Metadata } from "next";
import { LocationsHero } from "@/components/locations/hero";
import { CurrentLocation } from "@/components/locations/current-location";
import { ServiceAreas } from "@/components/locations/service-areas";
import { WhyDenton } from "@/components/locations/why-denton";


import { siteConfig } from "@/config/site";
export const metadata: Metadata = {
  title: "Locations | Nexus Tech Solutions - Denton, TX Device Repair Shop",
  description: "Visit Nexus Tech Solutions in Denton, Texas for professional device repair, buying, and selling services. We're your local tech experts serving Denton County and surrounding North Texas areas.",
  keywords: [
    "Nexus Tech Solutions Denton TX",
    "device repair shop Denton Texas",
    "phone repair Denton",
    "computer repair Denton",
    "tablet repair Denton",
    "laptop repair Denton",
    "buy sell devices Denton",
    "electronics store Denton",
    "tech repair near me",
    "Denton County device repair",
    "North Texas phone repair",
    "UNT device repair",
    "Denton electronics",
    "cell phone repair Denton",
    "iPhone repair Denton TX",
    "Samsung repair Denton",
    "MacBook repair Denton",
    "gaming console repair Denton",
    "drone repair Denton Texas"
  ],
  openGraph: {
    title: "Locations | Nexus Tech Solutions - Denton, TX Device Repair Shop",
    description: "Visit our Denton, Texas location for expert device repair services. We buy, sell, and repair phones, computers, tablets, and more in Denton County.",
    url: `${siteConfig.url}/locations`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locations | Nexus Tech Solutions - Denton, TX Device Repair Shop",
    description: "Visit our Denton, Texas location for expert device repair services. We buy, sell, and repair phones, computers, tablets, and more.",
  },
  alternates: {
    canonical: `${siteConfig.url}/locations`,
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

export default function LocationsPage() {
  return (
    <main className="min-h-screen">
      <LocationsHero />
      <CurrentLocation />
      <ServiceAreas />
      <WhyDenton />
    </main>
  );
}