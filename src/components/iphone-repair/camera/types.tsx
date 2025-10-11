"use client";

import { motion } from "framer-motion";
import { Camera, Circle, Smartphone, CheckCircle, AlertTriangle } from "lucide-react";

const cameraRepairTypes = [
  {
    id: 1,
    icon: Circle,
    title: "Camera Lens Replacement",
    models: ["All iPhone Models"],
    price: "From $49",
    description: "Replace just the camera lens glass when the lens is cracked but the camera sensor is undamaged.",
    commonIssues: ["Cracked lens glass", "Scratched lens surface", "Lens cover missing", "Foggy lens cover"],
    repairTime: "30-45 minutes"
  },
  {
    id: 2,
    icon: Camera,
    title: "Rear Camera Replacement",
    models: ["All iPhone Models"],
    price: "From $89",
    description: "Complete rear camera module replacement using OEM cameras. Pairing service included for full functionality.",
    commonIssues: ["Blurry photos", "Camera won't focus", "Black screen", "Flash not working"],
    repairTime: "1-2 hours"
  },
  {
    id: 3,
    icon: Smartphone,
    title: "Front Camera Replacement",
    models: ["All iPhone Models"],
    price: "From $59",
    description: "Front camera replacement using quality parts to restore selfie camera and front-facing functionality.",
    commonIssues: ["Selfie camera not working", "Front camera black screen", "Front flash problems", "Blurry front camera"],
    repairTime: "1-2 hours"
  }
];

export function CameraRepairTypes() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-8 w-40 h-40 bg-blue-500/3 rounded-full blur-2xl animate-pulse"></div>
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
            iPhone Camera Repair Services
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional camera repair from simple lens replacement to complete camera module replacement using OEM parts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-16">
          {cameraRepairTypes.map((type, index) => {
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
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
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
                          <CheckCircle className="w-3 h-3 text-blue-500 mr-2 flex-shrink-0" />
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
                Free Camera Diagnosis
              </h3>
              <p className="text-base lg:text-lg mb-4 lg:mb-6 text-gray-600">
                Not sure if you need lens replacement or full camera replacement? Bring your iPhone to our Denton location for free diagnosis and exact repair quote.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Free Camera Diagnosis & Quote
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}