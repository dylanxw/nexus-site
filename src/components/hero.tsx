"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Phone, Calendar, DollarSign, Shield, Zap, Clock, Star, CheckCircle, ArrowRight, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroProps {
  onScheduleClick: () => void;
  onQuoteClick: () => void;
}

export function Hero({ onScheduleClick, onQuoteClick }: HeroProps) {
  return (
    <section className="relative py-20 lg:py-32 pb-32 lg:pb-40 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-bg.webp"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/75"></div>
      
      {/* Additional decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-3xl"></div>

      <div className="wide-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[600px]">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Trust indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Rating • 150+ Reviews</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-tight">
              <span className="text-white">Fast, reliable electronics repair in</span>{" "}
              <span className="text-gradient bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                Denton, TX
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Phones, tablets, computers & consoles. 60-day repair warranty. Same-day service on most repairs.
            </p>

            {/* CTA Buttons - Inline */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-lg mx-auto lg:mx-0">
              <Button
                size="lg"
                onClick={onQuoteClick}
                className="flex-1 btn-primary brand-shadow text-lg px-8 py-4 h-auto group"
              >
                <DollarSign className="mr-3 h-5 w-5" />
                Get Repair Estimate →
              </Button>
              <Button 
                size="lg" 
                asChild 
                variant="outline" 
                className="flex-1 btn-outline text-lg px-8 py-4 h-auto"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="mr-3 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>

            {/* Feature badges - Small badges like ZipZap */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-primary/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                60-Day Warranty
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Same-Day Service
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Local & Independent
              </div>
            </div>
          </motion.div>

          {/* Right side - Store image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero/nexus-storefront-image.jpeg"
                alt="Nexus Tech Solutions storefront"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Trust Badges Section - Desktop Only */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute -bottom-32 left-0 right-0 hidden lg:block"
        >
          <div className="wide-container">
            <div className="grid grid-cols-4 gap-4">
            {/* 150+ 5 Star Reviews */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3 text-center hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
              <div className="relative z-10">
                <Star className="h-6 w-6 text-yellow-400 mx-auto mb-1 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-0.5">150+</h3>
                <p className="text-xs text-white/80 font-medium">5 Star Reviews</p>
              </div>
            </div>

            {/* 5,000+ Devices Repaired */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3 text-center hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
              <div className="relative z-10">
                <Wrench className="h-6 w-6 text-[#DB5858] mx-auto mb-1 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-0.5">5,000+</h3>
                <p className="text-xs text-white/80 font-medium">Devices Repaired</p>
              </div>
            </div>

            {/* 60-Day Warranty */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3 text-center hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
              <div className="relative z-10">
                <Shield className="h-6 w-6 text-green-400 mx-auto mb-1 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-0.5">60-Day</h3>
                <p className="text-xs text-white/80 font-medium">Warranty Included</p>
              </div>
            </div>

            {/* Same Day Service */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3 text-center hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
              <div className="relative z-10">
                <Clock className="h-6 w-6 text-blue-400 mx-auto mb-1 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-0.5">Same Day</h3>
                <p className="text-xs text-white/80 font-medium">Service Available</p>
              </div>
            </div>
          </div>
        </div>
        </motion.div>

      </div>
    </section>
  );
}