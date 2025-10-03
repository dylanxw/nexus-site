import { Metadata } from "next";
import { IPhoneWaterDamageHero } from "@/components/iphone-repair/water-damage/hero";
import { WaterDamageProcess } from "@/components/iphone-repair/water-damage/process";
import { WaterDamageTypes } from "@/components/iphone-repair/water-damage/types";
import { WaterDamageFAQ } from "@/components/iphone-repair/water-damage/faq";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";

export const metadata: Metadata = {
  title: "iPhone Water Damage Repair Denton TX | Emergency Water Damage Restoration",
  description: "Professional iPhone water damage repair in Denton, TX. Emergency restoration for water, liquid spills, and moisture damage. Same-day service, 60-day warranty.",
  keywords: "iPhone water damage repair Denton TX, iPhone liquid damage restoration, emergency iPhone repair, water damage recovery Denton, iPhone moisture repair",
};

export default function IPhoneWaterDamageRepairPage() {
  return (
    <div className="min-h-screen">
      <IPhoneWaterDamageHero />
      <WaterDamageProcess />
      <WaterDamageTypes />
      <WaterDamageFAQ />
      <CallEstimate />
    </div>
  );
}