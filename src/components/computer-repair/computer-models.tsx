"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Laptop } from "lucide-react";

const computerModels = [
  {
    id: 1,
    title: "MacBook Repair (All Models)",
    keywords: "MacBook repair Denton TX, MacBook Pro repair, MacBook Air repair, MacBook screen replacement, MacBook battery replacement",
    description: "Expert MacBook repair for all models including MacBook Pro 16\", 14\", 13\", MacBook Air M2/M1, and older Intel MacBooks. We repair screens, batteries, keyboards, logic boards, and liquid damage with genuine Apple-compatible parts.",
    services: ["MacBook screen replacement", "MacBook battery replacement", "MacBook keyboard repair", "MacBook logic board repair", "MacBook liquid damage repair", "MacBook charging port repair", "MacBook trackpad repair", "MacBook fan replacement"]
  },
  {
    id: 2,
    title: "Windows Laptop Repair (All Brands)",
    keywords: "Windows laptop repair Denton TX, Dell laptop repair, HP laptop repair, Lenovo laptop repair, ASUS laptop repair",
    description: "Professional Windows laptop repair for all major brands including Dell, HP, Lenovo, ASUS, Acer, MSI, and more. We handle screen repairs, battery replacement, virus removal, hardware upgrades, and performance optimization.",
    services: ["Windows laptop screen repair", "Laptop battery replacement", "Laptop keyboard replacement", "Laptop hard drive upgrade", "Windows virus removal", "Laptop overheating repair", "Laptop charging port repair", "Windows system optimization"]
  },
  {
    id: 3,
    title: "Gaming Laptop Repair",
    keywords: "gaming laptop repair Denton TX, gaming computer repair, gaming laptop overheating, gaming laptop screen repair",
    description: "Specialized gaming laptop repair for high-performance systems including ASUS ROG, MSI Gaming, Alienware, Razer, and custom gaming laptops. We handle overheating, graphics issues, performance optimization, and hardware upgrades.",
    services: ["Gaming laptop overheating repair", "Gaming laptop screen replacement", "Gaming laptop keyboard repair", "GPU thermal repair", "Gaming laptop performance tuning", "Gaming laptop RAM upgrade", "Gaming laptop SSD upgrade", "Gaming laptop fan replacement"]
  },
  {
    id: 4,
    title: "Desktop PC Repair (All Types)",
    keywords: "desktop PC repair Denton TX, computer repair, PC troubleshooting, desktop computer repair, custom PC repair",
    description: "Complete desktop PC repair for custom builds, pre-built systems, gaming PCs, and business computers. We diagnose hardware failures, upgrade components, remove viruses, and optimize performance for all desktop systems.",
    services: ["Desktop PC troubleshooting", "PC component replacement", "Desktop virus removal", "PC performance optimization", "Desktop hard drive replacement", "PC RAM upgrade", "Desktop power supply repair", "PC motherboard repair"]
  },
  {
    id: 5,
    title: "Business Computer Support",
    keywords: "business computer repair Denton TX, office computer support, business laptop repair, commercial computer service",
    description: "Professional business computer support for offices and commercial environments. We provide on-site service, bulk repairs, system upgrades, and ongoing IT support for businesses of all sizes in the Denton area.",
    services: ["Business computer repair", "Office laptop service", "Business system upgrades", "Commercial virus removal", "Business data recovery", "Office network troubleshooting", "Business computer setup", "Commercial IT support"]
  },
  {
    id: 6,
    title: "Data Recovery & Transfer",
    keywords: "data recovery Denton TX, hard drive recovery, laptop data recovery, computer data transfer, SSD recovery",
    description: "Professional data recovery services for failed hard drives, SSDs, and corrupted systems. We recover lost files, transfer data to new devices, and provide secure data backup solutions for personal and business needs.",
    services: ["Hard drive data recovery", "SSD data recovery", "Laptop data transfer", "Computer backup setup", "Lost file recovery", "Corrupted drive repair", "Data migration services", "Emergency data recovery"]
  }
];

export function ComputerModels() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-8 w-40 h-40 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 left-8 w-48 h-48 bg-[#DB5858]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-400/3 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      <div className="wide-container relative z-10">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-3 lg:mb-6 text-gray-900">
            We Repair All Computer & Laptop Models
          </h2>
          <p className="text-base lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From the latest MacBook Pro and gaming laptops to business desktops and custom PCs, our certified technicians repair all computer systems with quality parts and expert service.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-3 lg:space-y-4">
            {computerModels.map((model, index) => (
              <div
                key={model.id}
                style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl shadow-lg hover:bg-white/80 hover:shadow-xl group relative overflow-hidden"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <button
                  onClick={() => toggleItem(model.id)}
                  className="w-full p-4 lg:p-6 text-left flex items-center justify-between rounded-xl lg:rounded-2xl transition-colors duration-300 group relative z-10"
                >
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-gradient-to-br from-[#DB5858] to-[#c94848] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Laptop className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-900 group-hover:text-[#DB5858] transition-colors">
                        {model.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-500 mt-1">Expert repair for all models in this category</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 lg:h-5 lg:w-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                      openItem === model.id ? "transform rotate-180 text-[#DB5858]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openItem === model.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="px-4 lg:px-6 pb-4 lg:pb-6">
                        <div className="border-t border-white/40 pt-4 lg:pt-6">
                          <p className="text-gray-600 leading-relaxed mb-4 lg:mb-6 text-xs lg:text-base">
                            {model.description}
                          </p>

                          <h4 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base">Common Repair Services:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {model.services.map((service, serviceIndex) => (
                              <div key={serviceIndex} className="flex items-center text-xs lg:text-sm text-gray-600">
                                <div className="w-2 h-2 bg-[#DB5858] rounded-full mr-2 flex-shrink-0" />
                                {service}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 lg:mt-16">
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg hover:bg-white/80 transition-all duration-300 group relative overflow-hidden">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 lg:mb-4 text-gray-900">
                Don't See Your Computer Model Listed?
              </h3>
              <p className="text-sm lg:text-base xl:text-lg mb-4 lg:mb-6 text-gray-600">
                We repair all computer and laptop models, including rare and discontinued systems. Call us for a free diagnostic on any computer device.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 py-2.5 lg:px-8 lg:py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm lg:text-base">
                Get Free Diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}