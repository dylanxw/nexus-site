"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hero } from "@/components/hero";
import { RepairForm } from "@/components/repair-form";
import { ServiceCards } from "@/components/service-cards";
import { WhyChoose } from "@/components/why-choose";
import { ShopPreowned } from "@/components/shop-preowned";
import { SellDevice } from "@/components/sell-device";
import { HowItWorks } from "@/components/how-it-works";
import { TrustBanner } from "@/components/trust-banner";
import { FAQ } from "@/components/faq";
import { ScheduleModal } from "@/components/schedule-modal";
import { QuoteModal } from "@/components/quote-modal";

export function HomePage() {
  const router = useRouter();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleQuoteClick = () => {
    router.push("/denton-tx/repair-form");
  };

  const handleScheduleClick = () => {
    router.push("/denton-tx/repair-form");
  };

  return (
    <div className="min-h-screen">
      <Hero
        onScheduleClick={handleScheduleClick}
        onQuoteClick={handleQuoteClick}
      />
      <RepairForm />
      <ServiceCards />
      <ShopPreowned />
      <WhyChoose />
      <SellDevice />
      <HowItWorks />
      <TrustBanner />
      <FAQ />

      <ScheduleModal
        open={isScheduleModalOpen}
        onOpenChange={setIsScheduleModalOpen}
      />
      <QuoteModal
        open={isQuoteModalOpen}
        onOpenChange={setIsQuoteModalOpen}
      />
    </div>
  );
}
