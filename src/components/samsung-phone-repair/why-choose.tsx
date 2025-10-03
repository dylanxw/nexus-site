"use client";

import { Clock, Shield, Users, Award, Wrench, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Same-Day Service",
    description: "Most Samsung Galaxy repairs completed in 1-2 hours. Walk-in and scheduled appointments available."
  },
  {
    icon: Shield,
    title: "60-Day Warranty",
    description: "All Samsung Galaxy repairs backed by our comprehensive 60-day warranty on parts and labor."
  },
  {
    icon: Award,
    title: "Quality Parts",
    description: "We use only high-quality replacement parts that meet or exceed Samsung's original specifications."
  },
  {
    icon: Users,
    title: "Expert Technicians",
    description: "Certified technicians with specialized training in Samsung Galaxy repair and advanced Android diagnostics."
  },
  {
    icon: Wrench,
    title: "All Galaxy Models",
    description: "We repair all Samsung Galaxy phones: S-series, Note, A-series, Z foldables, M-series, and legacy models."
  },
  {
    icon: CheckCircle,
    title: "Free Diagnostics",
    description: "Comprehensive diagnostic testing at no charge to identify exactly what needs repair on your Galaxy."
  }
];

export function WhyChooseSamsung() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-[#DB5858]/4 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-[#DB5858]/6 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#DB5858]/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">
            Why Choose Nexus Tech for Samsung Galaxy Repair?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            With over 2,800+ Samsung Galaxy phones repaired and a 98% success rate, we're Denton's trusted Samsung repair experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center"
              >
                <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  {/* Glass shine animation */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                  <div className="relative z-10 text-center flex flex-col h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#DB5858]/10 rounded-2xl mb-4 backdrop-blur-sm mx-auto">
                      <Icon className="h-8 w-8 text-[#DB5858]" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 flex-grow">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { number: "2,800+", label: "Galaxy Phones Repaired" },
            { number: "98%", label: "Success Rate" },
            { number: "4.9★", label: "Customer Rating" },
            { number: "60-Day", label: "Warranty" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                <div className="relative z-10">
                  <div className="text-2xl md:text-3xl font-bold text-[#DB5858] mb-2">{stat.number}</div>
                  <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}