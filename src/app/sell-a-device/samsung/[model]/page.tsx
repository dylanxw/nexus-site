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

// Samsung models data - complete list from all series pages
const samsungModelsWithPrices = [
  // Galaxy S Series (20 models)
  {
    model: "Galaxy S24 Ultra",
    image: "/images/sell-a-device/sell-samsung/galaxy-s24-ultra.avif",
    maxPrice: 800,
    storage: ["256GB", "512GB", "1TB"],
    popular: true,
  },
  {
    model: "Galaxy S24+",
    image: "/images/sell-a-device/sell-samsung/galaxy-s24-plus.avif",
    maxPrice: 650,
    storage: ["256GB", "512GB"],
    popular: true,
  },
  {
    model: "Galaxy S24",
    image: "/images/sell-a-device/sell-samsung/galaxy-s24.avif",
    maxPrice: 550,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S23 Ultra",
    image: "/images/sell-a-device/sell-samsung/galaxy-s23-ultra.avif",
    maxPrice: 600,
    storage: ["256GB", "512GB", "1TB"],
    popular: true,
  },
  {
    model: "Galaxy S23+",
    image: "/images/sell-a-device/sell-samsung/galaxy-s23-plus.avif",
    maxPrice: 450,
    storage: ["256GB", "512GB"],
  },
  {
    model: "Galaxy S23",
    image: "/images/sell-a-device/sell-samsung/galaxy-s23.avif",
    maxPrice: 380,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S22 Ultra",
    image: "/images/sell-a-device/sell-samsung/galaxy-s22-ultra.avif",
    maxPrice: 480,
    storage: ["128GB", "256GB", "512GB", "1TB"],
  },
  {
    model: "Galaxy S22+",
    image: "/images/sell-a-device/sell-samsung/galaxy-s22-plus.avif",
    maxPrice: 350,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S22",
    image: "/images/sell-a-device/sell-samsung/galaxy-s22.avif",
    maxPrice: 280,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S21 Ultra",
    image: "/images/sell-a-device/sell-samsung/galaxy-s21-ultra.avif",
    maxPrice: 380,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "Galaxy S21+",
    image: "/images/sell-a-device/sell-samsung/galaxy-s21-plus.avif",
    maxPrice: 280,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S21",
    image: "/images/sell-a-device/sell-samsung/galaxy-s21.avif",
    maxPrice: 220,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S20 Ultra",
    image: "/images/sell-a-device/sell-samsung/galaxy-s20-ultra.avif",
    maxPrice: 280,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "Galaxy S20+",
    image: "/images/sell-a-device/sell-samsung/galaxy-s20-plus.avif",
    maxPrice: 200,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S20",
    image: "/images/sell-a-device/sell-samsung/galaxy-s20.avif",
    maxPrice: 160,
    storage: ["128GB"],
  },
  {
    model: "Galaxy S10+",
    image: "/images/sell-a-device/sell-samsung/galaxy-s10-plus.avif",
    maxPrice: 150,
    storage: ["128GB", "512GB", "1TB"],
  },
  {
    model: "Galaxy S10",
    image: "/images/sell-a-device/sell-samsung/galaxy-s10.avif",
    maxPrice: 120,
    storage: ["128GB", "512GB"],
  },
  {
    model: "Galaxy S10e",
    image: "/images/sell-a-device/sell-samsung/galaxy-s10e.avif",
    maxPrice: 100,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S9+",
    image: "/images/sell-a-device/sell-samsung/galaxy-s9-plus.avif",
    maxPrice: 80,
    storage: ["64GB", "128GB", "256GB"],
  },
  {
    model: "Galaxy S9",
    image: "/images/sell-a-device/sell-samsung/galaxy-s9.avif",
    maxPrice: 60,
    storage: ["64GB", "128GB", "256GB"],
  },
  // Galaxy Z Series (12 models)
  {
    model: "Galaxy Z Fold 6",
    image: "/images/sell-a-device/sell-samsung/galaxy-z-fold6.avif",
    maxPrice: 900,
    storage: ["256GB", "512GB", "1TB"],
    popular: true,
  },
  {
    model: "Galaxy Z Fold 5",
    image: "/images/sell-a-device/sell-samsung/galaxy-z-fold5.avif",
    maxPrice: 750,
    storage: ["256GB", "512GB", "1TB"],
    popular: true,
  },
  {
    model: "Galaxy Z Fold 4",
    image: "/images/sell-a-device/sell-samsung/galaxy-z-fold4.avif",
    maxPrice: 580,
    storage: ["256GB", "512GB", "1TB"],
  },
  {
    model: "Galaxy Z Fold 3",
    image: "/images/sell-a-device/sell-samsung/galaxy-z-fold3.avif",
    maxPrice: 450,
    storage: ["256GB", "512GB"],
  },
  {
    model: "Galaxy Z Fold 2",
    image: "/images/sell-a-device/sell-samsung/galaxy-z-fold2.avif",
    maxPrice: 350,
    storage: ["256GB", "512GB"],
  },
  {
    model: "Galaxy Z Fold",
    image: "/images/sell-a-device/sell-samsung/galaxy-z-fold.avif",
    maxPrice: 250,
    storage: ["512GB"],
  },
  {
    model: "Galaxy Z Flip 6",
    image: "/images/sell-a-device/sell-samsung/galaxy-z-flip6.avif",
    maxPrice: 650,
    storage: ["256GB", "512GB"],
    popular: true,
  },
  {
    model: "Galaxy Z Flip 5",
    image: "/images/sell-a-device/sell-samsung/galaxy-z-flip5.avif",
    maxPrice: 550,
    storage: ["256GB", "512GB"],
    popular: true,
  },
  {
    model: "Galaxy Z Flip 4",
    image: "/images/sell-a-device/sell-samsung/galaxy-z-flip4.avif",
    maxPrice: 380,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "Galaxy Z Flip 3",
    image: "/images/sell-a-device/sell-samsung/galaxy-z-flip3.avif",
    maxPrice: 280,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy Z Flip",
    image: "/images/sell-a-device/sell-samsung/galaxy-z-flip.avif",
    maxPrice: 180,
    storage: ["256GB"],
  },
  {
    model: "Galaxy Z Flip 5G",
    image: "/images/sell-a-device/sell-samsung/galaxy-z-flip-5g.avif",
    maxPrice: 200,
    storage: ["256GB"],
  },
  // Galaxy Note Series (12 models)
  {
    model: "Galaxy Note 20 Ultra",
    image: "/images/sell-a-device/sell-samsung/galaxy-note20-ultra.avif",
    maxPrice: 450,
    storage: ["128GB", "256GB", "512GB"],
    popular: true,
  },
  {
    model: "Galaxy Note 20",
    image: "/images/sell-a-device/sell-samsung/galaxy-note20.avif",
    maxPrice: 350,
    storage: ["128GB", "256GB"],
    popular: true,
  },
  {
    model: "Galaxy Note 10+",
    image: "/images/sell-a-device/sell-samsung/galaxy-note10-plus.avif",
    maxPrice: 280,
    storage: ["256GB", "512GB"],
  },
  {
    model: "Galaxy Note 10",
    image: "/images/sell-a-device/sell-samsung/galaxy-note10.avif",
    maxPrice: 220,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy Note 10 Lite",
    image: "/images/sell-a-device/sell-samsung/galaxy-note10-lite.avif",
    maxPrice: 180,
    storage: ["128GB"],
  },
  {
    model: "Galaxy Note 9",
    image: "/images/sell-a-device/sell-samsung/galaxy-note9.avif",
    maxPrice: 150,
    storage: ["128GB", "512GB"],
  },
  {
    model: "Galaxy Note 8",
    image: "/images/sell-a-device/sell-samsung/galaxy-note8.avif",
    maxPrice: 100,
    storage: ["64GB", "128GB", "256GB"],
  },
  {
    model: "Galaxy Note 7",
    image: "/images/sell-a-device/sell-samsung/galaxy-note7.avif",
    maxPrice: 50,
    storage: ["64GB"],
  },
  {
    model: "Galaxy Note 5",
    image: "/images/sell-a-device/sell-samsung/galaxy-note5.avif",
    maxPrice: 40,
    storage: ["32GB", "64GB"],
  },
  {
    model: "Galaxy Note 4",
    image: "/images/sell-a-device/sell-samsung/galaxy-note4.avif",
    maxPrice: 30,
    storage: ["32GB"],
  },
  {
    model: "Galaxy Note Edge",
    image: "/images/sell-a-device/sell-samsung/galaxy-note-edge.avif",
    maxPrice: 35,
    storage: ["32GB", "64GB"],
  },
  {
    model: "Galaxy Note 3",
    image: "/images/sell-a-device/sell-samsung/galaxy-note3.avif",
    maxPrice: 25,
    storage: ["32GB"],
  },
  // Galaxy A Series (30 models)
  {
    model: "Galaxy A54",
    image: "/images/sell-a-device/sell-samsung/galaxy-a54.avif",
    maxPrice: 250,
    storage: ["128GB", "256GB"],
    popular: true,
  },
  {
    model: "Galaxy A53",
    image: "/images/sell-a-device/sell-samsung/galaxy-a53.avif",
    maxPrice: 180,
    storage: ["128GB", "256GB"],
    popular: true,
  },
  {
    model: "Galaxy A52",
    image: "/images/sell-a-device/sell-samsung/galaxy-a52.avif",
    maxPrice: 150,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy A51",
    image: "/images/sell-a-device/sell-samsung/galaxy-a51.avif",
    maxPrice: 120,
    storage: ["128GB"],
  },
  {
    model: "Galaxy A50",
    image: "/images/sell-a-device/sell-samsung/galaxy-a50.avif",
    maxPrice: 90,
    storage: ["64GB", "128GB"],
  },
  {
    model: "Galaxy A34",
    image: "/images/sell-a-device/sell-samsung/galaxy-a34.avif",
    maxPrice: 180,
    storage: ["128GB", "256GB"],
    popular: true,
  },
  {
    model: "Galaxy A33",
    image: "/images/sell-a-device/sell-samsung/galaxy-a33.avif",
    maxPrice: 140,
    storage: ["128GB"],
  },
  {
    model: "Galaxy A32",
    image: "/images/sell-a-device/sell-samsung/galaxy-a32.avif",
    maxPrice: 100,
    storage: ["64GB", "128GB"],
  },
  {
    model: "Galaxy A31",
    image: "/images/sell-a-device/sell-samsung/galaxy-a31.avif",
    maxPrice: 80,
    storage: ["128GB"],
  },
  {
    model: "Galaxy A30",
    image: "/images/sell-a-device/sell-samsung/galaxy-a30.avif",
    maxPrice: 60,
    storage: ["32GB", "64GB"],
  },
  {
    model: "Galaxy A24",
    image: "/images/sell-a-device/sell-samsung/galaxy-a24.avif",
    maxPrice: 140,
    storage: ["128GB"],
  },
  {
    model: "Galaxy A23",
    image: "/images/sell-a-device/sell-samsung/galaxy-a23.avif",
    maxPrice: 110,
    storage: ["64GB", "128GB"],
  },
  {
    model: "Galaxy A22",
    image: "/images/sell-a-device/sell-samsung/galaxy-a22.avif",
    maxPrice: 80,
    storage: ["64GB", "128GB"],
  },
  {
    model: "Galaxy A21",
    image: "/images/sell-a-device/sell-samsung/galaxy-a21.avif",
    maxPrice: 60,
    storage: ["32GB"],
  },
  {
    model: "Galaxy A20",
    image: "/images/sell-a-device/sell-samsung/galaxy-a20.avif",
    maxPrice: 40,
    storage: ["32GB"],
  },
  {
    model: "Galaxy A14",
    image: "/images/sell-a-device/sell-samsung/galaxy-a14.avif",
    maxPrice: 120,
    storage: ["64GB", "128GB"],
  },
  {
    model: "Galaxy A13",
    image: "/images/sell-a-device/sell-samsung/galaxy-a13.avif",
    maxPrice: 90,
    storage: ["32GB", "64GB", "128GB"],
  },
  {
    model: "Galaxy A12",
    image: "/images/sell-a-device/sell-samsung/galaxy-a12.avif",
    maxPrice: 70,
    storage: ["32GB", "64GB", "128GB"],
  },
  {
    model: "Galaxy A11",
    image: "/images/sell-a-device/sell-samsung/galaxy-a11.avif",
    maxPrice: 50,
    storage: ["32GB"],
  },
  {
    model: "Galaxy A10",
    image: "/images/sell-a-device/sell-samsung/galaxy-a10.avif",
    maxPrice: 35,
    storage: ["32GB"],
  },
  {
    model: "Galaxy A04",
    image: "/images/sell-a-device/sell-samsung/galaxy-a04.avif",
    maxPrice: 60,
    storage: ["32GB", "64GB"],
  },
  {
    model: "Galaxy A03",
    image: "/images/sell-a-device/sell-samsung/galaxy-a03.avif",
    maxPrice: 40,
    storage: ["32GB", "64GB"],
  },
  {
    model: "Galaxy A02",
    image: "/images/sell-a-device/sell-samsung/galaxy-a02.avif",
    maxPrice: 30,
    storage: ["32GB"],
  },
  {
    model: "Galaxy A01",
    image: "/images/sell-a-device/sell-samsung/galaxy-a01.avif",
    maxPrice: 25,
    storage: ["16GB", "32GB"],
  },
  {
    model: "Galaxy A73",
    image: "/images/sell-a-device/sell-samsung/galaxy-a73.avif",
    maxPrice: 200,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy A72",
    image: "/images/sell-a-device/sell-samsung/galaxy-a72.avif",
    maxPrice: 160,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy A71",
    image: "/images/sell-a-device/sell-samsung/galaxy-a71.avif",
    maxPrice: 130,
    storage: ["128GB"],
  },
  {
    model: "Galaxy A70",
    image: "/images/sell-a-device/sell-samsung/galaxy-a70.avif",
    maxPrice: 100,
    storage: ["128GB"],
  },
  {
    model: "Galaxy A80",
    image: "/images/sell-a-device/sell-samsung/galaxy-a80.avif",
    maxPrice: 110,
    storage: ["128GB"],
  },
  {
    model: "Galaxy A90",
    image: "/images/sell-a-device/sell-samsung/galaxy-a90.avif",
    maxPrice: 120,
    storage: ["128GB"],
  },
];

