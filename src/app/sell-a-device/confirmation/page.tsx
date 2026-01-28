"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Phone, MapPin, Mail, ArrowRight, Printer } from "lucide-react";
import { formatPrice } from "@/lib/pricing-calculator";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const quoteNumber = searchParams.get("quote");

  useEffect(() => {
    if (!quoteNumber) {
      router.push("/sell-a-device");
      return;
    }

    // Try to load quote instantly from sessionStorage (set during submission)
    const cached = sessionStorage.getItem('confirmationQuote');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Verify the cached data matches the requested quote number
        if (parsed.quoteNumber === quoteNumber) {
          setQuote(parsed);
          setLoading(false);
          sessionStorage.removeItem('confirmationQuote');
          return;
        }
      } catch {
        // Invalid cache — fall through to API fetch
      }
      sessionStorage.removeItem('confirmationQuote');
    }

    // Fallback: fetch from API (handles page refreshes, direct URL visits, shared links)
    fetchQuote();
  }, [quoteNumber]);

  const fetchQuote = async () => {
    try {
      const response = await fetch(`/api/buyback/quote?quoteNumber=${quoteNumber}`);
      const data = await response.json();

      if (data.success) {
        setQuote(data.quote);
      } else {
        router.push("/sell-a-device");
      }
    } catch (error) {
      router.push("/sell-a-device");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DB5858] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your quote...</p>
        </div>
      </div>
    );
  }

  if (!quote) {
    return null;
  }

  const expirationDate = new Date(quote.expiresAt);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Print-only business header — hidden on screen, shown when printing */}
          <div className="hidden print-only px-8 pt-6 pb-4" data-print-header>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{siteConfig.name}</h2>
                <p className="text-sm">{siteConfig.address.full}</p>
                <p className="text-sm">{siteConfig.phoneFormatted}</p>
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold">Buyback Quote</p>
                <p>Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
          </div>

          {/* Success Header */}
          <div data-print-header className="bg-gradient-to-br from-green-500 to-green-600 text-white px-8 pt-8 pb-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="h-9 w-9 text-white" />
            </motion.div>

            <h1 className="text-2xl font-bold mb-1">Quote Confirmed!</h1>
            <p className="text-green-100 text-sm font-mono tracking-wide">{quote.quoteNumber}</p>
          </div>

          {/* Offer Price — Hero section */}
          <div className="px-8 -mt-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              data-print-price
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center -mt-4 relative z-10 shadow-sm"
            >
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Your Offer</p>
              <p className="text-5xl sm:text-6xl font-extrabold text-[#DB5858] tracking-tight">
                {formatPrice(quote.offerPrice)}
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Valid until {expirationDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </motion.div>
          </div>

          <div className="px-8 pt-6 pb-8 space-y-6">
            {/* Device Details — compact inline */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
              <span className="font-medium text-gray-900">{quote.model}</span>
              <span className="text-gray-300">|</span>
              <span>{quote.storage}</span>
              <span className="text-gray-300">|</span>
              <span>{quote.network}</span>
              <span className="text-gray-300">|</span>
              <span>{quote.condition}</span>
            </div>

            {/* Divider */}
            <hr className="border-gray-100" />

            {/* Next Steps */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Get Paid</h2>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">Visit Our Store</h3>
                    <p className="text-sm text-gray-500">
                      Drop off your device for instant cash payment
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {siteConfig.address.full}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">Call for Shipping Label</h3>
                    <p className="text-sm text-gray-500">
                      We&apos;ll send you a prepaid label to mail your device
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {siteConfig.phoneFormatted} &middot; {siteConfig.hours.display}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">Check Your Email</h3>
                    <p className="text-sm text-gray-500">
                      Confirmation sent to {quote.customerEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
              <h3 className="font-semibold text-amber-900 text-sm mb-1.5">Before You Sell</h3>
              <ul className="text-xs text-amber-700 space-y-1">
                <li>&#8226; Back up and factory reset your device</li>
                <li>&#8226; Remove SIM cards and accessories</li>
                <li>&#8226; Device condition must match your selection for quoted price</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 no-print">
              <Button
                asChild
                className="flex-1 bg-[#DB5858] hover:bg-[#c94848] text-white h-11 font-semibold"
              >
                <a href={siteConfig.phoneHref}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now to Arrange Sale
                </a>
              </Button>

              <Button
                onClick={() => window.print()}
                variant="outline"
                className="flex-1 h-11 font-semibold"
              >
                <Printer className="mr-2 h-4 w-4" />
                Print Quote
              </Button>
            </div>

            <div className="flex justify-center no-print">
              <Link
                href="/sell-a-device"
                className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center gap-1"
              >
                Get Another Quote
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Footer contact */}
        <p className="mt-6 text-center text-sm text-gray-400 no-print">
          Questions? Call {siteConfig.phoneFormatted} or visit our store
        </p>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DB5858] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}