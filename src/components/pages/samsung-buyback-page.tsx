"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight, Search, Star } from "lucide-react";

// Samsung Galaxy Series Categories
const samsungSeries = [
  {
    id: "galaxy-s",
    name: "Galaxy S Series",
    image: "/images/buyback/sell-samsung/galaxy-s-series.avif",
    maxPrice: 800,
    models: ["S24 Ultra", "S24+", "S24", "S23 Ultra", "S23+", "S23", "S22 Ultra", "S21 Ultra"],
    popular: true,
  },
  {
    id: "galaxy-z",
    name: "Galaxy Z Series",

    image: "/images/buyback/sell-samsung/galaxy-z-series.avif",
    maxPrice: 900,
    models: ["Z Fold 6", "Z Flip 6", "Z Fold 5", "Z Flip 5", "Z Fold 4", "Z Flip 4"],
    popular: true,
  },
  {
    id: "galaxy-note",
    name: "Galaxy Note Series",

    image: "/images/buyback/sell-samsung/galaxy-note-series.avif",
    maxPrice: 450,
    models: ["Note 20 Ultra", "Note 20", "Note 10+", "Note 10", "Note 9", "Note 8"],
  },
  {
    id: "galaxy-a",
    name: "Galaxy A Series",

    image: "/images/buyback/sell-samsung/galaxy-a-series.avif",
    maxPrice: 250,
    models: ["A54", "A34", "A14", "A53", "A33", "A13"],
  },
];

export function SamsungBuybackPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleSeriesSelect = (seriesId: string) => {
    router.push(`/buyback/samsung/${seriesId}`);
  };

  // Filter series based on search query
  const filteredSeries = samsungSeries.filter(series =>
    series.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    series.models.some(model => model.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <Link href="/buyback" className="text-[#DB5858] hover:text-[#c94848]">
              Device Buyback
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-600">Sell Samsung</span>
          </div>
        </div>
      </div>

      {/* Simplified Header */}
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Select Your Samsung Galaxy Series
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-1">
              Choose your Galaxy series to see available models and pricing
            </p>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto mb-6">
              Get instant quotes up to $900 • Same-day payment • Data security guaranteed
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for your Samsung model..."
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

      {/* Samsung Series Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredSeries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No Samsung series found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-[#DB5858] hover:text-[#c94848] underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSeries.map((series, index) => (
              <motion.div
                key={series.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative"
              >
                {series.popular && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3" fill="currentColor" />
                      Popular
                    </div>
                  </div>
                )}

                <div
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#DB5858] hover:shadow-xl transition-all cursor-pointer group h-full flex flex-col"
                  onClick={() => handleSeriesSelect(series.id)}
                >
                  {/* Series Image */}
                  <div className="aspect-square relative mb-4 rounded-lg p-4">
                    {imageErrors.has(series.image) ? (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-6xl">📱</div>
                      </div>
                    ) : (
                      <Image
                        src={series.image}
                        alt={`Sell ${series.name} - Get up to $${series.maxPrice}`}
                        fill
                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                        onError={() => {
                          setImageErrors(prev => new Set(prev).add(series.image));
                        }}
                        unoptimized={true}
                      />
                    )}
                  </div>

                  {/* Series Info */}
                  <div className="flex-1 flex flex-col">
                    <h2 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-[#DB5858] transition-colors text-center">
                      {series.name}
                    </h2>
                    <div className="text-center mb-4">
                      <p className="text-xs text-gray-500 mb-1">Get up to</p>
                      <p className="text-3xl font-bold text-[#DB5858]">
                        ${series.maxPrice}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-[#DB5858] hover:bg-[#c94848] text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                      View Models
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
            How Our Samsung Buyback Program Works
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
              <h3 className="font-bold mb-2 text-gray-900">Select Your Galaxy</h3>
              <p className="text-sm text-gray-600">Choose your Galaxy series and model to get started with an instant quote.</p>
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
              <p className="text-sm text-gray-600">Visit our store for immediate payment or use our mail-in service.</p>
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
              <p className="text-sm text-gray-600">Receive payment via cash, check, or digital payment same day.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Sell Your Samsung Galaxy to Nexus Tech Solutions?
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                Nexus Tech Solutions offers the best prices for Samsung Galaxy devices. Whether you have a flagship S series,
                innovative Z Fold or Flip, classic Note, or affordable A series, we provide competitive quotes and instant payment.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">All Galaxy Models</h3>
                  <p className="text-sm text-gray-600">
                    We buy all Samsung Galaxy series from the latest S24 Ultra to older Note and A series models.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Premium for Foldables</h3>
                  <p className="text-sm text-gray-600">
                    Get top dollar for your Galaxy Z Fold or Z Flip with quotes up to $900.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Evaluation</h3>
                  <p className="text-sm text-gray-600">
                    Get accurate pricing based on your specific model, storage, carrier, and condition.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Safe & Secure</h3>
                  <p className="text-sm text-gray-600">
                    Complete data wipes and secure handling of all devices. We help remove Samsung accounts.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] text-white p-8 rounded-xl text-center">
                <h3 className="text-2xl font-bold mb-3">
                  Ready to Sell Your Samsung Galaxy?
                </h3>
                <p className="mb-6 text-white/90">
                  Select your Galaxy series above to get started with your instant quote
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-[#DB5858] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Choose Your Series
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
                question: "Which Samsung Galaxy series should I choose?",
                answer: "Select the series that matches your phone model. Galaxy S series includes S24, S23, S22, etc. Galaxy Z series includes all Fold and Flip models. Galaxy Note includes Note 20, Note 10, etc. Galaxy A series includes budget-friendly models like A54, A34, A14."
              },
              {
                question: "How much is my Samsung Galaxy worth?",
                answer: "Values vary by series and model. Galaxy Z Fold/Flip can fetch up to $900, Galaxy S series up to $800, Note series up to $450, and A series up to $250. Select your series above for specific model pricing."
              },
              {
                question: "Do I need to remove my Samsung account?",
                answer: "Yes, you must remove your Samsung account and Google account before selling. Our staff can assist you with this process in-store if needed."
              },
              {
                question: "What condition does my phone need to be in?",
                answer: "We accept phones in any condition - from like new to broken screens or devices that won't turn on. Just be honest about the condition when getting your quote."
              },
              {
                question: "How quickly do I get paid?",
                answer: "In-store customers receive immediate payment. Mail-in customers are paid within 24 hours of device inspection."
              },
              {
                question: "Do you buy older Samsung models?",
                answer: "Yes! We buy Samsung Galaxy models going back several generations, including older S series, Note series, and A series phones."
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
