"use client";

import { GraduationCap, Building2, Users, Heart } from "lucide-react";

export function WhyDenton() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Why We Love Serving Denton
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Denton isn't just where we're located – it's our home. Here's why we're passionate about providing the best tech services to our local community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* University Community */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <GraduationCap className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">UNT Students</h3>
            <p className="text-gray-600 leading-relaxed">
              Home to UNT with thousands of students who depend on their devices. We offer student-friendly pricing and proudly sponsor the UNT Mean Green Racing Team.
            </p>
          </div>

          {/* Local Businesses */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <Building2 className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Local Businesses</h3>
            <p className="text-gray-600 leading-relaxed">
              Denton's growing business sector relies on technology. We keep local companies running with professional device support.
            </p>
          </div>

          {/* Families */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <Users className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Families</h3>
            <p className="text-gray-600 leading-relaxed">
              Denton families trust us with their most important devices – from kids' tablets to parents' work laptops.
            </p>
          </div>

          {/* Community Values */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <Heart className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Community First</h3>
            <p className="text-gray-600 leading-relaxed">
              We're neighbors helping neighbors with honest service, fair pricing, and genuine care for our local community.
            </p>
          </div>
        </div>

        {/* Local Impact Stats */}
        <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Our Denton Impact</h3>
            <p className="text-white/90">Proud to serve our local community</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-white/80 text-sm">Denton Devices Repaired</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">150+</div>
              <div className="text-white/80 text-sm">UNT Students Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-white/80 text-sm">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">Same Day</div>
              <div className="text-white/80 text-sm">Most Repairs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}