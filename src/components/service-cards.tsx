"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  Smartphone,
  Laptop,
  Tablet,
  HardDrive,
  Gamepad2,
  Wrench,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const iconMap = {
  smartphone: Smartphone,
  laptop: Laptop,
  tablet: Tablet,
  harddrive: HardDrive,
  gamepad2: Gamepad2,
  wrench: Wrench,
};

export function ServiceCards() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background with pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/expert-repair-services/expert-repair-services.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        }}
      ></div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/85"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#DB5858]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#DB5858]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#DB5858]/5 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="wide-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 inline-block px-6 py-3 rounded-full text-white" style={{ backgroundColor: 'rgba(219, 88, 88, 0.3)' }}>
            Expert Repair Services
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professional repairs for all your devices with our 60-day warranty guarantee
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 h-full hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
                  {/* Shine effect */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl brand-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-1">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" asChild className="w-full btn-outline py-2 text-sm">
                      <Link href={`/services#${service.id}`}>
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}