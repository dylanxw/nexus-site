import { Metadata } from "next";
import { IPhoneChargingPortHero } from "@/components/iphone-repair/charging-port/hero";
import { ChargingPortTypes } from "@/components/iphone-repair/charging-port/types";
import { ChargingPortProcess } from "@/components/iphone-repair/charging-port/process";
import { ChargingPortFAQ } from "@/components/iphone-repair/charging-port/faq";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";
import { siteConfig } from "@/config/site";
import { generateServiceJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "iPhone Charging Port Repair Denton TX | Lightning & USB-C Port Fix",
  description: "Professional iPhone charging port repair in Denton, TX. Fix Lightning and USB-C charging issues, loose connections, and port damage. Same-day service, 60-day warranty.",
  keywords: "iPhone charging port repair Denton TX, Lightning port repair, USB-C port fix, iPhone not charging repair, charging port replacement Denton",
};

export default function IPhoneChargingPortRepairPage() {
  const serviceJsonLd = generateServiceJsonLd({
    name: "iPhone Charging Port Repair",
    description: "Professional iPhone charging port repair in Denton, TX. Fix Lightning and USB-C charging issues, loose connections, and port damage for all iPhone models. Same-day service with 60-day warranty.",
    url: `${siteConfig.url}/services/iphone-repair/charging-port-repair`,
    serviceType: "iPhone Charging Port Repair",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: "iPhone Repair", url: `${siteConfig.url}/services/iphone-repair` },
    { name: "Charging Port Repair", url: `${siteConfig.url}/services/iphone-repair/charging-port-repair` },
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
      <IPhoneChargingPortHero />
      <ChargingPortTypes />
      <ChargingPortProcess />
      <ChargingPortFAQ />
      <CallEstimate />
    </div>
  );
}
