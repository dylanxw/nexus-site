import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { TabletRepairHero } from "@/components/tablet-repair/hero";
import { CommonTabletRepairs } from "@/components/tablet-repair/common-repairs";
import { TabletBrands } from "@/components/tablet-repair/tablet-brands";
import { WhyChooseTablet } from "@/components/tablet-repair/why-choose";
import { TabletReviews } from "@/components/tablet-repair/reviews";
import { CallEstimateTablet } from "@/components/tablet-repair/call-estimate";
import { OtherTabletServices } from "@/components/tablet-repair/other-services";
import { generateServiceJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tablet Repair Services in Denton, TX | iPad, Samsung, Microsoft Surface",
  description: "Professional tablet repair in Denton, TX. Same-day screen replacement, battery repair, and charging port fixes for all tablet brands including iPad, Samsung Galaxy Tab, Microsoft Surface, and more. 60-day warranty.",
  keywords: "tablet repair Denton TX, iPad repair, Samsung tablet repair, Microsoft Surface repair, tablet screen replacement, tablet battery replacement",
  openGraph: {
    title: "Tablet Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Expert tablet repair services in Denton, Texas. Same-day repairs with 60-day warranty for all tablet brands including iPad, Samsung, Microsoft Surface, and more.",
    url: `${siteConfig.url}/services/tablet-repair`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tablet Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Professional tablet repair in Denton, TX. Same-day service with expert technicians for all tablet brands.",
  },
  alternates: {
    canonical: `${siteConfig.url}/services/tablet-repair`,
  },
};

export default function TabletRepairPage() {
  const serviceJsonLd = generateServiceJsonLd({
    name: "Tablet Repair Service",
    description: "Professional tablet repair in Denton, TX. Screen replacement, battery repair, and charging port fixes for iPad, Samsung Galaxy Tab, Microsoft Surface, and all tablet brands. Same-day service with 60-day warranty.",
    url: `${siteConfig.url}/services/tablet-repair`,
    serviceType: "Tablet Repair",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: "Tablet Repair", url: `${siteConfig.url}/services/tablet-repair` },
  ]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TabletRepairHero />
      <CommonTabletRepairs />
      <TabletBrands />
      <WhyChooseTablet />
      <TabletReviews />
      <CallEstimateTablet />
      <OtherTabletServices />
    </main>
  );
}