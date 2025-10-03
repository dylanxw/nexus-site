"use client";

import { motion } from "framer-motion";
import { Droplets, Coffee, CloudRain, Waves, FlaskConical, AlertTriangle } from "lucide-react";

const damageTypes = [
  {
    id: 1,
    icon: Droplets,
    title: "Fresh Water Damage",
    severity: "Moderate",
    severityColor: "text-yellow-600",
    bgColor: "bg-yellow-500/10",
    description: "Submersion in clean water like sinks, bathtubs, or accidental drops in fresh water.",
    recovery: "85-95%",
    examples: ["Sink accidents", "Bathtub drops", "Clean water spills", "Rain exposure"]
  },
  {
    id: 2,
    icon: Waves,
    title: "Salt Water Damage",
    severity: "High",
    severityColor: "text-red-600",
    bgColor: "bg-red-500/10",
    description: "Ocean water, pool water with chemicals, or any salt water exposure requiring immediate attention.",
    recovery: "60-80%",
    examples: ["Ocean/beach incidents", "Pool accidents", "Salt water exposure", "Coastal moisture"]
  },
  {
    id: 3,
    icon: Coffee,
    title: "Liquid Spills",
    severity: "Moderate-High",
    severityColor: "text-orange-600",
    bgColor: "bg-orange-500/10",
    description: "Coffee, soda, juice, or other beverages that can cause sticky residue and corrosion.",
    recovery: "70-90%",
    examples: ["Coffee spills", "Soda accidents", "Juice spillage", "Energy drink exposure"]
  },
  {
    id: 4,
    icon: CloudRain,
    title: "Weather Damage",
    severity: "Low-Moderate",
    severityColor: "text-blue-600",
    bgColor: "bg-blue-500/10",
    description: "Rain, snow, humidity, or weather-related moisture exposure over time.",
    recovery: "80-95%",
    examples: ["Heavy rain", "Snow exposure", "High humidity", "Storm damage"]
  },
  {
    id: 5,
    icon: FlaskConical,
    title: "Chemical/Contaminated",
    severity: "Very High",
    severityColor: "text-purple-600",
    bgColor: "bg-purple-500/10",
    description: "Toilet water, sewage, cleaning chemicals, or other contaminated liquid exposure.",
    recovery: "40-70%",
    examples: ["Toilet accidents", "Sewage exposure", "Chemical spills", "Contaminated water"]
  },
  {
    id: 6,
    icon: AlertTriangle,
    title: "Internal Corrosion",
    severity: "Variable",
    severityColor: "text-gray-600",
    bgColor: "bg-gray-500/10",
    description: "Existing corrosion from previous water damage or moisture buildup over time.",
    recovery: "50-85%",
    examples: ["Previous water damage", "Humid conditions", "Moisture buildup", "Age-related corrosion"]
  }
];

export function WaterDamageTypes() {
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">
            Types of Water Damage We Repair
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Different types of liquid damage require specialized treatment approaches. We handle all severity levels with professional equipment and expertise.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {damageTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col h-full"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${type.bgColor} flex items-center justify-center shadow-lg`}>
                      <Icon className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Severity:</span>
                        <span className={`text-sm font-bold ${type.severityColor}`}>{type.severity}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                    {type.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-gray-900">Recovery Rate:</span>
                      <span className="text-sm font-bold text-green-600">{type.recovery}</span>
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Common Examples:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {type.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex items-center text-xs text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0" />
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl mt-auto">
                    Get Assessment for {type.title}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Emergency Action Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mt-16"
        >
          <div className="backdrop-blur-md bg-red-50/60 border border-red-200/80 rounded-2xl p-8 hover:bg-red-50/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-red-800">
                What to Do Immediately After Water Damage
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-red-600">1</span>
                  </div>
                  <h4 className="font-semibold text-red-800 mb-2 text-sm">Power Off</h4>
                  <p className="text-xs text-red-700">Turn off your iPhone immediately and do not attempt to charge it.</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-red-600">2</span>
                  </div>
                  <h4 className="font-semibold text-red-800 mb-2 text-sm">Remove Case</h4>
                  <p className="text-xs text-red-700">Remove case and SIM card if possible to allow better air circulation.</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-red-600">3</span>
                  </div>
                  <h4 className="font-semibold text-red-800 mb-2 text-sm">Dry Gently</h4>
                  <p className="text-xs text-red-700">Pat dry with soft cloth but avoid shaking or using heat sources.</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-red-600">4</span>
                  </div>
                  <h4 className="font-semibold text-red-800 mb-2 text-sm">Bring to Us</h4>
                  <p className="text-xs text-red-700">Bring to our Denton location immediately for professional assessment.</p>
                </div>
              </div>

              <div className="mt-8">
                <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                  Emergency Water Damage Service
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}