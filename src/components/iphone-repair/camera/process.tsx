"use client";

import { motion } from "framer-motion";
import { Search, Camera, Wrench, TestTube, CheckCircle, Shield, Smartphone } from "lucide-react";

const processSteps = [
  {
    step: 1,
    icon: Search,
    title: "Camera Diagnosis",
    description: "Thorough inspection to determine if lens replacement or full camera module replacement is needed.",
    time: "10-15 minutes"
  },
  {
    step: 2,
    icon: Wrench,
    title: "Lens or Camera Replacement",
    description: "Professional lens replacement or complete camera module replacement using OEM parts and proper pairing.",
    time: "30 minutes - 2 hours"
  },
  {
    step: 3,
    icon: TestTube,
    title: "Camera Testing & Calibration",
    description: "Complete testing of photo quality, focus, flash, and all camera functions including Face ID if applicable.",
    time: "15-20 minutes"
  },
  {
    step: 4,
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Final inspection and warranty activation to ensure perfect camera performance and functionality.",
    time: "10 minutes"
  }
];

export function CameraRepairProcess() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-blue-500/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
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
            Our Camera Repair Process
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional camera repair process from diagnosis to testing, ensuring optimal photo quality and functionality.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden text-center"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-blue-500/10 rounded-xl lg:rounded-2xl mb-3 lg:mb-4 backdrop-blur-sm group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
                  </div>

                  <div className="text-xs lg:text-sm font-bold text-blue-600 mb-1 lg:mb-2">Step {step.step}</div>
                  <h3 className="text-sm lg:text-lg font-bold mb-2 lg:mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-2 lg:mb-3">{step.description}</p>
                  <div className="text-xs text-gray-500 font-medium">{step.time}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expertise Promise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

          <div className="relative z-10 text-center">
            <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-gray-900">
              Why Choose Our Camera Repair?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mt-6 lg:mt-8">
              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500/10 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3">
                  <Camera className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">OEM Camera Parts</h4>
                <p className="text-xs lg:text-sm text-gray-600">We use only OEM camera modules and lens components. No aftermarket parts for camera repairs.</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500/10 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3">
                  <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Face ID Preservation</h4>
                <p className="text-xs lg:text-sm text-gray-600">Apple original front camera parts for iPhone 12+ to maintain Face ID functionality.</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-500/10 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3">
                  <Smartphone className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Camera Pairing</h4>
                <p className="text-xs lg:text-sm text-gray-600">Professional camera pairing service for full functionality and optimal performance.</p>
              </div>
            </div>

            <div className="mt-6 lg:mt-8">
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Schedule Camera Repair
              </button>
            </div>
          </div>
        </motion.div>

        {/* Common Camera Problems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-8 lg:mt-12"
        >
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-gray-900 text-center">
                Signs Your iPhone Camera Needs Repair
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Blurry Photos</h4>
                    <p className="text-xs lg:text-sm text-gray-600">Photos are consistently blurry or out of focus, even with good lighting.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Cracked Lens</h4>
                    <p className="text-xs lg:text-sm text-gray-600">Visible cracks or damage to the camera lens glass affecting photo quality.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Black Screen</h4>
                    <p className="text-xs lg:text-sm text-gray-600">Camera app shows black screen or won't open at all.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Won't Focus</h4>
                    <p className="text-xs lg:text-sm text-gray-600">Camera struggles to focus or makes clicking sounds when trying to focus.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Flash Issues</h4>
                    <p className="text-xs lg:text-sm text-gray-600">Camera flash doesn't work or only works intermittently.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Face ID Problems</h4>
                    <p className="text-xs lg:text-sm text-gray-600">Face ID stopped working after front camera damage or replacement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}