"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  ChevronRight,
  Search,
  Shield,
  Clock,
  DollarSign,
  Package,
  CheckCircle,
  Smartphone,
  Tablet,
  Watch,
  Laptop,
  HelpCircle,
  Star,
  TrendingUp,
  Zap
} from "lucide-react";

// Device categories with better structure
const deviceCategories = [
  {
    id: "iphone",
    title: "iPhone",
    buttonText: "Sell iPhone",
    image: "/images/sell-a-device/categories/sell-iphone.jpg",
    available: true,
    popular: true,
  },
  {
    id: "samsung",
    title: "Samsung",
    buttonText: "Sell Samsung",
    image: "/images/sell-a-device/categories/sell-samsung.jpg",
    available: false,
  },
  {
    id: "ipad",
    title: "iPad / Tablet",
    buttonText: "Sell iPad / Tablet",
    image: "/images/sell-a-device/categories/sell-ipad.jpg",
    available: false,
  },
  {
    id: "smartwatch",
    title: "Smartwatch",
    buttonText: "Sell Smartwatch",
    image: "/images/sell-a-device/categories/sell-smartwatch.jpg",
    available: false,
  },
  {
    id: "macbook",
    title: "MacBook",
    buttonText: "Sell MacBook",
    image: "/images/sell-a-device/categories/sell-macbook.jpg",
    available: false,
  },
  {
    id: "other",
    title: "Other Devices",
    buttonText: "Sell Other Items",
    image: "/images/sell-a-device/categories/sell-other.jpg",
    available: false,
  },
];

