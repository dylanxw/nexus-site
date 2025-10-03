"use client";

import { motion } from "framer-motion";
import { Shield, Award, CheckCircle, AlertTriangle, Package, Zap } from "lucide-react";

export function GenuineParts() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
              We Use Only <span className="text-[#DB5858]">Genuine Parts</span> for Your iPhone
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Quality matters when it comes to iPhone repairs. That's why we exclusively use genuine, high-quality parts that meet or exceed Apple's original specifications.
            </p>

            {/* Quality Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Original Quality Standards</h4>
                  <p className="text-gray-600 text-sm">All parts meet or exceed Apple's original manufacturing specifications</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Perfect Compatibility</h4>
                  <p className="text-gray-600 text-sm">Guaranteed compatibility with all iPhone functions and features</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Long-Lasting Durability</h4>
                  <p className="text-gray-600 text-sm">Genuine parts last longer and perform better than cheap alternatives</p>
                </div>
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-orange-800 mb-1">Beware of Cheap Parts</h4>
                  <p className="text-orange-700 text-sm">
                    Many repair shops use low-quality, aftermarket parts to cut costs. These parts often fail quickly,
                    have poor performance, and can even damage your iPhone further.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Parts Quality Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-6"
          >
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Parts We Never Compromise On</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-[#DB5858]/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-[#DB5858]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">iPhone Screens</h4>
                    <p className="text-sm text-gray-600">Original OLED/LCD displays with perfect color accuracy</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-[#DB5858]/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-[#DB5858]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Batteries</h4>
                    <p className="text-sm text-gray-600">Genuine capacity batteries with proper charging cycles</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-[#DB5858]/10 rounded-lg flex items-center justify-center">
                    <Package className="h-5 w-5 text-[#DB5858]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Camera Modules</h4>
                    <p className="text-sm text-gray-600">Original camera sensors with full functionality</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-[#DB5858]/10 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-[#DB5858]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Internal Components</h4>
                    <p className="text-sm text-gray-600">Certified charging ports, speakers, and sensors</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison */}
            <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 text-center">Genuine vs. Aftermarket Parts</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 text-green-100">✓ Genuine Parts</h4>
                  <ul className="space-y-1 opacity-90">
                    <li>• Perfect fit and function</li>
                    <li>• Original performance</li>
                    <li>• Long-lasting durability</li>
                    <li>• Full warranty coverage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-red-200">✗ Cheap Aftermarket</h4>
                  <ul className="space-y-1 opacity-90">
                    <li>• Poor fit and quality</li>
                    <li>• Reduced performance</li>
                    <li>• Quick failure rates</li>
                    <li>• No real warranty</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Quality You Can Trust
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We stand behind our genuine parts with a 60-day warranty. If you're not completely satisfied with the quality
              and performance of our repair, we'll make it right at no additional cost.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-[#DB5858] text-white rounded-lg font-semibold hover:bg-[#c94848] transition-colors">
              <Shield className="mr-2 h-5 w-5" />
              60-Day Parts & Labor Warranty
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}