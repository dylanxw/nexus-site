import type { Metadata } from "next";
import { IphoneBuybackPage } from "@/components/pages/iphone-buyback-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sell iPhone for Cash Denton TX | Top Dollar | Instant Quote",
  description: "Sell your iPhone for cash in Denton, TX. Get instant quotes for iPhone 17, 16, 15, 14, 13 & older models. Same-day payment, all conditions accepted. Call 940-600-1012.",
  keywords: [
    // Primary iPhone buyback keywords
    "sell iPhone for cash Denton TX",
    "iPhone buyback Denton",
    "trade in iPhone Denton",
    "sell iPhone Denton TX",
    "cash for iPhone Denton",

    // Model-specific keywords
    "sell iPhone 17 Denton",
    "sell iPhone 16 Denton",
    "sell iPhone 15 Denton",
    "sell iPhone 14 Denton",
    "sell iPhone 13 Denton",
    "sell iPhone 12 Denton",
    "sell iPhone 11 Denton",
    "sell old iPhone Denton",

    // Condition-based keywords
    "sell broken iPhone Denton",
    "sell cracked iPhone Denton",
    "sell water damaged iPhone Denton",
    "sell iPhone with broken screen Denton",
    "sell damaged iPhone Denton",

    // Action keywords
    "instant iPhone quote Denton",
    "iPhone trade in near me",
    "where to sell iPhone Denton",
    "iPhone buyback near me",
    "cash for old iPhone",
    "sell used iPhone Denton",

    // Variant keywords
    "sell iPhone Pro Max Denton",
    "sell iPhone Pro Denton",
    "sell iPhone Plus Denton",
    "sell iPhone Mini Denton",

    // EcoATM competitor keywords (for metadata only)
    "EcoATM alternative Denton",
    "better than EcoATM",
    "EcoATM near me",
    "beat EcoATM prices iPhone",
    "EcoATM alternative iPhone",

    // Location-specific
    "sell iPhone UNT",
    "iPhone buyback Denton Texas",
    "iPhone trade in North Texas",
    "sell iPhone near UNT",

    // General buyback variants
    "iPhone buyback program Denton",
    "sell iPhone for top dollar",
    "best place to sell iPhone Denton",
    "highest iPhone buyback prices",
    "iPhone trade in value Denton",
    "same day iPhone payment",

    // Long-tail keywords
    "where can I sell my iPhone for cash in Denton",
    "how much can I sell my iPhone for Denton",
    "sell iPhone same day payment Denton",
    "instant cash for iPhone Denton TX"
  ],
  openGraph: {
    title: "Sell iPhone for Cash Denton TX | Top Dollar | Instant Quote",
    description: "Sell your iPhone for cash in Denton, TX. Get instant quotes for iPhone 17, 16, 15, 14, 13 & older models. Same-day payment, all conditions accepted.",
    url: `${siteConfig.url}/buyback/iphone`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/buyback/sell-iphone/apple-iphone-17-pro-max.avif`,
        width: 1200,
        height: 630,
        alt: "Sell iPhone for Cash in Denton TX - Get Top Dollar for Your iPhone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell iPhone for Cash Denton TX | Top Dollar | Instant Quote",
    description: "Sell your iPhone for cash in Denton, TX. Get instant quotes for iPhone 17, 16, 15, 14, 13 & older models. Same-day payment. Call 940-600-1012.",
    images: [`${siteConfig.url}/images/buyback/sell-iphone/apple-iphone-17-pro-max.avif`],
  },
  alternates: {
    canonical: `${siteConfig.url}/buyback/iphone`,
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

export default function IPhoneBuyback() {
  return <IphoneBuybackPage />;
}
