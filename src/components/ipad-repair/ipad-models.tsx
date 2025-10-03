"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Tablet } from "lucide-react";

const ipadModels = [
  {
    id: 1,
    title: "iPad Pro Series Repair (All Generations & Sizes)",
    keywords: "iPad Pro repair Denton TX, iPad Pro 9.7 repair, iPad Pro 10.5 repair, iPad Pro 11 screen replacement, iPad Pro 12.9 battery replacement, iPad Pro 13 repair",
    description: "Expert iPad Pro repair in Denton, TX for all generations and sizes: 9.7-inch (1st gen), 10.5-inch (2nd gen), 11-inch (1st-4th gen), 12.9-inch (1st-7th gen), and 13-inch (latest). We repair Liquid Retina XDR displays, M4/M2/M1/A-series chips, Apple Pencil connectivity, Face ID problems, and USB-C/Lightning charging ports. Our technicians specialize in ProMotion displays, True Tone calibration, and precision micro-soldering for professional-grade iPads.",
    services: ["Liquid Retina XDR display replacement", "M4/M2/M1 chip diagnostics", "Apple Pencil (1st & 2nd gen) connectivity", "Face ID sensor repair", "USB-C/Lightning port replacement", "ProMotion 120Hz display calibration", "Smart Connector repair", "LiDAR scanner repair", "Thunderbolt 4 connectivity issues"]
  },
  {
    id: 2,
    title: "iPad Air Series Repair (All 7 Generations)",
    keywords: "iPad Air repair Denton TX, iPad Air 1 repair, iPad Air 2 repair, iPad Air 3 repair, iPad Air 4 screen replacement, iPad Air 5 battery replacement, iPad Air 6 repair, iPad Air 7 repair",
    description: "Professional iPad Air repair services in Denton, TX for all 7 generations: iPad Air (9.7-inch, 2013), iPad Air 2 (9.7-inch, 2014), iPad Air 3rd gen (10.5-inch, 2019), iPad Air 4th gen (10.9-inch, 2020), iPad Air 5th gen (10.9-inch, M1, 2022), iPad Air 6th gen (10.9-inch, M2, 2024), and iPad Air 7th gen (10.9-inch, M3, 2025). We repair Liquid Retina displays, Touch ID sensors, Lightning/USB-C charging issues, and camera malfunctions across all generations.",
    services: ["All iPad Air generation screen replacement", "Touch ID top button & home button repair", "Lightning/USB-C charging port repair", "12MP/8MP camera system repair", "Smart Connector repair", "A7/A8X/A12/A14/M1/M2/M3 chip diagnostics", "True Tone display calibration", "Apple Pencil compatibility fixes"]
  },
  {
    id: 3,
    title: "Standard iPad Series Repair (1st-11th Generation)",
    keywords: "iPad repair Denton TX, original iPad repair, iPad 2 repair, iPad 3 repair, iPad 4 repair, iPad 5th generation repair, iPad 6th generation repair, iPad 7th generation screen replacement, iPad 8th generation repair, iPad 9th generation battery replacement, iPad 10th generation repair, iPad 11th generation repair",
    description: "Complete standard iPad repair services in Denton, TX for all 11 generations: Original iPad (2010), iPad 2 (2011), iPad 3rd gen (2012), iPad 4th gen (2012), iPad 5th gen (2017), iPad 6th gen (2018), iPad 7th gen (10.2-inch, 2019), iPad 8th gen (10.2-inch, 2020), iPad 9th gen (10.2-inch, 2021), iPad 10th gen (10.9-inch, 2022), and iPad 11th gen (10.9-inch, 2025). We handle everything from vintage 30-pin connectors to modern USB-C ports, Home button Touch ID, and various display technologies.",
    services: ["All generation iPad screen replacement", "Home button & Touch ID repair", "30-pin/Lightning/USB-C port repair", "1.2MP-12MP camera repair", "Smart Connector issues", "A4/A5/A6/A6X/A7/A8/A9/A10/A11/A12/A13/A14/A16 chip diagnostics", "Legacy iOS compatibility", "Vintage iPad restoration"]
  },
  {
    id: 4,
    title: "iPad Mini Series Repair (All 7 Generations)",
    keywords: "iPad Mini repair Denton TX, iPad Mini 1 repair, iPad Mini 2 repair, iPad Mini 3 repair, iPad Mini 4 repair, iPad Mini 5 screen replacement, iPad Mini 6 battery replacement, iPad Mini 7 repair",
    description: "Expert iPad Mini repair in Denton, TX for all 7 generations: iPad Mini (7.9-inch, 2012), iPad Mini 2 (7.9-inch, Retina, 2013), iPad Mini 3 (7.9-inch, Touch ID, 2014), iPad Mini 4 (7.9-inch, 2015), iPad Mini 5th gen (7.9-inch, A12, 2019), iPad Mini 6th gen (8.3-inch, A15, 2021), and iPad Mini 7th gen (8.3-inch, A17 Pro, 2024). We specialize in compact form factor repairs including Retina displays, Touch ID sensors, Lightning/USB-C connectivity, and Apple Pencil compatibility.",
    services: ["All iPad Mini generation display repair", "Touch ID/top button repair", "Lightning/USB-C port repair", "Apple Pencil (1st & 2nd gen) connectivity", "1.2MP-12MP camera repair", "A5/A7/A8/A12/A15/A17 Pro chip diagnostics", "Compact component micro-soldering", "True Tone calibration"]
  },
  {
    id: 5,
    title: "Vintage & Legacy iPad Models (2010-2018)",
    keywords: "vintage iPad repair Denton TX, original iPad repair, iPad 2 screen replacement, iPad 3 battery replacement, iPad 4 repair, legacy iPad repair, 30-pin connector repair, vintage iPad restoration",
    description: "Specialized repair services for vintage and legacy iPad models in Denton, TX including the original iPad (2010), iPad 2 (2011), iPad 3 (2012), iPad 4 (2012), early iPad Air models (2013-2014), and early iPad Mini models (2012-2015). We maintain stock of legacy parts and offer restoration services for these classic Apple tablets, including 30-pin connector repairs, original LCD displays, and vintage iOS compatibility solutions.",
    services: ["Vintage iPad screen restoration", "30-pin dock connector repair", "Classic Home button repair", "Legacy battery replacement", "Original LCD display repair", "A4/A5/A6/A6X/A7/A8 chip diagnostics", "iOS compatibility troubleshooting", "Vintage iPad collector restoration", "Legacy charging port repair"]
  }
];

