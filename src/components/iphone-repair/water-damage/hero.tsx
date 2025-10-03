"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Clock, Shield, Droplets, AlertTriangle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function IPhoneWaterDamageHero() {
  return (
    <section className="py-16 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#DB5858]/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
              iPhone <span className="text-[#DB5858]">Water Damage Repair</span> Denton, TX
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Emergency water damage restoration for iPhones. Professional cleaning and component repair to save your device and data.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl px-4 py-2 flex items-center">
                <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                <span className="font-semibold text-gray-800 text-sm">Emergency Service</span>
              </div>
              <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl px-4 py-2 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-orange-500" />
                <span className="font-semibold text-gray-800 text-sm">2-3 Hour Repair</span>
              </div>
              <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl px-4 py-2 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                <span className="font-semibold text-gray-800 text-sm">60-Day Warranty</span>
              </div>
            </div>

            {/* Water Damage Issues */}
            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 mb-8 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Common Water Damage Issues We Fix:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Water/liquid submersion</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Coffee, soda, or drink spills</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Rain or moisture damage</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Toilet or sink accidents</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Swimming pool incidents</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Internal corrosion cleanup</span>
                </div>
              </div>
            </div>

            {/* Emergency Alert */}
            <div className="backdrop-blur-md bg-orange-50/60 border border-orange-200/80 rounded-2xl p-6 mb-8 shadow-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-orange-800 mb-2">Act Fast to Save Your iPhone!</h3>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    Time is critical with water damage. Turn off your iPhone immediately and bring it to us within 24 hours for the best chance of recovery.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-4 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-none"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency Call {siteConfig.phone}
                </a>
              </Button>
              <Button
                size="lg"
                className="backdrop-blur-md bg-white/40 border border-white/60 text-gray-800 hover:bg-white/60 hover:border-white/80 py-4 px-8 text-lg font-semibold transition-all duration-300"
              >
                Get Free Assessment
                <MessageSquare className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Water Damage Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="/images/iphone-repair/iphone-liquid-damage-repair.jpg"
                alt="iPhone water damage repair service in Denton TX - emergency liquid damage restoration"
                className="w-full h-auto max-w-md mx-auto rounded-2xl"
              />

              {/* Emergency Service badge */}
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
                <div className="text-center">
                  <div className="text-sm font-bold">Emergency</div>
                  <div className="text-xs">Service</div>
                </div>
              </div>

              {/* Recovery Rate badge */}
              <div className="absolute bottom-4 left-4 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-semibold text-gray-900">High Recovery Rate</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}