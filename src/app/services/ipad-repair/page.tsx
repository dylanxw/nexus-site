import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { IPadRepairHero } from "@/components/ipad-repair/hero";
import { CommonIPadRepairs } from "@/components/ipad-repair/common-repairs";
import { IPadModels } from "@/components/ipad-repair/ipad-models";
import { WhyChooseIPad } from "@/components/ipad-repair/why-choose";
import { OtherIPadServices } from "@/components/ipad-repair/other-services";
import { IPadReviews } from "@/components/ipad-repair/reviews";
import { CallEstimateIPad } from "@/components/ipad-repair/call-estimate";
import { generateServiceJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "iPad Repair Services in Denton, TX | Same-Day Screen & Battery Repair",
  description: "Professional iPad repair in Denton, TX. Same-day screen replacement, battery repair, and charging port fixes for all iPad models. 60-day warranty, expert technicians.",
  keywords: "iPad repair Denton TX, iPad screen replacement, iPad battery replacement, iPad Pro repair, iPad Air repair, iPad Mini repair",
  openGraph: {
    title: "iPad Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Expert iPad repair services in Denton, Texas. Same-day repairs with 60-day warranty for all iPad models including Pro, Air, and Mini.",
    url: `${siteConfig.url}/services/ipad-repair`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "iPad Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Professional iPad repair in Denton, TX. Same-day service with expert technicians and quality parts.",
  },
  alternates: {
    canonical: `${siteConfig.url}/services/ipad-repair`,
  },
};

export default function IPadRepairPage() {
  const serviceJsonLd = generateServiceJsonLd({
    name: "iPad Repair Service",
    description: "Professional iPad repair in Denton, TX. Screen replacement, battery repair, and charging port fixes for all iPad models including Pro, Air, and Mini. Same-day service with 60-day warranty.",
    url: `${siteConfig.url}/services/ipad-repair`,
    serviceType: "iPad Repair",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: "iPad Repair", url: `${siteConfig.url}/services/ipad-repair` },
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
      <IPadRepairHero />
      <CommonIPadRepairs />
      <IPadModels />
      <WhyChooseIPad />
      <IPadReviews />
      <CallEstimateIPad />
      <OtherIPadServices />
    </main>
  );
}