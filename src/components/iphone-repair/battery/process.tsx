"use client";

import { motion } from "framer-motion";
import { Search, Battery, TestTube, CheckCircle, Zap, Shield } from "lucide-react";

const processSteps = [
  {
    step: 1,
    icon: Search,
    title: "Battery Diagnosis",
    description: "We test your current battery health, capacity, and charging performance to confirm replacement need.",
    time: "5-10 minutes"
  },
  {
    step: 2,
    icon: Battery,
    title: "Professional Replacement",
    description: "Our certified technicians safely remove the old battery and install a quality replacement.",
    time: "20-30 minutes"
  },
  {
    step: 3,
    icon: TestTube,
    title: "Charging & Performance Test",
    description: "We test charging speed, battery calibration, and overall power management functionality.",
    time: "10-15 minutes"
  },
  {
    step: 4,
    icon: CheckCircle,
    title: "Final Quality Check",
    description: "Complete device inspection and battery health verification before returning your iPhone.",
    time: "5 minutes"
  }
];

export function BatteryRepairProcess() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-green-500/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
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
            Our iPhone Battery Replacement Process
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional, safe battery replacement process that restores your iPhone's power and performance.
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
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1.0],
                  type: "tween"
                }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ willChange: 'transform, opacity', transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:bg-white/80 hover:shadow-xl group relative overflow-hidden text-center"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-green-500/10 rounded-xl lg:rounded-2xl mb-3 lg:mb-4 backdrop-blur-sm group-hover:bg-green-500/20" style={{ transition: 'background-color 0.3s ease' }}>
                    <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
                  </div>

                  <div className="text-xs lg:text-sm font-bold text-green-600 mb-1 lg:mb-2">Step {step.step}</div>
                  <h3 className="text-sm lg:text-lg font-bold mb-2 lg:mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-2 lg:mb-3">{step.description}</p>
                  <div className="text-xs text-gray-500 font-medium">{step.time}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quality Promise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.6,
            ease: [0.25, 0.1, 0.25, 1.0],
            type: "tween"
          }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ willChange: 'transform, opacity', transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
          className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 hover:bg-white/80 hover:shadow-xl group relative overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

          <div className="relative z-10 text-center">
            <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-gray-900">
              Why Choose Our Battery Replacement Service?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mt-6 lg:mt-8">
              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500/10 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3">
                  <Battery className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Quality Batteries</h4>
                <p className="text-xs lg:text-sm text-gray-600">We use high-quality replacement batteries that meet or exceed original specifications, plus OEM Original and genuine options available.</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-500/10 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3">
                  <Zap className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Fast Service</h4>
                <p className="text-xs lg:text-sm text-gray-600">Most battery replacements completed in 30-45 minutes while you wait.</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500/10 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3">
                  <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">60-Day Warranty</h4>
                <p className="text-xs lg:text-sm text-gray-600">All battery replacements include our comprehensive 60-day warranty coverage.</p>
              </div>
            </div>

            <div className="mt-6 lg:mt-8">
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Schedule Battery Replacement
              </button>
            </div>
          </div>
        </motion.div>

        {/* Signs You Need Battery Replacement */}
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
          className="mt-8 lg:mt-12"
        >
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 hover:bg-white/80 hover:shadow-xl group relative overflow-hidden" style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-gray-900 text-center">
                Signs Your iPhone Needs a New Battery
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Battery Drains Quickly</h4>
                    <p className="text-xs lg:text-sm text-gray-600">Your iPhone battery doesn't last through the day like it used to.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Unexpected Shutdowns</h4>
                    <p className="text-xs lg:text-sm text-gray-600">iPhone turns off suddenly even with battery percentage remaining.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Slow Charging</h4>
                    <p className="text-xs lg:text-sm text-gray-600">Takes much longer to charge than when your iPhone was new.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Battery Health Below 80%</h4>
                    <p className="text-xs lg:text-sm text-gray-600">iOS shows battery health significantly degraded in Settings.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Overheating Issues</h4>
                    <p className="text-xs lg:text-sm text-gray-600">iPhone gets unusually hot during normal use or charging.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Performance Throttling</h4>
                    <p className="text-xs lg:text-sm text-gray-600">iPhone feels slower due to iOS battery management features.</p>
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