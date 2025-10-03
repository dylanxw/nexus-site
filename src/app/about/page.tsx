import type { Metadata } from "next";
import { AboutHero } from "@/components/about/hero";
import { FounderStory } from "@/components/about/founder-story";
import { OurMission } from "@/components/about/our-mission";
import { WhatMakesUsDifferent } from "@/components/about/what-makes-us-different";
import { OurValues } from "@/components/about/our-values";
import { TeamSection } from "@/components/about/team-section";
import { CommunityInvolvement } from "@/components/about/community-involvement";

export const metadata: Metadata = {
  title: "About Us | Nexus Tech Solutions - Local Device Repair Experts in Denton, TX",
  description: "Learn about Nexus Tech Solutions, founded by a passionate tech expert in Denton, TX. Our mission is to provide honest, reliable device repair services to the local community with exceptional customer care.",
  keywords: [
    "About Nexus Tech Solutions",
    "Denton TX device repair company",
    "local tech repair business",
    "founder story device repair",
    "Denton electronics repair history",
    "independent tech repair shop",
    "community tech services",
    "device repair mission",
    "local business Denton TX",
    "tech repair values",
    "honest device repair",
    "reliable tech services",
    "UNT area tech repair",
    "North Texas electronics",
    "family owned tech business"
  ],
  openGraph: {
    title: "About Us | Nexus Tech Solutions - Local Device Repair Experts",
    description: "Discover the story behind Nexus Tech Solutions and our commitment to providing exceptional device repair services to the Denton, TX community.",
    url: "https://nexustechsolutions.io/about",
    siteName: "Nexus Tech Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Nexus Tech Solutions - Local Device Repair Experts",
    description: "Learn about our mission to provide honest, reliable device repair services to Denton, TX and surrounding areas.",
  },
  alternates: {
    canonical: "https://nexustechsolutions.io/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <FounderStory />
      <OurMission />
      <WhatMakesUsDifferent />
      <OurValues />
      <TeamSection />
      <CommunityInvolvement />
    </main>
  );
}