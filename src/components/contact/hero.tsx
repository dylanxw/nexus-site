"use client";

import { Phone, MapPin, Clock, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function ContactHero() {
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 lg:mb-6 text-gray-900">
            Contact <span className="text-[#DB5858]">Nexus Tech Solutions</span>
          </h1>
          <p className="text-base lg:text-xl text-gray-600 mb-4 lg:mb-8 leading-relaxed max-w-3xl mx-auto">
            Get in touch with Denton's premier device repair shop. Visit our store, call for instant quotes, or schedule your repair online.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {/* Phone */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group">
            <Phone className="h-10 w-10 lg:h-12 lg:w-12 text-[#DB5858] mx-auto mb-3 lg:mb-4" />
            <h3 className="text-base lg:text-lg font-bold mb-2 text-gray-900">Call Us</h3>
            <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4">Instant quotes & same-day service</p>
            <a
              href={`tel:${siteConfig.phone}`}
              className="text-[#DB5858] font-semibold hover:text-[#c94848] transition-colors text-sm lg:text-base"
            >
              {siteConfig.phone}
            </a>
          </div>

          {/* Location */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group">
            <MapPin className="h-10 w-10 lg:h-12 lg:w-12 text-[#DB5858] mx-auto mb-3 lg:mb-4" />
            <h3 className="text-base lg:text-lg font-bold mb-2 text-gray-900">Visit Us</h3>
            <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4">Walk-ins welcome</p>
            <a
              href="https://maps.app.goo.gl/sFt6rn5nkkioYtqP7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DB5858] font-semibold hover:text-[#c94848] transition-colors inline-flex items-center gap-1.5 text-xs lg:text-sm"
            >
              <span className="text-gray-700 font-medium">
                {siteConfig.address.street}<br />
                {siteConfig.address.city}, {siteConfig.address.state}
              </span>
              <ExternalLink className="h-3 w-3 lg:h-4 lg:w-4" />
            </a>
          </div>

          {/* Hours */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group">
            <Clock className="h-10 w-10 lg:h-12 lg:w-12 text-[#DB5858] mx-auto mb-3 lg:mb-4" />
            <h3 className="text-base lg:text-lg font-bold mb-2 text-gray-900">Hours</h3>
            <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4">Open 6 days a week</p>
            <p className="text-gray-700 font-medium text-xs lg:text-sm">
              Mon-Fri: 10AM-7PM<br />
              Sat: 10AM-6PM<br />
              Sun: Closed
            </p>
          </div>

          {/* Email */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group">
            <Mail className="h-10 w-10 lg:h-12 lg:w-12 text-[#DB5858] mx-auto mb-3 lg:mb-4" />
            <h3 className="text-base lg:text-lg font-bold mb-2 text-gray-900">Email Us</h3>
            <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4">Questions & quotes</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-[#DB5858] font-semibold hover:text-[#c94848] transition-colors text-xs lg:text-sm break-all"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}