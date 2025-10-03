"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

export function CallFab() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 z-50 lg:hidden"
    >
      <Button
        size="lg"
        asChild
        className="h-16 w-16 rounded-full brand-gradient brand-shadow hover:scale-110 transition-all duration-200 text-white"
      >
        <a href={`tel:${siteConfig.phone}`} aria-label="Call Nexus Tech Solutions">
          <Phone className="h-7 w-7" />
        </a>
      </Button>
    </motion.div>
  );
}