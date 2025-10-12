"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight, Search, Star } from "lucide-react";
import { formatPrice } from "@/lib/pricing-calculator";
import { modelToSlug } from "@/lib/model-utils";

// Galaxy A Series Models - matching iPhone page structure
const galaxyAModels = [
  // A50 Series
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
  // A30 Series
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
  // A20 Series
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
  // A10 Series
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
  // A0 Series
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
  // A70/A80 Series
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

export default function GalaxyASeriesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleModelSelect = (model: string) => {
    const slug = modelToSlug(model);
    router.push(`/sell-a-device/samsung/${slug}`);
  };

  // Filter phones based on search query
  const filteredPhones = galaxyAModels.filter(phone =>
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
            <span className="text-muted-foreground">Galaxy A Series</span>
          </div>
        </div>
      </div>

      {/* Simplified Header */}
      <div className="bg-muted py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Sell Your Galaxy A Series for Cash
            </h1>
            <p className="text-base md:text-lg text-foreground/80 mb-1">
              Choose your Galaxy A model to get an instant buyback quote
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto mb-6">
              Get instant quotes up to $250 • All A series accepted • Same-day payment
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Galaxy A models..."
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

      {/* Galaxy A Models Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPhones.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No Galaxy A models found matching "{searchQuery}"</p>
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
            How Our Galaxy A Buyback Program Works
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
              <p className="text-sm text-muted-foreground">Select your Galaxy A model and condition to receive an instant price quote valid for 14 days.</p>
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
              <p className="text-sm text-muted-foreground">Visit our store for immediate payment or use our mail-in service with provided instructions.</p>
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
              Why Sell Your Galaxy A Series to Nexus Tech Solutions?
            </h2>

            <div className="prose prose-lg max-w-none text-foreground/80">
              <p className="mb-6">
                The Samsung Galaxy A series offers incredible value with premium features at affordable prices. Whether you're upgrading
                to a newer model or switching brands, we provide competitive prices for all Galaxy A phones.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-3">All A Models Accepted</h3>
                  <p className="text-sm text-muted-foreground">
                    From the latest A54 to older A01 models, we buy every Galaxy A series phone ever made.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-3">Budget-Friendly Buyback</h3>
                  <p className="text-sm text-muted-foreground">
                    Get cash for your budget smartphone. Even older A series models have value in our program.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-3">Quick Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    A series phones are processed quickly with straightforward evaluation and fast payment.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-3">Popular Models Premium</h3>
                  <p className="text-sm text-muted-foreground">
                    Popular models like A54, A53, and A34 receive competitive pricing due to high demand.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] text-white p-8 rounded-xl text-center">
                <h3 className="text-2xl font-bold mb-3">
                  Ready to Sell Your Galaxy A?
                </h3>
                <p className="mb-6 text-white/90">
                  Turn your Galaxy A series phone into instant cash today
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-[#DB5858] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Select Your Galaxy A Model
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
                question: "Which Galaxy A models do you buy?",
                answer: "We buy all Galaxy A models including A54, A53, A34, A33, A24, A23, A14, A13, and all other A series phones from A01 to A90. Every A series model has value in our buyback program."
              },
              {
                question: "Are Galaxy A phones worth selling?",
                answer: "Yes! While A series phones are budget-friendly, they still have resale value. Newer models like the A54 can fetch up to $250, and even older models like A10 series have value."
              },
              {
                question: "What's the difference between A series numbers?",
                answer: "The first digit indicates the tier (A5x is mid-range, A3x is lower-mid, A1x is entry-level). The second digit indicates the generation (A54 is newer than A53)."
              },
              {
                question: "Do you accept Galaxy A phones with cracked screens?",
                answer: "Yes! We accept Galaxy A phones in any condition including cracked screens, water damage, or devices that won't turn on. Just select the appropriate condition for an accurate quote."
              },
              {
                question: "Why are A50 series phones worth more?",
                answer: "The A50 series (A50, A51, A52, A53, A54) are mid-range models with better specs, cameras, and features, making them more valuable in the secondary market."
              },
              {
                question: "How quickly can I sell my Galaxy A phone?",
                answer: "Very quickly! Visit our store for immediate payment, or use our mail-in service. A series phones are processed fast due to their straightforward evaluation."
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
              Trusted Galaxy A Series Buyback Service
            </h3>
            <div className="flex flex-wrap justify-center gap-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">4,000+</p>
                <p className="text-sm text-muted-foreground">A Series Purchased</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">30+</p>
                <p className="text-sm text-muted-foreground">A Models Accepted</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">$250</p>
                <p className="text-sm text-muted-foreground">Max A Series Value</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#DB5858]">Same Day</p>
                <p className="text-sm text-muted-foreground">Payment Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}