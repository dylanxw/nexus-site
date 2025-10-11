"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Camera } from "lucide-react";

const cameraFAQs = [
  {
    id: 1,
    question: "How long does iPhone camera repair take?",
    answer: "Camera lens replacement takes 30-45 minutes. Full camera module replacement takes 1-2 hours including testing and calibration. Front camera repairs with Face ID preservation may take slightly longer."
  },
  {
    id: 2,
    question: "Can you repair just the camera lens or do I need a full camera replacement?",
    answer: "It depends on the damage. If only the lens glass is cracked but photos are still clear, we can replace just the lens for $49. If photos are blurry or the camera won't work, you'll need a full camera module replacement."
  },
  {
    id: 3,
    question: "Will replacing my front camera disable Face ID?",
    answer: "On iPhone 12 and newer models, only Apple original front camera parts will preserve Face ID. We use Apple original parts to maintain full Face ID functionality. Aftermarket parts will permanently disable Face ID."
  },
  {
    id: 4,
    question: "Do you use genuine camera parts?",
    answer: "Yes! We use only OEM camera modules for all repairs. We never use aftermarket camera parts as they significantly reduce photo quality and functionality. For front cameras on iPhone 12+, we use Apple original parts."
  },
  {
    id: 5,
    question: "How much does camera repair cost?",
    answer: "Camera lens replacement starts at $49. Rear camera module replacement starts at $89. Front camera replacement with Face ID preservation starts at $129. We provide free diagnosis to determine what repair you need."
  },
  {
    id: 6,
    question: "What causes iPhone camera problems?",
    answer: "Common causes include drops that crack the lens or damage internal components, liquid damage, manufacturing defects, and normal wear over time. Sometimes cleaning the lens can resolve minor issues."
  },
  {
    id: 7,
    question: "Can you fix a camera that won't focus?",
    answer: "Yes! Focus issues are usually caused by damaged camera modules or debris. We can diagnose if it's a hardware issue requiring camera replacement or a software issue that can be resolved."
  },
  {
    id: 8,
    question: "Do you offer warranty on camera repairs?",
    answer: "Yes! All camera repairs include a 60-day warranty covering defects and workmanship. If you experience any camera issues within 60 days, bring your iPhone back for free service."
  },
  {
    id: 9,
    question: "Can you pair replacement cameras to my iPhone?",
    answer: "Absolutely! Camera pairing is included with all our camera replacements. This ensures full functionality, optimal performance, and compatibility with all camera features including Portrait mode."
  },
  {
    id: 10,
    question: "What should I do if my camera is making clicking sounds?",
    answer: "Clicking sounds usually indicate the autofocus mechanism is damaged or stuck. This typically requires camera module replacement. Bring it in for free diagnosis to confirm the issue and get an exact quote."
  }
];

export function CameraRepairFAQ() {
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
          className="text-center mb-8 lg:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-6 text-gray-900">
            Camera Repair FAQ
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Common questions about iPhone camera repair, lens replacement, and Face ID preservation.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-3 lg:space-y-4">
            {cameraFAQs.map((faq, index) => (
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
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-blue-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                      <Camera className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
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
                Need Expert Camera Repair?
              </h3>
              <p className="text-base lg:text-lg mb-4 lg:mb-6 text-gray-600">
                Our camera specialists can diagnose and repair any iPhone camera issue using only OEM parts with Face ID preservation.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Expert Camera Repair
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}