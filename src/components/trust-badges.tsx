"use client";

import { motion } from "framer-motion";
import { Star, Wrench, Shield, Clock } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      id: 1,
      icon: Star,
      number: "150+",
      text: "5 Star Reviews",
      color: "text-yellow-500"
    },
    {
      id: 2,
      icon: Wrench,
      number: "5,000+",
      text: "Devices Repaired",
      color: "text-[#DB5858]"
    },
    {
      id: 3,
      icon: Shield,
      number: "Lifetime",
      text: "Warranty Included",
      color: "text-green-500"
    },
    {
      id: 4,
      icon: Clock,
      number: "Same Day",
      text: "Service Available",
      color: "text-blue-500"
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="wide-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="flex flex-col items-center space-y-3">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${badge.color === 'text-[#DB5858]' ? 'group-hover:bg-[#DB5858]/10' : badge.color === 'text-yellow-500' ? 'group-hover:bg-yellow-50' : badge.color === 'text-green-500' ? 'group-hover:bg-green-50' : 'group-hover:bg-blue-50'}`}>
                    <Icon className={`h-8 w-8 ${badge.color}`} />
                  </div>

                  {/* Number */}
                  <div className="space-y-1">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-[#DB5858] transition-colors duration-300">
                      {badge.number}
                    </h3>
                    <p className="text-sm lg:text-base text-gray-600 font-medium">
                      {badge.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}