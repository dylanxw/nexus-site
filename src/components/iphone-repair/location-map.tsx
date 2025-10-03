"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail, Car, Navigation } from "lucide-react";
import { siteConfig } from "@/config/site";

export function LocationMap() {
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
            Visit Our iPhone Repair Shop in <span className="text-[#DB5858]">Denton, TX</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conveniently located in Denton, Texas. Bring your iPhone in for same-day repair service or free diagnostic.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#DB5858]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[#DB5858]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Store Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {siteConfig.address.street}<br />
                    {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                  </p>
                  <a
                    href={siteConfig.maps.embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-3 text-[#DB5858] hover:text-[#c94848] font-semibold"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#DB5858]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-[#DB5858]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Store Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monday–Friday</span>
                      <span className="font-semibold text-gray-900">10:00 AM–6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-semibold text-gray-900">12:00–6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-semibold text-gray-900">Closed</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                      <strong>Walk-ins welcome!</strong> Most iPhone repairs completed while you wait.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#DB5858]" />
                  <a href={`tel:${siteConfig.phone}`} className="text-gray-900 hover:text-[#DB5858] font-semibold">
                    {siteConfig.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#DB5858]" />
                  <a href={`mailto:${siteConfig.email}`} className="text-gray-900 hover:text-[#DB5858]">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Parking Info */}
            <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Easy Parking</h3>
                  <p className="opacity-90">
                    Free parking available right in front of our store. Easy access for quick iPhone repair drop-offs and pickups.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                {/* Google Maps Embed */}
                {siteConfig.maps.embedUrl ? (
                  <iframe
                    src={siteConfig.maps.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Nexus Tech Solutions Location"
                    className="rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Map will be displayed here</p>
                      <p className="text-sm">Google Maps integration needed</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Map Caption */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Click map to open in Google Maps for detailed directions
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <a
                href={`tel:${siteConfig.phone}`}
                className="bg-[#DB5858] hover:bg-[#c94848] text-white p-4 rounded-xl text-center font-semibold transition-colors"
              >
                <Phone className="h-5 w-5 mx-auto mb-2" />
                Call Now
              </a>
              <a
                href={siteConfig.maps.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 hover:bg-gray-800 text-white p-4 rounded-xl text-center font-semibold transition-colors"
              >
                <Navigation className="h-5 w-5 mx-auto mb-2" />
                Directions
              </a>
            </div>
          </motion.div>
        </div>

        {/* Service Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Serving iPhone Repair Customers Throughout North Texas
            </h3>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              While our shop is located in Denton, we serve iPhone repair customers from surrounding areas including Lewisville,
              Flower Mound, Highland Village, Corinth, Lake Dallas, and throughout the Dallas-Fort Worth metroplex.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {["Denton", "Lewisville", "Flower Mound", "Highland Village", "Corinth", "Lake Dallas", "Little Elm", "Frisco"].map((city) => (
                <span key={city} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}