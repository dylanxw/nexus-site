import { Metadata } from "next";
import { IPhoneBackGlassHero } from "@/components/iphone-repair/back-glass/hero";
import { BackGlassRepairTypes } from "@/components/iphone-repair/back-glass/types";
import { BackGlassRepairProcess } from "@/components/iphone-repair/back-glass/process";
import { BackGlassRepairFAQ } from "@/components/iphone-repair/back-glass/faq";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";

export const metadata: Metadata = {
  title: "iPhone Back Glass Repair Denton TX | Housing Swap & Glass Replacement",
  description: "Professional iPhone back glass repair in Denton, TX. Full housing swap with OEM Apple parts or back glass only replacement. Same-day service, 60-day warranty.",
  keywords: "iPhone back glass repair Denton TX, back glass replacement, iPhone housing swap, cracked back glass fix, iPhone back cover repair Denton",
};

export default function IPhoneBackGlassRepairPage() {
  return (
    <div className="min-h-screen">
      <IPhoneBackGlassHero />
      <BackGlassRepairTypes />
      <BackGlassRepairProcess />
      <BackGlassRepairFAQ />
      <CallEstimate />
    </div>
  );
}