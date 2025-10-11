"use client";

import { Smartphone, CheckCircle } from "lucide-react";

const screenRepairModels = [
  {
    category: "iPhone 17 Series",
    models: ["iPhone 17", "iPhone 17 Air", "iPhone 17 Pro", "iPhone 17 Pro Max"],
    price: "From $199",
    features: ["Advanced Super Retina XDR", "Next-gen Ceramic Shield", "USB-C optimized", "OEM Original & genuine screen replacements available"],
    description: "Latest iPhone 17 series screen replacement with next-generation display technology and enhanced durability."
  },
  {
    category: "iPhone 16 Series",
    models: ["iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max"],
    price: "From $129",
    features: ["Super Retina XDR OLED", "Enhanced Ceramic Shield", "USB-C integration", "OEM Original & genuine screen replacements available"],
    description: "Professional iPhone 16 series screen replacement with improved display technology and USB-C compatibility."
  },
  {
    category: "iPhone 15 Series",
    models: ["iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max"],
    price: "From $99",
    features: ["Super Retina XDR OLED", "Ceramic Shield", "USB-C compatible", "OEM Original & genuine screen replacements available"],
    description: "iPhone 15 series screen replacement with titanium-compatible parts and USB-C integration."
  },
  {
    category: "iPhone 14 Series",
    models: ["iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max"],
    price: "From $95",
    features: ["Super Retina XDR OLED", "ProMotion (Pro models)", "Always-On Display (Pro)", "OEM Original & genuine screen replacements available"],
    description: "Professional iPhone 14 screen repair with ProMotion display technology and Dynamic Island support."
  },
  {
    category: "iPhone 13 Series",
    models: ["iPhone 13", "iPhone 13 Mini", "iPhone 13 Pro", "iPhone 13 Pro Max"],
    price: "From $89",
    features: ["Super Retina XDR OLED", "Ceramic Shield", "ProMotion (Pro models)", "OEM Original & genuine screen replacements available"],
    description: "Expert iPhone 13 screen replacement including ProMotion 120Hz displays for Pro models."
  },
  {
    category: "iPhone 12 Series",
    models: ["iPhone 12", "iPhone 12 Mini", "iPhone 12 Pro", "iPhone 12 Pro Max"],
    price: "From $85",
    features: ["Super Retina XDR OLED", "Ceramic Shield", "5G compatible", "OEM Original & genuine screen replacements available"],
    description: "iPhone 12 OLED screen repair with Ceramic Shield technology and 5G antenna preservation."
  },
  {
    category: "iPhone 11 Series & Earlier",
    models: ["iPhone 11", "iPhone 11 Pro", "iPhone XS", "iPhone XR", "iPhone X", "iPhone 8", "iPhone 7"],
    price: "From $79",
    features: ["LCD/OLED displays", "3D Touch (select models)", "Face ID/Touch ID", "OEM Original & genuine screen replacements available"],
    description: "Complete screen repair for iPhone 11 and earlier models including LCD and OLED display types."
  }
];

export function ScreenRepairModels() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-8 w-40 h-40 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 left-8 w-48 h-48 bg-[#DB5858]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-6 text-gray-900">
            iPhone Screen Replacement by Model
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional screen replacement for all iPhone models with model-specific parts and expert installation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {screenRepairModels.map((modelGroup, index) => (
            <div
              key={modelGroup.category}
              style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
              className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:bg-white/80 hover:shadow-xl group relative overflow-hidden flex flex-col h-full"
            >
              {/* Glass shine animation */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3 lg:mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-gradient-to-br from-[#DB5858] to-[#c94848] flex items-center justify-center shadow-lg">
                    <Smartphone className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base lg:text-xl font-bold text-gray-900">{modelGroup.category}</h3>
                    <p className="text-sm lg:text-lg font-bold text-[#DB5858]">{modelGroup.price}</p>
                  </div>
                </div>

                <div className="mb-3 lg:mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-xs lg:text-sm">Compatible Models:</h4>
                  <div className="flex flex-wrap gap-1">
                    {modelGroup.models.map((model, modelIndex) => (
                      <span
                        key={modelIndex}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4 leading-relaxed">
                  {modelGroup.description}
                </p>

                <div className="mb-4 lg:mb-6 flex-grow">
                  <h4 className="font-semibold text-gray-900 mb-2 text-xs lg:text-sm">Screen Features:</h4>
                  <div className="space-y-1">
                    {modelGroup.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-xs lg:text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-2.5 lg:py-3 px-4 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl mt-auto">
                  Get Quote for {modelGroup.category}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}