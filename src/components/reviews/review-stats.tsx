"use client";

import { Star, TrendingUp, Award, Clock } from "lucide-react";
import Image from "next/image";

export function ReviewStats() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-4 text-gray-900">
            Trusted by Hundreds of Customers
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Our commitment to quality service and customer satisfaction shows in our consistently high ratings across all review platforms.
          </p>
        </div>

        {/* Review Platform Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-12 lg:mb-16">
          {/* Google Reviews */}
          <div className="text-center group">
            <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-4 lg:p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:border-[#DB5858]/20">
              <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 rounded-full flex items-center justify-center overflow-hidden p-1">
                <Image
                  src="/images/social-icons/google-icon.png"
                  alt="Google"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-sm lg:text-xl font-bold text-gray-900 mb-1 lg:mb-2">Google Reviews</h3>
              <div className="flex items-center justify-center gap-0.5 lg:gap-1 mb-1 lg:mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 lg:h-5 lg:w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-lg lg:text-2xl font-bold text-gray-900 mb-0.5 lg:mb-1">5.0/5</div>
              <div className="text-xs lg:text-sm text-gray-600">115+ Reviews</div>
            </div>
          </div>

          {/* Trustpilot - Commented out until setup is complete */}
          {/* <div className="text-center group">
            <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-4 lg:p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:border-[#DB5858]/20">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-base lg:text-xl">T</span>
              </div>
              <h3 className="text-sm lg:text-xl font-bold text-gray-900 mb-1 lg:mb-2">Trustpilot</h3>
              <div className="flex items-center justify-center gap-0.5 lg:gap-1 mb-1 lg:mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 lg:h-5 lg:w-5 fill-green-500 text-green-500" />
                ))}
              </div>
              <div className="text-lg lg:text-2xl font-bold text-gray-900 mb-0.5 lg:mb-1">4.8/5</div>
              <div className="text-xs lg:text-sm text-gray-600">50+ Reviews</div>
            </div>
          </div> */}

          {/* Facebook */}
          <div className="text-center group">
            <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-4 lg:p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:border-[#DB5858]/20">
              <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 rounded-full flex items-center justify-center overflow-hidden p-1">
                <Image
                  src="/images/social-icons/facebook-icon.png"
                  alt="Facebook"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-sm lg:text-xl font-bold text-gray-900 mb-1 lg:mb-2">Facebook</h3>
              <div className="flex items-center justify-center gap-0.5 lg:gap-1 mb-1 lg:mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 lg:h-5 lg:w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-lg lg:text-2xl font-bold text-gray-900 mb-0.5 lg:mb-1">5.0/5</div>
              <div className="text-xs lg:text-sm text-gray-600">25+ Reviews</div>
            </div>
          </div>

          {/* Yelp */}
          <div className="text-center group">
            <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-4 lg:p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:border-[#DB5858]/20">
              <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/social-icons/yelp-icon.webp"
                  alt="Yelp"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-sm lg:text-xl font-bold text-gray-900 mb-1 lg:mb-2">Yelp</h3>
              <div className="flex items-center justify-center gap-0.5 lg:gap-1 mb-1 lg:mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 lg:h-5 lg:w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-lg lg:text-2xl font-bold text-gray-900 mb-0.5 lg:mb-1">5.0/5</div>
              <div className="text-xs lg:text-sm text-gray-600">4+ Reviews</div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Customer Satisfaction */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl mb-3 lg:mb-4">
              <TrendingUp className="h-7 w-7 lg:h-8 lg:w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">99% Satisfaction</h3>
            <p className="text-gray-600 text-sm lg:text-base px-4">
              Nearly all customers are completely satisfied with our repair service and would choose us again.
            </p>
          </div>

          {/* Average Response */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl mb-3 lg:mb-4">
              <Clock className="h-7 w-7 lg:h-8 lg:w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Same-Day Service</h3>
            <p className="text-gray-600 text-sm lg:text-base px-4">
              Most of our 5-star reviews mention our fast same-day service and quick turnaround times.
            </p>
          </div>

          {/* Recognition */}
          <div className="text-center sm:col-span-2 lg:col-span-1">
            <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl mb-3 lg:mb-4">
              <Award className="h-7 w-7 lg:h-8 lg:w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Top Rated</h3>
            <p className="text-gray-600 text-sm lg:text-base px-4">
              Consistently rated as one of the top device repair shops in Denton, TX and surrounding areas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}