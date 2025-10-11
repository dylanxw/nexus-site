"use client";

import { motion } from "framer-motion";
import { Battery, CheckCircle } from "lucide-react";

const batteryRepairModels = [
  {
    category: "iPhone 17 Series",
    models: ["iPhone 17", "iPhone 17 Air", "iPhone 17 Pro", "iPhone 17 Pro Max"],
    price: "$169",
    capacity: "3500-4600 mAh",
    features: ["Advanced USB-C optimization", "All-day+ battery life", "Ultra-fast charging", "OEM Original & genuine battery replacements available"],
    description: "Latest iPhone 17 series battery replacement with enhanced capacity and next-generation power management."
  },
  {
    category: "iPhone 16 Series",
    models: ["iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max"],
    price: "$119",
    capacity: "3400-4500 mAh",
    features: ["Improved USB-C efficiency", "Extended battery life", "Fast wireless charging", "OEM Original & genuine battery replacements available"],
    description: "Professional iPhone 16 series battery replacement with improved capacity and enhanced charging technology."
  },
  {
    category: "iPhone 15 Series",
    models: ["iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max"],
    price: "$89",
    capacity: "3349-4441 mAh",
    features: ["USB-C optimized", "Enhanced battery life", "Fast charging compatible", "OEM Original & genuine battery replacements available"],
    description: "iPhone 15 series battery replacement with improved capacity and USB-C charging optimization."
  },
  {
    category: "iPhone 14 Series",
    models: ["iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max"],
    price: "$85",
    capacity: "3279-4323 mAh",
    features: ["All-day battery life", "Fast charging support", "Wireless charging", "OEM Original & genuine battery replacements available"],
    description: "Professional iPhone 14 battery replacement restoring full-day battery performance and charging speed."
  },
  {
    category: "iPhone 13 Series",
    models: ["iPhone 13", "iPhone 13 Mini", "iPhone 13 Pro", "iPhone 13 Pro Max"],
    price: "$79",
    capacity: "2438-4352 mAh",
    features: ["Improved battery life", "Lightning fast charging", "Wireless charging", "OEM Original & genuine battery replacements available"],
    description: "Expert iPhone 13 battery replacement including optimized batteries for ProMotion displays."
  },
  {
    category: "iPhone 12 Series",
    models: ["iPhone 12", "iPhone 12 Mini", "iPhone 12 Pro", "iPhone 12 Pro Max"],
    price: "$69",
    capacity: "2227-3687 mAh",
    features: ["5G optimized", "MagSafe charging", "Fast wireless charging", "OEM Original & genuine battery replacements available"],
    description: "iPhone 12 battery replacement with 5G-optimized power management and MagSafe compatibility."
  },
  {
    category: "iPhone 11 Series & Earlier",
    models: ["iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11", "iPhone XS Max", "iPhone XS", "iPhone X", "iPhone XR", "iPhone 8 Plus", "iPhone 8", "iPhone 7 Plus", "iPhone 7"],
    price: "$59-$69",
    capacity: "1821-3969 mAh",
    features: ["Fast charging (8+)", "Wireless charging (8+)", "Lightning charging", "OEM Original & genuine battery replacements available"],
    description: "Complete battery replacement for iPhone 11 and earlier models restoring original battery performance."
  }
];

export function BatteryRepairModels() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-8 w-40 h-40 bg-green-500/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 left-8 w-48 h-48 bg-[#DB5858]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="wide-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1.0],
            type: "tween"
          }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ willChange: 'transform, opacity' }}
          className="text-center mb-8 lg:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-6 text-gray-900">
            iPhone Battery Replacement by Model
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Quality battery replacement for all iPhone models with model-specific batteries and expert installation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {batteryRepairModels.map((modelGroup, index) => (
            <motion.div
              key={modelGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1.0],
                type: "tween"
              }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ willChange: 'transform, opacity', transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
              className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:bg-white/80 hover:shadow-xl group relative overflow-hidden flex flex-col h-full"
            >
              {/* Glass shine animation */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3 lg:mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                    <Battery className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base lg:text-xl font-bold text-gray-900">{modelGroup.category}</h3>
                    <p className="text-sm lg:text-lg font-bold text-[#DB5858]">{modelGroup.price}</p>
                  </div>
                </div>

                <div className="mb-3 lg:mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-xs lg:text-sm">Battery Capacity:</h4>
                    <span className="text-xs lg:text-sm font-bold text-green-600">{modelGroup.capacity}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {modelGroup.models.map((model, modelIndex) => (
                      <span
                        key={modelIndex}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4 leading-relaxed">
                  {modelGroup.description}
                </p>

                <div className="mb-4 lg:mb-6 flex-grow">
                  <h4 className="font-semibold text-gray-900 mb-2 text-xs lg:text-sm">Battery Features:</h4>
                  <div className="space-y-1">
                    {modelGroup.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-xs lg:text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-2.5 lg:py-3 px-4 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl mt-auto">
                  Get Quote for {modelGroup.category}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: [0.25, 0.1, 0.25, 1.0],
            type: "tween"
          }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ willChange: 'transform, opacity' }}
          className="text-center mt-8 lg:mt-12"
        >
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 hover:bg-white/80 hover:shadow-xl group relative overflow-hidden" style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-gray-900">
                Need a Battery Health Check?
              </h3>
              <p className="text-base lg:text-lg mb-4 lg:mb-6 text-gray-600">
                Bring your iPhone to our Denton store for free battery diagnostic and health assessment.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Free Battery Check
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}