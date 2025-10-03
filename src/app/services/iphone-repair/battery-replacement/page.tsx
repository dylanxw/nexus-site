import { Metadata } from "next";
import { IPhoneBatteryHero } from "@/components/iphone-repair/battery/hero";
import { BatteryRepairModels } from "@/components/iphone-repair/battery/models";
import { BatteryRepairProcess } from "@/components/iphone-repair/battery/process";
import { BatteryRepairFAQ } from "@/components/iphone-repair/battery/faq";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";

export const metadata: Metadata = {
  title: "iPhone Battery Replacement Denton TX | Same-Day Battery Repair Service",
  description: "Professional iPhone battery replacement in Denton, TX. Fix battery drain, charging issues, and poor battery life. Quality batteries, same-day service, 60-day warranty.",
  keywords: "iPhone battery replacement Denton TX, iPhone battery repair, battery drain fix, iPhone charging issues, same day battery replacement",
};

export default function IPhoneBatteryRepairPage() {
  return (
    <div className="min-h-screen">
      <IPhoneBatteryHero />
      <BatteryRepairModels />
      <BatteryRepairProcess />
      <BatteryRepairFAQ />
      <CallEstimate />
    </div>
  );
}