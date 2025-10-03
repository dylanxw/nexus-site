"use client";

import { useState } from "react";
import { Phone, Mail, MessageSquare, Send, User, Smartphone, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission will be implemented later
    console.log("Form submitted:", formData);
  };

  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Have a question or need assistance? Fill out the form below and we'll get back to you within 30 minutes during business hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DB5858] focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DB5858] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Phone and Inquiry Type */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DB5858] focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-2">
                    What can we help you with? *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      id="inquiry"
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DB5858] focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select an option</option>
                      <option value="schedule-repair">Schedule a Repair</option>
                      <option value="buy-device">Buy a Device</option>
                      <option value="sell-device">Sell a Device</option>
                      <option value="warranty-claim">Warranty Claim</option>
                      <option value="job-opportunities">Job Opportunities</option>
                      <option value="other-inquiry">Other Inquiry</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DB5858] focus:border-transparent resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-4 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-none"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </Button>

              <p className="text-sm text-gray-500 text-center">
                We'll respond within 30 minutes during business hours.
              </p>
            </form>
          </div>

          {/* Contact Options */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">
              Prefer to Talk?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Sometimes it's easier to just talk! Call us for instant assistance or visit our store for walk-in service.
            </p>

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Call */}
              <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Phone className="h-8 w-8" />
                  <div>
                    <h3 className="text-xl font-bold">Call for Instant Help</h3>
                    <p className="text-white/90">Available during business hours</p>
                  </div>
                </div>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="block w-full bg-white text-[#DB5858] py-3 px-6 rounded-lg font-bold text-center hover:bg-gray-100 transition-colors text-lg"
                >
                  {siteConfig.phone}
                </a>
              </div>

              {/* Walk-in */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="h-8 w-8 text-[#DB5858]" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Walk-in Service</h3>
                    <p className="text-gray-600">No appointment needed</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Mon-Fri:</span> 10:00 AM - 7:00 PM</p>
                  <p><span className="font-medium">Saturday:</span> 10:00 AM - 6:00 PM</p>
                  <p><span className="font-medium">Sunday:</span> Closed</p>
                  <p className="text-[#DB5858] font-medium">Same-day service available</p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                <div className="space-y-3">
                  {[
                    "Free diagnostic & quote",
                    "60-day warranty on all repairs",
                    "Quality OEM and aftermarket parts",
                    "Expert certified technicians",
                    "Same-day service available",
                    "All payment types accepted"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}