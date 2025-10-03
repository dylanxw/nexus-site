"use client";

import { motion } from "framer-motion";
import { Search, Droplets, Wrench, TestTube, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const processSteps = [
  {
    step: 1,
    icon: Search,
    title: "Emergency Assessment",
    description: "Immediate evaluation of water damage extent and component testing to determine recovery potential.",
    time: "15-20 minutes"
  },
  {
    step: 2,
    icon: Droplets,
    title: "Professional Cleaning",
    description: "Complete disassembly and ultrasonic cleaning to remove moisture, corrosion, and contaminants.",
    time: "45-60 minutes"
  },
  {
    step: 3,
    icon: Wrench,
    title: "Component Repair",
    description: "Micro-soldering and component replacement for damaged parts affected by water exposure.",
    time: "30-90 minutes"
  },
  {
    step: 4,
    icon: TestTube,
    title: "Full System Testing",
    description: "Comprehensive testing of all functions including charging, display, cameras, and connectivity.",
    time: "20-30 minutes"
  }
];

export function WaterDamageProcess() {
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">
            Our Water Damage Restoration Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional emergency restoration process designed to maximize recovery and save your iPhone and data.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden text-center"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4 backdrop-blur-sm group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>

                  <div className="text-sm font-bold text-blue-600 mb-2">Step {step.step}</div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.description}</p>
                  <div className="text-xs text-gray-500 font-medium">{step.time}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Emergency Response Promise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

          <div className="relative z-10 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Why Choose Our Water Damage Restoration?
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Emergency Response</h4>
                <p className="text-sm text-gray-600">Immediate assessment and treatment to prevent further damage and maximize recovery chances.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Professional Equipment</h4>
                <p className="text-sm text-gray-600">Ultrasonic cleaning and specialized tools designed for water damage restoration.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">High Success Rate</h4>
                <p className="text-sm text-gray-600">Proven track record of successful water damage recoveries with 60-day warranty.</p>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Emergency Assessment
              </button>
            </div>
          </div>
        </motion.div>

        {/* Critical Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12"
        >
          <div className="backdrop-blur-md bg-orange-50/60 border border-orange-200/80 rounded-2xl p-8 hover:bg-orange-50/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <AlertTriangle className="h-8 w-8 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-orange-800 mb-2">Critical Timeline for Water Damage</h3>
                  <p className="text-orange-700 leading-relaxed">
                    The first 24 hours are crucial for successful water damage recovery. Immediate action significantly increases the chances of saving your iPhone and recovering your data.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-green-600">0-6h</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Excellent Recovery</h4>
                  <p className="text-sm text-gray-600">Best chance for full recovery with minimal component damage.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-yellow-600">6-24h</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Good Recovery</h4>
                  <p className="text-sm text-gray-600">Still good recovery potential with prompt professional treatment.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-red-600">24h+</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Challenging Recovery</h4>
                  <p className="text-sm text-gray-600">Corrosion may have set in, but recovery may still be possible.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}