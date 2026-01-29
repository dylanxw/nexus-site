import { Metadata } from "next";
import { IPhoneScreenHero } from "@/components/iphone-repair/screen/hero";
import { ScreenRepairModels } from "@/components/iphone-repair/screen/models";
import { ScreenRepairProcess } from "@/components/iphone-repair/screen/process";
import { ScreenRepairFAQ } from "@/components/iphone-repair/screen/faq";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";
import { siteConfig } from "@/config/site";
import { generateServiceJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "iPhone Screen Replacement Denton TX | Same-Day Cracked Screen Repair",
  description: "Professional iPhone screen replacement in Denton, TX. Fix cracked, shattered, or unresponsive screens. Quality parts, same-day service, 60-day warranty. Call now!",
  keywords: "iPhone screen replacement Denton TX, cracked iPhone screen repair, iPhone screen repair Denton, same day iPhone screen fix, iPhone display replacement",
};

export default function IPhoneScreenRepairPage() {
  const serviceJsonLd = generateServiceJsonLd({
    name: "iPhone Screen Replacement",
    description: "Professional iPhone screen replacement in Denton, TX. Fix cracked, shattered, or unresponsive screens for all iPhone models. Quality OEM and aftermarket parts with same-day service and 60-day warranty.",
    url: `${siteConfig.url}/services/iphone-repair/screen-replacement`,
    serviceType: "iPhone Screen Repair",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: "iPhone Repair", url: `${siteConfig.url}/services/iphone-repair` },
    { name: "Screen Replacement", url: `${siteConfig.url}/services/iphone-repair/screen-replacement` },
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
      <IPhoneScreenHero />
      <ScreenRepairModels />
      <ScreenRepairProcess />
      <ScreenRepairFAQ />
      <CallEstimate />
    </div>
  );
}
