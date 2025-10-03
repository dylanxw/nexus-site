"use client";

import { motion } from "framer-motion";
import { Smartphone, RefreshCw, Wrench, CheckCircle, Layers } from "lucide-react";

const backGlassRepairTypes = [
  {
    id: 1,
    icon: RefreshCw,
    title: "Full Housing Swap",
    models: ["iPhone 8 Series", "iPhone 10 Series", "iPhone 12 Series", "iPhone 13 Series", "iPhone 14 Pro", "iPhone 14 Pro Max"],
    price: "From $149 (for most models)", 
    description: "Complete housing replacement with genuine OEM Apple housing including new frame. Maximum durability and like-new appearance.",
    commonIssues: ["Frame dings or scratches", "Want like-new appearance", "Maximum durability desired", "Want OEM Apple quality"],
    repairTime: "1-2 hours",
    benefits: ["OEM Apple housing", "Brand new frame included", "Maximum durability", "Factory water resistance"]
  },
  {
    id: 2,
    icon: Layers,
    title: "Modular Back Glass Replacement",
    models: ["iPhone 17 Series", "iPhone 16 Series", "iPhone 15 Series", "iPhone 14 Plus", "iPhone 14"],
    price: "From $99",
    description: "Modular back glass replacement for newer iPhones with removable glass panels. Apple-quality results with OEM or aftermarket parts.",
    commonIssues: ["Budget-conscious repair", "Frame in good condition", "Only back glass cracked", "Want Apple-quality repair"],
    repairTime: "45-60 minutes",
    benefits: ["Apple-quality results", "Faster repair time", "Maintains original frame", "OEM parts available"]
  },
  {
    id: 3,
    icon: Wrench,
    title: "Back Glass Only Repair",
    models: ["iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 13 Series", "iPhone 12 Series", "iPhone 11 & Earlier"],
    price: "From $79",
    description: "Professional back glass replacement on existing housing for non-modular models. Great repair quality at a more affordable price point.",
    commonIssues: ["Budget-conscious repair", "Frame in good condition", "Only back glass cracked", "Quality glass repair needed"],
    repairTime: "2-3 hours",
    benefits: ["More affordable option", "Maintains original frame", "Professional installation", "Great visual result"]
  }
];

export function BackGlassRepairTypes() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-8 w-40 h-40 bg-purple-500/3 rounded-full blur-2xl animate-pulse"></div>
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
            iPhone Back Glass Repair Options
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose between OEM Apple housing swap, modular glass replacement for newer models, or traditional glass-only repair.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {backGlassRepairTypes.map((type, index) => {
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                      <p className="text-lg font-bold text-[#DB5858]">{type.price}</p>
                    </div>
                  </div>


                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Compatible Models:</h4>
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

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {type.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                    <div className="space-y-1">
                      {type.commonIssues.map((issue, issueIndex) => (
                        <div key={issueIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0" />
                          {issue}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                    <div className="space-y-1">
                      {type.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-900">Repair Time:</span>
                      <span className="text-sm font-bold text-green-600">{type.repairTime}</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl mt-auto">
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
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Free Back Glass Diagnosis
              </h3>
              <p className="text-lg mb-6 text-gray-600">
                Not sure which repair option is best? Bring your iPhone to our Denton location for free diagnosis and repair recommendation.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Free Diagnosis & Quote
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}