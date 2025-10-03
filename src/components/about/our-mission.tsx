"use client";

import { Target, Users, Shield, Zap } from "lucide-react";

export function OurMission() {
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
            Our Mission & Vision
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're driven by a simple belief: everyone deserves honest, reliable tech support from people who genuinely care.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Mission Statement */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Target className="h-8 w-8 text-[#DB5858]" />
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              [Mission statement about providing exceptional device repair services, building trust with customers, and supporting the local Denton community]
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600">Quality repairs with honest pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600">Exceptional customer service</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600">Building lasting community relationships</span>
              </div>
            </div>
          </div>

          {/* Vision Statement */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="h-8 w-8 text-[#DB5858]" />
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              [Vision statement about becoming the most trusted tech repair service in North Texas and setting the standard for customer care in the industry]
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600">Leading tech repair in North Texas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600">Setting industry standards for service</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600">Expanding thoughtfully to serve more communities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Core Principles</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from how we treat customers to how we approach every repair.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-[#DB5858]" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Integrity First</h4>
              <p className="text-gray-600 text-sm">
                Honest diagnostics, transparent pricing, and doing what's right for our customers, always.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#DB5858]" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Community Focus</h4>
              <p className="text-gray-600 text-sm">
                We're not just a business in Denton – we're part of the community, invested in its success.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-[#DB5858]" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Excellence</h4>
              <p className="text-gray-600 text-sm">
                Continuous improvement in our skills, services, and customer experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}