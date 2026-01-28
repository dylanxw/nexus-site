import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { GameConsoleRepairHero } from "@/components/console-repair/hero";
import { CommonConsoleRepairs } from "@/components/console-repair/common-repairs";
import { GameConsoleModels } from "@/components/console-repair/console-models";
import { WhyChooseConsole } from "@/components/console-repair/why-choose";
import { ConsoleRepairReviews } from "@/components/console-repair/reviews";
import { CallEstimateConsole } from "@/components/console-repair/call-estimate";
import { OtherConsoleServices } from "@/components/console-repair/other-services";

export const metadata: Metadata = {
  title: "Game Console Repair Services in Denton, TX | PlayStation, Xbox & Nintendo Repair",
  description: "Professional game console repair in Denton, TX. Same-day PlayStation, Xbox, and Nintendo repairs. HDMI port fixes, overheating solutions, and more. 60-day warranty, expert technicians.",
  keywords: "game console repair Denton TX, PlayStation repair, Xbox repair, Nintendo repair, PS5 repair, Xbox Series X repair, Nintendo Switch repair, console repair near me",
  openGraph: {
    title: "Game Console Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Expert game console repair services in Denton, Texas. Same-day repairs with 60-day warranty for PlayStation, Xbox, Nintendo Switch, and all gaming consoles.",
    url: `${siteConfig.url}/services/console-repair`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Game Console Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Professional game console repair in Denton, TX. Same-day service for PlayStation, Xbox, Nintendo with expert technicians.",
  },
  alternates: {
    canonical: `${siteConfig.url}/services/console-repair`,
  },
};

export default function GameConsoleRepairPage() {
  return (
    <main>
      <GameConsoleRepairHero />
      <CommonConsoleRepairs />
      <GameConsoleModels />
      <WhyChooseConsole />
      <ConsoleRepairReviews />
      <CallEstimateConsole />
      <OtherConsoleServices />
    </main>
  );
}