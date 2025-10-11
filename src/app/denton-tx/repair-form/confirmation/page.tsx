"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Calendar, Clock, Phone, Home } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function RepairConfirmationPage() {
  const searchParams = useSearchParams();

  // TODO: In the future, fetch actual booking details from API using booking ID
  // For now, we'll show a generic confirmation message

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="wide-container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Success Header */}
          <div className="text-center mb-6 lg:mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full mb-4 lg:mb-6"
            >
              <CheckCircle className="w-10 h-10 lg:w-12 lg:h-12 text-green-600" />
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 lg:mb-4">
              Appointment Confirmed!
            </h1>
            <p className="text-base lg:text-xl text-muted-foreground">
              We've sent a confirmation email with all the details
            </p>
          </div>

          {/* Confirmation Card */}
          <Card className="shadow-xl border-0 mb-6 lg:mb-8">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 text-center">What to Expect</h2>

              <div className="space-y-4 lg:space-y-6">
                {/* Location */}
                <div className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base lg:text-lg mb-1 lg:mb-2">Visit Our Store</h3>
                    <p className="text-sm lg:text-base text-gray-600 mb-2">
                      {siteConfig.name}<br />
                      {siteConfig.address.street}<br />
                      {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 underline text-xs lg:text-sm font-medium"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                {/* What to Bring */}
                <div className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base lg:text-lg mb-1 lg:mb-2">What to Bring</h3>
                    <ul className="text-sm lg:text-base text-gray-600 space-y-0.5 lg:space-y-1">
                      <li>• Your device and any accessories</li>
                      <li>• Charger or charging cable (if available)</li>
                      <li>• Photo ID</li>
                      <li>• Passcode or password for your device</li>
                    </ul>
                  </div>
                </div>

                {/* Process */}
                <div className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base lg:text-lg mb-1 lg:mb-2">The Repair Process</h3>
                    <ol className="text-sm lg:text-base text-gray-600 space-y-1 lg:space-y-2">
                      <li>1. Our technician will diagnose the issue</li>
                      <li>2. You'll receive a detailed quote before we proceed</li>
                      <li>3. Most repairs are completed the same day</li>
                      <li>4. We'll notify you when your device is ready</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="mt-6 lg:mt-8 p-4 lg:p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between flex-wrap gap-3 lg:gap-4">
                  <div>
                    <h3 className="font-semibold text-sm lg:text-base mb-1">Need to Reschedule?</h3>
                    <p className="text-xs lg:text-sm text-gray-600">Give us a call and we'll be happy to help</p>
                  </div>
                  <a
                    href={siteConfig.phoneHref}
                    className="flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm lg:text-base"
                  >
                    <Phone className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>{siteConfig.phoneFormatted}</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm lg:text-base">
                <Home className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                Back to Home
              </Button>
            </Link>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full sm:w-auto btn-primary brand-shadow text-sm lg:text-base">
                <MapPin className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                Get Directions
              </Button>
            </a>
          </div>

          {/* Additional Info */}
          <div className="mt-8 lg:mt-12 text-center text-xs lg:text-sm text-gray-500">
            <p>A confirmation email has been sent with all the details.</p>
            <p className="mt-2">
              Questions? Call us at{" "}
              <a href={siteConfig.phoneHref} className="text-primary hover:underline font-medium">
                {siteConfig.phoneFormatted}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
