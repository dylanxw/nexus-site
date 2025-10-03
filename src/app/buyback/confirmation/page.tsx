"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Phone, MapPin, Mail, ArrowRight } from "lucide-react";
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
      router.push("/buyback");
      return;
    }

    fetchQuote();
  }, [quoteNumber]);

  const fetchQuote = async () => {
    try {
      const response = await fetch(`/api/buyback/quote?quoteNumber=${quoteNumber}`);
      const data = await response.json();

      if (data.success) {
        setQuote(data.quote);
      } else {
        router.push("/buyback");
      }
    } catch (error) {
      router.push("/buyback");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DB5858] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your quote...</p>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="h-12 w-12 text-green-500" />
            </motion.div>

            <h1 className="text-3xl font-bold mb-2">Quote Confirmed!</h1>
            <p className="text-xl">Your quote number is: {quote.quoteNumber}</p>
          </div>

          {/* Quote Details */}
          <div className="p-8">
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Your Quote Details</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-600 mb-2">Device Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model:</span>
                      <span className="font-medium">{quote.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Storage:</span>
                      <span className="font-medium">{quote.storage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Network:</span>
                      <span className="font-medium">{quote.network}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Condition:</span>
                      <span className="font-medium">{quote.condition}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-600 mb-2">Offer Details</h3>
                  <div className="bg-[#DB5858] text-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">
                      {formatPrice(quote.offerPrice)}
                    </div>
                    <div className="text-sm mt-2 opacity-90">
                      Valid until {expirationDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">How to Get Paid</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Visit Our Store</h3>
                    <p className="text-gray-600">
                      Bring your device to our Denton location for instant cash payment
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {siteConfig.address.full}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call for Shipping Label</h3>
                    <p className="text-gray-600">
                      Contact us to receive a prepaid shipping label
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {siteConfig.phoneFormatted} - {siteConfig.hours.display}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Check Your Email</h3>
                    <p className="text-gray-600">
                      We've sent your quote details to {quote.customerEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">Important Information</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Your quote is valid for 14 days from today</li>
                <li>• Make sure to back up and wipe your device before selling</li>
                <li>• Remove all accessories and SIM cards</li>
                <li>• Device condition must match your selection to receive quoted price</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="flex-1 bg-[#DB5858] hover:bg-[#c94848] text-white py-3"
              >
                <a href={siteConfig.phoneHref}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now to Arrange Sale
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="flex-1 py-3"
              >
                <Link href="/buyback">
                  Get Another Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <div className="mt-8 text-center text-gray-600">
          <p>Questions about your quote?</p>
          <p className="font-semibold">
            Call us at {siteConfig.phoneFormatted} or visit our store
          </p>
        </div>
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
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}