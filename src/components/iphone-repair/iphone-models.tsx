"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Smartphone } from "lucide-react";

const iphoneModels = [
  {
    id: 1,
    title: "iPhone 15 Series Repair (15, 15 Plus, 15 Pro, 15 Pro Max)",
    keywords: "iPhone 15 repair Denton TX, iPhone 15 Pro Max screen replacement, iPhone 15 battery replacement",
    description: "Expert iPhone 15 series repair in Denton, TX including iPhone 15, iPhone 15 Plus, iPhone 15 Pro, and iPhone 15 Pro Max. We repair screen damage, battery issues, camera problems, and charging port issues on all iPhone 15 models. Our technicians are trained on the latest iPhone 15 repair techniques including USB-C port repair and titanium frame work.",
    services: ["iPhone 15 screen replacement", "iPhone 15 Pro Max battery repair", "USB-C charging port repair", "iPhone 15 camera lens replacement", "Back glass repair", "Water damage restoration"]
  },
  {
    id: 2,
    title: "iPhone 14 Series Repair (14, 14 Plus, 14 Pro, 14 Pro Max)",
    keywords: "iPhone 14 repair Denton TX, iPhone 14 Pro screen replacement, iPhone 14 Plus battery replacement",
    description: "Professional iPhone 14 repair services in Denton, TX for iPhone 14, iPhone 14 Plus, iPhone 14 Pro, and iPhone 14 Pro Max. Common repairs include screen replacement, battery replacement, camera repair, and Face ID issues. We stock genuine parts for all iPhone 14 models and offer same-day repair service.",
    services: ["iPhone 14 screen replacement", "iPhone 14 Pro Max camera repair", "Face ID sensor repair", "Lightning port replacement", "Speaker and microphone repair", "iPhone 14 back glass replacement"]
  },
  {
    id: 3,
    title: "iPhone 13 Series Repair (13, 13 Mini, 13 Pro, 13 Pro Max)",
    keywords: "iPhone 13 repair Denton TX, iPhone 13 Pro screen replacement, iPhone 13 Mini battery replacement",
    description: "Complete iPhone 13 repair services in Denton, TX including iPhone 13, iPhone 13 Mini, iPhone 13 Pro, and iPhone 13 Pro Max repairs. We handle all types of damage from cracked screens to water damage. Our iPhone 13 repair expertise includes ProMotion display replacement and advanced camera system repairs.",
    services: ["iPhone 13 Pro Max screen replacement", "iPhone 13 Mini battery replacement", "ProMotion display repair", "Triple camera system repair", "MagSafe charging issues", "iOS software troubleshooting"]
  },
  {
    id: 4,
    title: "iPhone 12 Series Repair (12, 12 Mini, 12 Pro, 12 Pro Max)",
    keywords: "iPhone 12 repair Denton TX, iPhone 12 Pro Max screen replacement, iPhone 12 battery replacement",
    description: "Expert iPhone 12 repair in Denton, TX for iPhone 12, iPhone 12 Mini, iPhone 12 Pro, and iPhone 12 Pro Max. We repair 5G connectivity issues, MagSafe problems, OLED screen damage, and LiDAR sensor issues. Our iPhone 12 repair service includes ceramic shield glass replacement and advanced diagnostics.",
    services: ["OLED screen replacement", "iPhone 12 Pro LiDAR repair", "5G antenna repair", "MagSafe wireless charging fix", "Ceramic Shield glass repair", "iPhone 12 Mini charging port repair"]
  },
  {
    id: 5,
    title: "iPhone 11 Series Repair (11, 11 Pro, 11 Pro Max)",
    keywords: "iPhone 11 repair Denton TX, iPhone 11 Pro screen replacement, iPhone 11 Pro Max battery replacement",
    description: "Professional iPhone 11 repair services in Denton, TX including iPhone 11, iPhone 11 Pro, and iPhone 11 Pro Max. Common repairs include LCD and OLED screen replacement, dual and triple camera repairs, and Face ID issues. We specialize in iPhone 11 water damage repair and logic board diagnostics.",
    services: ["iPhone 11 Pro triple camera repair", "Face ID module replacement", "Wireless charging coil repair", "iPhone 11 back glass replacement", "Logic board micro-soldering", "iOS update and software repair"]
  },
  {
    id: 6,
    title: "iPhone X Series Repair (X, XR, XS, XS Max)",
    keywords: "iPhone X repair Denton TX, iPhone XS Max screen replacement, iPhone XR battery replacement",
    description: "Complete iPhone X series repair in Denton, TX for iPhone X, iPhone XR, iPhone XS, and iPhone XS Max. We repair OLED screen damage, Face ID problems, wireless charging issues, and camera malfunctions. Our iPhone X repair service includes precision micro-soldering for complex logic board repairs.",
    services: ["OLED display replacement", "Face ID sensor repair", "iPhone XR LCD screen replacement", "Dual camera system repair", "Wireless charging repair", "iPhone XS water damage restoration"]
  },
  {
    id: 7,
    title: "iPhone 8 & Earlier Models (8, 8 Plus, 7, 7 Plus, 6s, 6s Plus, 6, 6 Plus)",
    keywords: "iPhone 8 repair Denton TX, iPhone 7 screen replacement, iPhone 6s battery replacement, iPhone 6 Plus repair",
    description: "Expert repair services for older iPhone models in Denton, TX including iPhone 8, iPhone 8 Plus, iPhone 7, iPhone 7 Plus, iPhone 6s, iPhone 6s Plus, iPhone 6, and iPhone 6 Plus. We repair Home button issues, Touch ID problems, headphone jack issues, and classic iPhone screen replacements with quality parts.",
    services: ["iPhone 8 Plus screen replacement", "Touch ID Home button repair", "iPhone 7 headphone jack repair", "iPhone 6s battery replacement", "iPhone 6 Plus logic board repair", "Classic iPhone restoration"]
  }
];

export function IPhoneModels() {
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
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight mb-4 lg:mb-6 text-gray-900">
            We Repair All iPhone Models
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From the latest iPhone 15 Pro Max to classic iPhone models, our certified technicians repair all iPhone generations with quality parts and expert service.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-3 lg:space-y-4">
            {iphoneModels.map((model, index) => (
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
                      <Smartphone className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base lg:text-xl font-semibold text-gray-900 group-hover:text-[#DB5858] transition-colors">
                        {model.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-500 mt-0.5 lg:mt-1 hidden sm:block">Expert repair for all models in this series</p>
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
                          <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-4 lg:mb-6">
                            {model.description}
                          </p>

                          <h4 className="font-semibold text-gray-900 mb-2 lg:mb-3 text-sm lg:text-base">Common Repair Services:</h4>
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
                Don't See Your iPhone Model Listed?
              </h3>
              <p className="text-base lg:text-lg mb-4 lg:mb-6 text-gray-600">
                We repair all iPhone models, including rare and vintage devices. Call us for a free diagnostic on any iPhone.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm lg:text-base">
                Get Free Diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}