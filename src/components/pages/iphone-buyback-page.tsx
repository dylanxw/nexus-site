"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight, Search, Shield, Clock, DollarSign, TrendingUp, Star, CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/pricing-calculator";
import { modelToSlug } from "@/lib/model-utils";
import { Button } from "@/components/ui/button";

// iPhone models with max prices
const iphoneModelsWithPrices = [
  {
    model: "iPhone 17 Pro Max",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-17-pro-max.avif",
    maxPrice: 1013,
    storage: ["256GB", "512GB", "1TB", "2TB"],
    popular: true,
  },
  {
    model: "iPhone 17 Pro",
    image: "/images/sell-a-device/sell-iphone/apple-iphone-17-pro.avif",
    maxPrice: 780,
    storage: ["256GB", "512GB", "1TB"],
    popular: true,
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
    popular: true,
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

export function IphoneBuybackPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [maxPrices, setMaxPrices] = useState<Record<string, number>>({});
  const [loadingPrices, setLoadingPrices] = useState(true);

  // Fetch dynamic max prices on component mount
  useEffect(() => {
    async function fetchMaxPrices() {
      try {
        const response = await fetch('/api/sell-a-device/max-prices');
        const data = await response.json();

        if (data.success) {
          setMaxPrices(data.maxPrices);
        }
      } catch (error) {
        console.error('Error fetching max prices:', error);
      } finally {
        setLoadingPrices(false);
      }
    }

    fetchMaxPrices();
  }, []);

  const handleModelSelect = (model: string) => {
    const slug = modelToSlug(model);
    router.push(`/sell-a-device/iphone/${slug}`);
  };

  // Merge dynamic prices with static model data
  const phonesWithDynamicPrices = iphoneModelsWithPrices.map(phone => ({
    ...phone,
    maxPrice: maxPrices[phone.model] || phone.maxPrice, // Use dynamic price or fallback to static
  }));

  // Filter phones based on search query
  const filteredPhones = phonesWithDynamicPrices.filter(phone =>
    phone.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              Device Buyback
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-600">Sell iPhone</span>
          </div>
        </div>
      </div>

      {/* Simplified Header */}
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Sell Your iPhone for Top Dollar
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-1">
              Choose your iPhone model to get an instant buyback quote
            </p>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto mb-6">
              Get instant quotes up to $890 • Same-day payment • Data security guaranteed
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for your iPhone model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#DB5858] focus:border-transparent focus:outline-none"
                />
                <button className="absolute right-1 top-1 bottom-1 px-3 bg-[#DB5858] hover:bg-[#c94848] text-white rounded transition-colors">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* iPhone Models Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {filteredPhones.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No iPhone models found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-[#DB5858] hover:text-[#c94848] underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredPhones.map((phone, index) => (
              <motion.div
                key={phone.model}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="relative"
              >
                {phone.popular && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3" fill="currentColor" />
                      Popular
                    </div>
                  </div>
                )}

                <div
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-[#DB5858] hover:shadow-xl transition-all cursor-pointer group h-full flex flex-col"
                  onClick={() => handleModelSelect(phone.model)}
                >
                  {/* Phone Image */}
                  <div className="aspect-square relative mb-3 flex-shrink-0">
                    {imageErrors.has(phone.image) ? (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-5xl">📱</div>
                      </div>
                    ) : (
                      <Image
                        src={phone.image}
                        alt={`Sell ${phone.model} for up to $${phone.maxPrice} - Trade in your ${phone.model} today`}
                        fill
                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                        onError={() => {
                          setImageErrors(prev => new Set(prev).add(phone.image));
                        }}
                        unoptimized={true}
                      />
                    )}
                  </div>

                  {/* Phone Info */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-sm text-gray-900 mb-1 text-center">
                      {phone.model}
                    </h3>

                    <div className="text-center mb-3 flex-1">
                      <p className="text-xs text-gray-500 mb-1">Get up to</p>
                      {loadingPrices ? (
                        <div className="flex items-center justify-center h-8">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#DB5858]"></div>
                        </div>
                      ) : (
                        <p className="text-2xl font-bold text-[#DB5858]">
                          {formatPrice(phone.maxPrice)}
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-[#DB5858] hover:bg-[#c94848] text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm">
                      Get Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How Our iPhone Buyback Program Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white border-2 border-[#DB5858] text-[#DB5858] rounded-full
                            flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-bold mb-2 text-gray-900">Get Instant Quote</h3>
              <p className="text-sm text-gray-600">Select your iPhone model and condition to receive an instant price quote valid for 14 days.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white border-2 border-[#DB5858] text-[#DB5858] rounded-full
                            flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-bold mb-2 text-gray-900">Ship or Drop Off</h3>
              <p className="text-sm text-gray-600">Visit our store for immediate payment or use our mail-in service with provided instructions.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white border-2 border-[#DB5858] text-[#DB5858] rounded-full
                            flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-bold mb-2 text-gray-900">Get Paid Fast</h3>
              <p className="text-sm text-gray-600">Receive payment via your preferred method - cash, check, or digital payment same day.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Sell Your iPhone to Nexus Tech Solutions?
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                Nexus Tech Solutions is your trusted local partner for iPhone buyback services. We offer the most competitive prices in the market,
                with quotes up to $890 for the latest iPhone models. Our streamlined process ensures you get paid quickly and securely.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Best Market Prices</h3>
                  <p className="text-sm text-gray-600">
                    We offer competitive prices that beat most online buyback services and local competitors. Daily price updates ensure maximum value.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Data Security Guaranteed</h3>
                  <p className="text-sm text-gray-600">
                    Complete data wipes following Department of Defense standards. Your personal information is permanently removed before resale.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Payment Processing</h3>
                  <p className="text-sm text-gray-600">
                    In-store customers receive immediate payment. Mail-in devices are processed within 24 hours of receipt.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">All Models Accepted</h3>
                  <p className="text-sm text-gray-600">
                    We buy all iPhone models from iPhone 7 to iPhone 17 Pro Max, in any condition including broken or water damaged.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] text-white p-8 rounded-xl text-center">
                <h3 className="text-2xl font-bold mb-3">
                  Ready to Sell Your iPhone?
                </h3>
                <p className="mb-6 text-white/90">
                  Join thousands of satisfied customers who've sold their iPhones to Nexus Tech Solutions
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-[#DB5858] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Select Your iPhone Model
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                question: "Which iPhone models do you buy?",
                answer: "We buy all iPhone models from iPhone 7 to the latest iPhone 17 Pro Max. Whether your device is in perfect condition or has damage, we'll make you an offer."
              },
              {
                question: "How are prices determined?",
                answer: "Our prices are based on current market values, device model, storage capacity, carrier status, and condition. We update our prices daily to ensure you get the best value."
              },
              {
                question: "Is my data safe?",
                answer: "Absolutely. We perform complete data wipes on all devices following Department of Defense standards. We recommend backing up and factory resetting your device before bringing it in."
              },
              {
                question: "How quickly do I get paid?",
                answer: "In-store customers receive payment immediately after device inspection. Mail-in customers are paid within 24 hours of device receipt and inspection."
              },
              {
                question: "What condition does my iPhone need to be in?",
                answer: "We accept iPhones in any condition - from like new to broken screens, water damage, or devices that won't turn on. Just be honest about the condition when getting your quote."
              },
              {
                question: "Do I need the original box and accessories?",
                answer: "No, you don't need the original box or accessories. While having them may slightly increase the value, we primarily evaluate the device itself."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all"
              >
                <h3 className="font-bold mb-2 text-gray-900 text-lg">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">Have more questions?</p>
            <Link
              href="/contact"
              className="text-[#DB5858] hover:text-[#c94848] font-semibold"
            >
              Contact our support team →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Trust Section */}
      <div className="bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Trusted by Thousands of Customers
            </h3>
            <div className="flex flex-wrap justify-center gap-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">10,000+</p>
                <p className="text-sm text-gray-600">Devices Purchased</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">$2M+</p>
                <p className="text-sm text-gray-600">Paid to Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">4.9★</p>
                <p className="text-sm text-gray-600">Customer Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">5+ Years</p>
                <p className="text-sm text-gray-600">In Business</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
