"use client";

import { Clock, Shield, Star, Users, Wrench, TrendingUp } from "lucide-react";

export function LocationStats() {
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
            Denton's Most Trusted Device Repair Shop
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Our Denton location has built a reputation for excellence in device repair, buying, and selling services. Here's what makes us the top choice for North Texas tech needs.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-12">
          {/* Repair Speed */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">Same Day</div>
            <div className="text-base lg:text-lg font-semibold text-gray-700 mb-2 lg:mb-3">Repair Service</div>
            <p className="text-gray-600 text-xs lg:text-sm">
              85% of repairs completed the same day at our Denton location. We know you need your device back fast.
            </p>
          </div>

          {/* Warranty */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">Lifetime</div>
            <div className="text-base lg:text-lg font-semibold text-gray-700 mb-2 lg:mb-3">Warranty</div>
            <p className="text-gray-600 text-xs lg:text-sm">
              Every repair comes with our comprehensive lifetime warranty. Your peace of mind is guaranteed.
            </p>
          </div>

          {/* Customer Rating */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <Star className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">4.9/5</div>
            <div className="text-base lg:text-lg font-semibold text-gray-700 mb-2 lg:mb-3">Customer Rating</div>
            <p className="text-gray-600 text-xs lg:text-sm">
              Consistently rated 4.9 stars across Google, Trustpilot, and Facebook by Denton customers.
            </p>
          </div>

          {/* Devices Repaired */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <Wrench className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">1,000+</div>
            <div className="text-base lg:text-lg font-semibold text-gray-700 mb-2 lg:mb-3">Devices Repaired</div>
            <p className="text-gray-600 text-xs lg:text-sm">
              Over 1,000 smartphones, tablets, laptops, and gaming devices successfully repaired in Denton.
            </p>
          </div>

          {/* Local Customers */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <Users className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">500+</div>
            <div className="text-base lg:text-lg font-semibold text-gray-700 mb-2 lg:mb-3">Happy Customers</div>
            <p className="text-gray-600 text-xs lg:text-sm">
              Serving Denton residents, UNT students, and North Texas businesses with reliable tech solutions.
            </p>
          </div>

          {/* Success Rate */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">95%</div>
            <div className="text-base lg:text-lg font-semibold text-gray-700 mb-2 lg:mb-3">Success Rate</div>
            <p className="text-gray-600 text-xs lg:text-sm">
              95% of devices brought to our Denton location are successfully repaired and returned to working condition.
            </p>
          </div>
        </div>

        {/* Service Comparison */}
        <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8 text-center px-4">
            Why Denton Chooses Nexus Tech Solutions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Speed */}
            <div className="text-center">
              <div className="bg-[#DB5858]/10 rounded-lg lg:rounded-xl p-3 lg:p-4 mb-3 lg:mb-4 inline-block">
                <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
              </div>
              <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-2 lg:mb-3">Faster Than Competition</h4>
              <div className="space-y-2 text-xs lg:text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Nexus Tech Solutions:</span>
                  <span className="font-semibold text-[#DB5858]">Same Day</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Other Shops:</span>
                  <span className="text-gray-500">3-5 Days</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Big Box Stores:</span>
                  <span className="text-gray-500">1-2 Weeks</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="text-center">
              <div className="bg-[#DB5858]/10 rounded-lg lg:rounded-xl p-3 lg:p-4 mb-3 lg:mb-4 inline-block">
                <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
              </div>
              <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-2 lg:mb-3">Better Value</h4>
              <div className="space-y-2 text-xs lg:text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Our Pricing:</span>
                  <span className="font-semibold text-[#DB5858]">Fair & Upfront</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Warranty:</span>
                  <span className="font-semibold text-[#DB5858]">Lifetime</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Hidden Fees:</span>
                  <span className="font-semibold text-[#DB5858]">None</span>
                </div>
              </div>
            </div>

            {/* Quality */}
            <div className="text-center">
              <div className="bg-[#DB5858]/10 rounded-lg lg:rounded-xl p-3 lg:p-4 mb-3 lg:mb-4 inline-block">
                <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
              </div>
              <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-2 lg:mb-3">Superior Quality</h4>
              <div className="space-y-2 text-xs lg:text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Parts Quality:</span>
                  <span className="font-semibold text-[#DB5858]">Premium OEM</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Technicians:</span>
                  <span className="font-semibold text-[#DB5858]">Certified</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-semibold text-[#DB5858]">95%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}