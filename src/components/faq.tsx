"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const faqs = [
  {
    id: 1,
    question: "Where can I get my iPhone screen repaired in Denton, TX?",
    answer: "Nexus Tech Solutions is located in Denton, TX and specializes in iPhone screen repairs. We offer same-day service with a 60-day warranty on all screen replacements. Our expert technicians use high-quality parts to ensure your iPhone looks and functions like new."
  },
  {
    id: 2,
    question: "How much does phone screen replacement cost in Denton?",
    answer: "Screen replacement costs vary depending on your device model and the type of screen needed. We offer competitive pricing and provide free quotes before any work begins. Call us or visit our store for an accurate estimate based on your specific device."
  },
  {
    id: 3,
    question: "Is it worth replacing my phone's battery or should I buy a new phone?",
    answer: "If your phone is less than 3-4 years old and the only issue is battery life, replacement is usually the most cost-effective option. A new battery can restore your phone's performance for a fraction of the cost of a new device. We offer free diagnostics to help you make the best decision."
  },
  {
    id: 4,
    question: "Do you offer same-day iPhone repair in Denton, TX?",
    answer: "Yes! We offer same-day repair service for most common iPhone issues including screen replacements, battery replacements, and charging port repairs. Most repairs are completed within 1-2 hours, so you can get back to your day quickly."
  },
  {
    id: 5,
    question: "What's included in your 60-day phone repair warranty?",
    answer: "Our 60-day warranty covers all parts and labor for the specific repair performed. If you experience any issues related to our repair work within 60 days, we'll fix it at no additional cost. This warranty demonstrates our confidence in our quality workmanship."
  },
  {
    id: 6,
    question: "Where can I buy used phones in Denton, TX?",
    answer: "Nexus Tech Solutions offers a selection of quality pre-owned phones that have been thoroughly tested and refurbished. All our used devices come with a warranty and are available for purchase in-store. Visit us to browse our current inventory or call to check availability of specific models."
  },
  {
    id: 7,
    question: "Do you repair PS5 HDMI ports in Denton, TX?",
    answer: "Yes, we specialize in PS5 HDMI port replacements and repairs in Denton, TX. HDMI port damage is one of the most common PS5 issues we see. Our expert technicians can replace damaged HDMI ports and restore your PS5's video output. We also repair Xbox Series X/S HDMI ports and other gaming console connectivity issues."
  },
  {
    id: 8,
    question: "Do you repair other gaming console issues besides HDMI ports?",
    answer: "Absolutely! We repair all types of gaming console problems including disc drive issues, overheating problems, controller port repairs, power supply issues, and fan replacements for PlayStation, Xbox, and Nintendo systems. Bring your console in for a free diagnostic to determine the repair needed."
  },
  {
    id: 9,
    question: "What type of devices do you buy?",
    answer: "We buy most consumer tech devices! This includes phones, laptops, tablets, PCs, smartwatches, drones, gaming consoles, and more. Whether your device is working perfectly or has issues, we'll provide you with a fair quote. Bring your device to our Denton store for an instant evaluation and cash offer."
  }
];

export function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get answers to common questions about our repair services in Denton, TX
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors duration-300 group"
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 pr-3 sm:pr-4 group-hover:text-[#DB5858] transition-colors">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
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
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <div className="border-t border-gray-100 pt-3 sm:pt-4">
                          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
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
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our friendly team is here to help! Give us a call or stop by our store in Denton for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Button
                size="lg"
                asChild
                className="flex-1 bg-[#DB5858] hover:bg-[#c94848] text-white py-4 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call {siteConfig.phone}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-2 border-gray-300 hover:border-[#DB5858] hover:text-[#DB5858] py-4 px-8 text-lg font-semibold transition-all duration-300"
              >
                Get Free Quote
                <MessageSquare className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}