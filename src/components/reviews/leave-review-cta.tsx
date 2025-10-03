"use client";

import { Star, MessageSquare, ExternalLink, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function LeaveReviewCTA() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-blue-500/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-green-500/3 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Had a Great Experience? Leave Us a Review!
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your feedback helps us improve our services and helps other customers choose the right repair shop. We'd love to hear about your experience with Nexus Tech Solutions.
          </p>
        </div>

        {/* Review Platform Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Google */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Google</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">Leave a review on Google My Business</p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm mt-auto w-full"
            >
              Review on Google <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Trustpilot */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Trustpilot</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">Share your experience on Trustpilot</p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm mt-auto w-full"
            >
              Review on Trustpilot <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Facebook */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">f</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Facebook</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">Rate us on our Facebook page</p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm mt-auto w-full"
            >
              Review on Facebook <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Yelp */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">Y</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Yelp</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">Write a review on Yelp</p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm mt-auto w-full"
            >
              Review on Yelp <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>


        {/* Why Your Review Matters */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-8 text-white">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Star className="h-8 w-8 fill-white" />
              <h3 className="text-2xl md:text-3xl font-bold text-center">Why Your Review Matters</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Helps Others</h4>
                <p className="text-white/80 text-sm">
                  Your review helps other customers choose the right repair service for their devices.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Improves Service</h4>
                <p className="text-white/80 text-sm">
                  Your feedback helps us continuously improve our repair services and customer experience.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Builds Trust</h4>
                <p className="text-white/80 text-sm">
                  Real customer reviews build trust and credibility for our local Denton business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}