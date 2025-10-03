import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Your iPhone Quote | Nexus Tech Solutions",
  description: "Complete your iPhone buyback quote and receive instant confirmation.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function OverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}