"use client";

import { Heart, Users, GraduationCap, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CommunityInvolvement() {
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
            Community Involvement
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We believe in giving back to the community that supports us. Here's how we're making a difference in Denton and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* UNT Sponsorship */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">UNT Mean Green Racing</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Proud sponsors of the UNT Mean Green Racing Team, supporting student engineering and innovation in our local university community.
            </p>
            <div className="text-sm text-[#DB5858] font-medium">Active Sponsor</div>
          </div>

          {/* Local Events */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Local Events</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              [Details about participation in local community events, festivals, or tech fairs in Denton]
            </p>
            <div className="text-sm text-[#DB5858] font-medium">Regular Participant</div>
          </div>

          {/* Charitable Giving */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Charitable Giving</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              [Information about donations to local charities, causes, or community organizations]
            </p>
            <div className="text-sm text-[#DB5858] font-medium">$2,000+ Donated</div>
          </div>

          {/* Student Discounts */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Student Support</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Special discounts and payment plans for UNT students because we understand the importance of staying connected on a budget.
            </p>
            <div className="text-sm text-[#DB5858] font-medium">15% Student Discount</div>
          </div>

          {/* Local Partnerships */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Local Partnerships</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              [Information about partnerships with other local businesses or organizations]
            </p>
            <div className="text-sm text-[#DB5858] font-medium">Community Partner</div>
          </div>

          {/* Environmental Responsibility */}
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Eco-Friendly</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Proper e-waste recycling and refurbishing devices when possible to reduce environmental impact.
            </p>
            <div className="text-sm text-[#DB5858] font-medium">Green Initiative</div>
          </div>
        </div>

        {/* Community Impact Stats */}
        <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-8 text-white mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Our Community Impact</h3>
            <p className="text-white/90">Making a difference in Denton, one repair at a time</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-white/80 text-sm">Local Customers Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">150+</div>
              <div className="text-white/80 text-sm">UNT Students Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">$2,000+</div>
              <div className="text-white/80 text-sm">Community Donations</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-white/80 text-sm">Devices Recycled</div>
            </div>
          </div>
        </div>

        {/* Get Involved CTA */}
        <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Involved</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Know of a local organization or cause that could use our support? We're always looking for ways to give back to our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#DB5858] hover:bg-[#c94848] text-white">
              Suggest a Cause
            </Button>
            <Button variant="outline" className="border-[#DB5858] text-[#DB5858] hover:bg-[#DB5858] hover:text-white">
              Partnership Opportunities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}