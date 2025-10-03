"use client";

import { MapPin, Navigation, Clock, Phone, Star, Wrench, ShoppingCart, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export function CurrentLocation() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Visit Our Denton Store
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your local tech experts in the heart of Denton, Texas. Professional device repair, buying, and selling services for the community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Storefront & Address */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-[#DB5858]" />
                <h3 className="text-xl font-bold text-gray-900">Our Denton Location</h3>
              </div>

              {/* Storefront Image */}
              <div className="mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/hero/nexus-storefront-image.jpeg"
                  alt="Nexus Tech Solutions storefront in Denton, TX"
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                  <p className="text-gray-600">
                    {siteConfig.address.street}<br />
                    {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">{siteConfig.phone}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Store Hours</h4>
                  <div className="text-gray-600 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>10:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-[#DB5858] hover:bg-[#c94848] text-white">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>
          </div>

          {/* Services & Why Choose Us */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">What We Do</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#DB5858]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench className="h-5 w-5 text-[#DB5858]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Device Repair</h4>
                    <p className="text-gray-600 text-sm">iPhone, Samsung, iPad, MacBook, gaming consoles, and drones</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#DB5858]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShoppingCart className="h-5 w-5 text-[#DB5858]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Buy Electronics</h4>
                    <p className="text-gray-600 text-sm">Cash for broken or working devices, instant quotes</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#DB5858]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-5 w-5 text-[#DB5858]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Sell Pre-Owned</h4>
                    <p className="text-gray-600 text-sm">Quality refurbished devices with 30-day warranty</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose Us</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#DB5858] rounded-full"></div>
                  <span className="text-gray-700 text-sm">Local Denton business serving UNT and the community</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#DB5858] rounded-full"></div>
                  <span className="text-gray-700 text-sm">Same-day service on most repairs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#DB5858] rounded-full"></div>
                  <span className="text-gray-700 text-sm">60-day warranty on all repairs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#DB5858] rounded-full"></div>
                  <span className="text-gray-700 text-sm">Fair, upfront pricing with no hidden fees</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-6 text-white">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">4.9★</div>
                  <div className="text-white/80 text-xs">Google Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-white/80 text-xs">Local Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">Same Day</div>
                  <div className="text-white/80 text-xs">Most Repairs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}