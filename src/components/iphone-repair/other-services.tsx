"use client";

import { Laptop, Tablet, Monitor, Gamepad2, Smartphone, HardDrive } from "lucide-react";

const otherServices = [
  {
    id: 1,
    icon: Laptop,
    title: "MacBook Repair",
    description: "Professional MacBook repair including screen replacement, keyboard repair, and logic board issues.",
    link: "#" // Will be updated when pages are created
  },
  {
    id: 2,
    icon: Tablet,
    title: "iPad Repair",
    description: "Complete iPad repair services including screen replacement, charging port repair, and battery replacement.",
    link: "#" // Will be updated when pages are created
  },
  {
    id: 3,
    icon: Monitor,
    title: "iMac Repair",
    description: "iMac repair services including screen replacement, hard drive upgrades, and component repairs.",
    link: "#" // Will be updated when pages are created
  },
  {
    id: 4,
    icon: Gamepad2,
    title: "Gaming Console Repair",
    description: "PlayStation, Xbox, and Nintendo console repair including HDMI port repair and overheating issues.",
    link: "#" // Will be updated when pages are created
  },
  {
    id: 5,
    icon: Smartphone,
    title: "Android Repair",
    description: "Android phone repair services including Samsung, Google Pixel, and other Android device repairs.",
    link: "#" // Will be updated when pages are created
  },
  {
    id: 6,
    icon: HardDrive,
    title: "Data Recovery",
    description: "Professional data recovery services for phones, computers, and external storage devices.",
    link: "#" // Will be updated when pages are created
  }
];

export function OtherRepairServices() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-blue-500/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-green-500/3 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-4 text-gray-900">
            Other Repair Services
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Beyond iPhone repair, we fix all your tech devices with the same quality and expertise
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {otherServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:bg-white/80 hover:shadow-xl group relative overflow-hidden flex flex-col h-full"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex flex-col lg:flex-row items-center lg:items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-[#DB5858]/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#DB5858]/20" style={{ transition: 'background-color 0.3s ease' }}>
                      <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="text-sm lg:text-lg font-bold text-gray-900 group-hover:text-[#DB5858]" style={{ transition: 'color 0.3s ease' }}>
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-3 lg:mb-4 hidden lg:block">
                    {service.description}
                  </p>

                  <a href={service.link} className="mt-auto">
                    <button
                      className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-xs lg:text-sm shadow-lg hover:shadow-xl ${
                        service.link === "#"
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white"
                      }`}
                      disabled={service.link === "#"}
                    >
                      {service.link === "#" ? "Coming Soon" : "Learn More"}
                    </button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}