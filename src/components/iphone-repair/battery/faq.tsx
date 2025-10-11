"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Battery } from "lucide-react";

const batteryFAQs = [
  {
    id: 1,
    question: "How long does iPhone battery replacement take?",
    answer: "Most iPhone battery replacements take 30-45 minutes. We offer same-day service and can often complete the repair while you wait at our Denton location."
  },
  {
    id: 2,
    question: "How do I know if my iPhone needs a new battery?",
    answer: "Common signs include rapid battery drain, unexpected shutdowns, slow charging, overheating, or iOS showing battery health below 80% in Settings > Battery > Battery Health & Charging."
  },
  {
    id: 3,
    question: "Will battery replacement fix performance issues?",
    answer: "Yes! If your iPhone feels slow due to battery-related performance management, a new battery will restore full performance. iOS automatically disables performance throttling with a healthy battery."
  },
  {
    id: 4,
    question: "What type of batteries do you use?",
    answer: "We use high-quality replacement batteries that meet or exceed original specifications, and we also have OEM Original and genuine iPhone batteries available. Our batteries provide the same performance and capacity as original iPhone batteries with genuine options for those who prefer them."
  },
  {
    id: 5,
    question: "Is battery replacement covered under warranty?",
    answer: "Yes! All our battery replacements include a 60-day warranty covering defects and installation issues. If you experience any problems, bring your iPhone back for free service."
  },
  {
    id: 6,
    question: "How much does iPhone battery replacement cost?",
    answer: "Battery replacement costs range from $59 for older models to $89 for the latest iPhone 15 series. Bring your iPhone for a free diagnosis and exact quote."
  },
  {
    id: 7,
    question: "Will I lose my data during battery replacement?",
    answer: "No, battery replacement doesn't affect your data. However, we always recommend backing up your iPhone before any repair as a precaution."
  },
  {
    id: 8,
    question: "How long will a new iPhone battery last?",
    answer: "A quality replacement battery should provide 2-3 years of normal use, similar to the original battery. Battery lifespan depends on usage patterns and charging habits."
  },
  {
    id: 9,
    question: "Can you replace swollen or damaged batteries?",
    answer: "Yes, we safely remove and replace swollen or physically damaged batteries. If your iPhone has a swollen battery, bring it in immediately as this can be a safety concern."
  },
  {
    id: 10,
    question: "Do you calibrate the new battery?",
    answer: "Yes, we perform proper battery calibration and testing to ensure accurate battery percentage readings and optimal charging performance before returning your iPhone."
  }
];

export function BatteryRepairFAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-8 w-40 h-40 bg-green-500/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 left-8 w-48 h-48 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
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
            iPhone Battery Replacement FAQ
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Common questions about iPhone battery replacement and repair services.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-3 lg:space-y-4">
            {batteryFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1.0],
                  type: "tween"
                }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ willChange: 'transform, opacity' }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl shadow-lg hover:bg-white/80 hover:shadow-xl group relative overflow-hidden"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-4 lg:p-6 text-left flex items-center justify-between rounded-xl lg:rounded-2xl group relative z-10"
                >
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-green-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-green-500/20" style={{ transition: 'background-color 0.3s ease' }}>
                      <Battery className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-sm lg:text-lg font-semibold text-gray-900 group-hover:text-[#DB5858]" style={{ transition: 'color 0.3s ease' }}>
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 lg:h-5 lg:w-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                      openItem === faq.id ? "transform rotate-180 text-[#DB5858]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openItem === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="px-4 lg:px-6 pb-4 lg:pb-6">
                        <div className="border-t border-white/40 pt-4 lg:pt-6">
                          <p className="text-gray-600 leading-relaxed text-xs lg:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
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
          className="text-center mt-8 lg:mt-16"
        >
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg hover:bg-white/80 group relative overflow-hidden" style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}>
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4 text-gray-900">
                Still Have Questions About Battery Replacement?
              </h3>
              <p className="text-base lg:text-lg mb-4 lg:mb-6 text-gray-600">
                Call us for personalized answers about your iPhone battery replacement needs.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Call for Expert Advice
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}