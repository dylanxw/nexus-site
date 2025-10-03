import { Metadata } from "next";
import { IPhoneChargingPortHero } from "@/components/iphone-repair/charging-port/hero";
import { ChargingPortTypes } from "@/components/iphone-repair/charging-port/types";
import { ChargingPortProcess } from "@/components/iphone-repair/charging-port/process";
import { ChargingPortFAQ } from "@/components/iphone-repair/charging-port/faq";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";

export const metadata: Metadata = {
  title: "iPhone Charging Port Repair Denton TX | Lightning & USB-C Port Fix",
  description: "Professional iPhone charging port repair in Denton, TX. Fix Lightning and USB-C charging issues, loose connections, and port damage. Same-day service, 60-day warranty.",
  keywords: "iPhone charging port repair Denton TX, Lightning port repair, USB-C port fix, iPhone not charging repair, charging port replacement Denton",
};

export default function IPhoneChargingPortRepairPage() {
  return (
    <div className="min-h-screen">
      <IPhoneChargingPortHero />
      <ChargingPortTypes />
      <ChargingPortProcess />
      <ChargingPortFAQ />
      <CallEstimate />
    </div>
  );
}