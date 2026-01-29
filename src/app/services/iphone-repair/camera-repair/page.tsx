import { Metadata } from "next";
import { IPhoneCameraHero } from "@/components/iphone-repair/camera/hero";
import { CameraRepairTypes } from "@/components/iphone-repair/camera/types";
import { CameraRepairProcess } from "@/components/iphone-repair/camera/process";
import { CameraRepairFAQ } from "@/components/iphone-repair/camera/faq";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";
import { siteConfig } from "@/config/site";
import { generateServiceJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "iPhone Camera Repair Denton TX | Front & Rear Camera Lens Fix",
  description: "Professional iPhone camera repair in Denton, TX. Fix blurry cameras, cracked lenses, and camera issues. OEM camera replacement with Face ID preservation. Same-day service.",
  keywords: "iPhone camera repair Denton TX, camera lens replacement, iPhone camera not working, blurry camera fix, front camera repair, rear camera replacement Denton",
};

export default function IPhoneCameraRepairPage() {
  const serviceJsonLd = generateServiceJsonLd({
    name: "iPhone Camera Repair",
    description: "Professional iPhone camera repair in Denton, TX. Fix blurry cameras, cracked lenses, and camera issues for all iPhone models. OEM camera replacement with Face ID preservation. Same-day service with 60-day warranty.",
    url: `${siteConfig.url}/services/iphone-repair/camera-repair`,
    serviceType: "iPhone Camera Repair",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: "iPhone Repair", url: `${siteConfig.url}/services/iphone-repair` },
    { name: "Camera Repair", url: `${siteConfig.url}/services/iphone-repair/camera-repair` },
  ]);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <IPhoneCameraHero />
      <CameraRepairTypes />
      <CameraRepairProcess />
      <CameraRepairFAQ />
      <CallEstimate />
    </div>
  );
}