export default function SamsungModelPage() {
  const router = useRouter();
  const params = useParams();
  const modelSlug = params.model as string;
  const modelName = slugToModel(modelSlug);

  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    model: modelName,
    storage: "",
    network: "",
    condition: "",
  });

  const [quoteData, setQuoteData] = useState<any>(null);

  // Find the model data
  const modelData = samsungModelsWithPrices.find(
    m => m.model === modelName || modelToSlug(m.model) === modelSlug
  );

  // Check if we can provide a quote
  const canGetQuote = formData.storage && formData.network && formData.condition;

  // Calculate quote when selections change
  useEffect(() => {
    if (canGetQuote && modelData) {
      const calculateQuote = () => {
        let basePrice = modelData.maxPrice;

        // Adjust for condition
        const conditionMultipliers: { [key: string]: number } = {
          'Flawless': 1.0,
          'Good': 0.85,
          'Fair': 0.65,
          'Broken': 0.35,
          'No Power': 0.15,
        };

        basePrice *= conditionMultipliers[formData.condition] || 0.5;

        // Adjust for carrier (unlocked gets premium)
        if (formData.network !== 'Unlocked') {
          basePrice *= 0.92;
        }

        // Adjust for storage
        const storageIndex = modelData.storage.indexOf(formData.storage);
        const storageMultiplier = 1 - (storageIndex * 0.08);
        basePrice *= storageMultiplier;

        // Create quote data
        const quote = {
          model: formData.model,
          storage: formData.storage,
          network: formData.network,
          condition: formData.condition,
          basePrice: Math.round(basePrice * 0.85),
          offerPrice: Math.round(basePrice),
          atlasPrice: Math.round(basePrice * 1.1),
          image: modelData.image
        };

        setQuoteData(quote);
      };

      calculateQuote();
    } else {
      setQuoteData(null);
    }
  }, [formData, canGetQuote, modelData]);

  const handleGetPaid = () => {
    if (!canGetQuote || !quoteData) {
      toast.error("Please complete all selections first");
      return;
    }

    // Store quote data in sessionStorage
    sessionStorage.setItem('buybackQuote', JSON.stringify(quoteData));

    // Navigate to overview page
    router.push(`/sell-a-device/samsung/${modelSlug}/overview`);
  };

  if (!modelData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Model Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The Samsung model you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/sell-a-device/samsung"
              className="text-[#DB5858] hover:text-[#c94848] font-semibold"
            >
              ← Back to Samsung Models
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-3 text-sm flex-wrap">
            <Link href="/" className="text-[#DB5858] hover:text-[#c94848] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
            <Link href="/sell-a-device" className="text-[#DB5858] hover:text-[#c94848]">
              Device Buyback
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
            <Link href="/sell-a-device/samsung" className="text-[#DB5858] hover:text-[#c94848]">
              Sell Samsung
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
            <span className="text-muted-foreground">{modelName}</span>
          </div>
        </div>
      </div>

      {/* Main Content - Matching iPhone layout exactly */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Configure Your {modelName}
        </h2>

        {/* Three Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Column 1: Device Image */}
          <div className="bg-white rounded-lg p-6">
            <div className="aspect-square relative mb-4">
              {imageError ? (
                <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-6xl">📱</div>
                </div>
              ) : (
                <Image
                  src={modelData.image}
                  alt={`${modelName} - Get up to ${formatPrice(modelData.maxPrice)} cash for trade-in`}
                  fill
                  className="object-contain"
                  onError={() => setImageError(true)}
                  unoptimized={true}
                />
              )}
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">{modelName}</h2>
              <p className="text-sm text-muted-foreground">
                Maximum value: <span className="font-semibold text-[#DB5858]">{formatPrice(modelData.maxPrice)}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Configuration Options */}
          <div className="bg-white rounded-lg p-6">
            {/* Network Carrier */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-foreground/80">Network Carrier</span>
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
                    Please complete all selections to see your quote
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

      {/* SEO Content Section - Matching iPhone page */}
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
                      Back up your data, remove your Samsung and Google accounts, and perform a factory reset. Our team can help with this process in-store.
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
                question: "Do I need to remove my Samsung account?",
                answer: `Yes, you must remove your Samsung account and Google account before selling your ${modelName}. This is required by Samsung and ensures your personal data remains secure. Our staff can help you with this process in-store.`
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
                  Configure your device above to get started with your instant quote
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
                  className="bg-white text-[#DB5858] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Configure Device Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}