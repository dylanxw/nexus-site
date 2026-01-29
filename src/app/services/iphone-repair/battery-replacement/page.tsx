import { Metadata } from "next";
import { IPhoneBatteryHero } from "@/components/iphone-repair/battery/hero";
import { BatteryRepairModels } from "@/components/iphone-repair/battery/models";
import { BatteryRepairProcess } from "@/components/iphone-repair/battery/process";
import { BatteryRepairFAQ } from "@/components/iphone-repair/battery/faq";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";
import { siteConfig } from "@/config/site";
import { generateServiceJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "iPhone Battery Replacement Denton TX | Same-Day Battery Repair Service",
  description: "Professional iPhone battery replacement in Denton, TX. Fix battery drain, charging issues, and poor battery life. Quality batteries, same-day service, 60-day warranty.",
  keywords: "iPhone battery replacement Denton TX, iPhone battery repair, battery drain fix, iPhone charging issues, same day battery replacement",
};

export default function IPhoneBatteryRepairPage() {
  const serviceJsonLd = generateServiceJsonLd({
    name: "iPhone Battery Replacement",
    description: "Professional iPhone battery replacement in Denton, TX. Fix battery drain, charging issues, and poor battery life for all iPhone models. Quality batteries with same-day service and 60-day warranty.",
    url: `${siteConfig.url}/services/iphone-repair/battery-replacement`,
    serviceType: "iPhone Battery Repair",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: "iPhone Repair", url: `${siteConfig.url}/services/iphone-repair` },
    { name: "Battery Replacement", url: `${siteConfig.url}/services/iphone-repair/battery-replacement` },
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
      <IPhoneBatteryHero />
      <BatteryRepairModels />
      <BatteryRepairProcess />
      <BatteryRepairFAQ />
      <CallEstimate />
    </div>
  );
}