export function BuybackPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryClick = (categoryId: string, available: boolean) => {
    if (!available) return;

    if (categoryId === "iphone") {
      router.push("/sell-a-device/iphone");
    } else if (categoryId === "samsung") {
      router.push("/sell-a-device/samsung");
    } else if (categoryId === "other") {
      router.push("/sell-a-device/other");
    }
    // Other categories will be added later
  };

  // Filter categories based on search
  const filteredCategories = deviceCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.buttonText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

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
            <span className="text-gray-600">Device Buyback</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Sell Your Phone for Cash in Denton, TX - Instant Quotes
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-1">
              Get instant cash for your device - Top dollar guaranteed
            </p>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto mb-6">
              Sell or trade in phones, tablets, smartwatches, and computers for fast cash with Nexus Tech Solutions.
              Get an instant quote, free shipping, and secure payment today!
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search devices..."
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

      {/* Device Categories */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No devices found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-[#DB5858] hover:text-[#c94848] underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative"
              >
                {category.popular && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3" fill="currentColor" />
                      Popular
                    </div>
                  </div>
                )}

                {!category.available && (
                  <div className="absolute top-3 right-3 bg-gray-500 text-white text-xs px-2 py-1 rounded-full z-10">
                    Coming Soon
                  </div>
                )}

                <div
                  onClick={() => handleCategoryClick(category.id, category.available)}
                  className={`
                    bg-white border-2 border-gray-200 rounded-lg p-3 md:p-4 transition-all group
                    ${
                      category.available
                        ? "hover:border-[#DB5858] hover:shadow-lg cursor-pointer"
                        : "opacity-60 cursor-not-allowed"
                    }
                  `}
                >
                  {/* Device Image */}
                  <div className="aspect-square relative mb-3 max-w-[140px] md:max-w-[160px] mx-auto">
                    {imageErrors.has(category.image) ? (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-5xl">📱</div>
                      </div>
                    ) : (
                      <Image
                        src={category.image}
                        alt={`Sell ${category.title} devices for cash - Nexus Tech Solutions buyback program`}
                        fill
                        className="object-contain p-2"
                        onError={() => {
                          setImageErrors(prev => new Set(prev).add(category.image));
                        }}
                        unoptimized={true}
                      />
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    disabled={!category.available}
                    className={`
                      w-full font-semibold py-2 px-3 rounded-md transition-colors text-sm md:text-base
                      ${
                        category.available
                          ? "bg-[#DB5858] hover:bg-[#c94848] text-white"
                          : "bg-gray-400 text-white cursor-not-allowed"
                      }
                    `}
                  >
                    {category.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Can't Find Device */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 text-[#DB5858] hover:text-[#c94848] font-medium transition-colors">
            <HelpCircle className="h-5 w-5" />
            Can't find your device? Contact us for a custom quote
          </button>
        </div>
      </div>

      {/* How It Works Section - Clean & Simple */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              How Our Buyback Program Works
            </h2>
            <p className="text-gray-600">
              Turn your old devices into instant cash in 4 simple steps
            </p>
          </div>

          {/* Steps Container */}
          <div className="relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-0.5 bg-gray-200" />

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Get Quote",
                  description: "Select your device and its condition for an instant price quote",
                  icon: <DollarSign className="h-6 w-6" />,
                },
                {
                  step: "2",
                  title: "Ship or Drop Off",
                  description: "Visit our store or mail your device with our free shipping label",
                  icon: <Package className="h-6 w-6" />,
                },
                {
                  step: "3",
                  title: "Quick Inspection",
                  description: "We verify your device condition and confirm your quote",
                  icon: <CheckCircle className="h-6 w-6" />,
                },
                {
                  step: "4",
                  title: "Get Paid",
                  description: "Receive payment via cash, check, or digital payment same day",
                  icon: <TrendingUp className="h-6 w-6" />,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-9 h-9 bg-[#DB5858] rounded-full flex items-center justify-center text-white font-semibold text-sm z-10">
                    {item.step}
                  </div>

                  {/* Icon Container */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-4 pt-8 hover:border-[#DB5858]/50 transition-colors">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <div className="text-[#DB5858]">
                        {item.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Ready to turn your old devices into cash?
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#DB5858] hover:bg-[#c94848] text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              Get Started Now
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Instant Quotes
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#DB5858]" />
                Secure Process
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#DB5858]" />
                Same-Day Payment
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Nexus Tech Solutions for Device Buyback?
          </h2>

          <div className="prose prose-lg max-w-none text-gray-700 mb-12">
            <p className="mb-6">
              Looking for where to sell your phone for cash in Denton, TX? Nexus Tech Solutions offers competitive instant
              quotes and same-day cash payment. As a local alternative to kiosk services, we provide personalized service
              and often offer better value. Our expert team evaluates each device individually based on real market values
              to ensure you get the maximum cash for your electronics.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#DB5858]" />
                  Best Market Prices
                </h3>
                <p className="text-sm">
                  Our pricing is based on current market rates and fair evaluation of your device's condition.
                  Get instant quotes and same-day payment with competitive rates that reflect the true value of your electronics.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#DB5858]" />
                  Expert Personal Service & Data Security
                </h3>
                <p className="text-sm">
                  Work with real experts who ensure your data is properly wiped using Department of Defense standards.
                  We take the time to answer questions, provide personalized assistance, and make the process easy and secure.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#DB5858]" />
                  Fast Payment Processing
                </h3>
                <p className="text-sm">
                  In-store customers receive immediate cash payment on the spot. Mail-in devices are processed within 24 hours
                  with multiple payment options including cash, check, PayPal, or direct deposit.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#DB5858]" />
                  Accept All Devices & Conditions
                </h3>
                <p className="text-sm">
                  We buy devices in any condition - broken screens, water damage, older models, and more. Even devices that
                  don't power on still have value. Get quotes for electronics in any condition.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Devices We Buy
            </h3>
            <p className="mb-4">
              We accept a wide range of electronic devices in any condition - working, broken, or even water damaged:
            </p>
            <ul className="grid md:grid-cols-2 gap-2 mb-8">
              <li>• iPhones (iPhone 7 through iPhone 17 Pro Max)</li>
              <li>• Samsung Galaxy phones and tablets</li>
              <li>• iPads (all models including Pro and Air)</li>
              <li>• MacBooks (Air, Pro, and standard models)</li>
              <li>• Apple Watches and smartwatches</li>
              <li>• Gaming consoles (PlayStation, Xbox, Nintendo)</li>
              <li>• AirPods and wireless earbuds</li>
              <li>• Android phones and tablets</li>
            </ul>

            <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] text-white p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-3">
                Ready to Sell Your Device?
              </h3>
              <p className="mb-6 text-white/90">
                Join thousands of satisfied customers who trust Nexus Tech Solutions
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-[#DB5858] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Select Your Device
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                question: "How do you determine the price for my device?",
                answer: "We provide personalized quotes based on current market values, device condition, model, and demand. Our expert team evaluates each device individually to ensure you get a fair and competitive price. We stay up-to-date with market trends to offer the best value for your electronics."
              },
              {
                question: "What types of devices do you buy?",
                answer: "We buy all types of electronics including smartphones (iPhone, Samsung, etc.), tablets, laptops, smartwatches, gaming consoles, and more. Even broken or water-damaged devices have value! We accept devices in any condition."
              },
              {
                question: "How do I prepare my device for sale?",
                answer: "Back up your data, perform a factory reset, remove any SIM cards or memory cards, and remove it from your iCloud or Google account. Don't worry if you need help - our team can assist you in-store."
              },
              {
                question: "How long does the process take?",
                answer: "In-store transactions are completed immediately with instant cash payment. For mail-in devices, you'll receive payment within 24-48 hours of us receiving your device. Shipping typically takes 2-3 business days."
              },
              {
                question: "What if my device is broken?",
                answer: "We buy devices in any condition! Broken screens, water damage, or devices that won't turn on still have value. Just be honest about the condition when getting your quote, and we'll provide a fair offer."
              },
              {
                question: "Is my personal data safe?",
                answer: "Absolutely. We use Department of Defense standard data wiping procedures. All devices are completely wiped before resale or recycling, ensuring your personal information is permanently removed. Your data security is our top priority."
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
    </div>
  );
}
