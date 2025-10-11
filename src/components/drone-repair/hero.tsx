"use client";

import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Clock, Shield, CheckCircle, Star, Plane } from "lucide-react";
import { siteConfig } from "@/config/site";

export function DroneRepairHero() {
  return (
    <section className="py-8 lg:py-16 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-[#DB5858]/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#DB5858]/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#DB5858]/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Content */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 lg:mb-6 text-gray-900">
              Drone Repair <span className="text-[#DB5858]">Denton, TX</span>
            </h1>

            <p className="text-base lg:text-xl text-gray-600 mb-4 lg:mb-6 leading-relaxed">
              The drone doctors of Denton! Expert drone repair with same-day service, quality parts, and 60-day warranty. Professional technicians for DJI, Autel, Parrot, and all drone brands.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-2 lg:gap-4 mb-4 lg:mb-8">
              <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-lg lg:rounded-xl px-3 py-1.5 lg:px-4 lg:py-2 flex items-center">
                <Star className="h-3 w-3 lg:h-4 lg:w-4 mr-2 text-yellow-500" />
                <span className="font-semibold text-gray-800 text-xs lg:text-sm">4.9★ Rating</span>
              </div>
              <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-lg lg:rounded-xl px-3 py-1.5 lg:px-4 lg:py-2 flex items-center">
                <Clock className="h-3 w-3 lg:h-4 lg:w-4 mr-2 text-green-500" />
                <span className="font-semibold text-gray-800 text-xs lg:text-sm">Same-Day Service</span>
              </div>
              <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-lg lg:rounded-xl px-3 py-1.5 lg:px-4 lg:py-2 flex items-center">
                <Shield className="h-3 w-3 lg:h-4 lg:w-4 mr-2 text-blue-500" />
                <span className="font-semibold text-gray-800 text-xs lg:text-sm">60-Day Warranty</span>
              </div>
            </div>

            {/* Common Repairs */}
            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-4 lg:mb-8 shadow-lg">
              <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4">Common Drone Repairs:</h3>
              <div className="grid grid-cols-2 gap-2 lg:gap-3 text-xs lg:text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#DB5858] rounded-full mr-2"></div>
                  <span className="text-gray-600">Crash damage repair</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#DB5858] rounded-full mr-2"></div>
                  <span className="text-gray-600">Propeller replacement</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#DB5858] rounded-full mr-2"></div>
                  <span className="text-gray-600">Camera & gimbal repair</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#DB5858] rounded-full mr-2"></div>
                  <span className="text-gray-600">Motor replacement</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#DB5858] rounded-full mr-2"></div>
                  <span className="text-gray-600">Battery issues</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#DB5858] rounded-full mr-2"></div>
                  <span className="text-gray-600">Remote controller repair</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-3 px-6 lg:py-4 lg:px-8 text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-none"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                  Call {siteConfig.phone}
                </a>
              </Button>
              <Button
                size="lg"
                className="backdrop-blur-md bg-white/40 border border-white/60 text-gray-800 hover:bg-white/60 hover:border-white/80 py-3 px-6 lg:py-4 lg:px-8 text-base lg:text-lg font-semibold transition-all duration-300"
              >
                Get Free Quote
                <MessageSquare className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
              </Button>
            </div>
          </div>

          {/* Drone Image */}
          <div className="relative">
            <div className="relative">
              <img
                src="/images/drone-repair/drone-repair-services.png"
                alt="Drone repair services in Denton TX"
                className="w-full h-auto max-w-md mx-auto rounded-xl lg:rounded-2xl"
              />

              {/* Floating badge */}
              <div className="absolute top-4 right-4 bg-[#DB5858] text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-lg">
                <div className="text-center">
                  <div className="text-xs lg:text-sm font-bold">Same-Day</div>
                  <div className="text-xs">Service</div>
                </div>
              </div>

              {/* Trust badge */}
              <div className="absolute bottom-4 left-4 bg-white border border-gray-200 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 text-green-500" />
                  <span className="text-xs lg:text-sm font-semibold text-gray-900">60-Day Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}