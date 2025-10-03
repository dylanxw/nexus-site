"use client";

import { Wrench, Zap, Camera, Gauge, BatteryLow, Radio } from "lucide-react";

const repairs = [
  {
    id: 1,
    icon: Wrench,
    title: "Crash Damage Repair",
    description: "Professional repair for crash damage including frame, body, and component replacement.",
    price: "$89-$349",
    timeframe: "2-4 hours"
  },
  {
    id: 2,
    icon: Zap,
    title: "Propeller Replacement",
    description: "High-quality propeller replacement for improved flight performance and stability.",
    price: "$29-$79",
    timeframe: "30 minutes"
  },
  {
    id: 3,
    icon: Camera,
    title: "Camera & Gimbal Repair",
    description: "Expert camera and gimbal repair for crystal clear photos and smooth video recording.",
    price: "$149-$399",
    timeframe: "2-6 hours"
  },
  {
    id: 4,
    icon: Gauge,
    title: "Motor Replacement",
    description: "Professional motor replacement to restore flight performance and stability.",
    price: "$99-$199",
    timeframe: "1-3 hours"
  },
  {
    id: 5,
    icon: BatteryLow,
    title: "Battery Issues",
    description: "Battery diagnosis, replacement, and charging system repair for extended flight time.",
    price: "$69-$159",
    timeframe: "1-2 hours"
  },
  {
    id: 6,
    icon: Radio,
    title: "Remote Controller Repair",
    description: "Remote controller repair including joysticks, buttons, and connectivity issues.",
    price: "$79-$179",
    timeframe: "1-3 hours"
  }
];

export function CommonDroneRepairs() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-blue-500/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-green-500/3 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Common Drone Repairs in Denton, TX
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert drone repair services for all types of damage. Same-day service with 60-day warranty on all repairs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repairs.map((repair, index) => {
            const Icon = repair.icon;
            return (
              <div
                key={repair.id}
                style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 hover:bg-white/80 hover:shadow-xl group relative overflow-hidden flex flex-col h-full"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#DB5858]/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#DB5858]/20" style={{ transition: 'background-color 0.3s ease' }}>
                      <Icon className="h-6 w-6 text-[#DB5858]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#DB5858]" style={{ transition: 'color 0.3s ease' }}>
                        {repair.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-[#DB5858] font-semibold">{repair.price}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-500">{repair.timeframe}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                    {repair.description}
                  </p>

                  <button
                    className="w-full py-2 px-4 bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white rounded-lg font-semibold transition-all duration-300 text-sm shadow-lg hover:shadow-xl mt-auto"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/80 hover:shadow-xl transition-all duration-300">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <p className="text-lg font-semibold mb-2 text-gray-900">
                Don't see your drone repair listed? We fix all drone brands and models!
              </p>
              <p className="text-gray-600 text-sm mb-6">
                Call now for a free diagnostic and custom repair quote for your specific drone issue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <a
                  href="tel:940-600-1012"
                  className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                >
                  Call Now
                </a>
                <button className="backdrop-blur-md bg-white/40 border border-white/60 text-gray-800 hover:bg-white/60 hover:border-white/80 py-3 px-6 rounded-lg font-semibold transition-all duration-300">
                  Free Diagnostic
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}