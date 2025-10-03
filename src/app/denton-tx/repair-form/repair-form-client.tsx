"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { RepairForm } from "@/components/repair-form";

interface FormPresets {
  device?: string;
  brand?: string;
  service?: string;
  step?: number;
}

export default function RepairFormClient() {
  const searchParams = useSearchParams();
  const [formPresets, setFormPresets] = useState<FormPresets>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const device = searchParams.get("device");
    const brand = searchParams.get("brand");
    const service = searchParams.get("service");

    const presets: FormPresets = {};
    let initialStep = 1;

    if (device) {
      presets.device = device;
      initialStep = 2; // Skip device selection

      if (brand) {
        presets.brand = brand;
        initialStep = 2; // Stay at step 2 for model selection

        if (service) {
          presets.service = service;
          // Keep at step 2, service will be pre-selected in step 3
        }
      }
    }

    presets.step = initialStep;
    setFormPresets(presets);
    setIsLoaded(true);
  }, [searchParams]);

  // Don't render until we've checked the URL parameters
  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <RepairForm
      initialDevice={formPresets.device || ""}
      initialBrand={formPresets.brand || ""}
      initialService={formPresets.service || ""}
      initialStep={formPresets.step || 1}
      standalone={true}
    />
  );
}