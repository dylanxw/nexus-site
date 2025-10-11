import type { Metadata } from "next";
import { ComputerRepairHero } from "@/components/computer-repair/hero";
import { CommonComputerRepairs } from "@/components/computer-repair/common-repairs";
import { ComputerModels } from "@/components/computer-repair/computer-models";
import { WhyChooseComputer } from "@/components/computer-repair/why-choose";
import { ComputerRepairReviews } from "@/components/computer-repair/reviews";
import { CallEstimateComputer } from "@/components/computer-repair/call-estimate";
import { OtherComputerServices } from "@/components/computer-repair/other-services";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Computer & Laptop Repair Denton TX | MacBook, PC Service",
  description: "Professional computer and laptop repair in Denton, TX. Same-day MacBook, PC, and laptop repairs. Screen replacement, battery repair, virus removal, and more. 60-day warranty. Call 940-600-1012!",
  keywords: [
    "computer repair Denton TX",
    "laptop repair Denton",
    "MacBook repair Denton",
    "PC repair Denton",
    "laptop screen replacement",
    "computer virus removal",
    "laptop battery replacement",
    "computer repair near me",
    "MacBook Pro repair",
    "MacBook Air repair",
    "Windows laptop repair",
    "Dell laptop repair Denton",
    "HP laptop repair Denton",
    "Lenovo laptop repair",
    "gaming laptop repair",
    "UNT laptop repair",
    "North Texas computer repair",
  ],
  openGraph: {
    title: "Computer & Laptop Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Expert computer and laptop repair services in Denton, Texas. Same-day repairs with 60-day warranty for MacBook, PC, Windows laptops, and all computer systems.",
    url: `${siteConfig.url}/services/computer-repair`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Computer & Laptop Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Professional computer and laptop repair in Denton, TX. Same-day service for MacBook, PC, laptops with expert technicians.",
  },
  alternates: {
    canonical: `${siteConfig.url}/services/computer-repair`,
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

export default function ComputerRepairPage() {
  return (
    <main>
      <ComputerRepairHero />
      <CommonComputerRepairs />
      <ComputerModels />
      <WhyChooseComputer />
      <ComputerRepairReviews />
      <CallEstimateComputer />
      <OtherComputerServices />
    </main>
  );
}