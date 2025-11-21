"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight, Package, Truck, Check, CreditCard, Shield, Clock, Zap } from "lucide-react";
import { formatPrice } from "@/lib/pricing-calculator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { customerInfoSchema } from "@/lib/validations/buyback";
import { z } from "zod";

interface OverviewTemplateProps {
  breadcrumbBase: string; // "Sell My iPhone" or "Sell My Samsung"
  deviceType: string; // "iPhone" or "Samsung"
  backPath: string; // Path to go back to
}

export default function OverviewTemplate({ breadcrumbBase, deviceType, backPath }: OverviewTemplateProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState<any>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  useEffect(() => {
    // Retrieve quote data from sessionStorage
    const storedQuote = sessionStorage.getItem('buybackQuote');
    if (storedQuote) {
      setQuoteData(JSON.parse(storedQuote));
    } else {
      // If no quote data, redirect back
      router.push(backPath);
    }

    // Fetch CSRF token
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch('/api/csrf-token');
        const data = await response.json();
        if (data.token) {
          setCsrfToken(data.token);
        }
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    fetchCSRFToken();
  }, [backPath, router]);

  const submitQuote = async () => {
    // Clear previous errors
    setFieldErrors({});

    if (!quoteData) {
      toast.error("No quote data found. Please go back and reconfigure your device.");
      return;
    }

    // Validate customer information using safeParse
    const validationResult = customerInfoSchema.safeParse(customerInfo);

    if (!validationResult.success) {
      // Handle validation errors
      const errors: { name?: string; email?: string; phone?: string } = {};

      // Safely access the errors array
      if (validationResult.error?.issues) {
        validationResult.error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof typeof errors;
          if (field) {
            errors[field] = issue.message;
          }
        });
      }

      console.log('Validation errors:', errors); // Debug log

      setFieldErrors(errors);

      // Show specific field errors in toast
      const errorMessages = Object.entries(errors).map(([field, msg]) => `${field}: ${msg}`);
      toast.error(errorMessages[0] || "Please fix the errors in the form");

      return; // Stop submission
    }

    // Validation passed, proceed with submission
    setLoading(true);

    try {
      const validatedData = validationResult.data;

      // Submit quote to API (prices calculated server-side for security)
      const response = await fetch('/api/buyback/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken || '',
        },
        body: JSON.stringify({
          model: quoteData.model,
          storage: quoteData.storage,
          network: quoteData.network,
          condition: quoteData.condition,
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          // ✅ Prices now calculated SERVER-SIDE for security
          // ❌ Never send client prices - they can be manipulated
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Clear session storage
        sessionStorage.removeItem('buybackQuote');

        // Check if email was sent successfully
        if (data.emailSent === false || data.warning) {
          // Quote created but email failed
          toast.warning(data.warning || "Your quote was created, but we couldn't send the confirmation email. Please save your quote number: " + data.quoteNumber, {
            duration: 8000, // Show longer for important message
          });
        } else {
          // Full success
          toast.success("Quote submitted successfully! Check your email for confirmation.");
        }

        // Navigate to confirmation with quote number
        router.push(`/sell-a-device/confirmation?quote=${data.quoteNumber}`);
      } else {
        toast.error(data.error || "Failed to submit quote. Please try again.");
      }
    } catch (error) {
      console.error("Quote submission error:", error);
      toast.error("An error occurred. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!quoteData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading quote data...</p>
        </div>
      </div>
    );
  }

  // Determine account removal message based on device type
  const getAccountRemovalMessage = () => {
    if (deviceType === "iPhone") {
      return "Make sure to remove your iCloud account and perform a factory reset before bringing or mailing your device. Check our guide for step-by-step instructions.";
    } else if (deviceType === "Samsung") {
      return "Make sure to remove your Samsung account and Google account before bringing or mailing your device. Check our guide for step-by-step instructions.";
    }
    return "Make sure to remove all accounts and perform a factory reset before bringing or mailing your device.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-3 text-sm">
            <Link href="/" className="text-[#DB5858] hover:text-[#c94848] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link href="/sell-a-device" className="text-[#DB5858] hover:text-[#c94848]">
              {breadcrumbBase}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link href={backPath} className="text-[#DB5858] hover:text-[#c94848]">
              {quoteData.model}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-600">Complete Your Quote</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Complete Your Quote
          </h1>

          {/* Two Column Layout matching the screenshot */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Device Summary Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Device Summary</h2>

                <div className="flex gap-4 mb-4">
                  {quoteData.image && (
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={quoteData.image}
                        alt={`${quoteData.model}`}
                        fill
                        className="object-contain"
                        unoptimized={true}
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{quoteData.model}</h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="text-gray-600">Storage: <span className="text-gray-900">{quoteData.storage}</span></div>
                      <div className="text-gray-600">Network: <span className="text-gray-900">{quoteData.network}</span></div>
                      <div className="text-gray-600">Condition: <span className="text-gray-900">{quoteData.condition}</span></div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Your Quote:</span>
                    <span className="text-3xl font-bold text-[#DB5858]">
                      {formatPrice(quoteData.offerPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* What Happens Next Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">What Happens Next?</h2>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[#DB5858] text-white rounded-full flex items-center justify-center">
                        <span className="font-bold">1</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email Confirmation</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        You'll receive an email confirmation with your quote details and instructions on how to bring your device to our store or mail it to us. Your quote is valid for 14 days.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[#DB5858] text-white rounded-full flex items-center justify-center">
                        <span className="font-bold">2</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Drop Off or Mail Your Device</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Visit our store for instant payment, or mail your device using the instructions in your email. Store drop-off is the fastest way to get paid!
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[#DB5858] text-white rounded-full flex items-center justify-center">
                        <span className="font-bold">3</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Device Inspection</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Our technicians will inspect your device to verify its condition matches your description. In-store inspections are completed immediately.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[#DB5858] text-white rounded-full flex items-center justify-center">
                        <span className="font-bold">4</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Get Paid</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Once inspection is complete, you'll receive payment. In-store customers get paid immediately. Mail-in devices are paid within 24 hours of inspection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Tip Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm">
                  <span className="font-semibold text-blue-900">Pro Tip:</span>{" "}
                  <span className="text-blue-800">
                    {getAccountRemovalMessage()}
                  </span>
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Contact Form Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h2>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  submitQuote();
                }} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={customerInfo.name}
                      onChange={(e) => {
                        setCustomerInfo(prev => ({ ...prev, name: e.target.value }));
                        if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: undefined }));
                      }}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                        fieldErrors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-[#DB5858]'
                      }`}
                      placeholder="John Doe"
                    />
                    {fieldErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => {
                        setCustomerInfo(prev => ({ ...prev, email: e.target.value }));
                        if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                        fieldErrors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-[#DB5858]'
                      }`}
                      placeholder="john@example.com"
                    />
                    {fieldErrors.email ? (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">We'll send your quote confirmation and instructions to this email</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => {
                        setCustomerInfo(prev => ({ ...prev, phone: e.target.value }));
                        if (fieldErrors.phone) setFieldErrors(prev => ({ ...prev, phone: undefined }));
                      }}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                        fieldErrors.phone
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-[#DB5858]'
                      }`}
                      placeholder="940-600-1012"
                    />
                    {fieldErrors.phone ? (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">We'll only contact you about your order if needed</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#DB5858] hover:bg-[#c94848] text-white py-3 font-semibold disabled:bg-gray-300"
                  >
                    {loading ? "Submitting..." : "Lock In This Price"}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <Link
                    href={backPath}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    ← Back to Edit Device
                  </Link>
                </div>

                <p className="text-xs text-gray-500 mt-6 text-center">
                  By clicking "Lock In This Price", you agree to our terms and conditions. This quote is valid for 14 days.
                  Your privacy is important to us - we'll never sell your information to third parties.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex justify-around py-4">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-gray-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Secure & Private</p>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-gray-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">In-Store Drop Off</p>
                </div>
                <div className="text-center">
                  <Zap className="w-8 h-8 text-gray-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Fast Payment</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}