import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell Your Phone for Cash | Device Buyback Program | Nexus Tech Solutions",
  description: "Sell used phones, tablets, smartwatches, and electronics for top dollar. Get instant quotes up to $890. Same-day payment, free shipping, and data security guaranteed. Trade in today!",
  keywords: "sell phone, device buyback, trade in phone, sell iPhone, sell Samsung, sell iPad, cash for phones, phone trade in, sell electronics",
  openGraph: {
    title: "Sell Your Phone for Cash - Nexus Tech Solutions Device Buyback",
    description: "Get instant quotes and same-day payment for your used devices. Best prices guaranteed.",
    type: "website",
    url: "https://nexustechsolutions.com/buyback",
    images: [
      {
        url: "/images/buyback/og-buyback.jpg",
        width: 1200,
        height: 630,
        alt: "Nexus Tech Solutions Device Buyback Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Your Phone for Cash - Nexus Tech Solutions",
    description: "Get instant quotes up to $890 for your devices. Same-day payment available.",
    images: ["/images/buyback/og-buyback.jpg"],
  },
  alternates: {
    canonical: "/buyback",
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

export default function BuybackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}