"use client";

import { Smartphone, Laptop, Monitor, HardDrive, Tablet } from "lucide-react";

const otherServices = [
  {
    id: 1,
    icon: Smartphone,
    title: "iPhone Repair",
    description: "Professional iPhone repair including screen replacement, battery repair, and water damage restoration for all iPhone models.",
    link: "/services/iphone-repair"
  },
  {
    id: 2,
    icon: Smartphone,
    title: "Samsung Phone Repair",
    description: "Expert Samsung Galaxy repair including screen replacement, battery repair, and charging port fixes for all Galaxy models.",
    link: "/services/samsung-phone-repair"
  },
  {
    id: 3,
    icon: Tablet,
    title: "Tablet Repair",
    description: "Expert tablet repair for iPad, Samsung Galaxy Tab, Microsoft Surface, and all other tablet brands and models.",
    link: "/services/tablet-repair"
  },
  {
    id: 4,
    icon: Laptop,
    title: "MacBook Repair",
    description: "Expert MacBook repair including screen replacement, keyboard repair, logic board issues, and battery replacement.",
    link: "#" // Will be updated when pages are created
  },
  {
    id: 5,
    icon: Monitor,
    title: "iMac Repair",
    description: "Complete iMac repair services including screen replacement, hard drive upgrades, and component repairs.",
    link: "#" // Will be updated when pages are created
  },
  {
    id: 6,
    icon: HardDrive,
    title: "Data Recovery",
    description: "Professional data recovery services for consoles, computers, phones, and external storage devices.",
    link: "#" // Will be updated when pages are created
  }
];

export function OtherConsoleServices() {
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Other Repair Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Beyond gaming console repair, we fix all your tech devices with the same quality and expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 hover:bg-white/80 hover:shadow-xl group relative overflow-hidden flex flex-col h-full"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#DB5858]/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#DB5858]/20" style={{ transition: 'background-color 0.3s ease' }}>
                      <Icon className="h-6 w-6 text-[#DB5858]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#DB5858]" style={{ transition: 'color 0.3s ease' }}>
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                    {service.description}
                  </p>

                  <a href={service.link}>
                    <button
                      className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm shadow-lg hover:shadow-xl mt-auto ${
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