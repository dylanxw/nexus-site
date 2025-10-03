"use client";

import { MapPin, Car, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceAreas = [
  "Denton, TX", "Corinth, TX", "Lake Dallas, TX", "Shady Shores, TX",
  "Hickory Creek, TX", "Little Elm, TX", "Frisco, TX", "Lewisville, TX",
  "Flower Mound, TX", "Highland Village, TX", "Double Oak, TX", "Bartonville, TX",
  "Copper Canyon, TX", "Argyle, TX", "Krugerville, TX", "Cross Roads, TX",
  "Aubrey, TX", "Pilot Point, TX", "Sanger, TX", "Krum, TX"
];

export function ServiceAreas() {
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Areas We Serve
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From our Denton location, we provide device repair, buying, and selling services throughout North Texas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Service Areas List */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-6 w-6 text-[#DB5858]" />
              <h3 className="text-xl font-bold text-gray-900">Cities We Serve</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {serviceAreas.map((city, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-gray-50/80 rounded-lg hover:bg-white/80 transition-all duration-200"
                >
                  <div className="w-2 h-2 bg-[#DB5858] rounded-full"></div>
                  <span className="text-gray-700 text-sm font-medium">{city}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#DB5858]/10 rounded-lg">
              <p className="text-[#DB5858] text-sm font-medium text-center">
                Don't see your city? Call us! We serve additional areas throughout North Texas.
              </p>
            </div>
          </div>

          {/* Service Options */}
          <div className="space-y-6">
            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">How We Serve You</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#DB5858]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#DB5858]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Visit Our Store</h4>
                    <p className="text-gray-600 text-sm">Walk-in service in Denton for all your tech needs</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#DB5858]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car className="h-5 w-5 text-[#DB5858]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Local Pickup</h4>
                    <p className="text-gray-600 text-sm">We can arrange pickup for nearby areas</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#DB5858]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-[#DB5858]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Mail-In Service</h4>
                    <p className="text-gray-600 text-sm">Secure shipping for customers outside our area</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="mb-6 text-white/90">
                Call us or visit our Denton store for expert device repair services.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-white text-[#DB5858] hover:bg-gray-100">
                  Get Directions
                </Button>
                <Button className="flex-1 bg-white/10 border border-white/20 text-white hover:bg-white/20">
                  Call: 940-600-1012
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}