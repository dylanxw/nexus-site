"use client";

import { Phone, MessageSquare, Clock, Shield, CheckCircle, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function CallEstimateSamsung() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-[#DB5858]/4 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-[#DB5858]/6 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#DB5858]/3 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-32 right-16 w-32 h-32 bg-yellow-400/3 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-32 left-16 w-36 h-36 bg-green-400/3 rounded-full blur-xl animate-pulse delay-300"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">
            Ready to Fix Your Samsung Galaxy?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Get an instant estimate for your Samsung Galaxy repair. Call now or visit our Denton store for same-day service on all Galaxy models.
          </p>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto mb-12">
            <Button
              size="lg"
              asChild
              className="flex-1 bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-6 px-10 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-none"
            >
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="mr-3 h-6 w-6" />
                Call {siteConfig.phone}
              </a>
            </Button>
            <Button
              size="lg"
              className="flex-1 backdrop-blur-md bg-white/40 border-2 border-white/60 hover:bg-white/60 hover:border-white/80 text-gray-800 py-6 px-10 text-xl font-bold transition-all duration-300 hover:shadow-lg"
            >
              Get Free Quote Online
              <MessageSquare className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Features Grid with glass morphism */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Clock,
              title: "Same-Day Service",
              description: "Most Galaxy repairs completed in 1-2 hours"
            },
            {
              icon: Shield,
              title: "60-Day Warranty",
              description: "All Samsung Galaxy repairs guaranteed for 60 days"
            },
            {
              icon: CheckCircle,
              title: "Quality Parts",
              description: "High-quality parts for all Samsung Galaxy models"
            },
            {
              icon: Star,
              title: "Expert Service",
              description: "4.9/5 stars from 380+ Galaxy repairs"
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center"
              >
                <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  {/* Glass shine animation */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                  <div className="relative z-10 text-center flex flex-col h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#DB5858]/10 rounded-2xl mb-4 backdrop-blur-sm">
                      <Icon className="h-8 w-8 text-[#DB5858]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600 flex-grow">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Options with glass morphism */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Call */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10 flex flex-col h-full">
              <Phone className="h-12 w-12 text-[#DB5858] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Call for Instant Quote</h3>
              <p className="text-gray-600 mb-4 text-sm flex-grow">
                Speak with our Samsung Galaxy repair experts and get pricing over the phone
              </p>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-block bg-gradient-to-r from-[#DB5858] to-[#c94848] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#c94848] hover:to-[#b83d3d] transition-all duration-300 shadow-lg hover:shadow-xl mt-auto"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* Visit */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10 flex flex-col h-full">
              <CheckCircle className="h-12 w-12 text-[#DB5858] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Visit Our Store</h3>
              <p className="text-gray-600 mb-4 text-sm flex-grow">
                Walk-in for free diagnostic and same-day Samsung Galaxy repair service
              </p>
              <a
                href="https://maps.app.goo.gl/bazd8n2NJn5z91ry6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 font-semibold text-sm mt-auto hover:text-[#DB5858] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <div className="text-center">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.city}, {siteConfig.address.state}
                </div>
                <ExternalLink className="h-4 w-4 flex-shrink-0" />
              </a>
            </div>
          </div>

          {/* Online */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 text-center hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10 flex flex-col h-full">
              <MessageSquare className="h-12 w-12 text-[#DB5858] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Online Quote</h3>
              <p className="text-gray-600 mb-4 text-sm flex-grow">
                Get an estimate online and schedule your Samsung Galaxy repair appointment
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#c94848] hover:to-[#b83d3d] transition-all duration-300 shadow-lg hover:shadow-xl mt-auto">
                Get Quote
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Urgency Message */}
        <div className="text-center mt-12">
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <p className="text-lg font-semibold mb-2 text-gray-900">
                ⚡ Don't wait! The longer you wait, the more damage can occur to your Samsung Galaxy.
              </p>
              <p className="text-gray-600">
                Call now for same-day repair service and get your Galaxy back to perfect condition today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}