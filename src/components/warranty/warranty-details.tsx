"use client";

import { Shield, Wrench, ShoppingCart, XCircle, CheckCircle, Gamepad2 } from "lucide-react";

export function WarrantyDetails() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="max-w-4xl mx-auto">
          {/* Warranty Coverage */}
          <div className="mb-8 lg:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-6 lg:mb-8 text-gray-900 text-center">
              What's Covered
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
              {/* Repair Warranty */}
              <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-4 lg:mb-6">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#DB5858]/10 rounded-lg lg:rounded-xl flex items-center justify-center">
                    <Wrench className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">Repair Warranty</h3>
                </div>
                <p className="text-gray-600 text-sm lg:text-base mb-4">
                  All repairs come with a 60-day warranty covering defects in parts and workmanship. If the same issue occurs within 60 days, we'll fix it free of charge.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs lg:text-sm text-gray-700">Defective parts replacement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs lg:text-sm text-gray-700">Workmanship issues</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs lg:text-sm text-gray-700">Labor costs included</span>
                  </div>
                </div>
              </div>

              {/* Sales Warranty */}
              <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-4 lg:mb-6">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#DB5858]/10 rounded-lg lg:rounded-xl flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">Device Sales Warranty</h3>
                </div>
                <p className="text-gray-600 text-sm lg:text-base mb-4">
                  Pre-owned devices sold by us include a 60-day warranty against defects. We thoroughly test all devices before sale to ensure quality.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs lg:text-sm text-gray-700">Hardware defects covered</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs lg:text-sm text-gray-700">Battery issues covered</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs lg:text-sm text-gray-700">Screen defects covered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Extended Warranty Callout */}
            <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-xl lg:rounded-2xl p-6 lg:p-8 text-white text-center mb-8 lg:mb-12">
              <div className="flex items-center justify-center gap-3 mb-3 lg:mb-4">
                <Gamepad2 className="h-8 w-8 lg:h-10 lg:w-10" />
                <h3 className="text-xl lg:text-2xl font-bold">Extended Console Warranty</h3>
              </div>
              <p className="text-white/90 text-sm lg:text-base mb-2">
                All game console HDMI port repairs come with an extended <strong>1-year warranty</strong>
              </p>
              <p className="text-white/80 text-xs lg:text-sm">
                PlayStation, Xbox, Nintendo Switch - we've got you covered for a full year
              </p>
            </div>
          </div>

          {/* What's Not Covered */}
          <div className="bg-gradient-to-r from-[#DB5858]/5 to-[#c94848]/5 rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-[#DB5858]/20">
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#DB5858]/10 rounded-lg lg:rounded-xl flex items-center justify-center">
                <XCircle className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">What's Not Covered</h3>
            </div>
            <p className="text-gray-600 text-sm lg:text-base mb-4">
              Our warranty does not cover physical damage to your device. This includes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#DB5858] rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-xs lg:text-sm text-gray-700">Cracked or broken screens</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#DB5858] rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-xs lg:text-sm text-gray-700">Water or liquid damage</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#DB5858] rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-xs lg:text-sm text-gray-700">Physical impact damage</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#DB5858] rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-xs lg:text-sm text-gray-700">Unauthorized repairs</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#DB5858] rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-xs lg:text-sm text-gray-700">Normal wear and tear</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#DB5858] rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-xs lg:text-sm text-gray-700">Software issues</span>
              </div>
            </div>
          </div>

          {/* How to Claim */}
          <div className="mt-8 lg:mt-12">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 text-center">
              How to Use Your Warranty
            </h3>
            <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#DB5858] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Bring Your Device In</h4>
                    <p className="text-gray-600 text-xs lg:text-sm">Visit our Denton location with your device and original receipt.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#DB5858] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">We'll Diagnose the Issue</h4>
                    <p className="text-gray-600 text-xs lg:text-sm">Our technicians will examine your device to verify the warranty claim.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#DB5858] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Free Repair or Replacement</h4>
                    <p className="text-gray-600 text-xs lg:text-sm">If covered, we'll repair or replace at no charge within the warranty period.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
