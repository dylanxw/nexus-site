"use client";

import { MapPin, Phone, Clock, CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

const primaryCities = [
  {
    name: "Denton",
    distance: "0 miles",
    description: "Our main location - walk-ins welcome",
    services: "All repair services available"
  },
  {
    name: "Lewisville",
    distance: "12 miles",
    description: "Quick access via I-35E south",
    services: "All repair services available"
  },
  {
    name: "Flower Mound",
    distance: "15 miles",
    description: "Easy drive via FM 1171 and I-35W",
    services: "All repair services available"
  },
  {
    name: "Highland Village",
    distance: "18 miles",
    description: "Convenient via FM 2499 and I-35E",
    services: "All repair services available"
  }
];

const secondaryCities = [
  "Corinth", "Lake Dallas", "Hickory Creek", "Shallowwater", "Argyle", "Bartonville",
  "Copper Canyon", "Double Oak", "Roanoke", "Trophy Club", "Keller", "Southlake",
  "Grapevine", "Coppell", "Carrollton", "The Colony", "Frisco", "Little Elm"
];

export function CitiesCoverage() {
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
            Cities We Serve in North Texas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional device repair services for Denton and surrounding communities. Same-day service available for most North Texas cities.
          </p>
        </div>

        {/* Primary Cities */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Primary Service Areas</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {primaryCities.map((city, index) => (
              <div
                key={city.name}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col h-full"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-[#DB5858]" />
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{city.name}</h4>
                      <p className="text-sm text-[#DB5858] font-medium">{city.distance}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 flex-grow">
                    {city.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-gray-600">{city.services}</span>
                  </div>

                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="w-full py-2 px-4 bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white rounded-lg font-semibold transition-all duration-300 text-sm shadow-lg hover:shadow-xl text-center mt-auto"
                  >
                    Call for Service
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Cities */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Additional Service Areas</h3>
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 shadow-lg">
            <p className="text-gray-600 mb-6 text-center">
              We also provide device repair services to residents of these North Texas communities:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {secondaryCities.map((city, index) => (
                <div key={city} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#DB5858] rounded-full"></div>
                  <span className="text-sm text-gray-700">{city}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Don't see your city listed? We serve the entire North Texas region!
              </p>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Phone className="h-4 w-4" />
                Call to Confirm Service
              </a>
            </div>
          </div>
        </div>

        {/* Service Benefits */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Clock className="h-12 w-12 text-[#DB5858] mx-auto mb-4" />
            <h4 className="text-lg font-bold text-gray-900 mb-2">Fast Service</h4>
            <p className="text-gray-600 text-sm">
              Same-day repairs available for most North Texas locations within 30 miles of Denton
            </p>
          </div>

          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-[#DB5858] mx-auto mb-4" />
            <h4 className="text-lg font-bold text-gray-900 mb-2">Quality Guarantee</h4>
            <p className="text-gray-600 text-sm">
              60-day warranty on all repairs regardless of your location in our service area
            </p>
          </div>

          <div className="text-center">
            <MapPin className="h-12 w-12 text-[#DB5858] mx-auto mb-4" />
            <h4 className="text-lg font-bold text-gray-900 mb-2">Convenient Location</h4>
            <p className="text-gray-600 text-sm">
              Easy highway access from I-35E, I-35W, and Highway 380 for quick drop-off and pickup
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}