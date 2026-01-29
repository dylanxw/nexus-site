import type { Metadata } from "next";
import { SamsungPhoneRepairHero } from "@/components/samsung-phone-repair/hero";
import { CommonSamsungRepairs } from "@/components/samsung-phone-repair/common-repairs";
import { SamsungPhoneModels } from "@/components/samsung-phone-repair/samsung-models";
import { WhyChooseSamsung } from "@/components/samsung-phone-repair/why-choose";
import { SamsungPhoneReviews } from "@/components/samsung-phone-repair/reviews";
import { CallEstimateSamsung } from "@/components/samsung-phone-repair/call-estimate";
import { OtherSamsungServices } from "@/components/samsung-phone-repair/other-services";
import { siteConfig } from "@/config/site";
import { generateServiceJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Samsung Repair Denton TX | Galaxy Screen & Battery Service",
  description: "Professional Samsung Galaxy phone repair in Denton, TX. Same-day screen replacement, battery repair, and charging port fixes for all Samsung Galaxy models. 60-day warranty. Call 940-600-1012!",
  keywords: [
    "Samsung phone repair Denton TX",
    "Samsung Galaxy repair",
    "Galaxy screen replacement",
    "Galaxy battery replacement",
    "Samsung repair near me",
    "Galaxy S repair Denton",
    "Galaxy Note repair",
    "Galaxy A repair Denton",
    "Samsung charging port repair",
    "Galaxy Z Fold repair",
    "Galaxy Z Flip repair",
    "Denton Samsung repair shop",
    "UNT Samsung repair",
    "North Texas Samsung repair",
  ],
  openGraph: {
    title: "Samsung Phone Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Expert Samsung Galaxy phone repair services in Denton, Texas. Same-day repairs with 60-day warranty for all Samsung Galaxy models including S-series, Note, and A-series.",
    url: `${siteConfig.url}/services/samsung-phone-repair`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samsung Phone Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Professional Samsung Galaxy phone repair in Denton, TX. Same-day service with expert technicians and quality parts.",
  },
  alternates: {
    canonical: `${siteConfig.url}/services/samsung-phone-repair`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function SamsungPhoneRepairPage() {
  const serviceJsonLd = generateServiceJsonLd({
    name: "Samsung Phone Repair Service",
    description: "Professional Samsung Galaxy phone repair in Denton, TX. Screen replacement, battery repair, charging port fixes for all Galaxy models including S-series, Note, A-series, Z Fold, and Z Flip. Same-day service with 60-day warranty.",
    url: `${siteConfig.url}/services/samsung-phone-repair`,
    serviceType: "Samsung Phone Repair",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: "Samsung Phone Repair", url: `${siteConfig.url}/services/samsung-phone-repair` },
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
      <SamsungPhoneRepairHero />
      <CommonSamsungRepairs />
      <SamsungPhoneModels />
      <WhyChooseSamsung />
      <SamsungPhoneReviews />
      <CallEstimateSamsung />
      <OtherSamsungServices />
    </main>
  );
}