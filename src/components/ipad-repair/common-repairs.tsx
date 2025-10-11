"use client";

import { Tablet, Battery, Droplets, Zap, Volume2, Home } from "lucide-react";
import Link from "next/link";

const repairs = [
  {
    id: 1,
    icon: Tablet,
    title: "Screen Replacement",
    price: "From $79-299",
    description: "Cracked or shattered iPad screen? We replace damaged screens with quality parts for all iPad models including Pro, Air, and Mini. Same-day service available.",
    time: "1-2 hours",
    link: "/services/ipad-repair/screen-replacement"
  },
  {
    id: 2,
    icon: Battery,
    title: "Battery Replacement",
    price: "From $49-179",
    description: "iPad battery not holding charge? We replace worn batteries with quality replacements that restore your iPad's battery life to like-new performance.",
    time: "1-2 hours",
    link: "/services/ipad-repair/battery-replacement"
  },
  {
    id: 3,
    icon: Zap,
    title: "Charging Port Repair",
    price: "From $59-179",
    description: "iPad not charging properly? We repair and replace faulty Lightning and USB-C charging ports with precision micro-soldering techniques.",
    time: "1-2 hours",
    link: "/services/ipad-repair/charging-port-repair"
  },
  {
    id: 4,
    icon: Droplets,
    title: "Water Damage Repair",
    price: "From $99",
    description: "Spilled liquid on your iPad? We use professional cleaning techniques to remove moisture and corrosion from internal components.",
    time: "2-3 hours",
    link: "/services/ipad-repair/water-damage-repair"
  },
  {
    id: 5,
    icon: Home,
    title: "Home Button Repair",
    price: "From $69",
    description: "Home button not working or Touch ID issues? We repair and replace home button assemblies for all compatible iPad models.",
    time: "1-2 hours",
    link: "/services/ipad-repair/home-button-repair"
  },
  {
    id: 6,
    icon: Volume2,
    title: "Speaker & Audio Repair",
    price: "From $89",
    description: "No sound or distorted audio? We repair speakers, microphones, and audio jacks to restore crystal clear sound quality.",
    time: "1-2 hours",
    link: "/services/ipad-repair/speaker-repair"
  }
];

export function CommonIPadRepairs() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-[#DB5858]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-400/3 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-4 text-gray-900">
            iPad Repair Services in Denton, TX
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Professional iPad repair with same-day service, quality parts, and 60-day warranty
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {repairs.map((repair, index) => {
            const Icon = repair.icon;
            return (
              <div
                key={repair.id}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:bg-white/80 hover:shadow-xl group relative overflow-hidden flex flex-col h-full"
                style={{
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-[#DB5858]/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#DB5858]/20 transition-colors">
                      <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
                    </div>
                    <div>
                      <h3 className="text-base lg:text-lg font-bold text-gray-900 group-hover:text-[#DB5858] transition-colors">
                        {repair.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs lg:text-sm">
                        <span className="text-[#DB5858] font-bold">{repair.price}</span>
                        <span className="text-gray-500">• {repair.time}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-3 lg:mb-4 flex-grow">
                    {repair.description}
                  </p>

                  <button className="w-full bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-xs lg:text-sm shadow-lg hover:shadow-xl mt-auto">
                    Book Repair
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8 lg:mt-12">
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg hover:bg-white/80 transition-all duration-300 group relative overflow-hidden">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
                Don't See Your iPad Issue Listed?
              </h3>
              <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6">
                We repair all iPad problems. Call for a free diagnostic and quote.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Call for Free Diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}