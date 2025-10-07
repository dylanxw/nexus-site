"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DollarSign, Clock, CheckCircle, Mail, Smartphone, ArrowRight } from "lucide-react";
import Link from "next/link";

export function SellDevice() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background with pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
        }}
      ></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#DB5858]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#DB5858]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#DB5858]/5 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="wide-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 inline-block px-6 py-3 rounded-full text-white" style={{ backgroundColor: 'rgba(219, 88, 88, 0.3)' }}>
            Sell Your Device for Cash in Denton, TX
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Get instant cash for your old devices today! Simple process, high offers, and immediate payment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left side - Process Steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3 sm:p-4 hover:bg-white/15 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg brand-gradient flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg font-semibold text-white">High Offers</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">Competitive prices</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3 sm:p-4 hover:bg-white/15 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg brand-gradient flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg font-semibold text-white">Easy Process</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">Quick quotes</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3 sm:p-4 hover:bg-white/15 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg brand-gradient flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg font-semibold text-white">Instant Cash</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">Immediate payment</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3 sm:p-4 hover:bg-white/15 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg brand-gradient flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg font-semibold text-white">Mail-Ins Welcome</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">Secure shipping</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button asChild className="w-full sm:w-auto py-4 sm:py-6 px-8 sm:px-12 text-lg sm:text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 bg-[#DB5858] hover:bg-[#c94848] text-white border-none">
                <Link href="/sell-device-quote">
                  Get Your Quote Today
                  <DollarSign className="ml-3 sm:ml-4 h-6 w-6 sm:h-8 sm:w-8" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Main device visual with same styling as other cards */}
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 relative overflow-hidden card-elevated">
                {/* Decorative pulsing orbs */}
                <div className="absolute top-6 right-6 w-20 h-20 bg-[#DB5858]/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-[#DB5858]/10 rounded-full animate-pulse delay-700"></div>

                {/* Device and cash visualization */}
                <div className="flex items-center justify-center h-64 gap-6">
                  <div className="text-center group">
                    <div className="w-20 h-20 brand-gradient rounded-xl flex items-center justify-center mb-3 transform rotate-6 hover:rotate-0 transition-transform duration-500 shadow-xl group-hover:scale-110">
                      <Smartphone className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-white font-medium">Your Device</p>
                  </div>

                  <div className="text-4xl text-white font-bold">→</div>

                  <div className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-3 transform -rotate-6 hover:rotate-0 transition-transform duration-500 shadow-xl group-hover:scale-110">
                      <DollarSign className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-white font-medium">Instant Cash</p>
                  </div>
                </div>

                {/* Cash amount badge with always-on shine effect */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-xl border-2 border-white/20 relative overflow-hidden">
                    Up to $800+
                    {/* Always-on shine effect */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine-continuous blur-sm"></div>
                  </div>
                </div>
              </div>

              {/* CTA Arrow with brand styling */}
              <Link href="/sell-device-quote" className="absolute -bottom-4 -right-4 brand-gradient w-20 h-20 rounded-full flex items-center justify-center shadow-2xl animate-bounce hover:scale-110 transition-all duration-300 group">
                <ArrowRight className="h-8 w-8 text-white group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}