import { Metadata } from "next";
import { IPadRepairHero } from "@/components/ipad-repair/hero";
import { CommonIPadRepairs } from "@/components/ipad-repair/common-repairs";
import { IPadModels } from "@/components/ipad-repair/ipad-models";
import { WhyChooseIPad } from "@/components/ipad-repair/why-choose";
import { OtherIPadServices } from "@/components/ipad-repair/other-services";
import { IPadReviews } from "@/components/ipad-repair/reviews";
import { CallEstimateIPad } from "@/components/ipad-repair/call-estimate";

export const metadata: Metadata = {
  title: "iPad Repair Services in Denton, TX | Same-Day Screen & Battery Repair",
  description: "Professional iPad repair in Denton, TX. Same-day screen replacement, battery repair, and charging port fixes for all iPad models. 60-day warranty, expert technicians.",
  keywords: "iPad repair Denton TX, iPad screen replacement, iPad battery replacement, iPad Pro repair, iPad Air repair, iPad Mini repair",
  openGraph: {
    title: "iPad Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Expert iPad repair services in Denton, Texas. Same-day repairs with 60-day warranty for all iPad models including Pro, Air, and Mini.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "iPad Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Professional iPad repair in Denton, TX. Same-day service with expert technicians and quality parts.",
  },
  alternates: {
    canonical: "/services/ipad-repair",
  },
};

export default function IPadRepairPage() {
  return (
    <main>
      <IPadRepairHero />
      <CommonIPadRepairs />
      <IPadModels />
      <WhyChooseIPad />
      <IPadReviews />
      <CallEstimateIPad />
      <OtherIPadServices />
    </main>
  );
}