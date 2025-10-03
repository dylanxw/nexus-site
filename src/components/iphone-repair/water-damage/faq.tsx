"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Droplets } from "lucide-react";

const waterDamageFAQs = [
  {
    id: 1,
    question: "How quickly should I bring my water-damaged iPhone in for repair?",
    answer: "Time is absolutely critical with water damage. Bring your iPhone to us within 6 hours for the best recovery chances, and definitely within 24 hours. The longer you wait, the more corrosion can set in and damage internal components."
  },
  {
    id: 2,
    question: "What should I do immediately after my iPhone gets wet?",
    answer: "Turn off your iPhone immediately and do not attempt to charge it or turn it back on. Remove the case and SIM card if possible, gently pat dry with a soft cloth, and bring it to our Denton location as soon as possible. Avoid using rice, heat sources, or shaking the device."
  },
  {
    id: 3,
    question: "Can you recover my data from a water-damaged iPhone?",
    answer: "In many cases, yes! If the logic board and storage components aren't severely damaged, we can often recover your data during the restoration process. We prioritize data recovery alongside device repair whenever possible."
  },
  {
    id: 4,
    question: "What's the success rate for water damage repair?",
    answer: "Success rates vary by damage type and timing. Fresh water damage caught early has 85-95% success rates, while salt water or contaminated liquid damage ranges from 40-80%. The key factors are the type of liquid, how long exposure lasted, and how quickly you bring it in."
  },
  {
    id: 5,
    question: "How much does water damage repair cost?",
    answer: "Water damage repair starts at $99 and varies based on the extent of damage and components that need replacement. We provide a free assessment first, then give you a detailed quote before beginning any work."
  },
  {
    id: 6,
    question: "How long does water damage repair take?",
    answer: "Most water damage repairs take 2-3 hours, but complex cases requiring component replacement can take longer. Emergency cases are prioritized, and we'll give you a realistic timeframe after our initial assessment."
  },
  {
    id: 7,
    question: "Will my iPhone be the same after water damage repair?",
    answer: "If caught early and properly repaired, your iPhone should function like new. We test all components thoroughly and provide a 60-day warranty on our water damage repairs. Some severe cases may have minor cosmetic effects but full functionality."
  },
  {
    id: 8,
    question: "Do you offer emergency water damage service?",
    answer: "Yes! We understand water damage is urgent. Call us immediately at our Denton location, and we'll prioritize your iPhone for emergency assessment and treatment to maximize recovery chances."
  },
  {
    id: 9,
    question: "Does putting my iPhone in rice actually help?",
    answer: "Rice is not effective and can actually waste precious time. Professional ultrasonic cleaning and proper disassembly are required to remove moisture and prevent corrosion. Skip the rice and bring it directly to us for proper treatment."
  },
  {
    id: 10,
    question: "Can you repair iPhones damaged by salt water or pool water?",
    answer: "Yes, but salt water and chlorinated pool water are more corrosive and require immediate professional attention. These cases are more challenging but still repairable if treated quickly. Don't attempt to rinse with fresh water - bring it directly to us."
  }
];

export function WaterDamageFAQ() {
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
        <div className="absolute top-16 right-8 w-40 h-40 bg-blue-500/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 left-8 w-48 h-48 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
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
            Water Damage Repair FAQ
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Common questions about iPhone water damage repair and emergency restoration services.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {waterDamageFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true, margin: "-50px" }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl shadow-lg hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between rounded-2xl transition-colors duration-300 group relative z-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                      <Droplets className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#DB5858] transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
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
                      <div className="px-6 pb-6">
                        <div className="border-t border-white/40 pt-6">
                          <p className="text-gray-600 leading-relaxed">
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

        {/* Emergency CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mt-16"
        >
          <div className="backdrop-blur-md bg-orange-50/60 border border-orange-200/80 rounded-2xl p-8 shadow-lg hover:bg-orange-50/80 transition-all duration-300 group relative overflow-hidden">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-orange-800">
                Don't Wait - Every Minute Counts!
              </h3>
              <p className="text-lg mb-6 text-orange-700">
                Water damage gets worse over time. Call us now for emergency assessment and start the recovery process immediately.
              </p>
              <button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Emergency Water Damage Call
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}