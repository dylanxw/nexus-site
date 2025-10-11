"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Smartphone } from "lucide-react";

const backGlassFAQs = [
  {
    id: 1,
    question: "How long does back glass repair take?",
    answer: "Glass-only replacement takes 1-2 hours. Full housing swap takes 2-3 hours including testing. Both repairs are typically completed the same day."
  },
  {
    id: 2,
    question: "What's the difference between housing swap and glass-only repair?",
    answer: "Housing swap replaces your entire back frame with a genuine OEM Apple housing for maximum durability. Glass-only repair replaces just the back glass on your existing frame - more affordable but less durable long-term."
  },
  {
    id: 3,
    question: "Which repair option should I choose?",
    answer: "Choose housing swap for severe damage, multiple cracks, or if you want OEM Apple quality. Choose glass-only for single cracks, budget concerns, or when the frame is in good condition."
  },
  {
    id: 4,
    question: "Will my wireless charging still work after repair?",
    answer: "Yes! Both repair options restore wireless charging functionality. Housing swap guarantees wireless charging performance since it uses OEM Apple components."
  },
  {
    id: 5,
    question: "How much does back glass repair cost?",
    answer: "Glass-only repair starts at $79. Full housing swap starts at $149. We provide free diagnosis to determine which option is best for your specific damage."
  },
  {
    id: 6,
    question: "Do you use genuine Apple parts for housing swap?",
    answer: "Yes! For housing swap repairs, we use genuine OEM Apple housings. This ensures maximum durability, proper fit, and maintains all original functionality including wireless charging."
  },
  {
    id: 7,
    question: "Can you repair severely shattered back glass?",
    answer: "Absolutely! Even if the back glass is completely shattered with pieces falling out, we can repair it. Severely damaged backs often benefit most from housing swap for best results."
  },
  {
    id: 8,
    question: "Do you offer warranty on back glass repairs?",
    answer: "Yes! All back glass repairs include a 60-day warranty covering defects, workmanship, and associated components like rear microphone, camera flash, and back glass lifting. Physical damage like new cracks is not covered as this indicates external impact."
  },
  {
    id: 9,
    question: "Will my camera and flash still work normally?",
    answer: "Yes! Camera and flash functionality are fully preserved with both repair options. We test all functions before returning your device to ensure everything works perfectly."
  },
  {
    id: 10,
    question: "Can I prevent future back glass damage?",
    answer: "Using a quality case with raised edges around the camera is the best protection. Tempered glass camera lens protectors also help prevent damage to the camera area specifically."
  }
];

export function BackGlassRepairFAQ() {
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
        <div className="absolute top-16 right-8 w-40 h-40 bg-purple-500/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 left-8 w-48 h-48 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
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
            Back Glass Repair FAQ
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Common questions about iPhone back glass repair, housing swap, and glass-only replacement options.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-3 lg:space-y-4">
            {backGlassFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true, margin: "-50px" }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl shadow-lg hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-4 lg:p-6 text-left flex items-center justify-between rounded-xl lg:rounded-2xl transition-colors duration-300 group relative z-10"
                >
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-purple-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                      <Smartphone className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-sm lg:text-lg font-semibold text-gray-900 group-hover:text-[#DB5858] transition-colors">
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

        {/* Expert Service CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mt-8 lg:mt-16"
        >
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg hover:bg-white/80 transition-all duration-300 group relative overflow-hidden">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4 text-gray-900">
                Need Expert Back Glass Repair?
              </h3>
              <p className="text-base lg:text-lg mb-4 lg:mb-6 text-gray-600">
                Our back glass specialists can help you choose the best repair option and restore your iPhone's appearance and functionality.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Expert Back Glass Repair
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}