"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight, Search, Star } from "lucide-react";
import { formatPrice } from "@/lib/pricing-calculator";
import { modelToSlug } from "@/lib/model-utils";

// Galaxy S Series Models - matching iPhone page structure
const galaxySModels = [
  {
    model: "Galaxy S24 Ultra",
    image: "/images/buyback/sell-samsung/galaxy-s24-ultra.avif",
    maxPrice: 800,
    storage: ["256GB", "512GB", "1TB"],
    popular: true,
  },
  {
    model: "Galaxy S24+",
    image: "/images/buyback/sell-samsung/galaxy-s24-plus.avif",
    maxPrice: 650,
    storage: ["256GB", "512GB"],
    popular: true,
  },
  {
    model: "Galaxy S24",
    image: "/images/buyback/sell-samsung/galaxy-s24.avif",
    maxPrice: 550,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S23 Ultra",
    image: "/images/buyback/sell-samsung/galaxy-s23-ultra.avif",
    maxPrice: 600,
    storage: ["256GB", "512GB", "1TB"],
    popular: true,
  },
  {
    model: "Galaxy S23+",
    image: "/images/buyback/sell-samsung/galaxy-s23-plus.avif",
    maxPrice: 450,
    storage: ["256GB", "512GB"],
  },
  {
    model: "Galaxy S23",
    image: "/images/buyback/sell-samsung/galaxy-s23.avif",
    maxPrice: 380,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S22 Ultra",
    image: "/images/buyback/sell-samsung/galaxy-s22-ultra.avif",
    maxPrice: 480,
    storage: ["128GB", "256GB", "512GB", "1TB"],
  },
  {
    model: "Galaxy S22+",
    image: "/images/buyback/sell-samsung/galaxy-s22-plus.avif",
    maxPrice: 350,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S22",
    image: "/images/buyback/sell-samsung/galaxy-s22.avif",
    maxPrice: 280,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S21 Ultra",
    image: "/images/buyback/sell-samsung/galaxy-s21-ultra.avif",
    maxPrice: 380,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "Galaxy S21+",
    image: "/images/buyback/sell-samsung/galaxy-s21-plus.avif",
    maxPrice: 280,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S21",
    image: "/images/buyback/sell-samsung/galaxy-s21.avif",
    maxPrice: 220,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S20 Ultra",
    image: "/images/buyback/sell-samsung/galaxy-s20-ultra.avif",
    maxPrice: 280,
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    model: "Galaxy S20+",
    image: "/images/buyback/sell-samsung/galaxy-s20-plus.avif",
    maxPrice: 200,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S20",
    image: "/images/buyback/sell-samsung/galaxy-s20.avif",
    maxPrice: 160,
    storage: ["128GB"],
  },
  {
    model: "Galaxy S10+",
    image: "/images/buyback/sell-samsung/galaxy-s10-plus.avif",
    maxPrice: 150,
    storage: ["128GB", "512GB", "1TB"],
  },
  {
    model: "Galaxy S10",
    image: "/images/buyback/sell-samsung/galaxy-s10.avif",
    maxPrice: 120,
    storage: ["128GB", "512GB"],
  },
  {
    model: "Galaxy S10e",
    image: "/images/buyback/sell-samsung/galaxy-s10e.avif",
    maxPrice: 100,
    storage: ["128GB", "256GB"],
  },
  {
    model: "Galaxy S9+",
    image: "/images/buyback/sell-samsung/galaxy-s9-plus.avif",
    maxPrice: 80,
    storage: ["64GB", "128GB", "256GB"],
  },
  {
    model: "Galaxy S9",
    image: "/images/buyback/sell-samsung/galaxy-s9.avif",
    maxPrice: 60,
    storage: ["64GB", "128GB", "256GB"],
  },
];

