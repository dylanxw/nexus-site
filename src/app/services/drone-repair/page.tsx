import { Metadata } from "next";
import { DroneRepairHero } from "@/components/drone-repair/hero";
import { CommonDroneRepairs } from "@/components/drone-repair/common-repairs";
import { DroneModels } from "@/components/drone-repair/drone-models";
import { WhyChooseDrone } from "@/components/drone-repair/why-choose";
import { DroneRepairReviews } from "@/components/drone-repair/reviews";
import { CallEstimateDrone } from "@/components/drone-repair/call-estimate";
import { OtherDroneServices } from "@/components/drone-repair/other-services";

export const metadata: Metadata = {
  title: "Drone Repair Services in Denton, TX | DJI, Autel & Professional Drone Repair",
  description: "Expert drone repair in Denton, TX. Same-day DJI Mavic, Mini, Phantom, Autel, and professional drone repairs. Crash damage, propeller replacement, camera repair. 60-day warranty.",
  keywords: "drone repair Denton TX, DJI repair, DJI Mavic repair, DJI Mini repair, DJI Phantom repair, Autel drone repair, drone crash repair, drone camera repair, drone repair near me",
  openGraph: {
    title: "Drone Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Professional drone repair services in Denton, Texas. Same-day repairs with 60-day warranty for DJI, Autel, Parrot, and all drone brands.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drone Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Expert drone repair in Denton, TX. Same-day service for DJI, Autel, professional drones with expert technicians.",
  },
  alternates: {
    canonical: "/services/drone-repair",
  },
};

export default function DroneRepairPage() {
  return (
    <main>
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