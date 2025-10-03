"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const screenFAQs = [
  {
    id: 1,
    question: "How long does iPhone screen replacement take?",
    answer: "Most iPhone screen replacements take 1-2 hours depending on the model. We offer same-day service for most repairs and can often complete while you wait."
  },
  {
    id: 2,
    question: "Will my screen replacement be covered under warranty?",
    answer: "Yes! All our iPhone screen replacements come with a 60-day warranty covering defects and installation issues. If you experience any problems, bring it back for free repair or replacement."
  },
  {
    id: 3,
    question: "Do you use genuine iPhone screens?",
    answer: "We offer both quality aftermarket screens and genuine iPhone screens. Genuine screens are available for most models at a premium price. We'll discuss options and pricing during your free diagnosis."
  },
  {
    id: 4,
    question: "Will Face ID and Touch ID still work after screen replacement?",
    answer: "Yes! Our technicians are trained to preserve Face ID and Touch ID functionality. We carefully transfer the original sensors and test all features before returning your iPhone."
  },
  {
    id: 5,
    question: "Can you fix screens that are completely black or unresponsive?",
    answer: "In most cases, yes. A black or unresponsive screen is often due to LCD/OLED damage rather than internal issues. We'll diagnose for free to determine if it's a screen replacement or more complex repair."
  },
  {
    id: 6,
    question: "How much does iPhone screen replacement cost?",
    answer: "Prices vary by iPhone model, ranging from $79 for older models to $149 for the latest iPhone 15 series. Bring your iPhone for a free diagnosis and exact quote."
  },
  {
    id: 7,
    question: "Should I replace a cracked screen that still works?",
    answer: "Yes, we recommend replacing cracked screens promptly. Cracks can worsen over time, potentially damaging the LCD underneath or allowing moisture to enter, leading to more expensive repairs."
  },
  {
    id: 8,
    question: "Can you repair water-damaged screens?",
    answer: "If your iPhone has water damage, we recommend our full water damage restoration service first. Sometimes the screen needs replacement as part of the water damage repair process."
  }
];

export function ScreenRepairFAQ() {
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
        <div className="absolute top-16 right-8 w-40 h-40 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 left-8 w-48 h-48 bg-green-400/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">
            iPhone Screen Repair FAQ
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Common questions about iPhone screen replacement and repair services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {screenFAQs.map((faq, index) => (
              <div
                key={faq.id}
                style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl shadow-lg hover:bg-white/80 hover:shadow-xl group relative overflow-hidden"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between rounded-2xl transition-colors duration-300 group relative z-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#DB5858]/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#DB5858]/20" style={{ transition: 'background-color 0.3s ease' }}>
                      <HelpCircle className="h-6 w-6 text-[#DB5858]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#DB5858]" style={{ transition: 'color 0.3s ease' }}>
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
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 shadow-lg hover:bg-white/80 group relative overflow-hidden" style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}>
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Still Have Questions About Screen Repair?
              </h3>
              <p className="text-lg mb-6 text-gray-600">
                Call us for personalized answers about your iPhone screen repair needs.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Call for Expert Advice
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}