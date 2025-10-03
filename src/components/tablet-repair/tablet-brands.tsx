"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Tablet } from "lucide-react";

const tabletBrands = [
  {
    id: 1,
    title: "Apple iPad Repair (All Models & Generations)",
    keywords: "iPad repair Denton TX, iPad Pro repair, iPad Air repair, iPad Mini repair, iPad screen replacement, iPad battery replacement",
    description: "Expert iPad repair for all models and generations including iPad Pro (9.7\", 10.5\", 11\", 12.9\", 13\"), iPad Air (all 7 generations), standard iPad (all 11 generations), and iPad Mini (all 7 generations). We repair Liquid Retina displays, M-series chips, Apple Pencil connectivity, Face ID, Touch ID, and all charging ports (30-pin, Lightning, USB-C).",
    services: ["All iPad screen replacement", "iPad battery replacement", "iPad charging port repair", "Apple Pencil connectivity fixes", "Face ID/Touch ID repair", "iPad camera repair", "iPad speaker repair", "iPad water damage repair"]
  },
  {
    id: 2,
    title: "Samsung Galaxy Tab Repair (All Series)",
    keywords: "Samsung Galaxy Tab repair Denton TX, Galaxy Tab S repair, Galaxy Tab A repair, Galaxy Tab Active repair, Samsung tablet screen replacement",
    description: "Professional Samsung Galaxy Tab repair for all series including Galaxy Tab S9/S8/S7/S6/S5/S4/S3/S2, Galaxy Tab A9/A8/A7/A, Galaxy Tab Active5/Active4/Active3/Active2, Galaxy Tab FE, and all other Samsung tablet models. We handle Super AMOLED displays, S Pen functionality, Samsung DeX, and all Samsung-specific features.",
    services: ["Galaxy Tab screen replacement", "Samsung tablet battery replacement", "S Pen digitizer repair", "USB-C/micro-USB port repair", "Samsung DeX connectivity issues", "Galaxy Tab camera repair", "Samsung tablet speaker repair", "Water damage restoration"]
  },
  {
    id: 3,
    title: "Microsoft Surface Repair (All Models)",
    keywords: "Microsoft Surface repair Denton TX, Surface Pro repair, Surface Go repair, Surface Book repair, Surface Studio repair, Surface tablet screen replacement",
    description: "Comprehensive Microsoft Surface repair for all models including Surface Pro 9/8/7/6/5/4/3/2/1, Surface Go 4/3/2/1, Surface Book 3/2/1, Surface Studio 2/1, Surface Laptop Studio 2/1, and Surface RT. We specialize in detachable keyboards, Surface Pen functionality, kickstand repairs, and Windows 11/10 optimization.",
    services: ["Surface screen replacement", "Surface battery replacement", "Surface Connect charging port", "Type Cover keyboard repair", "Surface Pen digitizer repair", "Kickstand mechanism repair", "Surface camera repair", "Windows optimization"]
  },
  {
    id: 4,
    title: "Amazon Fire Tablet Repair",
    keywords: "Amazon Fire tablet repair Denton TX, Fire HD repair, Fire Max repair, Kindle Fire repair, Amazon tablet screen replacement",
    description: "Amazon Fire tablet repair for all generations including Fire HD 10/8, Fire Max 11, Fire 7, and legacy Kindle Fire models. We repair Fire OS issues, Amazon Appstore problems, Alexa functionality, and all hardware components with quality replacement parts.",
    services: ["Fire tablet screen replacement", "Fire tablet battery replacement", "Fire tablet charging port repair", "Fire OS software issues", "Amazon Appstore problems", "Fire tablet camera repair", "Fire tablet speaker repair", "Alexa functionality repair"]
  },
  {
    id: 5,
    title: "Lenovo Tab & ThinkPad Tablet Repair",
    keywords: "Lenovo tablet repair Denton TX, Lenovo Tab repair, ThinkPad tablet repair, Yoga tablet repair, Lenovo screen replacement",
    description: "Lenovo tablet repair for all series including Lenovo Tab P12/P11/M10/M8, ThinkPad X1 Tablet, Yoga Tab 13/11, IdeaTab series, and legacy Lenovo tablet models. We handle rotating cameras, kickstand mechanisms, productivity accessories, and business-grade components.",
    services: ["Lenovo tablet screen replacement", "Lenovo tablet battery replacement", "Rotating camera mechanism repair", "Kickstand repair", "USB-C/micro-USB port repair", "Lenovo tablet speaker repair", "ThinkPad tablet keyboard repair", "Business tablet optimization"]
  },
  {
    id: 6,
    title: "All Other Tablet Brands & Models",
    keywords: "tablet repair Denton TX, Huawei tablet repair, ASUS tablet repair, Acer tablet repair, Google tablet repair, OnePlus tablet repair",
    description: "We repair tablets from all major and minor brands including Google Pixel Tablet, ASUS ZenPad series, Acer Iconia tablets, Huawei MediaPad/MatePad series, OnePlus Pad, Xiaomi Pad series, TCL tablets, and any other Android or Windows tablet. No tablet is too obscure - if it has a screen, we can fix it!",
    services: ["Universal screen replacement", "Universal battery replacement", "All charging port types", "Android/Windows optimization", "Custom ROM installation", "Hardware component repair", "Diagnostic services", "Data recovery services"]
  }
];

export function TabletBrands() {
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
            We Repair All Tablet Brands
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From the latest iPad Pro and Samsung Galaxy Tab to Microsoft Surface and every other tablet brand, our certified technicians repair all tablet models with quality parts and expert service.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-4">
            {tabletBrands.map((brand, index) => (
              <div
                key={brand.id}
                style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl shadow-lg hover:bg-white/80 hover:shadow-xl group relative overflow-hidden"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <button
                  onClick={() => toggleItem(brand.id)}
                  className="w-full p-6 text-left flex items-center justify-between rounded-2xl transition-colors duration-300 group relative z-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DB5858] to-[#c94848] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Tablet className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-[#DB5858] transition-colors">
                        {brand.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Expert repair for all models in this brand</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                      openItem === brand.id ? "transform rotate-180 text-[#DB5858]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openItem === brand.id && (
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
                            {brand.description}
                          </p>

                          <h4 className="font-semibold text-gray-900 mb-3">Common Repair Services:</h4>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {brand.services.map((service, serviceIndex) => (
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
                Don't See Your Tablet Brand Listed?
              </h3>
              <p className="text-lg mb-6 text-gray-600">
                We repair all tablet brands and models, including rare and discontinued devices. Call us for a free diagnostic on any tablet.
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