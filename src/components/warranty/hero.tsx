"use client";

import { Shield, CheckCircle } from "lucide-react";

export function WarrantyHero() {
  return (
    <section className="py-8 lg:py-16 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-[#DB5858]/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#DB5858]/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#DB5858]/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-[#DB5858]/10 rounded-full mb-4 lg:mb-6">
            <Shield className="h-8 w-8 lg:h-10 lg:w-10 text-[#DB5858]" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 lg:mb-6 text-gray-900 px-4">
            Our <span className="text-[#DB5858]">Warranty Policy</span>
          </h1>
          <p className="text-base lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
            We stand behind our work. Every repair and device sale comes with our comprehensive 60-day warranty for your peace of mind.
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-3xl mx-auto">
            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center">
              <div className="text-2xl lg:text-3xl font-bold text-[#DB5858] mb-1">60 Days</div>
              <div className="text-xs lg:text-sm text-gray-600">Warranty Coverage</div>
            </div>
            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center">
              <div className="text-2xl lg:text-3xl font-bold text-[#DB5858] mb-1">100%</div>
              <div className="text-xs lg:text-sm text-gray-600">Parts & Labor</div>
            </div>
            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center">
              <div className="text-2xl lg:text-3xl font-bold text-[#DB5858] mb-1">No Cost</div>
              <div className="text-xs lg:text-sm text-gray-600">Warranty Repairs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
