"use client";

import { Handshake, Shield, Users, Zap } from "lucide-react";

export function OurValues() {
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
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These values aren't just words on a wall – they guide every decision we make and every interaction we have.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Integrity */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center">
                <Handshake className="h-8 w-8 text-[#DB5858]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Integrity</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe in doing the right thing, even when no one is watching. This means honest diagnostics, fair pricing, and never recommending unnecessary repairs.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600 text-sm">Honest assessments and recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600 text-sm">Transparent pricing with no hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600 text-sm">Taking responsibility for our work</span>
              </div>
            </div>
          </div>

          {/* Excellence */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center">
                <Zap className="h-8 w-8 text-[#DB5858]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Excellence</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We're committed to continuous improvement in our skills, processes, and customer experience. Good enough isn't good enough.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600 text-sm">Ongoing training and skill development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600 text-sm">Using quality parts and tools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600 text-sm">Attention to detail in every repair</span>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center">
                <Users className="h-8 w-8 text-[#DB5858]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Community</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We're proud to be part of the Denton community and believe in giving back to the people and organizations that make this city great.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600 text-sm">Supporting local events and organizations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600 text-sm">Sponsoring UNT Mean Green Racing Team</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600 text-sm">Building lasting local relationships</span>
              </div>
            </div>
          </div>

          {/* Reliability */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-[#DB5858]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Reliability</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you trust us with your device, you can count on us to deliver on our promises and be here when you need us.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600 text-sm">Consistent, dependable service</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600 text-sm">Meeting deadlines and commitments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#DB5858] rounded-full"></div>
                <span className="text-gray-600 text-sm">Long-term warranty and support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values in Action */}
        <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-6">Our Values in Action</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">4.9/5</div>
              <div className="text-white/80 text-sm">Customer satisfaction reflects our integrity</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">95%</div>
              <div className="text-white/80 text-sm">Repair success rate shows our excellence</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">$2,000+</div>
              <div className="text-white/80 text-sm">Donated to local community programs</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">60-Day</div>
              <div className="text-white/80 text-sm">Warranty demonstrates our reliability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}