"use client";

import { MapPin, Rocket, Coffee, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FutureLocations() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="h-6 w-6 text-[#DB5858]" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              Future Locations
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            While we're focused on providing the best service at our Denton location, we have some wild dreams for expansion...
          </p>
          <p className="text-sm text-gray-500 italic">
            (These locations exist only in our tech repair fantasies... for now.)
          </p>
        </div>

        {/* Compact Future Locations */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Frisco Drive-Thru */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 text-center">
            <MapPin className="h-6 w-6 text-[#DB5858] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Frisco, TX</h3>
            <div className="text-xs text-blue-600 font-medium mb-3">Coming 2027*</div>
            <p className="text-gray-600 text-sm">
              Drive-thru phone repair because everything in Texas needs to be accessible from your truck.
            </p>
          </div>

          {/* Plano Coffee Shop */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 text-center">
            <Coffee className="h-6 w-6 text-[#DB5858] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Plano, TX</h3>
            <div className="text-xs text-green-600 font-medium mb-3">Coming 2028*</div>
            <p className="text-gray-600 text-sm">
              "Bytes & Brews" - Fix your screen while sipping a $7 artisanal latte.
            </p>
          </div>

          {/* Dallas Flagship */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 text-center">
            <Zap className="h-6 w-6 text-[#DB5858] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Dallas, TX</h3>
            <div className="text-xs text-purple-600 font-medium mb-3">Coming 2030*</div>
            <p className="text-gray-600 text-sm">
              50-story flagship with helipad for urgent MacBook deliveries. Too much? Probably.
            </p>
          </div>
        </div>

        {/* Reality Check */}
        <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-4">But Seriously...</h3>
          <p className="text-white/90 mb-6">
            While our expansion plans might be slightly ambitious, we're committed to growing our services to better serve North Texas. For now, visit us in Denton where we promise:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-semibold text-sm mb-1">🚗 Easy Parking</div>
              <div className="text-white/80 text-xs">No drive-thru needed</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-semibold text-sm mb-1">☕ No Overpriced Coffee</div>
              <div className="text-white/80 text-xs">Just quality repairs</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-semibold text-sm mb-1">🏢 Ground Level</div>
              <div className="text-white/80 text-xs">No skyscraper or helipad</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-white text-[#DB5858] hover:bg-gray-100">
              Visit Our Real Denton Location
            </Button>
            <Button className="bg-white/10 border border-white/20 text-white hover:bg-white/20">
              Call: 940-600-1012
            </Button>
          </div>

          <p className="text-white/60 text-xs mt-4">
            * Timeline may vary depending on how many iPhones we fix between now and then
          </p>
        </div>
      </div>
    </section>
  );
}