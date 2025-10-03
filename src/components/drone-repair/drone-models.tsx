"use client";

import { useState } from "react";
import { Plane } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const droneModels = [
  {
    id: 1,
    brand: "DJI",
    models: [
      "DJI Mavic Air 2", "DJI Mavic Air 2S", "DJI Mavic 3", "DJI Mavic 3 Classic",
      "DJI Mavic Pro", "DJI Mavic Pro Platinum", "DJI Mavic 2 Pro", "DJI Mavic 2 Zoom",
      "DJI Mini 2", "DJI Mini 3", "DJI Mini 3 Pro", "DJI Mini 4 Pro",
      "DJI Phantom 4", "DJI Phantom 4 Pro", "DJI Phantom 4 Advanced", "DJI Phantom 4 RTK",
      "DJI Air 2S", "DJI FPV", "DJI Inspire 2", "DJI Matrice 300 RTK"
    ]
  },
  {
    id: 2,
    brand: "Autel",
    models: [
      "Autel EVO Lite+", "Autel EVO Lite", "Autel EVO Nano+", "Autel EVO Nano",
      "Autel EVO II Pro", "Autel EVO II", "Autel EVO II Dual", "Autel EVO II RTK",
      "Autel Robotics X-Star Premium", "Autel Robotics X-Star", "Autel MaxiSys"
    ]
  },
  {
    id: 3,
    brand: "Parrot",
    models: [
      "Parrot Anafi", "Parrot Anafi FPV", "Parrot Anafi USA", "Parrot Anafi Work",
      "Parrot Bebop 2", "Parrot AR.Drone 2.0", "Parrot Mambo", "Parrot Swing"
    ]
  },
  {
    id: 4,
    brand: "Skydio",
    models: [
      "Skydio 2", "Skydio 2+", "Skydio X2", "Skydio X2D", "Skydio X2E"
    ]
  },
  {
    id: 5,
    brand: "Holy Stone",
    models: [
      "Holy Stone HS720", "Holy Stone HS720E", "Holy Stone HS175D", "Holy Stone HS110D",
      "Holy Stone HS160 Pro", "Holy Stone HS165", "Holy Stone F181W", "Holy Stone HS700D"
    ]
  },
  {
    id: 6,
    brand: "Potensic",
    models: [
      "Potensic T25", "Potensic D88", "Potensic A20", "Potensic T18", "Potensic Dreamer 4K"
    ]
  }
];

export function DroneModels() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Drone Models We Repair
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We service all major drone brands and models. From consumer drones to professional aerial photography equipment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {droneModels.map((brand, index) => (
            <div key={brand.id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors duration-200 text-left group"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-[#DB5858]/10 flex items-center justify-center mr-4 group-hover:bg-[#DB5858]/20 transition-colors duration-200">
                    <Plane className="h-6 w-6 text-[#DB5858]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#DB5858] transition-colors duration-200">
                      {brand.brand} Drones
                    </h3>
                    <p className="text-sm text-gray-500">
                      {brand.models.length} models supported
                    </p>
                  </div>
                </div>
                <div className={`transform transition-transform duration-200 ${openAccordion === index ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {openAccordion === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {brand.models.map((model, modelIndex) => (
                          <div
                            key={modelIndex}
                            className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group"
                          >
                            <div className="w-2 h-2 bg-[#DB5858] rounded-full mr-3 group-hover:bg-[#c94848] transition-colors duration-200"></div>
                            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                              {model}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <p className="text-lg font-semibold mb-2 text-gray-900">
              Don't see your drone model listed?
            </p>
            <p className="text-gray-600 mb-6">
              We repair all drone brands and models, including custom builds and commercial drones. Call for a free consultation!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <a
                href="tel:940-600-1012"
                className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                Call for Quote
              </a>
              <button className="bg-white border-2 border-[#DB5858] text-[#DB5858] hover:bg-[#DB5858] hover:text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300">
                Get Estimate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}