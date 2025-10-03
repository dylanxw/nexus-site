import { Metadata } from "next";
import { IPhoneRepairHero } from "@/components/iphone-repair/hero";
import { CommonRepairs } from "@/components/iphone-repair/common-repairs";
import { IPhoneModels } from "@/components/iphone-repair/iphone-models";
import { WhyChooseIPhone } from "@/components/iphone-repair/why-choose";
import { IPhoneReviews } from "@/components/iphone-repair/reviews";
import { OtherRepairServices } from "@/components/iphone-repair/other-services";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";

export const metadata: Metadata = {
  title: "iPhone Repair Denton TX | Same-Day Screen & Battery Repair Service",
  description: "Professional iPhone repair in Denton, TX. Screen replacement, battery repair, water damage restoration. Same-day service, 60-day warranty, genuine parts. Call now!",
  keywords: "iPhone repair Denton TX, iPhone screen replacement Denton, iPhone battery repair, same day iPhone repair, iPhone water damage repair Denton",
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