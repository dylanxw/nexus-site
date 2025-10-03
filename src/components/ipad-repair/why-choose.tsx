"use client";

import { Shield, Clock, Wrench, Star, CheckCircle, Award } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Same-Day Service",
    description: "Most iPad repairs completed within 1-3 hours. Get your iPad back the same day you bring it in.",
    highlight: "1-3 Hour Turnaround"
  },
  {
    icon: Shield,
    title: "60-Day Warranty",
    description: "All iPad repairs include our comprehensive 60-day warranty covering parts and labor.",
    highlight: "Guaranteed Quality"
  },
  {
    icon: Wrench,
    title: "Certified Technicians",
    description: "Our expert technicians are certified in iPad repair with years of experience on all iPad models and generations.",
    highlight: "Expert Service"
  },
  {
    icon: Star,
    title: "Quality Parts",
    description: "We use only high-quality parts that meet or exceed Apple's original specifications for all iPad models.",
    highlight: "Original Quality"
  },
  {
    icon: CheckCircle,
    title: "Free Diagnostics",
    description: "Bring your iPad in for a free diagnostic to identify the exact issue before any repair work begins.",
    highlight: "No Hidden Fees"
  },
  {
    icon: Award,
    title: "Local & Trusted",
    description: "Family-owned business serving Denton, TX with honest pricing and transparent iPad repair service since day one.",
    highlight: "Community Focused"
  }
];

export function WhyChooseIPad() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="wide-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            Why Choose Nexus Tech Solutions for iPad Repair?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're Denton's trusted iPad repair experts with the experience, parts, and service you deserve.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-8 mb-16 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">2,500+</div>
              <div className="text-sm opacity-90">iPads Repaired</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">4.9★</div>
              <div className="text-sm opacity-90">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">97%</div>
              <div className="text-sm opacity-90">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">60-Day</div>
              <div className="text-sm opacity-90">Warranty</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                style={{ transition: 'box-shadow 0.3s ease' }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg group border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#DB5858]/10 flex items-center justify-center group-hover:bg-[#DB5858]/20 flex-shrink-0" style={{ transition: 'background-color 0.3s ease' }}>
                    <Icon className="h-6 w-6 text-[#DB5858]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#DB5858]" style={{ transition: 'color 0.3s ease' }}>
                        {feature.title}
                      </h3>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#DB5858]/10 text-[#DB5858] whitespace-nowrap">
                        {feature.highlight}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}