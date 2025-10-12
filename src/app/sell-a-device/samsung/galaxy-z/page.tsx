"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight, Search, Star } from "lucide-react";
import { formatPrice } from "@/lib/pricing-calculator";
import { modelToSlug } from "@/lib/model-utils";

// Galaxy Z Series Models - matching iPhone page structure
const galaxyZModels = [
  // Z Fold Series
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
  // Z Flip Series
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
];

export default function GalaxyZSeriesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleModelSelect = (model: string) => {
    const slug = modelToSlug(model);
    router.push(`/sell-a-device/samsung/${slug}`);
  };

  // Filter phones based on search query
  const filteredPhones = galaxyZModels.filter(phone =>
    phone.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              Device Buyback
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
            <Link href="/sell-a-device/samsung" className="text-[#DB5858] hover:text-[#c94848]">
              Sell Samsung
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
            <span className="text-muted-foreground">Galaxy Z Series</span>
          </div>
        </div>
      </div>

      {/* Simplified Header */}
      <div className="bg-muted py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Sell Your Galaxy Z Fold or Flip for Top Dollar
            </h1>
            <p className="text-base md:text-lg text-foreground/80 mb-1">
              Choose your Galaxy Z model to get an instant buyback quote
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto mb-6">
              Get instant quotes up to $900 • Premium prices for foldables • Same-day payment
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Galaxy Z models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-border rounded-lg text-foreground placeholder-gray-400 focus:ring-2 focus:ring-[#DB5858] focus:border-transparent focus:outline-none"
                />
                <button className="absolute right-1 top-1 bottom-1 px-3 bg-[#DB5858] hover:bg-[#c94848] text-white rounded transition-colors">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Galaxy Z Models Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPhones.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No Galaxy Z models found matching "{searchQuery}"</p>
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
                  className="bg-white border-2 border-border rounded-xl p-4 hover:border-[#DB5858] hover:shadow-xl transition-all cursor-pointer group h-full flex flex-col"
                  onClick={() => handleModelSelect(phone.model)}
                >
                  {/* Phone Image */}
                  <div className="aspect-square relative mb-3 flex-shrink-0">
                    {imageErrors.has(phone.image) ? (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
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
                    <h2 className="font-semibold text-sm text-foreground mb-1 text-center">
                      {phone.model}
                    </h2>

                    <div className="text-center mb-3 flex-1">
                      <p className="text-xs text-muted-foreground mb-1">Get up to</p>
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
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            How Our Galaxy Z Buyback Program Works
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
              <h3 className="font-bold mb-2 text-foreground">Get Instant Quote</h3>
              <p className="text-sm text-muted-foreground">Select your Galaxy Z model and condition to receive an instant price quote valid for 14 days.</p>
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
              <h3 className="font-bold mb-2 text-foreground">Ship or Drop Off</h3>
              <p className="text-sm text-muted-foreground">Visit our store for immediate payment or use our mail-in service with secure packaging.</p>
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
              <h3 className="font-bold mb-2 text-foreground">Get Paid Fast</h3>
              <p className="text-sm text-muted-foreground">Receive payment via your preferred method - cash, check, or digital payment same day.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Why Sell Your Galaxy Z Series to Nexus Tech Solutions?
            </h2>

            <div className="prose prose-lg max-w-none text-foreground/80">
              <p className="mb-6">
                Samsung Galaxy Z series represents the future of smartphones with innovative foldable technology. These premium devices
                command top dollar in the buyback market, and Nexus Tech Solutions offers the best prices for your foldable phone.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-3">Premium Foldable Values</h3>
                  <p className="text-sm text-muted-foreground">
                    Get up to $900 for Galaxy Z Fold 6 and $650 for Z Flip 6. Foldables receive premium pricing.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-3">Fold & Flip Models</h3>
                  <p className="text-sm text-muted-foreground">
                    We buy all Galaxy Z models including Fold, Fold 2-6, Flip, and Flip 2-6 in any condition.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-3">Screen Condition Matters</h3>
                  <p className="text-sm text-muted-foreground">
                    Both inner and outer screens are evaluated. Minor creases are normal and won't affect value.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-3">Special Handling</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team specializes in foldable devices and ensures proper evaluation and secure handling.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] text-white p-8 rounded-xl text-center">
                <h3 className="text-2xl font-bold mb-3">
                  Ready to Sell Your Galaxy Z?
                </h3>
                <p className="mb-6 text-white/90">
                  Get premium prices for your innovative foldable Samsung device
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-[#DB5858] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Select Your Galaxy Z Model
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                question: "Which Galaxy Z models do you buy?",
                answer: "We buy all Galaxy Z models including Z Fold (original through Fold 6) and Z Flip (original through Flip 6). We accept devices in any condition including those with screen issues."
              },
              {
                question: "Are crease marks on foldable screens a problem?",
                answer: "No, minor creases along the fold line are normal for these devices and won't significantly impact your quote. However, cracks or dead pixels will affect the value."
              },
              {
                question: "How much is my Galaxy Z Fold worth vs Z Flip?",
                answer: "Z Fold models typically have higher values due to their larger screens and higher retail prices. Z Fold 6 can fetch up to $900 while Z Flip 6 goes up to $650."
              },
              {
                question: "Do both screens need to work?",
                answer: "For the best value, yes. However, we still buy devices with non-functional inner or outer screens at reduced prices. Be honest about screen conditions when getting your quote."
              },
              {
                question: "Are Galaxy Z phones worth more than regular Samsung phones?",
                answer: "Generally yes, Galaxy Z series phones command premium prices due to their innovative technology and higher retail costs. They often fetch more than comparable S series models."
              },
              {
                question: "How should I prepare my foldable for sale?",
                answer: "Back up your data, remove your Samsung and Google accounts, perform a factory reset, and gently clean both screens. Handle with care as foldables require special attention."
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

      {/* Bottom Trust Section */}
      <div className="bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Trusted Galaxy Z Foldable Buyback Service
            </h3>
            <div className="flex flex-wrap justify-center gap-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">2,000+</p>
                <p className="text-sm text-muted-foreground">Foldables Purchased</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">$900</p>
                <p className="text-sm text-muted-foreground">Max Z Fold Value</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">Expert</p>
                <p className="text-sm text-muted-foreground">Foldable Handling</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">100%</p>
                <p className="text-sm text-muted-foreground">Secure Process</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}