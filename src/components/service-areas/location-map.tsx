"use client";

import { MapPin, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

export function LocationMap() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-4 text-gray-900">
            Our Denton Location
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Conveniently located in Denton, TX, we're easily accessible from all surrounding North Texas communities.
          </p>
        </div>

        {/* Map Card */}
        <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-200 overflow-hidden shadow-lg max-w-4xl mx-auto">
          {/* Map will be integrated here later */}
          <div className="aspect-[16/10] bg-gray-100 flex items-center justify-center relative">
            <div className="text-center px-4">
              <MapPin className="h-12 w-12 lg:h-16 lg:w-16 text-[#DB5858] mx-auto mb-3 lg:mb-4" />
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Google Maps Integration</h3>
              <p className="text-gray-600 mb-3 lg:mb-4 text-sm lg:text-base">Interactive map will be added here</p>
              <div className="text-xs lg:text-sm text-gray-500">
                {siteConfig.address.street}<br />
                {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
              </div>
            </div>

            {/* Placeholder map overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#DB5858]/10 to-blue-500/10 opacity-20"></div>
            <div className="absolute top-3 left-3 lg:top-4 lg:left-4 bg-white rounded-lg px-2 py-1.5 lg:px-3 lg:py-2 shadow-md">
              <div className="flex items-center gap-1.5 lg:gap-2">
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-[#DB5858] rounded-full"></div>
                <span className="text-xs lg:text-sm font-medium text-gray-900">Nexus Tech Solutions</span>
              </div>
            </div>
          </div>

          {/* Map Footer */}
          <div className="p-4 lg:p-6 bg-white">
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6 items-center">
              <div>
                <div className="flex items-center gap-2 mb-2 lg:mb-3">
                  <MapPin className="h-4 w-4 lg:h-5 lg:w-5 text-[#DB5858]" />
                  <span className="text-base lg:text-lg font-semibold text-gray-900">Store Address</span>
                </div>
                <div className="text-gray-600 mb-2 text-sm lg:text-base">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                </div>
                <p className="text-xs lg:text-sm text-gray-500">
                  Free parking available • Easy highway access • Central North Texas location
                </p>
              </div>
              <div className="text-center md:text-right">
                <a
                  href="https://maps.app.goo.gl/bazd8n2NJn5z91ry6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-4 py-2.5 lg:px-6 lg:py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm lg:text-base"
                >
                  Get Directions <ExternalLink className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                </a>
                <p className="text-xs lg:text-sm text-gray-500 mt-2">
                  Open in Google Maps
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Distance Info */}
        <div className="text-center mt-6 lg:mt-8">
          <p className="text-gray-600 max-w-2xl mx-auto text-sm lg:text-base px-4">
            <strong>Centrally located</strong> to serve all of North Texas with easy access from I-35E, I-35W, and Highway 380.
            Most surrounding cities are within a 30-minute drive from our Denton location.
          </p>
        </div>
      </div>
    </section>
  );
}