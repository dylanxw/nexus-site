"use client";

import { Tablet, Battery, Droplets, Zap, Volume2, Camera, Wifi } from "lucide-react";

const repairs = [
  {
    id: 1,
    icon: Tablet,
    title: "Screen Replacement",
    price: "From $89-399",
    description: "Cracked or shattered tablet screen? We replace damaged screens with quality parts for all tablet brands including iPad, Samsung Galaxy Tab, Microsoft Surface, and more.",
    time: "1-3 hours",
    link: "/services/tablet-repair/screen-replacement"
  },
  {
    id: 2,
    icon: Battery,
    title: "Battery Replacement",
    price: "From $59-199",
    description: "Tablet battery not holding charge? We replace worn batteries with quality replacements that restore your tablet's battery life to like-new performance.",
    time: "1-2 hours",
    link: "/services/tablet-repair/battery-replacement"
  },
  {
    id: 3,
    icon: Zap,
    title: "Charging Port Repair",
    price: "From $69-189",
    description: "Tablet not charging properly? We repair and replace faulty charging ports including USB-C, Lightning, and micro-USB connectors with precision techniques.",
    time: "1-2 hours",
    link: "/services/tablet-repair/charging-port-repair"
  },
  {
    id: 4,
    icon: Droplets,
    title: "Water Damage Repair",
    price: "From $99",
    description: "Spilled liquid on your tablet? We use professional cleaning techniques to remove moisture and corrosion from internal components and restore functionality.",
    time: "2-4 hours",
    link: "/services/tablet-repair/water-damage-repair"
  },
  {
    id: 5,
    icon: Camera,
    title: "Camera Repair",
    price: "From $79",
    description: "Tablet camera not working or producing blurry images? We repair and replace front and rear cameras for all tablet models with quality components.",
    time: "1-2 hours",
    link: "/services/tablet-repair/camera-repair"
  },
  {
    id: 6,
    icon: Volume2,
    title: "Speaker & Audio Repair",
    price: "From $89",
    description: "No sound or distorted audio from your tablet? We repair speakers, microphones, and audio jacks to restore crystal clear sound quality.",
    time: "1-2 hours",
    link: "/services/tablet-repair/speaker-repair"
  },
  {
    id: 7,
    icon: Wifi,
    title: "WiFi & Connectivity Issues",
    price: "From $79",
    description: "Tablet won't connect to WiFi or Bluetooth? We diagnose and repair connectivity issues including antenna problems and software conflicts.",
    time: "1-2 hours",
    link: "/services/tablet-repair/wifi-repair"
  }
];

export function CommonTabletRepairs() {
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Tablet Repair Services in Denton, TX
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional tablet repair with same-day service, quality parts, and 60-day warranty for all brands
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repairs.map((repair, index) => {
            const Icon = repair.icon;
            return (
              <div
                key={repair.id}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 hover:bg-white/80 hover:shadow-xl group relative overflow-hidden flex flex-col h-full"
                style={{
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#DB5858]/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#DB5858]/20 transition-colors">
                      <Icon className="h-6 w-6 text-[#DB5858]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#DB5858] transition-colors">
                        {repair.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-[#DB5858] font-bold">{repair.price}</span>
                        <span className="text-gray-500">• {repair.time}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                    {repair.description}
                  </p>

                  <button className="w-full bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm shadow-lg hover:shadow-xl mt-auto">
                    Book Repair
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 shadow-lg hover:bg-white/80 transition-all duration-300 group relative overflow-hidden">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Don't See Your Tablet Issue Listed?
              </h3>
              <p className="text-gray-600 mb-4">
                We repair all tablet problems for every major brand. Call for a free diagnostic and quote.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Call for Free Diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}