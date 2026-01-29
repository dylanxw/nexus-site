import { Metadata } from "next";
import { IPhoneWaterDamageHero } from "@/components/iphone-repair/water-damage/hero";
import { WaterDamageProcess } from "@/components/iphone-repair/water-damage/process";
import { WaterDamageTypes } from "@/components/iphone-repair/water-damage/types";
import { WaterDamageFAQ } from "@/components/iphone-repair/water-damage/faq";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";
import { siteConfig } from "@/config/site";
import { generateServiceJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "iPhone Water Damage Repair Denton TX | Emergency Water Damage Restoration",
  description: "Professional iPhone water damage repair in Denton, TX. Emergency restoration for water, liquid spills, and moisture damage. Same-day service, 60-day warranty.",
  keywords: "iPhone water damage repair Denton TX, iPhone liquid damage restoration, emergency iPhone repair, water damage recovery Denton, iPhone moisture repair",
};

export default function IPhoneWaterDamageRepairPage() {
  const serviceJsonLd = generateServiceJsonLd({
    name: "iPhone Water Damage Repair",
    description: "Professional iPhone water damage repair in Denton, TX. Emergency restoration for water, liquid spills, and moisture damage. Ultrasonic cleaning and component-level repair with same-day service and 60-day warranty.",
    url: `${siteConfig.url}/services/iphone-repair/water-damage-repair`,
    serviceType: "iPhone Water Damage Repair",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: "iPhone Repair", url: `${siteConfig.url}/services/iphone-repair` },
    { name: "Water Damage Repair", url: `${siteConfig.url}/services/iphone-repair/water-damage-repair` },
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
      <IPhoneWaterDamageHero />
      <WaterDamageProcess />
      <WaterDamageTypes />
      <WaterDamageFAQ />
      <CallEstimate />
    </div>
  );
}