export default function GalaxySSeriesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleModelSelect = (model: string) => {
    const slug = modelToSlug(model);
    router.push(`/buyback/samsung/${slug}`);
  };

  // Filter phones based on search query
  const filteredPhones = galaxySModels.filter(phone =>
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
            <Link href="/buyback" className="text-[#DB5858] hover:text-[#c94848]">
              Device Buyback
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link href="/buyback/samsung" className="text-[#DB5858] hover:text-[#c94848]">
              Sell Samsung
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-600">Galaxy S Series</span>
          </div>
        </div>
      </div>

      {/* Simplified Header */}
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Sell Your Galaxy S Series for Top Dollar
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-1">
              Choose your Galaxy S model to get an instant buyback quote
            </p>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto mb-6">
              Get instant quotes up to $800 • Same-day payment • Data security guaranteed
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Galaxy S models..."
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

      {/* Galaxy S Models Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPhones.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No Galaxy S models found matching "{searchQuery}"</p>
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
                      <p className="text-2xl font-bold text-[#DB5858]">
                        {formatPrice(phone.maxPrice)}
                      </p>
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
            How Our Galaxy S Buyback Program Works
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
              <p className="text-sm text-gray-600">Select your Galaxy S model and condition to receive an instant price quote valid for 14 days.</p>
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
              Why Sell Your Galaxy S Series to Nexus Tech Solutions?
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                The Samsung Galaxy S series represents the pinnacle of Android innovation. Whether you're upgrading to the latest model
                or switching devices, Nexus Tech Solutions offers the best buyback prices for your Galaxy S phone.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Flagship Values</h3>
                  <p className="text-sm text-gray-600">
                    Get up to $800 for the latest Galaxy S24 Ultra and competitive prices for all S series models.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">All Generations Accepted</h3>
                  <p className="text-sm text-gray-600">
                    From the latest S24 series to older S9 models, we buy all Galaxy S generations.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Ultra Model Premiums</h3>
                  <p className="text-sm text-gray-600">
                    Galaxy S Ultra models receive premium pricing due to their advanced features and demand.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Processing</h3>
                  <p className="text-sm text-gray-600">
                    Galaxy S devices are processed quickly with same-day payment for in-store visits.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] text-white p-8 rounded-xl text-center">
                <h3 className="text-2xl font-bold mb-3">
                  Ready to Sell Your Galaxy S?
                </h3>
                <p className="mb-6 text-white/90">
                  Join thousands of satisfied customers who've sold their Galaxy S phones to Nexus Tech Solutions
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-[#DB5858] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Select Your Galaxy S Model
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
                question: "Which Galaxy S models do you buy?",
                answer: "We buy all Galaxy S models from the latest S24 series back to the S9. This includes standard, Plus, and Ultra variants. Whether your device is in perfect condition or has damage, we'll make you an offer."
              },
              {
                question: "How are Galaxy S prices determined?",
                answer: "Prices are based on the specific model, storage capacity, carrier status, and condition. Ultra models typically receive the highest values, followed by Plus models, then standard models."
              },
              {
                question: "Do I need to remove my Samsung account?",
                answer: "Yes, you must remove your Samsung account and Google account before selling. This is required for security and ensures your personal data is protected."
              },
              {
                question: "What's the difference in value between S24, S23, and S22?",
                answer: "Newer models retain higher values. For example, S24 Ultra can fetch up to $800, S23 Ultra up to $600, and S22 Ultra up to $480. Each generation typically sees a 20-30% value decrease."
              },
              {
                question: "Do you accept Galaxy S phones with cracked screens?",
                answer: "Yes! We accept Galaxy S phones in any condition, including cracked screens, water damage, or devices that won't power on. Just select the appropriate condition for an accurate quote."
              },
              {
                question: "How long is my Galaxy S quote valid?",
                answer: "All quotes are valid for 14 days from submission. This gives you time to backup your data and prepare your device for sale."
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
              Trusted Galaxy S Buyback Service
            </h3>
            <div className="flex flex-wrap justify-center gap-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">5,000+</p>
                <p className="text-sm text-gray-600">Galaxy S Devices Purchased</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">$800</p>
                <p className="text-sm text-gray-600">Max Galaxy S Value</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">24hrs</p>
                <p className="text-sm text-gray-600">Payment Processing</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">100%</p>
                <p className="text-sm text-gray-600">Secure Data Wipe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}