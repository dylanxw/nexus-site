"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight, Info, AlertCircle } from "lucide-react";
import {
  NETWORK_CARRIERS,
  DEVICE_CONDITIONS,
  formatPrice,
} from "@/lib/pricing-calculator";
import { slugToModel, modelToSlug } from "@/lib/model-utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// iPhone models data
const iphoneModelsWithPrices = [
  {
    model: "iPhone 17 Pro Max",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-17-pro-max.avif",
    maxPrice: 890,
    storage: ["256GB", "512GB", "1TB", "2TB"],
  },
  {
    model: "iPhone 17 Pro",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-17-pro.avif",
    maxPrice: 780,
    storage: ["256GB", "512GB", "1TB"],
  },
  {
    model: "iPhone 17 Air",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-17-air.avif",
    maxPrice: 670,
    storage: ["256GB", "512GB", "1TB"],
  },
  {
    model: "iPhone 17",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-17.avif",
    maxPrice: 491,
    storage: ["256GB", "512GB"],
  },
  {
    model: "iPhone 16e",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-16e.avif",
    maxPrice: 319,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "iPhone 16 Pro Max",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-16-pro-max.avif",
    maxPrice: 733,
    storage: ["256GB", "512GB", "1TB"],
  },
  {
    model: "iPhone 16 Pro",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-16-pro.avif",
    maxPrice: 677,
    storage: ["128GB", "256GB", "512GB", "1TB"],
  },
  {
    model: "iPhone 16 Plus",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-16-plus.avif",
    maxPrice: 519,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "iPhone 16",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-16.avif",
    maxPrice: 445,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "iPhone 15 Pro Max",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-15-pro-max.avif",
    maxPrice: 580,
    storage: ["256GB", "512GB", "1TB"],
  },
  {
    model: "iPhone 15 Pro",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-15-pro.avif",
    maxPrice: 520,
    storage: ["128GB", "256GB", "512GB", "1TB"],
  },
  {
    model: "iPhone 15 Plus",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-15-plus.avif",
    maxPrice: 385,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "iPhone 15",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-15.avif",
    maxPrice: 350,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "iPhone 14 Pro Max",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-14-pro-max.avif",
    maxPrice: 460,
    storage: ["128GB", "256GB", "512GB", "1TB"],
  },
  {
    model: "iPhone 14 Pro",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-14-pro.avif",
    maxPrice: 380,
    storage: ["128GB", "256GB", "512GB", "1TB"],
  },
  {
    model: "iPhone 14 Plus",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-14-plus.avif",
    maxPrice: 295,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "iPhone 14",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-14.avif",
    maxPrice: 220,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "iPhone 13 Pro Max",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-13-pro-max.avif",
    maxPrice: 340,
    storage: ["128GB", "256GB", "512GB", "1TB"],
  },
  {
    model: "iPhone 13 Pro",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-13-pro.avif",
    maxPrice: 285,
    storage: ["128GB", "256GB", "512GB", "1TB"],
  },
  {
    model: "iPhone 13",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-13.avif",
    maxPrice: 195,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "iPhone 13 Mini",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-13-mini.avif",
    maxPrice: 170,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "iPhone 12 Pro Max",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-12-pro-max.avif",
    maxPrice: 275,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "iPhone 12 Pro",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-12-pro.avif",
    maxPrice: 230,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "iPhone 12",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-12.avif",
    maxPrice: 165,
    storage: ["64GB", "128GB", "256GB"],
  },
  {
    model: "iPhone 12 Mini",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-12-mini.avif",
    maxPrice: 145,
    storage: ["64GB", "128GB", "256GB"],
  },
  {
    model: "iPhone 11 Pro Max",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-11-pro-max.avif",
    maxPrice: 195,
    storage: ["64GB", "256GB", "512GB"],
  },
  {
    model: "iPhone 11 Pro",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-11-pro.avif",
    maxPrice: 165,
    storage: ["64GB", "256GB", "512GB"],
  },
  {
    model: "iPhone 11",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-11.avif",
    maxPrice: 125,
    storage: ["64GB", "128GB", "256GB"],
  },
  {
    model: "iPhone XS Max",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-xs-max.avif",
    maxPrice: 130,
    storage: ["64GB", "256GB", "512GB"],
  },
  {
    model: "iPhone XS",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-xs.avif",
    maxPrice: 95,
    storage: ["64GB", "256GB", "512GB"],
  },
  {
    model: "iPhone XR",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-xr.avif",
    maxPrice: 90,
    storage: ["64GB", "128GB", "256GB"],
  },
  {
    model: "iPhone X",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-x.avif",
    maxPrice: 85,
    storage: ["64GB", "256GB"],
  },
  {
    model: "iPhone 8 Plus",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-8-plus.avif",
    maxPrice: 70,
    storage: ["64GB", "128GB", "256GB"],
  },
  {
    model: "iPhone 8",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-8.avif",
    maxPrice: 50,
    storage: ["64GB", "128GB", "256GB"],
  },
  {
    model: "iPhone 7 Plus",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-7-plus.avif",
    maxPrice: 45,
    storage: ["32GB", "128GB", "256GB"],
  },
  {
    model: "iPhone 7",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-7.avif",
    maxPrice: 35,
    storage: ["32GB", "128GB", "256GB"],
  },
];

