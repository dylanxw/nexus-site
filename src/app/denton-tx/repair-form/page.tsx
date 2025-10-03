import { Metadata } from "next";
import { Suspense } from "react";
import RepairFormClient from "./repair-form-client";

export const metadata: Metadata = {
  title: "Device Repair Form | Nexus Tech Solutions - Denton, TX",
  description: "Complete your device repair request form. Fast, reliable electronics repair for phones, tablets, computers & consoles in Denton, TX. Same-day service available.",
  keywords: "device repair form, phone repair denton, electronics repair, same day repair, nexus tech solutions",
  robots: "index, follow",
  openGraph: {
    title: "Device Repair Form | Nexus Tech Solutions",
    description: "Complete your device repair request form. Same-day service available in Denton, TX.",
    type: "website",
    locale: "en_US",
  },
};

export default function RepairFormPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <RepairFormClient />
      </Suspense>
    </div>
  );
}