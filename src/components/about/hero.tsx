"use client";

import { Users, Heart, Wrench, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutHero() {
  return (
    <section className="py-16 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-[#DB5858]/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#DB5858]/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#DB5858]/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            About <span className="text-[#DB5858]">Nexus Tech Solutions</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            More than just a repair shop – we're your neighbors, committed to keeping Denton connected through honest service, quality repairs, and genuine care for our community.
          </p>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
              <Users className="h-8 w-8 text-[#DB5858] mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>

            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
              <Wrench className="h-8 w-8 text-[#DB5858] mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">1,000+</div>
              <div className="text-sm text-gray-600">Devices Repaired</div>
            </div>

            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
              <Star className="h-8 w-8 text-[#DB5858] mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">4.9/5</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>

            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
              <Heart className="h-8 w-8 text-[#DB5858] mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-sm text-gray-600">Local Owned</div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Button
              size="lg"
              className="flex-1 bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-4 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-none"
            >
              Visit Our Store
            </Button>
            <Button
              size="lg"
              className="flex-1 backdrop-blur-md bg-white/40 border border-white/60 text-gray-800 hover:bg-white/60 hover:border-white/80 py-4 px-8 text-lg font-semibold transition-all duration-300"
            >
              Call: 940-600-1012
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}