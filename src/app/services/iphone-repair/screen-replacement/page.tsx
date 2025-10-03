import { Metadata } from "next";
import { IPhoneScreenHero } from "@/components/iphone-repair/screen/hero";
import { ScreenRepairModels } from "@/components/iphone-repair/screen/models";
import { ScreenRepairProcess } from "@/components/iphone-repair/screen/process";
import { ScreenRepairFAQ } from "@/components/iphone-repair/screen/faq";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";

export const metadata: Metadata = {
  title: "iPhone Screen Replacement Denton TX | Same-Day Cracked Screen Repair",
  description: "Professional iPhone screen replacement in Denton, TX. Fix cracked, shattered, or unresponsive screens. Quality parts, same-day service, 60-day warranty. Call now!",
  keywords: "iPhone screen replacement Denton TX, cracked iPhone screen repair, iPhone screen repair Denton, same day iPhone screen fix, iPhone display replacement",
};

export default function IPhoneScreenRepairPage() {
  return (
    <div className="min-h-screen">
      <IPhoneScreenHero />
      <ScreenRepairModels />
      <ScreenRepairProcess />
      <ScreenRepairFAQ />
      <CallEstimate />
    </div>
  );
}