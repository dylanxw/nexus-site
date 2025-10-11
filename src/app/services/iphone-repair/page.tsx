import type { Metadata } from "next";
import { IPhoneRepairHero } from "@/components/iphone-repair/hero";
import { CommonRepairs } from "@/components/iphone-repair/common-repairs";
import { IPhoneModels } from "@/components/iphone-repair/iphone-models";
import { WhyChooseIPhone } from "@/components/iphone-repair/why-choose";
import { IPhoneReviews } from "@/components/iphone-repair/reviews";
import { OtherRepairServices } from "@/components/iphone-repair/other-services";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "iPhone Repair Denton TX | Same-Day Screen & Battery Repair Service",
  description: "Professional iPhone repair in Denton, TX. Screen replacement, battery repair, water damage restoration. Same-day service, 60-day warranty, genuine parts. Call 940-600-1012!",
  keywords: [
    "iPhone repair Denton TX",
    "iPhone screen replacement Denton",
    "iPhone battery repair Denton",
    "same day iPhone repair",
    "iPhone water damage repair Denton",
    "iPhone charging port repair",
    "iPhone camera repair Denton",
    "iPhone back glass repair",
    "iPhone repair near me",
    "Denton iPhone repair shop",
    "UNT iPhone repair",
    "North Texas iPhone repair",
    "iPhone 15 repair Denton",
    "iPhone 14 repair Denton",
    "iPhone 13 repair Denton",
  ],
  openGraph: {
    title: "iPhone Repair Denton TX | Same-Day Screen & Battery Repair Service",
    description: "Professional iPhone repair in Denton, TX. Screen replacement, battery repair, water damage restoration. Same-day service, 60-day warranty, genuine parts.",
    url: `${siteConfig.url}/services/iphone-repair`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iPhone Repair Denton TX | Same-Day Screen & Battery Repair",
    description: "Professional iPhone repair in Denton, TX. Same-day service, 60-day warranty, genuine parts. All iPhone models.",
  },
  alternates: {
    canonical: `${siteConfig.url}/services/iphone-repair`,
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

export default function IPhoneRepairPage() {
  return (
    <div className="min-h-screen">
      <IPhoneRepairHero />
      <CommonRepairs />
      <IPhoneModels />
      <WhyChooseIPhone />
      <IPhoneReviews />
      <CallEstimate />
      <OtherRepairServices />
    </div>
  );
}