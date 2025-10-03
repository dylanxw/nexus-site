"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap } from "lucide-react";

const chargingPortFAQs = [
  {
    id: 1,
    question: "How long does iPhone charging port repair take?",
    answer: "Most charging port repairs take 1-2 hours depending on the complexity. Simple port cleaning may take 30 minutes, while micro-soldering repairs can take up to 2 hours. We offer same-day service for most repairs."
  },
  {
    id: 2,
    question: "How do I know if my charging port needs repair?",
    answer: "Common signs include: iPhone won't charge at all, charging cable falls out easily, intermittent charging that stops and starts, very slow charging speeds, or needing to position the cable in a specific way to charge."
  },
  {
    id: 3,
    question: "Can you repair both Lightning and USB-C charging ports?",
    answer: "Yes! We repair both Lightning ports (iPhone 14 and earlier) and USB-C ports (iPhone 15 and newer). Our technicians are experienced with professional replacement for both connector types."
  },
  {
    id: 4,
    question: "Will my data be safe during charging port repair?",
    answer: "Yes, charging port repair doesn't affect your data since we're only working on the charging components. However, we always recommend backing up your iPhone before any repair as a precaution."
  },
  {
    id: 5,
    question: "How much does charging port repair cost?",
    answer: "Port cleaning starts at $29 for debris removal. Lightning port replacement is $69, USB-C port replacement is $89. We provide free diagnosis to determine if cleaning or replacement is needed."
  },
  {
    id: 6,
    question: "What causes charging port damage?",
    answer: "Common causes include lint and debris buildup, liquid damage, physical damage from drops, using non-certified chargers, forcing cables in the wrong direction, and normal wear from frequent use over time."
  },
  {
    id: 7,
    question: "Can charging port repair fix slow charging issues?",
    answer: "Yes, if slow charging is caused by port damage or debris buildup, our repair can restore normal charging speeds. However, slow charging can also be caused by battery issues or using non-fast charging cables."
  },
  {
    id: 8,
    question: "Do you offer warranty on charging port repairs?",
    answer: "Yes! All charging port repairs include a 60-day warranty covering defects and workmanship. If you experience any charging issues within 60 days, bring your iPhone back for free service."
  },
  {
    id: 9,
    question: "Should I try cleaning my charging port myself first?",
    answer: "You can gently clean visible lint with a soft brush or compressed air, but avoid using metal objects or liquids. If cleaning doesn't solve the problem, bring it to us for professional diagnosis. We offer professional port cleaning starting at $29."
  },
  {
    id: 10,
    question: "Can you repair charging ports damaged by liquid?",
    answer: "Yes, we can often repair charging ports damaged by liquid exposure. This typically requires replacing the damaged port assembly and cleaning corroded components. The sooner you bring it in after liquid damage, the better the repair outcome."
  }
];

export function ChargingPortFAQ() {
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
        <div className="absolute top-16 right-8 w-40 h-40 bg-yellow-500/3 rounded-full blur-2xl animate-pulse"></div>
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
            Charging Port Repair FAQ
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Common questions about iPhone charging port repair and micro-soldering services.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {chargingPortFAQs.map((faq, index) => (
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
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                      <Zap className="h-6 w-6 text-yellow-600" />
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

        {/* Expert Service CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mt-16"
        >
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 shadow-lg hover:bg-white/80 transition-all duration-300 group relative overflow-hidden">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Need Expert Charging Port Repair?
              </h3>
              <p className="text-lg mb-6 text-gray-600">
                Our charging port specialists can diagnose and repair any iPhone charging port issue. Get your iPhone charging reliably again.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Expert Charging Port Repair
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}