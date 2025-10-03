import { Metadata } from "next";
import { ComputerRepairHero } from "@/components/computer-repair/hero";
import { CommonComputerRepairs } from "@/components/computer-repair/common-repairs";
import { ComputerModels } from "@/components/computer-repair/computer-models";
import { WhyChooseComputer } from "@/components/computer-repair/why-choose";
import { ComputerRepairReviews } from "@/components/computer-repair/reviews";
import { CallEstimateComputer } from "@/components/computer-repair/call-estimate";
import { OtherComputerServices } from "@/components/computer-repair/other-services";

export const metadata: Metadata = {
  title: "Computer & Laptop Repair Services in Denton, TX | MacBook, PC & Laptop Repair",
  description: "Professional computer and laptop repair in Denton, TX. Same-day MacBook, PC, and laptop repairs. Screen replacement, battery repair, virus removal, and more. 60-day warranty, expert technicians.",
  keywords: "computer repair Denton TX, laptop repair, MacBook repair, PC repair, laptop screen replacement, computer virus removal, laptop battery replacement, computer repair near me",
  openGraph: {
    title: "Computer & Laptop Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Expert computer and laptop repair services in Denton, Texas. Same-day repairs with 60-day warranty for MacBook, PC, Windows laptops, and all computer systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Computer & Laptop Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Professional computer and laptop repair in Denton, TX. Same-day service for MacBook, PC, laptops with expert technicians.",
  },
  alternates: {
    canonical: "/services/computer-repair",
  },
};

export default function ComputerRepairPage() {
  return (
    <main>
      <ComputerRepairHero />
      <CommonComputerRepairs />
      <ComputerModels />
      <WhyChooseComputer />
      <ComputerRepairReviews />
      <CallEstimateComputer />
      <OtherComputerServices />
    </main>
  );
}