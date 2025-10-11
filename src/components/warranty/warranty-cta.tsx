"use client";

import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function WarrantyCTA() {
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
        <div className="max-w-3xl mx-auto">
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-4 text-gray-900">
              Questions About Your Warranty?
            </h2>
            <p className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 max-w-2xl mx-auto">
              Our team is here to help. Contact us if you have any questions about your warranty coverage or need to make a warranty claim.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
              <Button
                size="lg"
                className="flex-1 sm:flex-initial bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-3 px-6 lg:py-4 lg:px-8 text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-none"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call: {siteConfig.phone}
              </Button>
              <Button
                size="lg"
                className="flex-1 sm:flex-initial backdrop-blur-md bg-white/40 border border-white/60 text-gray-800 hover:bg-white/60 hover:border-white/80 py-3 px-6 lg:py-4 lg:px-8 text-base lg:text-lg font-semibold transition-all duration-300"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Visit Our Store
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
