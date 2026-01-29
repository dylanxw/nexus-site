import type { Metadata } from "next";
import { DroneRepairHero } from "@/components/drone-repair/hero";
import { CommonDroneRepairs } from "@/components/drone-repair/common-repairs";
import { DroneModels } from "@/components/drone-repair/drone-models";
import { WhyChooseDrone } from "@/components/drone-repair/why-choose";
import { DroneRepairReviews } from "@/components/drone-repair/reviews";
import { CallEstimateDrone } from "@/components/drone-repair/call-estimate";
import { OtherDroneServices } from "@/components/drone-repair/other-services";
import { siteConfig } from "@/config/site";
import { generateServiceJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Drone Repair Denton TX | DJI, Autel & Professional Service",
  description: "Expert drone repair in Denton, TX. Same-day DJI Mavic, Mini, Phantom, Autel, and professional drone repairs. Crash damage, propeller replacement, camera repair. 60-day warranty. Call 940-600-1012!",
  keywords: [
    "drone repair Denton TX",
    "DJI repair Denton",
    "DJI Mavic repair",
    "DJI Mini repair",
    "DJI Phantom repair",
    "Autel drone repair",
    "drone crash repair",
    "drone camera repair",
    "drone repair near me",
    "DJI Air repair",
    "drone gimbal repair",
    "drone propeller replacement",
    "professional drone repair",
    "Parrot drone repair",
    "UNT drone repair",
    "North Texas drone repair",
  ],
  openGraph: {
    title: "Drone Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Professional drone repair services in Denton, Texas. Same-day repairs with 60-day warranty for DJI, Autel, Parrot, and all drone brands.",
    url: `${siteConfig.url}/services/drone-repair`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drone Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Expert drone repair in Denton, TX. Same-day service for DJI, Autel, professional drones with expert technicians.",
  },
  alternates: {
    canonical: `${siteConfig.url}/services/drone-repair`,
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

export default function DroneRepairPage() {
  const serviceJsonLd = generateServiceJsonLd({
    name: "Drone Repair Service",
    description: "Expert drone repair in Denton, TX. DJI Mavic, Mini, Phantom, Air, Autel, and professional drone repairs. Crash damage restoration, gimbal repair, camera repair, propeller replacement. Same-day service with 60-day warranty.",
    url: `${siteConfig.url}/services/drone-repair`,
    serviceType: "Drone Repair",
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: "Drone Repair", url: `${siteConfig.url}/services/drone-repair` },
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
      <DroneRepairHero />
      <CommonDroneRepairs />
      <DroneModels />
      <WhyChooseDrone />
      <DroneRepairReviews />
      <CallEstimateDrone />
      <OtherDroneServices />
    </main>
  );
}