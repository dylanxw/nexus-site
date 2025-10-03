"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Gamepad2 } from "lucide-react";

const consoleModels = [
  {
    id: 1,
    title: "PlayStation Console Repair (All Models)",
    keywords: "PlayStation repair Denton TX, PS5 repair, PS4 repair, PS3 repair, PlayStation overheating, PlayStation HDMI repair",
    description: "Expert PlayStation console repair for all models including PS5, PS4 Pro/Slim, PS3 Super Slim/Slim/Fat, PS2, and original PlayStation. We repair HDMI ports, overheating issues, disc drives, power supplies, and controller connectivity problems.",
    services: ["PlayStation HDMI port repair", "PS5/PS4 overheating repair", "PlayStation disc drive repair", "Power supply replacement", "DualSense/DualShock controller repair", "PlayStation network connectivity", "System software issues", "Blue light of death repair"]
  },
  {
    id: 2,
    title: "Xbox Console Repair (All Models)",
    keywords: "Xbox repair Denton TX, Xbox Series X repair, Xbox Series S repair, Xbox One repair, Xbox 360 repair, Xbox overheating",
    description: "Professional Xbox console repair for all models including Xbox Series X/S, Xbox One X/S/original, Xbox 360 Elite/Slim/Arcade, and original Xbox. We specialize in HDMI repairs, overheating solutions, disc drive issues, and power problems.",
    services: ["Xbox HDMI port repair", "Xbox overheating repair", "Xbox disc drive replacement", "Xbox power supply repair", "Xbox controller connectivity", "Red ring of death repair", "Xbox network issues", "System update problems"]
  },
  {
    id: 3,
    title: "Nintendo Console Repair (All Models)",
    keywords: "Nintendo repair Denton TX, Nintendo Switch repair, Nintendo Switch OLED repair, Nintendo 3DS repair, Wii U repair, Nintendo controller repair",
    description: "Complete Nintendo console repair for all models including Nintendo Switch OLED/Lite/original, Nintendo 3DS XL/2DS, Wii U, Wii, GameCube, and retro Nintendo systems. We handle Joy-Con drift, screen repairs, charging issues, and game card slot problems.",
    services: ["Nintendo Switch Joy-Con drift repair", "Nintendo Switch screen replacement", "Nintendo Switch charging port repair", "Nintendo 3DS hinge repair", "Nintendo game card slot repair", "Nintendo controller analog stick repair", "Nintendo system software issues", "Nintendo network connectivity"]
  },
  {
    id: 4,
    title: "Gaming PC & Steam Deck Repair",
    keywords: "gaming PC repair Denton TX, Steam Deck repair, gaming computer overheating, graphics card repair, gaming laptop repair",
    description: "Specialized gaming PC and portable gaming device repair including Steam Deck, gaming laptops, custom gaming rigs, and VR systems. We repair overheating issues, graphics card problems, power supply failures, and performance optimization.",
    services: ["Gaming PC overheating repair", "Graphics card replacement", "Gaming PC power supply repair", "Steam Deck screen repair", "Gaming laptop keyboard repair", "VR headset repair", "Gaming performance optimization", "Custom gaming PC assembly"]
  },
  {
    id: 5,
    title: "Retro Gaming Console Repair",
    keywords: "retro gaming repair Denton TX, vintage console repair, Sega repair, Atari repair, classic Nintendo repair, retro gaming restoration",
    description: "Retro and vintage gaming console repair for classic systems including Sega Genesis/Saturn/Dreamcast, Atari systems, classic Nintendo NES/SNES, Neo Geo, and other vintage gaming consoles. We specialize in restoration and preservation.",
    services: ["Retro console restoration", "Vintage console capacitor replacement", "Classic console cartridge slot repair", "Retro console AV output repair", "Vintage controller repair", "Classic console power supply repair", "Retro console cleaning service", "Vintage gaming system preservation"]
  }
];

export function GameConsoleModels() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-8 w-40 h-40 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 left-8 w-48 h-48 bg-[#DB5858]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-400/3 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      <div className="wide-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            We Repair All Gaming Console Models
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From the latest PlayStation 5 and Xbox Series X to classic retro consoles, our certified technicians repair all gaming systems with quality parts and expert service.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-4">
            {consoleModels.map((model, index) => (
              <div
                key={model.id}
                style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl shadow-lg hover:bg-white/80 hover:shadow-xl group relative overflow-hidden"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <button
                  onClick={() => toggleItem(model.id)}
                  className="w-full p-6 text-left flex items-center justify-between rounded-2xl transition-colors duration-300 group relative z-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DB5858] to-[#c94848] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Gamepad2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-[#DB5858] transition-colors">
                        {model.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Expert repair for all models in this series</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                      openItem === model.id ? "transform rotate-180 text-[#DB5858]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openItem === model.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-white/40 pt-6">
                          <p className="text-gray-600 leading-relaxed mb-6">
                            {model.description}
                          </p>

                          <h4 className="font-semibold text-gray-900 mb-3">Common Repair Services:</h4>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {model.services.map((service, serviceIndex) => (
                              <div key={serviceIndex} className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-[#DB5858] rounded-full mr-2 flex-shrink-0" />
                                {service}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 shadow-lg hover:bg-white/80 transition-all duration-300 group relative overflow-hidden">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Don't See Your Gaming Console Listed?
              </h3>
              <p className="text-lg mb-6 text-gray-600">
                We repair all gaming consoles, including rare and discontinued systems. Call us for a free diagnostic on any gaming device.
              </p>
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Free Diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}