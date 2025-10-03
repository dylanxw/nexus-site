"use client";

import { MapPin, Clock, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function LocationsHero() {
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
            Visit Our <span className="text-[#DB5858]">Denton, Texas</span> Location
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Nexus Tech Solutions is proud to serve the Denton community with professional device repair, buying, and selling services. We're your local tech experts in the heart of North Texas.
          </p>

          {/* Quick Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Address */}
            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
              <MapPin className="h-8 w-8 text-[#DB5858] mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Our Address</h3>
              <p className="text-gray-600 text-sm">
                {siteConfig.address.street}<br />
                {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
              </p>
            </div>

            {/* Hours */}
            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
              <Clock className="h-8 w-8 text-[#DB5858] mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Store Hours</h3>
              <p className="text-gray-600 text-sm">
                Mon-Fri: 10am-7pm<br />
                Sat: 10am-6pm<br />
                Sun: Closed
              </p>
            </div>

            {/* Phone */}
            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
              <Phone className="h-8 w-8 text-[#DB5858] mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Call Us Now</h3>
              <p className="text-gray-600 text-sm mb-2">{siteConfig.phone}</p>
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-xs text-gray-500 ml-1">4.9/5</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Button
              size="lg"
              className="flex-1 bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-4 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-none"
            >
              Get Directions
            </Button>
            <Button
              size="lg"
              className="flex-1 backdrop-blur-md bg-white/40 border border-white/60 text-gray-800 hover:bg-white/60 hover:border-white/80 py-4 px-8 text-lg font-semibold transition-all duration-300"
            >
              Call Now: {siteConfig.phone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}