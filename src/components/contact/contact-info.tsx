"use client";

import { Phone, MapPin, Clock, Mail, ExternalLink, Car, Wifi, CreditCard } from "lucide-react";
import { siteConfig } from "@/config/site";

export function ContactInfo() {
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
            Find Our Location
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Located in the heart of Denton, TX. Easy to find with plenty of free parking available.
          </p>
        </div>

        {/* Map Card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg max-w-4xl mx-auto">
          {/* Map will be integrated here later */}
          <div className="aspect-[16/10] bg-gray-100 flex items-center justify-center relative">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-[#DB5858] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Google Maps Integration</h3>
              <p className="text-gray-600 mb-4">Interactive map will be added here</p>
              <div className="text-sm text-gray-500">
                {siteConfig.address.street}<br />
                {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
              </div>
            </div>

            {/* Placeholder map overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#DB5858]/10 to-blue-500/10 opacity-20"></div>
            <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#DB5858] rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">Nexus Tech Solutions</span>
              </div>
            </div>
          </div>

          {/* Map Footer */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#DB5858]" />
                <span className="text-sm font-medium text-gray-900">
                  {siteConfig.address.street}, {siteConfig.address.city}
                </span>
              </div>
              <a
                href="https://maps.app.goo.gl/bazd8n2NJn5z91ry6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#DB5858] hover:text-[#c94848] transition-colors text-sm font-medium"
              >
                Open in Maps <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}