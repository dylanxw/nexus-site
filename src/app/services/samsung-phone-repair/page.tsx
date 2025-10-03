import { Metadata } from "next";
import { SamsungPhoneRepairHero } from "@/components/samsung-phone-repair/hero";
import { CommonSamsungRepairs } from "@/components/samsung-phone-repair/common-repairs";
import { SamsungPhoneModels } from "@/components/samsung-phone-repair/samsung-models";
import { WhyChooseSamsung } from "@/components/samsung-phone-repair/why-choose";
import { SamsungPhoneReviews } from "@/components/samsung-phone-repair/reviews";
import { CallEstimateSamsung } from "@/components/samsung-phone-repair/call-estimate";
import { OtherSamsungServices } from "@/components/samsung-phone-repair/other-services";

export const metadata: Metadata = {
  title: "Samsung Phone Repair Services in Denton, TX | Galaxy Screen & Battery Repair",
  description: "Professional Samsung Galaxy phone repair in Denton, TX. Same-day screen replacement, battery repair, and charging port fixes for all Samsung Galaxy models. 60-day warranty, expert technicians.",
  keywords: "Samsung phone repair Denton TX, Samsung Galaxy repair, Galaxy screen replacement, Galaxy battery replacement, Samsung repair near me",
  openGraph: {
    title: "Samsung Phone Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Expert Samsung Galaxy phone repair services in Denton, Texas. Same-day repairs with 60-day warranty for all Samsung Galaxy models including S-series, Note, and A-series.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samsung Phone Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Professional Samsung Galaxy phone repair in Denton, TX. Same-day service with expert technicians and quality parts.",
  },
  alternates: {
    canonical: "/services/samsung-phone-repair",
  },
};

export default function SamsungPhoneRepairPage() {
  return (
    <main>
      <SamsungPhoneRepairHero />
      <CommonSamsungRepairs />
      <SamsungPhoneModels />
      <WhyChooseSamsung />
      <SamsungPhoneReviews />
      <CallEstimateSamsung />
      <OtherSamsungServices />
    </main>
  );
}