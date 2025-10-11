"use client";

import { Star, Users, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReviewsHero() {
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 lg:mb-6 text-gray-900 px-4">
            What Our Customers Say About <span className="text-[#DB5858]">Nexus Tech Solutions</span>
          </h1>
          <p className="text-base lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
            Don't just take our word for it. Read real reviews from satisfied customers who trust us with their device repairs in Denton, TX and surrounding areas.
          </p>

          {/* Star Rating Display */}
          <div className="flex items-center justify-center gap-2 mb-6 lg:mb-8">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 lg:h-8 lg:w-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl lg:text-3xl font-bold text-gray-900 ml-2">5.0</span>
            <span className="text-sm lg:text-lg text-gray-600 ml-1">out of 5</span>
          </div>

          <p className="text-base lg:text-lg font-semibold text-gray-700 mb-6 lg:mb-8">
            Based on <span className="text-[#DB5858]">140+ verified customer reviews</span>
          </p>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {/* Review Count */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            <Users className="h-10 w-10 lg:h-12 lg:w-12 text-[#DB5858] mx-auto mb-3 lg:mb-4" />
            <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">140+</div>
            <div className="text-xs lg:text-sm text-gray-600">Verified Reviews</div>
          </div>

          {/* Average Rating */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            <Star className="h-10 w-10 lg:h-12 lg:w-12 text-[#DB5858] mx-auto mb-3 lg:mb-4" />
            <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">5.0/5</div>
            <div className="text-xs lg:text-sm text-gray-600">Average Rating</div>
          </div>

          {/* Satisfaction Rate */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            <CheckCircle className="h-10 w-10 lg:h-12 lg:w-12 text-[#DB5858] mx-auto mb-3 lg:mb-4" />
            <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">99%</div>
            <div className="text-xs lg:text-sm text-gray-600">Satisfaction Rate</div>
          </div>

          {/* Recommendation Rate */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            <Shield className="h-10 w-10 lg:h-12 lg:w-12 text-[#DB5858] mx-auto mb-3 lg:mb-4" />
            <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">98%</div>
            <div className="text-xs lg:text-sm text-gray-600">Would Recommend</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center max-w-2xl mx-auto px-4">
            <a
              href="#google-reviews"
              className="flex-1"
            >
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-3 px-6 lg:py-4 lg:px-8 text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-none"
              >
                Read Customer Reviews
              </Button>
            </a>
            <a
              href="https://g.page/r/CZos6WU19IEyEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                size="lg"
                className="w-full backdrop-blur-md bg-white/40 border border-white/60 text-gray-800 hover:bg-white/60 hover:border-white/80 py-3 px-6 lg:py-4 lg:px-8 text-base lg:text-lg font-semibold transition-all duration-300"
              >
                Leave a Review
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}