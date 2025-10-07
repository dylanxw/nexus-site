"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Wrench, CheckCircle, Clock, Star, Phone, Search, ShoppingCart, DollarSign, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function HowItWorks() {
  const [activeService, setActiveService] = useState<'repairs' | 'purchasing' | 'selling'>('repairs');

  const serviceTypes = [
    { id: 'repairs' as const, label: 'Repairs', icon: Wrench },
    { id: 'purchasing' as const, label: 'Purchasing', icon: ShoppingCart },
    { id: 'selling' as const, label: 'Selling', icon: DollarSign }
  ];

  const processSteps = {
    repairs: [
      {
        id: 1,
        icon: MessageSquare,
        title: "Get Free Quote",
        description: "Tell us about your device issue and get an instant estimate online or over the phone",
        color: "text-blue-500",
        bgColor: "bg-blue-50"
      },
      {
        id: 2,
        icon: Wrench,
        title: "Expert Repair",
        description: "Drop off your device and our certified technicians will fix it using quality parts",
        color: "text-[#DB5858]",
        bgColor: "bg-[#DB5858]/10"
      },
      {
        id: 3,
        icon: CheckCircle,
        title: "Pick Up & Enjoy",
        description: "Collect your fully repaired device backed by our 60-day warranty guarantee",
        color: "text-green-500",
        bgColor: "bg-green-50"
      }
    ],
    purchasing: [
      {
        id: 1,
        icon: Search,
        title: "Browse Selection",
        description: "Explore our quality pre-owned devices online or visit our store to see them in person",
        color: "text-blue-500",
        bgColor: "bg-blue-50"
      },
      {
        id: 2,
        icon: ShoppingCart,
        title: "Order or Visit",
        description: "Purchase online with secure checkout or come to our store to buy and test your device",
        color: "text-[#DB5858]",
        bgColor: "bg-[#DB5858]/10"
      },
      {
        id: 3,
        icon: Package,
        title: "Enjoy Your Device",
        description: "Take home your quality pre-owned device backed by our warranty and expert support",
        color: "text-green-500",
        bgColor: "bg-green-50"
      }
    ],
    selling: [
      {
        id: 1,
        icon: MessageSquare,
        title: "Get Instant Quote",
        description: "Tell us about your device condition and get a competitive cash offer immediately",
        color: "text-blue-500",
        bgColor: "bg-blue-50"
      },
      {
        id: 2,
        icon: CheckCircle,
        title: "Bring Device In",
        description: "Visit our store with your device or ship it to us with our secure mail-in service",
        color: "text-[#DB5858]",
        bgColor: "bg-[#DB5858]/10"
      },
      {
        id: 3,
        icon: DollarSign,
        title: "Get Paid Cash",
        description: "Receive instant cash payment when we verify your device matches the quoted condition",
        color: "text-green-500",
        bgColor: "bg-green-50"
      }
    ]
  };

  const steps = processSteps[activeService];

  return (
    <section className="py-16" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="wide-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Choose your service type to see our simple, fast, and hassle-free process
          </p>

          {/* Service Type Toggle */}
          <div className="inline-flex flex-col sm:flex-row bg-white rounded-2xl p-1 shadow-lg border border-gray-200 w-full sm:w-auto max-w-md sm:max-w-none mx-auto">
            {serviceTypes.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                    activeService === service.id
                      ? 'bg-[#DB5858] text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  {service.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={`${activeService}-${step.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2 z-0">
                    <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full"></div>
                  </div>
                )}

                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10 group border border-gray-100 h-full flex flex-col min-h-[280px] sm:min-h-[320px]">
                  <div className="text-center flex flex-col h-full">
                    {/* Step number */}
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#DB5858] text-white rounded-full text-lg sm:text-xl font-bold mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      {step.id}
                    </div>

                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 ${step.bgColor} rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                      <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${step.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-[#DB5858] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust indicators and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Clock className="h-4 w-4 text-[#DB5858]" />
              <span className="text-sm font-medium text-gray-700">Same-day service available</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">4.9/5 rating • 150+ reviews</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">60-day warranty</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            key={`cta-${activeService}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
          >
            {activeService === 'repairs' && (
              <>
                <Button
                  size="lg"
                  className="flex-1 bg-[#DB5858] hover:bg-[#c94848] text-white py-4 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Free Quote
                  <MessageSquare className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  asChild
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 hover:border-[#DB5858] hover:text-[#DB5858] py-4 px-8 text-lg font-semibold transition-all duration-300"
                >
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </>
            )}

            {activeService === 'purchasing' && (
              <>
                <Button
                  size="lg"
                  className="flex-1 bg-[#DB5858] hover:bg-[#c94848] text-white py-4 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Browse Inventory
                  <Search className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  asChild
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 hover:border-[#DB5858] hover:text-[#DB5858] py-4 px-8 text-lg font-semibold transition-all duration-300"
                >
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call Store
                  </a>
                </Button>
              </>
            )}

            {activeService === 'selling' && (
              <>
                <Button
                  size="lg"
                  className="flex-1 bg-[#DB5858] hover:bg-[#c94848] text-white py-4 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Cash Quote
                  <DollarSign className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  asChild
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 hover:border-[#DB5858] hover:text-[#DB5858] py-4 px-8 text-lg font-semibold transition-all duration-300"
                >
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}