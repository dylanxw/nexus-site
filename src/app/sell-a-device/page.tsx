import type { Metadata } from "next";
import { BuybackPage } from "@/components/pages/buyback-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sell Phone for Cash Denton TX | Instant Quote | Phone Buyback",
  description: "Sell your phone for cash in Denton, TX. Instant quotes, same-day payment. Sell iPhone, Samsung, broken phones. Higher prices guaranteed. Call 940-600-1012.",
  keywords: [
    // Primary EcoATM competitor keywords
    "sell phone for cash Denton TX",
    "EcoATM alternative Denton",
    "better than EcoATM",
    "beat EcoATM prices",
    "EcoATM near me",
    "where to sell my phone for cash",

    // iPhone buyback keywords
    "sell iPhone for cash Denton",
    "sell iPhone Denton TX",
    "iPhone buyback Denton",
    "trade in iPhone Denton",
    "cash for iPhone Denton",

    // Samsung buyback keywords
    "sell Samsung for cash Denton",
    "sell Samsung phone Denton",
    "Samsung buyback Denton",
    "trade in Samsung Denton",

    // General buyback keywords
    "instant phone buyback Denton",
    "cash for phones Denton",
    "phone trade in Denton",
    "sell broken phone Denton",
    "sell old phone Denton TX",
    "instant cash for phones",
    "phone buyback near me",
    "sell phone near me",
    "instant phone quote Denton",

    // Device-specific keywords
    "sell iPad for cash Denton",
    "sell MacBook Denton",
    "sell laptop for cash Denton",
    "sell smartwatch Denton",
    "sell Apple Watch Denton",
    "sell AirPods Denton",

    // Condition-based keywords
    "sell broken iPhone Denton",
    "sell cracked phone Denton",
    "sell water damaged phone Denton",
    "sell phone with broken screen Denton",

    // Location-specific
    "phone buyback Denton Texas",
    "sell phone UNT",
    "phone trade in near UNT",
    "cash for phones North Texas",
    "device buyback Denton",

    // EcoATM comparison
    "EcoATM Denton",
    "EcoATM alternative",
    "better prices than EcoATM",
    "higher prices than EcoATM",
    "EcoATM competitor",

    // Action keywords
    "get instant quote phone",
    "same day phone payment",
    "immediate cash for phone",
    "quick phone buyback",
    "fast phone trade in"
  ],
  openGraph: {
    title: "Sell Phone for Cash Denton TX | Instant Quote | Phone Buyback",
    description: "Sell your phone for cash in Denton, TX. Instant quotes, same-day payment. Sell iPhone, Samsung, broken phones. Higher prices guaranteed.",
    url: `${siteConfig.url}/sell-a-device`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/sell-a-device/categories/sell-iphone.jpg`,
        width: 1200,
        height: 630,
        alt: "Sell Phone for Cash in Denton TX - Nexus Tech Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Phone for Cash Denton TX | Instant Quote | Phone Buyback",
    description: "Sell your phone for cash in Denton, TX. Instant quotes, same-day payment. Higher prices guaranteed. Call 940-600-1012.",
    images: [`${siteConfig.url}/images/sell-a-device/categories/sell-iphone.jpg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/sell-a-device`,
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

export default function Buyback() {
  return <BuybackPage />;
}
