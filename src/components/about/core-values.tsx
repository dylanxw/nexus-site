"use client";

import { Shield, Heart, Award, Zap } from "lucide-react";

export function CoreValues() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-blue-500/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-4 text-gray-900 px-4">
            Our Core Values
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Integrity */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 mx-auto">
              <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">Integrity</h3>
            <p className="text-gray-600 text-sm lg:text-base">
              We believe in honest, transparent business practices. No hidden fees, no surprises—just straightforward service you can trust.
            </p>
          </div>

          {/* Quality */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 mx-auto">
              <Award className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">Quality</h3>
            <p className="text-gray-600 text-sm lg:text-base">
              We use only high-quality parts and materials, backed by our comprehensive warranty. Your satisfaction is our guarantee.
            </p>
          </div>

          {/* Customer Focus */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 mx-auto">
              <Heart className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">Customer Focus</h3>
            <p className="text-gray-600 text-sm lg:text-base">
              Your experience matters. We prioritize customer service and treat every device like it's our own.
            </p>
          </div>

          {/* Speed */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 mx-auto">
              <Zap className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">Fast Service</h3>
            <p className="text-gray-600 text-sm lg:text-base">
              We know you need your device back quickly. Most repairs are completed the same day without compromising quality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
