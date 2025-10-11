"use client";

import { motion } from "framer-motion";
import { Zap, Brush, Cable, CheckCircle } from "lucide-react";

const chargingPortTypes = [
  {
    id: 1,
    icon: Zap,
    title: "USB-C Port Repair",
    models: ["iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 16 Series", "iPhone 17 Series"],
    price: "From $89",
    description: "Latest USB-C charging port repair for iPhone 15 and newer models with advanced connector technology.",
    commonIssues: ["Port won't charge", "Loose USB-C connection", "Data transfer issues", "Fast charging problems"],
    repairTime: "1-2 hours"
  },
  {
    id: 2,
    icon: Cable,
    title: "Lightning Port Repair",
    models: ["iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone X", "iPhone 8", "iPhone 7"],
    price: "From $69",
    description: "Professional Lightning charging port repair for iPhone 14 and earlier models with expert port replacement.",
    commonIssues: ["Lightning cable falls out", "Intermittent charging", "Won't recognize charger", "Slow charging"],
    repairTime: "1-2 hours"
  },
  {
    id: 3,
    icon: Brush,
    title: "Port Cleaning & Debris Removal",
    models: ["All iPhone Models"],
    price: "From $29",
    description: "Professional cleaning to remove lint, dust, and debris that prevents proper charging cable connection.",
    commonIssues: ["Charging cable won't go in fully", "Loose connection after cleaning", "Debris visible in port", "Cable falls out easily"],
    repairTime: "15-30 minutes"
  }
];

export function ChargingPortTypes() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-8 w-40 h-40 bg-yellow-500/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 left-8 w-48 h-48 bg-[#DB5858]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="wide-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 lg:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-6 text-gray-900">
            iPhone Charging Port Repair Services
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional repair for all iPhone charging port types with expert replacement and quality parts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-16">
          {chargingPortTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col h-full"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3 lg:mb-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
                      <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base lg:text-xl font-bold text-gray-900">{type.title}</h3>
                      <p className="text-sm lg:text-lg font-bold text-[#DB5858]">{type.price}</p>
                    </div>
                  </div>

                  <div className="mb-3 lg:mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-xs lg:text-sm">Compatible Models:</h4>
                    <div className="flex flex-wrap gap-1">
                      {type.models.map((model, modelIndex) => (
                        <span
                          key={modelIndex}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4 leading-relaxed flex-grow">
                    {type.description}
                  </p>

                  <div className="mb-3 lg:mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-xs lg:text-sm">Common Issues:</h4>
                    <div className="space-y-1">
                      {type.commonIssues.map((issue, issueIndex) => (
                        <div key={issueIndex} className="flex items-center text-xs lg:text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-yellow-500 mr-2 flex-shrink-0" />
                          {issue}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 lg:mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xs lg:text-sm font-semibold text-gray-900">Repair Time:</span>
                      <span className="text-xs lg:text-sm font-bold text-green-600">{type.repairTime}</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-2.5 lg:py-3 px-4 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl mt-auto">
                    Get Quote for {type.title}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Diagnosis Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-gray-900">
                Free Charging Port Diagnosis
              </h3>
              <p className="text-base lg:text-lg mb-4 lg:mb-6 text-gray-600">
                Not sure what's wrong with your iPhone charging port? Bring it to our Denton location for free diagnosis and exact repair quote.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Free Diagnosis & Quote
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}