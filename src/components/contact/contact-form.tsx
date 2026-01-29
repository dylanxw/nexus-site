"use client";

import { useState } from "react";
import { Phone, Mail, MessageSquare, Send, User, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
    message: ""
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "Contact Form",
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          inquiryType: formData.inquiry,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit form");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", inquiry: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <section className="section-padding bg-white">
        <div className="wide-container">
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Message Sent Successfully!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for reaching out. We'll get back to you within 30 minutes during business hours.
            </p>
            <Button
              onClick={() => setStatus("idle")}
              className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 lg:mb-6 text-gray-900">
              Contact Us
            </h2>
            <p className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8">
              Have a question or need assistance? Fill out the form below and we'll get back to you within 30 minutes during business hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              {/* Name and Email */}
              <div className="grid md:grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 lg:pl-10 pr-3 lg:pr-4 py-2.5 lg:py-3 border border-gray-300 rounded-lg text-sm lg:text-base focus:ring-2 focus:ring-[#DB5858] focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 lg:pl-10 pr-3 lg:pr-4 py-2.5 lg:py-3 border border-gray-300 rounded-lg text-sm lg:text-base focus:ring-2 focus:ring-[#DB5858] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Phone and Inquiry Type */}
              <div className="grid md:grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-9 lg:pl-10 pr-3 lg:pr-4 py-2.5 lg:py-3 border border-gray-300 rounded-lg text-sm lg:text-base focus:ring-2 focus:ring-[#DB5858] focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="inquiry" className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">
                    What can we help you with? *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                    <select
                      id="inquiry"
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 lg:pl-10 pr-3 lg:pr-4 py-2.5 lg:py-3 border border-gray-300 rounded-lg text-sm lg:text-base focus:ring-2 focus:ring-[#DB5858] focus:border-transparent appearance-none bg-white"
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
                <label htmlFor="message" className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">
                  Message *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full pl-9 lg:pl-10 pr-3 lg:pr-4 py-2.5 lg:py-3 border border-gray-300 rounded-lg text-sm lg:text-base focus:ring-2 focus:ring-[#DB5858] focus:border-transparent resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>
              </div>

              {/* Error Message */}
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="w-full bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-3 px-6 lg:py-4 lg:px-8 text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-none disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 lg:h-5 lg:w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-xs lg:text-sm text-gray-500 text-center">
                We'll respond within 30 minutes during business hours.
              </p>
            </form>
          </div>

          {/* Contact Options */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 lg:mb-6 text-gray-900">
              Prefer to Talk?
            </h2>
            <p className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8">
              Sometimes it's easier to just talk! Call us for instant assistance or visit our store for walk-in service.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4 lg:space-y-6">
              {/* Call */}
              <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white">
                <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                  <Phone className="h-6 w-6 lg:h-8 lg:w-8" />
                  <div>
                    <h3 className="text-base lg:text-xl font-bold">Call for Instant Help</h3>
                    <p className="text-white/90 text-xs lg:text-base">Available during business hours</p>
                  </div>
                </div>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="block w-full bg-white text-[#DB5858] py-2.5 px-4 lg:py-3 lg:px-6 rounded-lg font-bold text-center hover:bg-gray-100 transition-colors text-base lg:text-lg"
                >
                  {siteConfig.phone}
                </a>
              </div>

              {/* Walk-in */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                  <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
                  <div>
                    <h3 className="text-base lg:text-xl font-bold text-gray-900">Walk-in Service</h3>
                    <p className="text-gray-600 text-xs lg:text-base">No appointment needed</p>
                  </div>
                </div>
                <div className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm text-gray-600">
                  <p><span className="font-medium">Mon-Fri:</span> 10:00 AM - 7:00 PM</p>
                  <p><span className="font-medium">Saturday:</span> 1:00 PM - 5:00 PM</p>
                  <p><span className="font-medium">Sunday:</span> Closed</p>
                  <p className="text-[#DB5858] font-medium">Same-day service available</p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4">Why Choose Us?</h3>
                <div className="space-y-2 lg:space-y-3">
                  {[
                    "Free diagnostic & quote",
                    "60-day warranty on all repairs",
                    "Quality OEM and aftermarket parts",
                    "Expert certified technicians",
                    "Same-day service available",
                    "All payment types accepted"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 lg:gap-3">
                      <CheckCircle className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs lg:text-sm text-gray-600">{feature}</span>
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