import { Metadata } from "next";
import { IPhoneBackGlassHero } from "@/components/iphone-repair/back-glass/hero";
import { BackGlassRepairTypes } from "@/components/iphone-repair/back-glass/types";
import { BackGlassRepairProcess } from "@/components/iphone-repair/back-glass/process";
import { BackGlassRepairFAQ } from "@/components/iphone-repair/back-glass/faq";
import { CallEstimate } from "@/components/iphone-repair/call-estimate";
import { siteConfig } from "@/config/site";
import { generateServiceJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "iPhone Back Glass Repair Denton TX | Housing Swap & Glass Replacement",
  description: "Professional iPhone back glass repair in Denton, TX. Full housing swap with OEM Apple parts or back glass only replacement. Same-day service, 60-day warranty.",
  keywords: "iPhone back glass repair Denton TX, back glass replacement, iPhone housing swap, cracked back glass fix, iPhone back cover repair Denton",
};

export default function IPhoneBackGlassRepairPage() {
  const serviceJsonLd = generateServiceJsonLd({
    name: "iPhone Back Glass Repair",
    description: "Professional iPhone back glass repair in Denton, TX. Full housing swap with OEM Apple parts or back glass only replacement for all iPhone models. Same-day service with 60-day warranty.",
    url: `${siteConfig.url}/services/iphone-repair/back-glass-repair`,
    serviceType: "iPhone Back Glass Repair",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: "iPhone Repair", url: `${siteConfig.url}/services/iphone-repair` },
    { name: "Back Glass Repair", url: `${siteConfig.url}/services/iphone-repair/back-glass-repair` },
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
      <IPhoneBackGlassHero />
      <BackGlassRepairTypes />
      <BackGlassRepairProcess />
      <BackGlassRepairFAQ />
      <CallEstimate />
    </div>
  );
}