interface FormData {
  model: string;
  storage: string;
  network: string;
  condition: string;
}

export default function IPhoneModelPage() {
  const router = useRouter();
  const params = useParams();
  const modelSlug = params.model as string;
  const modelName = slugToModel(modelSlug);

  const modelData = iphoneModelsWithPrices.find(m => m.model === modelName);

  const [loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState<any>(null);
  const [pricingError, setPricingError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    model: modelName,
    storage: "",
    network: "",
    condition: "",
  });

  // Calculate price whenever selections change
  useEffect(() => {
    if (formData.storage && formData.network && formData.condition) {
      calculatePrice();
    } else {
      // Clear quote and error when selections are incomplete
      setQuoteData(null);
      setPricingError(null);
    }
  }, [formData.storage, formData.network, formData.condition]);

  const calculatePrice = async () => {
    try {
      setLoading(true);
      setPricingError(null);

      const response = await fetch("/api/buyback/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setQuoteData(data);
        setPricingError(null);
      } else {
        setQuoteData(null);
        setPricingError(data.error || "Unable to calculate price for this configuration. Please try different options.");
        console.error("Pricing error:", data);
      }
    } catch (error) {
      console.error("Error calculating price:", error);
      setQuoteData(null);
      setPricingError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetPaid = () => {
    if (!quoteData) {
      toast.error("Please complete all selections first");
      return;
    }

    // Store the current selection and quote in sessionStorage
    sessionStorage.setItem('buybackQuote', JSON.stringify({
      ...formData,
      offerPrice: quoteData.offerPrice,
      atlasPrice: quoteData.atlasPrice,
      image: modelData?.image
    }));

    // Navigate to overview page
    router.push(`/sell-a-device/iphone/${modelSlug}/overview`);
  };

  if (!modelData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Model Not Found</h1>
            <p className="text-muted-foreground mb-8">The iPhone model you're looking for doesn't exist.</p>
            <Link href="/sell-a-device/iphone">
              <Button className="bg-[#DB5858] hover:bg-[#c94848]">
                View All Models
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const canGetQuote = formData.storage && formData.network && formData.condition;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-3 text-sm">
            <Link href="/" className="text-[#DB5858] hover:text-[#c94848] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
            <Link href="/sell-a-device" className="text-[#DB5858] hover:text-[#c94848]">
              Sell My iPhone
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
            <span className="text-muted-foreground">Sell {modelName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Sell {modelName}
        </h2>

        {/* 3 Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Column 1: Image */}
          <div className="flex items-center justify-center bg-white rounded-lg p-8">
            <div className="relative w-full max-w-sm aspect-square">
              <Image
                src={modelData.image}
                alt={`${modelName} in ${formData.condition || 'various'} condition - Get up to $${modelData.maxPrice} cash value`}
                fill
                className="object-contain"
                unoptimized={true}
              />
            </div>
          </div>

          {/* Column 2: Configuration */}
          <div className="bg-white rounded-lg p-6">
            {/* Network */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-foreground/80">Network</span>
                <div className="bg-[#DB5858] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">!</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {NETWORK_CARRIERS.map((carrier) => (
                  <button
                    key={carrier.value}
                    onClick={() => setFormData(prev => ({ ...prev, network: carrier.value }))}
                    className={`
                      py-2 px-4 rounded-md border font-medium text-sm transition-all
                      ${
                        formData.network === carrier.value
                          ? "border-[#DB5858] bg-[#DB5858] text-white"
                          : "border-gray-300 hover:border-gray-400 bg-white"
                      }
                    `}
                  >
                    {carrier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Capacity */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-foreground/80">Storage Capacity</span>
                <div className="bg-[#DB5858] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">!</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {modelData.storage.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setFormData(prev => ({ ...prev, storage }))}
                    className={`
                      py-2 px-4 rounded-md border font-medium text-sm transition-all
                      ${
                        formData.storage === storage
                          ? "border-[#DB5858] bg-[#DB5858] text-white"
                          : "border-gray-300 hover:border-gray-400 bg-white"
                      }
                    `}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Device Condition */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-foreground/80">Device Condition</span>
                <div className="bg-[#DB5858] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">!</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {DEVICE_CONDITIONS.map((condition) => (
                  <button
                    key={condition.value}
                    onClick={() => setFormData(prev => ({ ...prev, condition: condition.value }))}
                    className={`
                      py-2 px-4 rounded-md border font-medium text-sm transition-all
                      ${
                        formData.condition === condition.value
                          ? "border-[#DB5858] bg-[#DB5858] text-white"
                          : "border-gray-300 hover:border-gray-400 bg-white"
                      }
                    `}
                  >
                    {condition.label}
                  </button>
                ))}
              </div>

              {/* Condition Details Box */}
              {formData.condition && (
                <div className="mt-4 p-4 bg-muted border border-border rounded-lg text-xs text-muted-foreground">
                  {formData.condition === 'Flawless' && (
                    <ul className="space-y-1">
                      <li>• Device looks brand new.</li>
                      <li>• Has absolutely no scratches, scuffs, or marks.</li>
                      <li>• Battery health must be above 85% (86% or higher).</li>
                      <li>• Absolutely no cracks or chips on the device.</li>
                      <li>• Absolutely no screen burn, white dots, or other pixel damage.</li>
                      <li>• Software is not modified or rooted.</li>
                      <li>• The device is fully functional.</li>
                    </ul>
                  )}
                  {formData.condition === 'Good' && (
                    <ul className="space-y-1">
                      <li>• Device shows light signs of wear.</li>
                      <li>• May have light scratches or marks.</li>
                      <li>• No cracks or deep scratches.</li>
                      <li>• Screen is fully functional without major defects.</li>
                      <li>• All features working properly.</li>
                    </ul>
                  )}
                  {formData.condition === 'Fair' && (
                    <ul className="space-y-1">
                      <li>• Device shows moderate to heavy signs of wear.</li>
                      <li>• May have deep scratches or dents.</li>
                      <li>• Screen may have minor cracks that don't affect functionality.</li>
                      <li>• All core features still work.</li>
                    </ul>
                  )}
                  {formData.condition === 'Broken' && (
                    <ul className="space-y-1">
                      <li>• Device has significant damage.</li>
                      <li>• Cracked screen or broken buttons.</li>
                      <li>• Device still powers on but may have limited functionality.</li>
                    </ul>
                  )}
                  {formData.condition === 'No Power' && (
                    <ul className="space-y-1">
                      <li>• Device does not turn on or respond to charging.</li>
                      <li>• May have water damage or other critical issues.</li>
                      <li>• Sold for parts only.</li>
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Price and Action */}
          <div className="bg-white rounded-lg p-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Your Device Is Valued At:
              </h2>

              {canGetQuote && quoteData ? (
                <>
                  <div className="text-5xl font-bold text-[#DB5858] mb-6">
                    {formatPrice(quoteData.offerPrice)}
                  </div>

                  <Button
                    onClick={handleGetPaid}
                    className="w-full bg-[#DB5858] hover:bg-[#c94848] text-white py-4 text-lg font-semibold"
                  >
                    Get Paid
                  </Button>
                </>
              ) : canGetQuote && pricingError ? (
                <>
                  <div className="text-5xl font-bold text-muted-foreground mb-6">
                    $--
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div className="text-sm text-red-700">
                        <p className="font-semibold">Pricing Not Available</p>
                        <p className="mt-1">{pricingError}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    disabled
                    className="w-full bg-gray-300 text-muted-foreground py-4 text-lg font-semibold cursor-not-allowed"
                  >
                    Get Paid
                  </Button>

                  <p className="text-xs text-muted-foreground mt-2">
                    Try selecting different options or contact support
                  </p>
                </>
              ) : (
                <>
                  <div className="text-5xl font-bold text-muted-foreground mb-6">
                    $--
                  </div>

                  <Button
                    disabled
                    className="w-full bg-gray-300 text-muted-foreground py-4 text-lg font-semibold cursor-not-allowed"
                  >
                    Get Paid
                  </Button>

                  <p className="text-sm text-muted-foreground mt-4">
                    {loading ? "Calculating price..." : "Please complete all selections to see your quote"}
                  </p>
                </>
              )}
            </div>

            {/* Important Notice */}
            <div className="mt-8 p-4 bg-muted border border-border rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-semibold mb-2">Important Information:</p>
                  <p className="mb-2">
                    We do NOT accept items that have been reported lost or stolen.
                  </p>
                  <p className="mb-2">
                    Any item that still has an iCloud, Google, Samsung account active will NOT be accepted either. View our{" "}
                    <Link href="/guide-to-removing-accounts" className="text-[#DB5858] hover:underline">
                      guide to removing accounts
                    </Link>.
                  </p>
                  <p>
                    The prices shown represent devices that have been fully paid off and are no longer on an account.
                    Devices with a balance due or active account will have a reduced value. Devices that have mobile
                    device management (MDM) active will also have a reduced value.
                  </p>
                </div>
              </div>
            </div>

            {/* Clear Selection */}
            {(formData.storage || formData.network || formData.condition) && (
              <button
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    storage: "",
                    network: "",
                    condition: ""
                  }));
                  setQuoteData(null);
                }}
                className="text-sm text-[#DB5858] hover:text-[#c94848] mt-4 underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

      </div>

      {/* SEO Content Section */}
      <div className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Why Sell Your {modelName} to Nexus Tech Solutions?
            </h2>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💵</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Best Local Prices</h3>
                <p className="text-sm text-muted-foreground">
                  Get top dollar for your {modelName} with our competitive pricing.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Instant Payment</h3>
                <p className="text-sm text-muted-foreground">
                  Visit our store and get paid on the spot - no waiting required.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Simple Process</h3>
                <p className="text-sm text-muted-foreground">
                  Get your quote online, bring your device, and walk out with cash.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Trusted Service</h3>
                <p className="text-sm text-muted-foreground">
                  Local business with years of experience in device repairs and buyback.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="border-t pt-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                How to Sell Your {modelName} in 3 Easy Steps
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="relative">
                  <div className="absolute -left-4 -top-2 w-8 h-8 bg-[#DB5858] text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="pl-6">
                    <h4 className="font-semibold text-foreground mb-2">Get Your Quote</h4>
                    <p className="text-sm text-muted-foreground">
                      Select your device specifications above to receive an instant quote. Our prices are updated daily to ensure you get the best value.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-4 -top-2 w-8 h-8 bg-[#DB5858] text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="pl-6">
                    <h4 className="font-semibold text-foreground mb-2">Prepare Your Device</h4>
                    <p className="text-sm text-muted-foreground">
                      Back up your data, remove your iCloud account, and perform a factory reset. Our team can help with this process in-store.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-4 -top-2 w-8 h-8 bg-[#DB5858] text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="pl-6">
                    <h4 className="font-semibold text-foreground mb-2">Get Paid</h4>
                    <p className="text-sm text-muted-foreground">
                      Visit our store for immediate payment or mail your device. In-store customers receive instant cash or digital payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Requirements */}
            <div className="border-t mt-12 pt-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {modelName} Trade-In Requirements
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <span className="text-green-500 mr-2">✓</span> What We Accept
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Devices that are fully paid off and owned by you</li>
                    <li>• All storage capacities ({modelData?.storage.join(', ')})</li>
                    <li>• Unlocked and carrier-locked devices</li>
                    <li>• Devices with cosmetic wear and minor damage</li>
                    <li>• Phones with degraded battery health</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <span className="text-red-500 mr-2">✗</span> What We Don't Accept
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Stolen or lost devices</li>
                    <li>• Devices with active iCloud, Google, or Samsung accounts</li>
                    <li>• Phones under lease or payment plans</li>
                    <li>• Devices with active MDM (Mobile Device Management)</li>
                    <li>• Counterfeit or replica devices</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions About Selling Your {modelName}
          </h2>

          <div className="space-y-4">
            {[
              {
                question: `How much is my ${modelName} worth?`,
                answer: `Your ${modelName} can be worth up to ${formatPrice(modelData?.maxPrice || 0)} depending on its storage capacity, carrier status, and condition. Use our instant quote tool above to get an exact price for your device.`
              },
              {
                question: "How long is my quote valid?",
                answer: "All quotes are valid for 14 days from the date of submission. This gives you plenty of time to prepare your device and visit our store or mail it in."
              },
              {
                question: "Do I need to include accessories?",
                answer: `No, you don't need to include the original box, charger, or accessories. We only need the ${modelName} itself. However, keeping your accessories allows you to sell or use them separately.`
              },
              {
                question: "What if my device condition changes?",
                answer: "If your device condition changes after receiving a quote (e.g., screen cracks or other damage occurs), we'll re-evaluate and provide an updated offer based on the actual condition during inspection."
              },
              {
                question: `Can I sell a damaged ${modelName}?`,
                answer: "Yes! We accept devices in various conditions including cracked screens, button issues, and even devices that won't turn on. Simply select the appropriate condition when getting your quote."
              },
              {
                question: "Do I need to remove my iCloud account?",
                answer: `Yes, you must remove your iCloud account before selling your ${modelName}. This is required by Apple and ensures your personal data remains secure. Our staff can help you with this process in-store.`
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white border border-border rounded-lg p-6 hover:shadow-lg transition-all"
              >
                <h3 className="font-bold mb-2 text-foreground text-lg">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">Have more questions?</p>
            <Link
              href="/contact"
              className="text-[#DB5858] hover:text-[#c94848] font-semibold"
            >
              Contact our support team →
            </Link>
          </div>
        </div>
      </div>

      {/* Local SEO Content */}
      <div className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Sell Your {modelName} Locally at Nexus Tech Solutions
            </h2>

            <div className="prose prose-lg max-w-none text-foreground/80">
              <p className="mb-6">
                Looking to sell your {modelName} quickly and securely? Nexus Tech Solutions offers the best buyback prices in the area with immediate payment options. Unlike online buyback services that require shipping and waiting, we provide instant evaluations and same-day payment.
              </p>

              <p className="mb-6">
                Our experienced technicians ensure accurate device assessments, and our transparent pricing means no surprises. Whether your {modelName} is in perfect condition or has seen better days, we'll make you a fair offer based on current market values.
              </p>

              <p className="mb-8">
                Skip the hassle of online marketplaces and classified ads. Get a guaranteed price for your {modelName} today with our simple three-step process. Visit our store for the fastest service, or use our mail-in option if you prefer.
              </p>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-3">
                  Ready to Sell Your {modelName}?
                </h3>
                <p className="mb-6 text-white/90">
                  Get your instant quote now and turn your old device into cash today!
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-[#DB5858] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Your Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}