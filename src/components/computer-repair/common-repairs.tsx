"use client";

import { Laptop, Battery, Shield, HardDrive, Thermometer, Keyboard } from "lucide-react";

const repairs = [
  {
    id: 1,
    icon: Laptop,
    title: "Laptop Screen Replacement",
    price: "From $149-399",
    description: "Cracked or broken laptop screen? We replace damaged screens with quality parts for all laptop brands including MacBook, Dell, HP, Lenovo, and more.",
    time: "2-4 hours",
    link: "/services/computer-repair/screen-replacement"
  },
  {
    id: 2,
    icon: Battery,
    title: "Laptop Battery Replacement",
    price: "From $79-199",
    description: "Laptop battery not holding charge or swelling? We replace worn batteries with quality replacements that restore your laptop's battery life.",
    time: "1-2 hours",
    link: "/services/computer-repair/battery-replacement"
  },
  {
    id: 3,
    icon: Shield,
    title: "Virus & Malware Removal",
    price: "From $99-179",
    description: "Computer running slow or infected with viruses? We remove malware, optimize performance, and install security protection.",
    time: "2-4 hours",
    link: "/services/computer-repair/virus-removal"
  },
  {
    id: 4,
    icon: HardDrive,
    title: "Hard Drive Replacement",
    price: "From $129-299",
    description: "Hard drive failing or need more storage? We replace HDDs with fast SSDs and transfer all your data safely.",
    time: "2-4 hours",
    link: "/services/computer-repair/hard-drive-replacement"
  },
  {
    id: 5,
    icon: Thermometer,
    title: "Overheating Repair",
    price: "From $89-179",
    description: "Laptop overheating or shutting down? We clean cooling systems, replace thermal paste, and fix fan issues to keep your computer cool.",
    time: "1-3 hours",
    link: "/services/computer-repair/overheating-repair"
  },
  {
    id: 6,
    icon: Keyboard,
    title: "Keyboard Repair",
    price: "From $99-249",
    description: "Keyboard keys not working or laptop keyboard damaged? We repair and replace keyboards for all laptop models with precision.",
    time: "1-2 hours",
    link: "/services/computer-repair/keyboard-repair"
  }
];

export function CommonComputerRepairs() {
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
            Computer & Laptop Repair Services in Denton, TX
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Professional computer and laptop repair with same-day service, quality parts, and 60-day warranty
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
              <h3 className="text-base lg:text-xl font-bold text-gray-900 mb-2">
                Don't See Your Computer Issue Listed?
              </h3>
              <p className="text-gray-600 mb-3 lg:mb-4 text-sm lg:text-base">
                We repair all computer and laptop problems. Call for a free diagnostic and quote.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm lg:text-base">
                Call for Free Diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}