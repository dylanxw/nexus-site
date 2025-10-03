"use client";

import { Clock, Shield, DollarSign, Heart, Users, Award } from "lucide-react";

export function WhatMakesUsDifferent() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            What Makes Us Different
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            In a world of big box stores and impersonal service, we're committed to doing things differently. Here's what sets us apart.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Local & Independent */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <Heart className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Local & Independent</h3>
            <p className="text-gray-600 leading-relaxed">
              We're not a chain or franchise. We're locally owned, operated, and invested in the Denton community's success.
            </p>
          </div>

          {/* Personal Service */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <Users className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Service</h3>
            <p className="text-gray-600 leading-relaxed">
              You'll work directly with skilled technicians who care about your device and your experience, not a ticket number.
            </p>
          </div>

          {/* Transparent Pricing */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <DollarSign className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Pricing</h3>
            <p className="text-gray-600 leading-relaxed">
              No hidden fees, no surprise charges. We provide upfront estimates and explain exactly what you're paying for.
            </p>
          </div>

          {/* Same-Day Service */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <Clock className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Turnaround</h3>
            <p className="text-gray-600 leading-relaxed">
              Most repairs completed the same day. We understand how important your devices are to your daily life.
            </p>
          </div>

          {/* Quality Guarantee */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <Shield className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Guarantee</h3>
            <p className="text-gray-600 leading-relaxed">
              Every repair comes with our 60-day warranty. We stand behind our work and your satisfaction.
            </p>
          </div>

          {/* Expert Knowledge */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group text-center">
            <div className="w-16 h-16 bg-[#DB5858]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#DB5858]/20 transition-all duration-300">
              <Award className="h-8 w-8 text-[#DB5858]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Knowledge</h3>
            <p className="text-gray-600 leading-relaxed">
              Our technicians stay current with the latest devices and repair techniques to provide the best service possible.
            </p>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Local Over Big Box Stores?
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Nexus Advantages */}
            <div>
              <h4 className="text-lg font-bold text-[#DB5858] mb-6">Nexus Tech Solutions</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Personal, one-on-one service</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Same-day repairs available</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Transparent, upfront pricing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Local ownership and investment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">60-day warranty on repairs</span>
                </div>
              </div>
            </div>

            {/* Big Box Stores */}
            <div>
              <h4 className="text-lg font-bold text-gray-500 mb-6">Big Box Stores</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-500">Impersonal, corporate service</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-500">1-2 week repair times</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-500">Hidden fees and markups</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-500">Corporate profits leave community</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-500">Limited warranty coverage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}