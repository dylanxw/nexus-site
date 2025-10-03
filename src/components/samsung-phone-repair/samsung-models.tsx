"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Smartphone } from "lucide-react";

const samsungModels = [
  {
    id: 1,
    title: "Samsung Galaxy S Series Repair (All Models)",
    keywords: "Samsung Galaxy S repair Denton TX, Galaxy S24 repair, Galaxy S23 repair, Galaxy S22 repair, Galaxy S21 repair, Galaxy S20 screen replacement",
    description: "Expert Samsung Galaxy S series repair for all models including Galaxy S24 Ultra/Plus/FE, S23 Ultra/Plus/FE, S22 Ultra/Plus, S21 Ultra/Plus/FE, S20 Ultra/Plus/FE, S10 series, S9/S8/S7/S6 series, and earlier models. We repair Dynamic AMOLED displays, Snapdragon/Exynos processors, S Pen functionality, cameras with AI features, and ultrasonic fingerprint sensors.",
    services: ["Galaxy S series screen replacement", "S Pen digitizer repair", "Ultra-wide/telephoto camera repair", "Ultrasonic fingerprint sensor", "Fast charging port repair", "Wireless charging coil repair", "5G antenna repair", "Water resistance restoration"]
  },
  {
    id: 2,
    title: "Samsung Galaxy Note Series Repair (All Models)",
    keywords: "Samsung Galaxy Note repair Denton TX, Galaxy Note 20 repair, Galaxy Note 10 repair, Galaxy Note 9 repair, Galaxy Note 8 screen replacement",
    description: "Professional Samsung Galaxy Note series repair for all models including Note 20 Ultra/5G, Note 10+/Lite, Note 9, Note 8, Note 7 (FE), Note 5, Note 4, Note 3, Note 2, and original Galaxy Note. We specialize in S Pen functionality, large display repairs, dual cameras, and productivity features that make Note phones unique.",
    services: ["Galaxy Note screen replacement", "S Pen functionality repair", "Dual camera system repair", "Note-specific charging ports", "Large battery replacement", "Edge display repair", "DeX connectivity issues", "Productivity features repair"]
  },
  {
    id: 3,
    title: "Samsung Galaxy A Series Repair (All Models)",
    keywords: "Samsung Galaxy A repair Denton TX, Galaxy A54 repair, Galaxy A34 repair, Galaxy A14 repair, Galaxy A53 screen replacement, Galaxy A series battery",
    description: "Complete Samsung Galaxy A series repair for all models including A54 5G, A34 5G, A14 5G/4G, A53 5G, A33 5G, A13, A12, A11, A10e, A51, A50, A20, A10, and all other A-series models. We handle Super AMOLED displays, multiple camera setups, large batteries, and affordable Galaxy features.",
    services: ["Galaxy A series screen repair", "Multi-camera system repair", "Large capacity battery replacement", "USB-C/micro-USB port repair", "Fingerprint sensor repair", "Expandable storage issues", "Software optimization", "Network connectivity repair"]
  },
  {
    id: 4,
    title: "Samsung Galaxy Z Series (Foldable) Repair",
    keywords: "Samsung Galaxy Z repair Denton TX, Galaxy Z Fold repair, Galaxy Z Flip repair, foldable phone repair, Samsung hinge repair",
    description: "Specialized Samsung Galaxy Z foldable phone repair for Galaxy Z Fold 5/4/3/2/original, Galaxy Z Flip 5/4/3/original, and future Z-series models. We have expertise in foldable display technology, hinge mechanisms, crease protection, and the unique challenges of foldable smartphones.",
    services: ["Foldable display repair", "Hinge mechanism repair", "Crease protection replacement", "Dual-screen calibration", "Flex mode functionality", "Ultra-thin glass repair", "Specialized battery replacement", "Water damage (complex internals)"]
  },
  {
    id: 5,
    title: "Samsung Galaxy M & F Series Repair",
    keywords: "Samsung Galaxy M repair Denton TX, Galaxy M54 repair, Galaxy M34 repair, Galaxy F54 repair, Galaxy F series battery replacement",
    description: "Samsung Galaxy M and F series repair for budget and mid-range models including M54 5G, M34 5G, M14 5G/4G, F54 5G, F34 5G, F14 4G, and other M/F series phones. We repair large batteries, multi-camera systems, and value-focused features across these popular Samsung lines.",
    services: ["Galaxy M/F screen replacement", "High-capacity battery repair", "Triple/quad camera repair", "Fast charging optimization", "Expandable storage issues", "Fingerprint/face unlock repair", "Performance optimization", "Connectivity troubleshooting"]
  },
  {
    id: 6,
    title: "Legacy Samsung Galaxy Models (2010-2018)",
    keywords: "legacy Samsung repair Denton TX, old Galaxy repair, Galaxy S5 repair, Galaxy S4 repair, Galaxy S3 repair, vintage Samsung phone repair",
    description: "Specialized repair services for legacy Samsung Galaxy models including Galaxy S5/S4/S3/S2/S, Galaxy Note 4/3/2/Edge, Galaxy J series, Galaxy Grand series, Galaxy Core series, and other discontinued Samsung smartphones. We maintain parts inventory and expertise for these classic Android devices.",
    services: ["Legacy Galaxy screen repair", "Old battery replacement", "Micro-USB port repair", "Physical home button repair", "Removable battery replacement", "SD card slot repair", "IR blaster repair", "Vintage Android optimization"]
  }
];

export function SamsungPhoneModels() {
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
            We Repair All Samsung Galaxy Models
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From the latest Galaxy S24 Ultra and Z Fold to classic Galaxy models, our certified technicians repair all Samsung Galaxy phones with quality parts and expert service.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-4">
            {samsungModels.map((model, index) => (
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
                      <Smartphone className="h-6 w-6 text-white" />
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
                Don't See Your Galaxy Model Listed?
              </h3>
              <p className="text-lg mb-6 text-gray-600">
                We repair all Samsung Galaxy models, including rare and discontinued devices. Call us for a free diagnostic on any Galaxy phone.
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