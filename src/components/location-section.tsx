"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Star, ExternalLink, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function LocationSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Modern gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
        }}
      ></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-[#DB5858]/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-[#DB5858]/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#DB5858]/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <div className="wide-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Business Info - Left Side */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-4 text-center lg:text-left">Nexus Tech Solutions</h3>

                <div className="space-y-3 text-gray-200">
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <MapPin className="h-4 w-4 text-[#DB5858]" />
                    <span className="text-sm">{siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <Clock className="h-4 w-4 text-[#DB5858]" />
                    <span className="text-sm">Mon-Fri: 10AM-7PM, Sat: 10AM-6PM</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-white font-medium text-sm">4.7 (226+ reviews)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Right Side */}
              <div className="flex flex-col gap-4 min-w-[500px]">
                <Button asChild className="py-4 px-12 backdrop-blur-md bg-white/10 border-2 border-white/30 hover:bg-white/20 hover:border-white/40 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild className="py-4 px-12 bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-none">
                  <a
                    href={siteConfig.social.google || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Write a Review
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}