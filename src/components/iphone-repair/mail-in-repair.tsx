"use client";

import { motion } from "framer-motion";
import { Package, Truck, Wrench, CheckCircle, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: 1,
    icon: Package,
    title: "Pack & Ship",
    description: "Securely package your iPhone and ship it to our Denton repair facility using our prepaid shipping label."
  },
  {
    id: 2,
    icon: Wrench,
    title: "Expert Repair",
    description: "Our certified technicians diagnose and repair your iPhone using genuine parts and professional tools."
  },
  {
    id: 3,
    icon: Truck,
    title: "Ship Back",
    description: "We'll ship your fully repaired iPhone back to you with tracking and insurance included."
  }
];

export function MailInRepair() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="wide-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            Can't Visit Our Store? <span className="text-[#DB5858]">Mail-In Repair</span> Available
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Live outside Denton, TX? No problem! Our secure mail-in repair service lets you get expert iPhone repair from anywhere in the US.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
              >
                {/* Connection line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2 z-0">
                    <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full"></div>
                  </div>
                )}

                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10 group border border-gray-200 text-center">
                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#DB5858] text-white rounded-full text-xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#DB5858]/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-[#DB5858]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#DB5858] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Mail-In Repair Benefits</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Free Shipping Both Ways</h4>
                  <p className="text-gray-600 text-sm">We provide prepaid shipping labels for sending and returning your device</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Secure Packaging</h4>
                  <p className="text-gray-600 text-sm">Professional packaging ensures your iPhone arrives safely at our facility</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Same Quality Service</h4>
                  <p className="text-gray-600 text-sm">Same expert technicians, genuine parts, and 60-day warranty as in-store repairs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Tracking & Updates</h4>
                  <p className="text-gray-600 text-sm">Get updates throughout the repair process and tracking for return shipment</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Turnaround Times */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-gradient-to-br from-[#DB5858] to-[#c94848] rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-6">Typical Turnaround Times</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Screen Replacement: 1-2 Business Days</h4>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Battery Replacement: 1 Business Day</h4>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Water Damage Repair: 2-3 Business Days</h4>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Complex Repairs: 3-5 Business Days</h4>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">All repairs include 60-day warranty</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Mail-In Repair?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contact us to get started with your mail-in iPhone repair. We'll provide a quote, shipping instructions, and tracking information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Button
                size="lg"
                className="flex-1 bg-[#DB5858] hover:bg-[#c94848] text-white py-4 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Mail-In Repair
                <Package className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-2 border-gray-300 hover:border-[#DB5858] hover:text-[#DB5858] py-4 px-8 text-lg font-semibold transition-all duration-300"
              >
                Get Quote First
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}