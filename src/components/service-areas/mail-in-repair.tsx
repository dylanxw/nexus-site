"use client";

import { Mail, Package, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function MailInRepair() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Can't Visit Our Store? Try Our Mail-In Repair Service
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Living outside our North Texas service area? No problem! Our secure mail-in repair service is available nationwide with the same quality repairs and warranty coverage.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Mail-In Process */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How Mail-In Repair Works</h3>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  icon: Mail,
                  title: "Get Your Repair Quote",
                  description: "Contact us with your device details and issue description for an instant quote"
                },
                {
                  step: "2",
                  icon: Package,
                  title: "Ship Your Device",
                  description: "Securely package and ship your device using our FREE prepaid shipping label"
                },
                {
                  step: "3",
                  icon: CheckCircle,
                  title: "Expert Repair",
                  description: "Most repairs completed in just 1 business day by our certified technicians"
                },
                {
                  step: "4",
                  icon: ArrowRight,
                  title: "Fast Return Shipping",
                  description: "Receive your fully repaired device back within 3-5 business days total"
                }
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[#DB5858]/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-[#DB5858]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-white bg-[#DB5858] w-6 h-6 rounded-full flex items-center justify-center">
                          {step.step}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900">{step.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mail-In Benefits */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Mail-In Repair Benefits</h3>
              <div className="space-y-4">
                {[
                  "Same 60-day warranty as in-store repairs",
                  "FREE prepaid shipping label provided",
                  "Most repairs completed in 1 business day",
                  "3-5 business day total turnaround time",
                  "Nationwide coverage - ship from anywhere in USA",
                  "Secure packaging and insured shipping",
                  "Quality OEM and aftermarket parts",
                  "Real-time repair status updates"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mail-In CTA Section */}
        <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-8 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="h-8 w-8" />
            <h3 className="text-2xl md:text-3xl font-bold">Ready to Start Your Mail-In Repair?</h3>
          </div>
          <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
            Get your device repaired by our expert technicians from the comfort of your home.
            Same quality service, same warranty - delivered to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Button
              size="lg"
              className="flex-1 bg-white text-[#DB5858] hover:bg-gray-100 py-4 px-8 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Mail-In Repair
            </Button>
            <Button
              size="lg"
              asChild
              className="flex-1 border-2 border-white text-white hover:bg-white hover:text-[#DB5858] py-4 px-8 text-lg font-bold transition-all duration-300"
            >
              <a href={`tel:${siteConfig.phone}`}>
                Call for Quote
              </a>
            </Button>
          </div>
          <p className="text-white/80 text-sm mt-4">
            Mail-in repair page coming soon! Call us today to get started.
          </p>
        </div>

        {/* Device Types */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Mail-In Repair Available For</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "iPhones", "Samsung Phones", "iPads", "Tablets", "MacBooks",
              "Windows Laptops", "Gaming Consoles", "Drones", "Smartwatches"
            ].map((device, index) => (
              <span
                key={device}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                {device}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}