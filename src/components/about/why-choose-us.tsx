"use client";

import { CheckCircle, Clock, Shield, DollarSign, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-4 text-gray-900 px-4">
              Why Choose Nexus Tech Solutions?
            </h2>
            <p className="text-base lg:text-lg text-gray-600 px-4">
              We're more than just a repair shop—we're your local tech partner
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
            {/* Same-Day Service */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#DB5858]/10 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1 lg:mb-2">Same-Day Repairs</h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  Most repairs completed while you wait or the same day. We know your time is valuable.
                </p>
              </div>
            </div>

            {/* Warranty */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#DB5858]/10 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1 lg:mb-2">60-Day Warranty</h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  Every repair backed by our comprehensive warranty for your peace of mind.
                </p>
              </div>
            </div>

            {/* Fair Pricing */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#DB5858]/10 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1 lg:mb-2">Fair Pricing</h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  Transparent, upfront pricing with no hidden fees. You'll know the cost before we start.
                </p>
              </div>
            </div>

            {/* Local Business */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#DB5858]/10 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1 lg:mb-2">Local & Trusted</h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  Proudly serving Denton and supporting our local community, including UNT students and local businesses.
                </p>
              </div>
            </div>

            {/* Expert Technicians */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#DB5858]/10 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1 lg:mb-2">Expert Technicians</h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  Skilled professionals with experience repairing all major brands and device types.
                </p>
              </div>
            </div>

            {/* 5-Star Rated */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#DB5858]/10 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <Star className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1 lg:mb-2">5-Star Rated</h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  Consistently rated 5.0 stars by our customers across Google, Facebook, and Yelp.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-xl lg:rounded-2xl p-6 lg:p-8 text-white text-center">
            <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Ready to Get Your Device Fixed?</h3>
            <p className="text-white/90 text-sm lg:text-base mb-6 lg:mb-8 max-w-2xl mx-auto">
              Visit our Denton location or give us a call. We're here to help with all your device repair needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
              <Button
                size="lg"
                className="flex-1 sm:flex-initial bg-white text-[#DB5858] hover:bg-gray-100 py-3 px-6 lg:py-4 lg:px-8 text-base lg:text-lg font-semibold"
              >
                Visit Our Store
              </Button>
              <Button
                size="lg"
                className="flex-1 sm:flex-initial bg-white/10 border border-white/20 text-white hover:bg-white/20 py-3 px-6 lg:py-4 lg:px-8 text-base lg:text-lg font-semibold"
              >
                Call: {siteConfig.phone}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
