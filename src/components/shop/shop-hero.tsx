"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Shield, Smartphone, CheckCircle } from "lucide-react";

export function ShopHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-5 md:py-8 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#DB5858]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="wide-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          {/* Left: Heading + description */}
          <div className="md:flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
              Shop <span className="text-[#DB5858]">Certified</span> Pre-Owned Devices
            </h1>
            <p className="text-sm text-gray-400 mt-1.5 max-w-xl">
              Quality tested smartphones, tablets, and electronics — all backed by warranty.
            </p>
          </div>

          {/* Right: Trust badges inline */}
          <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-[#DB5858] flex-shrink-0" />
              <span className="text-white text-xs md:text-sm font-medium whitespace-nowrap">Warranty Included</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[#DB5858] flex-shrink-0" />
              <span className="text-white text-xs md:text-sm font-medium whitespace-nowrap">Fully Tested</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="h-4 w-4 text-[#DB5858] flex-shrink-0" />
              <span className="text-white text-xs md:text-sm font-medium whitespace-nowrap">Great Prices</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}