"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart, Smartphone, Laptop, Tablet, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export function ShopPreowned() {
  return (
    <section className="section-padding relative" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="wide-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Shop Pre-owned Devices
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Quality refurbished electronics at unbeatable prices. All devices tested and backed by our warranty.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid gap-4 sm:gap-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#DB5858]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-[#DB5858]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Quality Tested</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Every device undergoes comprehensive testing to ensure optimal performance and reliability.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#DB5858]/10 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-[#DB5858]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Wide Selection</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Phones, tablets, laptops, and more from top brands like Apple, Samsung, and Google.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#DB5858]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-[#DB5858]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Warranty Included</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">All pre-owned devices come with our standard warranty for peace of mind.</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button asChild className="w-full sm:w-auto btn-primary py-4 sm:py-5 px-8 sm:px-10 text-lg sm:text-xl font-semibold">
                <Link href="/shop">
                  Browse Our Inventory
                  <ShoppingCart className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/shop-preowned-devices/shop-pre-owned-devices.webp"
                alt="Quality pre-owned devices including smartphones, tablets, and laptops"
                width={600}
                height={400}
                className="w-full h-[400px] object-cover"
              />

              {/* Overlay with price badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent">
                <div className="absolute bottom-6 left-6 bg-[#DB5858] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                  Save up to 50%
                </div>
              </div>
            </div>

            {/* CTA Arrow */}
            <Link href="/shop" className="absolute -bottom-4 -right-4 bg-[#DB5858] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-bounce hover:bg-[#c94848] transition-colors duration-300 group">
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}