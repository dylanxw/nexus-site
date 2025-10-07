"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Shield, Smartphone } from "lucide-react";

export function ShopHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 lg:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-8 w-32 h-32 bg-[#DB5858]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#DB5858]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 lg:mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-[#DB5858]/10 backdrop-blur-sm border border-[#DB5858]/20 rounded-full px-3 py-1.5 lg:px-4 lg:py-2 mb-3 lg:mb-6">
              <ShoppingBag className="h-3 w-3 lg:h-4 lg:w-4 text-[#DB5858]" />
              <span className="text-[#DB5858] font-medium text-xs lg:text-sm">Quality Pre-Owned Electronics</span>
            </div>

            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-3 lg:mb-6 leading-tight">
              Shop <span className="text-[#DB5858]">Certified</span> Pre-Owned Devices
            </h1>

            <p className="text-sm md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Quality tested smartphones, tablets, and electronics with warranty. Great devices at even better prices.
            </p>
          </motion.div>

          {/* Trust Indicators - Hidden on mobile, visible on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-[#DB5858]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-[#DB5858]" />
              </div>
              <h3 className="text-white font-bold mb-2">Warranty Included</h3>
              <p className="text-gray-300 text-sm">All devices come with our quality guarantee</p>
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-[#DB5858]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-6 w-6 text-[#DB5858]" />
              </div>
              <h3 className="text-white font-bold mb-2">Fully Tested</h3>
              <p className="text-gray-300 text-sm">Each device is thoroughly inspected and tested</p>
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-[#DB5858]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-6 w-6 text-[#DB5858]" />
              </div>
              <h3 className="text-white font-bold mb-2">Great Prices</h3>
              <p className="text-gray-300 text-sm">Quality devices at affordable prices</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}