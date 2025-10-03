import { Metadata } from "next";
import { ServiceAreasHero } from "@/components/service-areas/hero";
import { LocationMap } from "@/components/service-areas/location-map";
import { CitiesCoverage } from "@/components/service-areas/cities-coverage";
import { MailInRepair } from "@/components/service-areas/mail-in-repair";

export const metadata: Metadata = {
  title: "Service Areas | Device Repair in Denton, TX & Surrounding Cities | Nexus Tech Solutions",
  description: "Nexus Tech Solutions serves Denton, TX and surrounding areas including Lewisville, Flower Mound, Highland Village, Corinth, Lake Dallas. Mail-in repair available nationwide.",
  keywords: "device repair Denton TX, phone repair Lewisville, tablet repair Flower Mound, computer repair Highland Village, drone repair Corinth, service areas Texas, mail-in repair nationwide",
  openGraph: {
    title: "Service Areas | Device Repair in Denton, TX & Surrounding Cities",
    description: "Professional device repair serving Denton, TX and surrounding communities. Expert iPhone, Samsung, tablet, computer, and drone repair with same-day service.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas | Device Repair in Denton, TX & Surrounding Cities",
    description: "Expert device repair serving Denton and surrounding Texas communities. Same-day service available.",
  },
  alternates: {
    canonical: "/service-areas",
  },
};

export default function ServiceAreasPage() {
  return (
    <main>
      <ServiceAreasHero />
      <LocationMap />
      <CitiesCoverage />
      <MailInRepair />
    </main>
  );
}