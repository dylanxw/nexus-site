"use client";

import { User, Lightbulb, MapPin, Calendar } from "lucide-react";
import Image from "next/image";

export function FounderStory() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Meet the Founder
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every great business starts with a story. Here's how Nexus Tech Solutions came to life in Denton, Texas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Founder Image - Placeholder for now */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-100 rounded-2xl p-8 text-center border border-gray-200">
              <User className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Founder Photo</h3>
              <p className="text-gray-500 text-sm">Professional headshot placeholder</p>
            </div>
          </div>

          {/* Founder Story Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="h-6 w-6 text-[#DB5858]" />
                <h3 className="text-xl font-bold text-gray-900">The Beginning</h3>
              </div>

              <div className="space-y-4 text-gray-600">
                <p>
                  [Founder's background and what led them to start the business]
                </p>
                <p>
                  [Early experiences with technology and repair work]
                </p>
                <p>
                  [The moment they decided to start Nexus Tech Solutions]
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-[#DB5858]" />
                <h3 className="text-xl font-bold text-gray-900">Why Denton?</h3>
              </div>

              <div className="space-y-4 text-gray-600">
                <p>
                  [Why they chose Denton as the location for the business]
                </p>
                <p>
                  [Connection to the community, UNT, local area]
                </p>
                <p>
                  [Vision for serving the local community]
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="h-6 w-6 text-[#DB5858]" />
                <h3 className="text-xl font-bold text-gray-900">The Journey</h3>
              </div>

              <div className="space-y-4 text-gray-600">
                <p>
                  [Key milestones in building the business]
                </p>
                <p>
                  [Challenges overcome and lessons learned]
                </p>
                <p>
                  [Growth and evolution of services]
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Touch */}
        <div className="mt-12 bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">A Personal Message</h3>
          <blockquote className="text-lg italic mb-4 max-w-3xl mx-auto">
            "[Personal message from founder about their commitment to customers and the community]"
          </blockquote>
          <p className="text-white/80">
            - [Founder Name], Founder & Owner
          </p>
        </div>
      </div>
    </section>
  );
}