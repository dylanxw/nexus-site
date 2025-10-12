import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell iPhone for Cash | Get Up to $890 | Nexus Tech Solutions",
  description: "Sell your iPhone for the best price. Instant quotes for all models from iPhone 7 to iPhone 17 Pro Max. Same-day payment available. Trade in your iPhone today!",
  keywords: "sell iPhone, iPhone buyback, iPhone trade in, sell iPhone for cash, iPhone resale value, sell iPhone 17, sell iPhone 16, sell iPhone 15",
  openGraph: {
    title: "Sell Your iPhone - Get Up to $890 | Nexus Tech Solutions",
    description: "Best prices for all iPhone models. Instant quotes, same-day payment, free shipping.",
    type: "website",
    url: "https://nexustechsolutions.com/sell-a-device/iphone",
    images: [
      {
        url: "/images/sell-a-device/sell-iphone/og-iphone-buyback.jpg",
        width: 1200,
        height: 630,
        alt: "Sell Your iPhone to Nexus Tech Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell iPhone for Cash - Nexus Tech Solutions",
    description: "Get instant quotes up to $890 for your iPhone. All models accepted.",
    images: ["/images/sell-a-device/sell-iphone/og-iphone-buyback.jpg"],
  },
  alternates: {
    canonical: "/sell-a-device/iphone",
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

export default function IPhoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}