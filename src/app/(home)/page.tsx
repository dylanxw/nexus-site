import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Device Repair & Buyback in Denton, TX | iPhone, Samsung, Laptop Repair",
  description: "Expert device repair & instant cash buyback in Denton, TX. Same-day iPhone, Samsung, laptop repair. Sell your phone for cash with instant quotes. 60-day warranty. Call 940-600-1012.",
  keywords: [
    // Repair keywords
    "phone repair Denton TX",
    "iPhone repair Denton",
    "Samsung repair Denton",
    "laptop repair Denton TX",
    "computer repair Denton",
    "iPad repair Denton",
    "gaming console repair Denton",
    "PlayStation repair Denton",
    "Xbox repair Denton",
    "drone repair Denton TX",
    "device repair near me",
    "cell phone repair Denton",
    "screen repair Denton",
    "UNT phone repair",
    "North Texas device repair",
    "same day phone repair Denton",
    // Buyback keywords - EcoATM competitor focus
    "sell my phone for cash Denton",
    "where to sell my phone for cash",
    "sell phone for cash Denton TX",
    "sell iPhone for cash Denton",
    "sell Samsung for cash Denton",
    "cash for phones Denton",
    "instant cash for phones",
    "phone buyback Denton",
    "sell broken phone Denton",
    "trade in phone Denton",
    "EcoATM alternative Denton",
    "better than EcoATM Denton",
    "EcoATM near me",
    "sell phone near me",
    "get cash for phone instantly Denton",
    "phone trade in near UNT",
    "sell old phone Denton TX",
    "instant phone quote Denton",
    "beat EcoATM prices"
  ],
  openGraph: {
    title: "Device Repair & Buyback in Denton, TX | iPhone, Samsung, Laptop Repair",
    description: "Expert device repair & instant cash buyback in Denton, TX. Same-day repairs. Sell phones for cash with instant quotes. 60-day warranty. Serving UNT & North Texas.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/hero/nexus-storefront-image.jpeg`,
        width: 1200,
        height: 630,
        alt: "Nexus Tech Solutions - Device Repair & Buyback in Denton, TX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Device Repair & Buyback in Denton, TX | iPhone, Samsung, Laptop Repair",
    description: "Expert device repair & instant cash buyback in Denton, TX. Same-day service. Sell phones for cash with instant quotes. Call 940-600-1012.",
    images: [`${siteConfig.url}/images/hero/nexus-storefront-image.jpeg`],
  },
  alternates: {
    canonical: siteConfig.url,
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

export default function Home() {
  return <HomePage />;
}
