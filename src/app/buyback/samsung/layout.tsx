import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell Samsung Galaxy | Get Up to $900 | Nexus Tech Solutions",
  description: "Sell your Samsung Galaxy phone for the best price. Instant quotes for Galaxy S, Note, Z Fold/Flip, and A series. Same-day payment available. Trade in today!",
  keywords: "sell Samsung, Samsung buyback, Galaxy trade in, sell Galaxy phone, Samsung resale value, sell Galaxy S24, sell Galaxy Z Fold",
  openGraph: {
    title: "Sell Your Samsung Galaxy - Get Up to $900 | Nexus Tech Solutions",
    description: "Best prices for all Samsung Galaxy models. Instant quotes, same-day payment, free shipping.",
    type: "website",
    url: "https://nexustechsolutions.com/buyback/samsung",
    images: [
      {
        url: "/images/buyback/samsung/og-samsung-buyback.jpg",
        width: 1200,
        height: 630,
        alt: "Sell Your Samsung Galaxy to Nexus Tech Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Samsung Galaxy for Cash - Nexus Tech Solutions",
    description: "Get instant quotes up to $900 for your Samsung Galaxy. All models accepted.",
    images: ["/images/buyback/samsung/og-samsung-buyback.jpg"],
  },
  alternates: {
    canonical: "/buyback/samsung",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function SamsungLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}