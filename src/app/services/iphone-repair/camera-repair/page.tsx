import { Metadata } from "next";
import { IPhoneCameraHero } from "@/components/iphone-repair/camera/hero";
import { CameraRepairTypes } from "@/components/iphone-repair/camera/types";
import { CameraRepairProcess } from "@/components/iphone-repair/camera/process";
import { CameraRepairFAQ } from "@/components/iphone-repair/camera/faq";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";

export const metadata: Metadata = {
  title: "iPhone Camera Repair Denton TX | Front & Rear Camera Lens Fix",
  description: "Professional iPhone camera repair in Denton, TX. Fix blurry cameras, cracked lenses, and camera issues. OEM camera replacement with Face ID preservation. Same-day service.",
  keywords: "iPhone camera repair Denton TX, camera lens replacement, iPhone camera not working, blurry camera fix, front camera repair, rear camera replacement Denton",
};

export default function IPhoneCameraRepairPage() {
  return (
    <div className="min-h-screen">
      <IPhoneCameraHero />
      <CameraRepairTypes />
      <CameraRepairProcess />
      <CameraRepairFAQ />
      <CallEstimate />
    </div>
  );
}