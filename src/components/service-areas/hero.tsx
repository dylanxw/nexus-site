"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function ServiceAreasHero() {
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
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 lg:mb-6 text-gray-900">
            Device Repair Service Areas in <span className="text-[#DB5858]">North Texas</span>
          </h1>
          <p className="text-base lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
            Professional device repair serving Denton, TX and surrounding communities. Expert iPhone, Samsung, tablet, computer, and drone repair with same-day service and 60-day warranty.
          </p>
        </div>

        {/* Quick Service Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {/* Local Service */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group">
            <MapPin className="h-10 w-10 lg:h-12 lg:w-12 text-[#DB5858] mx-auto mb-3 lg:mb-4" />
            <h3 className="text-base lg:text-lg font-bold mb-2 text-gray-900">Local Service</h3>
            <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4">Serving Denton and surrounding North Texas cities</p>
            <p className="text-[#DB5858] font-semibold text-xs lg:text-sm">15+ Cities Covered</p>
          </div>

          {/* Same-Day Service */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group">
            <Clock className="h-10 w-10 lg:h-12 lg:w-12 text-[#DB5858] mx-auto mb-3 lg:mb-4" />
            <h3 className="text-base lg:text-lg font-bold mb-2 text-gray-900">Same-Day Service</h3>
            <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4">Most repairs completed within 2-4 hours</p>
            <p className="text-[#DB5858] font-semibold text-xs lg:text-sm">Fast Turnaround</p>
          </div>

          {/* Mail-In Available */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group">
            <Phone className="h-10 w-10 lg:h-12 lg:w-12 text-[#DB5858] mx-auto mb-3 lg:mb-4" />
            <h3 className="text-base lg:text-lg font-bold mb-2 text-gray-900">Mail-In Repair</h3>
            <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4">Nationwide mail-in service available</p>
            <p className="text-[#DB5858] font-semibold text-xs lg:text-sm">Anywhere in USA</p>
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center max-w-2xl mx-auto px-4">
            <Button
              size="lg"
              asChild
              className="flex-1 bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-3 px-6 lg:py-4 lg:px-8 text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-none"
            >
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                Call {siteConfig.phone}
              </a>
            </Button>
            <Button
              size="lg"
              className="flex-1 backdrop-blur-md bg-white/40 border border-white/60 text-gray-800 hover:bg-white/60 hover:border-white/80 py-3 px-6 lg:py-4 lg:px-8 text-base lg:text-lg font-semibold transition-all duration-300"
            >
              View Service Areas
              <MapPin className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}