export function IPadModels() {
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            We Repair All iPad Models
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From the latest iPad Pro with M-series chips to classic iPad models, our certified technicians repair all iPad generations with quality parts and expert service.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-4">
            {ipadModels.map((model, index) => (
              <div
                key={model.id}
                style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl shadow-lg hover:bg-white/80 hover:shadow-xl group relative overflow-hidden"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <button
                  onClick={() => toggleItem(model.id)}
                  className="w-full p-6 text-left flex items-center justify-between rounded-2xl transition-colors duration-300 group relative z-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DB5858] to-[#c94848] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Tablet className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-[#DB5858] transition-colors">
                        {model.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Expert repair for all models in this series</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
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
                      <div className="px-6 pb-6">
                        <div className="border-t border-white/40 pt-6">
                          <p className="text-gray-600 leading-relaxed mb-6">
                            {model.description}
                          </p>

                          <h4 className="font-semibold text-gray-900 mb-3">Common Repair Services:</h4>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {model.services.map((service, serviceIndex) => (
                              <div key={serviceIndex} className="flex items-center text-sm text-gray-600">
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
        <div className="text-center mt-16">
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 shadow-lg hover:bg-white/80 transition-all duration-300 group relative overflow-hidden">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Don't See Your iPad Model Listed?
              </h3>
              <p className="text-lg mb-6 text-gray-600">
                We repair all iPad models, including rare and discontinued devices. Call us for a free diagnostic on any iPad.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Free Diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}