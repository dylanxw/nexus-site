"use client";

import { motion } from "framer-motion";
import { Search, Wrench, RefreshCw, TestTube, CheckCircle, Shield, Smartphone } from "lucide-react";

const processSteps = [
  {
    step: 1,
    icon: Search,
    title: "Damage Assessment",
    description: "Thorough evaluation to determine if housing swap or glass-only repair is the best option for your device.",
    time: "10-15 minutes"
  },
  {
    step: 2,
    icon: Wrench,
    title: "Repair Execution",
    description: "Professional back glass replacement or complete housing swap using proper tools and techniques.",
    time: "1-3 hours"
  },
  {
    step: 3,
    icon: TestTube,
    title: "Function Testing",
    description: "Complete testing of wireless charging, camera, flash, and all back panel functionality.",
    time: "15-20 minutes"
  },
  {
    step: 4,
    icon: CheckCircle,
    title: "Quality Inspection",
    description: "Final inspection for perfect fit, finish, and functionality before return to customer.",
    time: "10 minutes"
  }
];

export function BackGlassRepairProcess() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-purple-500/3 rounded-full blur-2xl animate-pulse"></div>
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
            Our Back Glass Repair Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional back glass repair process ensuring perfect fit, functionality, and appearance.
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
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-2xl mb-4 backdrop-blur-sm group-hover:bg-purple-500/20 transition-colors">
                    <Icon className="h-8 w-8 text-purple-600" />
                  </div>

                  <div className="text-sm font-bold text-purple-600 mb-2">Step {step.step}</div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.description}</p>
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
          className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

          <div className="relative z-10 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Why Choose Our Back Glass Repair?
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <RefreshCw className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">OEM Housing Available</h4>
                <p className="text-sm text-gray-600">Genuine Apple housings available for maximum durability and like-new appearance.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h4>
                <p className="text-sm text-gray-600">60-day warranty on all back glass repairs with professional installation.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Function Preservation</h4>
                <p className="text-sm text-gray-600">Wireless charging, camera, and all functions maintained after repair.</p>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Schedule Back Glass Repair
              </button>
            </div>
          </div>
        </motion.div>

        {/* Common Back Glass Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12"
        >
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                Signs Your iPhone Needs Back Glass Repair
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Cracked Back Glass</h4>
                    <p className="text-sm text-gray-600">Visible cracks or spider web patterns across the back panel.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Shattered Glass</h4>
                    <p className="text-sm text-gray-600">Glass pieces falling out or completely shattered back panel.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Wireless Charging Issues</h4>
                    <p className="text-sm text-gray-600">Wireless charging no longer works or charges intermittently.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Camera Lens Damage</h4>
                    <p className="text-sm text-gray-600">Camera lens protector cracked or damaged around camera area.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Back Panel Separation</h4>
                    <p className="text-sm text-gray-600">Back glass lifting or separating from the frame.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Sharp Edges</h4>
                    <p className="text-sm text-gray-600">Dangerous sharp glass edges that could cause cuts.</p>
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