"use client";

import { motion } from "framer-motion";
import { Search, Wrench, Zap, TestTube, CheckCircle, Brush, Shield } from "lucide-react";

const processSteps = [
  {
    step: 1,
    icon: Search,
    title: "Port Inspection & Diagnosis",
    description: "Thorough inspection to determine if the issue is debris/lint buildup or actual port damage requiring replacement.",
    time: "10-15 minutes"
  },
  {
    step: 2,
    icon: Brush,
    title: "Cleaning or Replacement",
    description: "Professional debris removal and cleaning, or full port replacement if damage is found during inspection.",
    time: "15 minutes - 90 minutes"
  },
  {
    step: 3,
    icon: TestTube,
    title: "Charging & Connection Testing",
    description: "Complete testing of charging speed, data transfer, and connection stability with multiple cables.",
    time: "15-20 minutes"
  },
  {
    step: 4,
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Final inspection and warranty activation to ensure reliable charging performance.",
    time: "10 minutes"
  }
];

export function ChargingPortProcess() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-yellow-500/3 rounded-full blur-2xl animate-pulse"></div>
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
            Our Charging Port Repair Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional port replacement process that ensures reliable charging and long-lasting port functionality.
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
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-2xl mb-4 backdrop-blur-sm group-hover:bg-yellow-500/20 transition-colors">
                    <Icon className="h-8 w-8 text-yellow-600" />
                  </div>

                  <div className="text-sm font-bold text-yellow-600 mb-2">Step {step.step}</div>
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
              Why Choose Our Charging Port Repair?
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Brush className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Cleaning & Replacement</h4>
                <p className="text-sm text-gray-600">Professional debris removal or complete port replacement based on diagnostic findings.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Lightning & USB-C Specialist</h4>
                <p className="text-sm text-gray-600">Expert repair for both Lightning and USB-C charging ports across all iPhone models.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h4>
                <p className="text-sm text-gray-600">60-day warranty on all charging port repairs with thorough testing before return.</p>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Schedule Port Repair
              </button>
            </div>
          </div>
        </motion.div>

        {/* Common Symptoms */}
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
                Signs Your iPhone Needs Charging Port Repair
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Cable Won't Go In Fully</h4>
                    <p className="text-sm text-gray-600">Charging cable stops partway when inserting, often due to lint or debris buildup.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Loose Connection</h4>
                    <p className="text-sm text-gray-600">Charging cable falls out easily or requires specific positioning to charge.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Intermittent Charging</h4>
                    <p className="text-sm text-gray-600">Charging stops and starts randomly, or only works with certain cables.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Slow Charging</h4>
                    <p className="text-sm text-gray-600">Takes much longer to charge than normal, even with fast chargers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Physical Damage</h4>
                    <p className="text-sm text-gray-600">Visible damage to the charging port from drops or foreign objects.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Data Transfer Issues</h4>
                    <p className="text-sm text-gray-600">Can't connect to computer or transfer data despite charging working.</p>
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