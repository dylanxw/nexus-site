"use client";

import { Star, TrendingUp, Award, Clock } from "lucide-react";

export function ReviewStats() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Trusted by Hundreds of Customers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our commitment to quality service and customer satisfaction shows in our consistently high ratings across all review platforms.
          </p>
        </div>

        {/* Review Platform Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Google Reviews */}
          <div className="text-center group">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:border-[#DB5858]/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Google Reviews</h3>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">4.9/5</div>
              <div className="text-sm text-gray-600">150+ Reviews</div>
            </div>
          </div>

          {/* Trustpilot */}
          <div className="text-center group">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:border-[#DB5858]/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trustpilot</h3>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-green-500 text-green-500" />
                ))}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">4.8/5</div>
              <div className="text-sm text-gray-600">50+ Reviews</div>
            </div>
          </div>

          {/* Facebook */}
          <div className="text-center group">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:border-[#DB5858]/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">f</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Facebook</h3>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">5.0/5</div>
              <div className="text-sm text-gray-600">25+ Reviews</div>
            </div>
          </div>

          {/* Yelp */}
          <div className="text-center group">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:border-[#DB5858]/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Yelp</h3>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">4.7/5</div>
              <div className="text-sm text-gray-600">15+ Reviews</div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Customer Satisfaction */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#DB5858]/10 rounded-2xl mb-4">
              <TrendingUp className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">98% Satisfaction</h3>
            <p className="text-gray-600">
              Nearly all customers are completely satisfied with our repair service and would choose us again.
            </p>
          </div>

          {/* Average Response */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#DB5858]/10 rounded-2xl mb-4">
              <Clock className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Same-Day Service</h3>
            <p className="text-gray-600">
              Most of our 5-star reviews mention our fast same-day service and quick turnaround times.
            </p>
          </div>

          {/* Recognition */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#DB5858]/10 rounded-2xl mb-4">
              <Award className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Top Rated</h3>
            <p className="text-gray-600">
              Consistently rated as one of the top device repair shops in Denton, TX and surrounding areas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}