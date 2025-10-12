import type { Metadata } from "next";
import { SamsungBuybackPage } from "@/components/pages/samsung-buyback-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sell Samsung for Cash Denton TX | Galaxy S, Z, Note | Instant Quote",
  description: "Sell your Samsung phone for cash in Denton, TX. Get instant quotes for Galaxy S24, S23, Z Fold, Z Flip & all models. Same-day payment, all conditions. Call 940-600-1012.",
  keywords: [
    // Primary Samsung buyback keywords
    "sell Samsung for cash Denton TX",
    "Samsung buyback Denton",
    "trade in Samsung Denton",
    "sell Galaxy phone Denton",
    "cash for Samsung Denton",
    "Samsung trade in near me",
    "instant Samsung quote Denton",
    "where to sell Samsung phone",

    // Galaxy S Series keywords
    "sell Galaxy S24 Denton",
    "sell Galaxy S23 Denton",
    "sell Galaxy S22 Denton",
    "sell Galaxy S21 Denton",
    "sell Galaxy S24 Ultra Denton",
    "sell Galaxy S23 Ultra Denton",
    "trade in Galaxy S24",
    "cash for Galaxy S series",

    // Galaxy Z Series keywords
    "sell Galaxy Z Fold Denton",
    "sell Galaxy Z Flip Denton",
    "sell Z Fold 6 Denton",
    "sell Z Flip 6 Denton",
    "sell Z Fold 5 Denton",
    "sell Z Flip 5 Denton",
    "trade in Galaxy Z Fold",
    "cash for Galaxy Z Flip",
    "sell foldable phone Denton",

    // Galaxy Note Series keywords
    "sell Galaxy Note Denton",
    "sell Note 20 Ultra Denton",
    "sell Galaxy Note 20 Denton",
    "sell Galaxy Note 10 Denton",
    "trade in Galaxy Note",
    "cash for Galaxy Note",

    // Galaxy A Series keywords
    "sell Galaxy A54 Denton",
    "sell Galaxy A34 Denton",
    "sell Galaxy A series Denton",
    "trade in Galaxy A phone",

    // Condition-based keywords
    "sell broken Samsung Denton",
    "sell cracked Samsung Denton",
    "sell broken Galaxy Denton",
    "sell water damaged Samsung Denton",
    "sell Samsung with broken screen",
    "sell non-working Samsung",

    // EcoATM competitor keywords
    "EcoATM alternative Denton",
    "better than EcoATM Samsung",
    "beat EcoATM prices Samsung",
    "EcoATM alternative for Samsung",
    "higher prices than EcoATM",

    // Location-specific keywords
    "Samsung buyback Denton Texas",
    "sell Samsung phone North Texas",
    "Samsung trade in near UNT",
    "sell Galaxy phone UNT",
    "device buyback Denton Samsung",

    // Action keywords
    "instant Samsung quote",
    "same day payment Samsung",
    "immediate cash for Samsung",
    "quick Samsung buyback",
    "fast Samsung trade in",
    "sell Samsung today",

    // Carrier-specific
    "sell unlocked Samsung Denton",
    "sell Verizon Samsung Denton",
    "sell AT&T Samsung Denton",
    "sell T-Mobile Samsung Denton",
    "sell Sprint Samsung Denton",

    // Model variations
    "sell Galaxy phone for cash",
    "Samsung phone buyback program",
    "trade in old Samsung phone",
    "sell used Samsung Denton",
    "sell Samsung near me",
  ],
  openGraph: {
    title: "Sell Samsung for Cash Denton TX | Galaxy S, Z, Note | Instant Quote",
    description: "Sell your Samsung phone for cash in Denton, TX. Get instant quotes for Galaxy S24, S23, Z Fold, Z Flip & all models. Same-day payment, all conditions.",
    url: `${siteConfig.url}/sell-a-device/samsung`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/sell-a-device/sell-samsung/galaxy-s-series.avif`,
        width: 1200,
        height: 630,
        alt: "Sell Samsung Galaxy for Cash in Denton TX - Nexus Tech Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Samsung for Cash Denton TX | Galaxy S, Z, Note | Instant Quote",
    description: "Sell your Samsung phone for cash in Denton, TX. Get instant quotes for Galaxy S24, S23, Z Fold, Z Flip & all models. Same-day payment. Call 940-600-1012.",
    images: [`${siteConfig.url}/images/sell-a-device/sell-samsung/galaxy-s-series.avif`],
  },
  alternates: {
    canonical: `${siteConfig.url}/sell-a-device/samsung`,
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

export default function SamsungBuyback() {
  return <SamsungBuybackPage />;
}
