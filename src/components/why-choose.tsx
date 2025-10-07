"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Wrench, Zap, Sparkles, Search, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "60-Day Warranty",
    description: "Our commitment to customer satisfaction is exemplified by the 60-day warranty we provide on newly installed screens for phones, iPhones, and tablets.",
    mobileDescription: "60-day warranty on all screen repairs for phones and tablets.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100"
  },
  {
    icon: Wrench,
    title: "Expert Technicians",
    description: "Our expert technicians possess technical prowess and industry know-how, delivering seamless phone repairs that restore devices to full functionality.",
    mobileDescription: "Skilled technicians delivering seamless repairs that restore full functionality.",
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100"
  },
  {
    icon: Zap,
    title: "Same Day Repair",
    description: "Our Phone Repair Technicians use advanced technology for quick and convenient restoration, minimizing downtime and maximizing convenience.",
    mobileDescription: "Advanced technology for quick repairs, minimizing your downtime.",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100"
  },
  {
    icon: Sparkles,
    title: "High Quality Parts",
    description: "With genuine mobile phone parts and skilled repairs, we ensure high-quality service. Your Damaged Phone won't be fixed with faulty components.",
    mobileDescription: "Genuine parts and skilled repairs ensure high-quality service.",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100"
  },
  {
    icon: Search,
    title: "Free Diagnostic",
    description: "Get a tech-savvy diagnosis of your device issues with our free diagnostic service. Our skilled technicians will identify and provide expert recommendations.",
    mobileDescription: "Free tech diagnosis with expert recommendations for your device.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100"
  },
  {
    icon: MessageCircle,
    title: "Customer Support",
    description: "Nexus Tech Solutions is dedicated to providing the best cell phone repair in Albuquerque, ensuring your satisfaction every step of the way.",
    mobileDescription: "Dedicated to your satisfaction at every step of the repair process.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100"
  }
];

export function WhyChoose() {
  return (
    <section className="bg-white" style={{ paddingTop: '80px' }}>
      {/* Banner Section */}
      <div className="wide-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative rounded-lg overflow-hidden h-56 md:h-64">
            {/* Background Image with Parallax Effect */}
            <div
              className="absolute inset-0 bg-cover bg-fixed"
              style={{
                backgroundImage: "url('/images/why choose us/nexus-storefront-phones-image.jpg')",
                backgroundPosition: "center 5%"
              }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-center">
              <div className="w-full px-4 md:px-6">
                <div className="text-center text-white">
                    <h2 className="text-xl md:text-3xl font-bold tracking-tight mb-3 md:mb-4 leading-tight">
                      Why <span style={{color: '#DB5858'}}>Nexus Tech Solutions</span> for Your Phone Repairs in Denton, TX
                    </h2>
                  {/* Mobile text - shorter */}
                  <p className="text-xs leading-relaxed text-white/90 mb-2 md:hidden">
                    Premium tools and parts for efficient, quality repairs.
                  </p>
                  <p className="text-[10px] leading-relaxed text-white/80 md:hidden">
                    Here's why customers choose us:
                  </p>
                  {/* Desktop text - full */}
                  <p className="hidden md:block text-base text-white/90 mb-3 leading-relaxed">
                    Our well-equipped Cell Phone Repair Service ensures efficient repairs using premium tools, equipment, and parts.
                  </p>
                  <p className="hidden md:block text-sm text-white/80 leading-relaxed">
                    Here are the reasons to choose us for your Cell Phone Repair needs:
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feature Cards Section */}
      <div className="section-padding bg-white">
        <div className="wide-container">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 -mt-16 pt-6 lg:pt-0">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 p-4 lg:p-6 group h-full flex flex-col">
                  {/* Icon and Content */}
                  <div className="flex flex-col lg:flex-row items-start gap-3 lg:gap-4 h-full">
                    {/* Icon - centered on mobile, left on desktop */}
                    <div className={`w-12 h-12 rounded-lg ${feature.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0 mx-auto lg:mx-0`}>
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 text-center lg:text-left flex flex-col">
                      <CardHeader className="p-0 mb-2">
                        <CardTitle className="text-sm lg:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 leading-tight">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 flex-1">
                        {/* Mobile description - shorter */}
                        <p className="text-gray-600 text-xs leading-snug lg:hidden">
                          {feature.mobileDescription}
                        </p>
                        {/* Desktop description - full */}
                        <p className="text-gray-600 text-sm leading-relaxed hidden lg:block">
                          {feature.description}
                        </p>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}