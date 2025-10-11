"use client";

import { Search, Wrench, TestTube, CheckCircle } from "lucide-react";

const processSteps = [
  {
    step: 1,
    icon: Search,
    title: "Free Diagnosis",
    description: "We examine your iPhone screen to assess damage and determine the exact repair needed.",
    time: "5 minutes"
  },
  {
    step: 2,
    icon: Wrench,
    title: "Professional Repair",
    description: "Our certified technicians quickly install your choice of screen: Aftermarket, AM Soft OLED, or Genuine Apple.",
    time: "20-30 minutes"
  },
  {
    step: 3,
    icon: TestTube,
    title: "Quality Testing",
    description: "We test all screen functions including touch response, display quality, and Face ID/Touch ID.",
    time: "5-10 minutes"
  },
  {
    step: 4,
    icon: CheckCircle,
    title: "Final Inspection",
    description: "Complete device check and 60-day warranty activation before returning your iPhone.",
    time: "5 minutes"
  }
];

export function ScreenRepairProcess() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-blue-400/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-6 text-gray-900">
            Our iPhone Screen Repair Process
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Fast 30-45 minute screen replacement with multiple quality screen options always in stock and ready to go.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:bg-white/80 hover:shadow-xl group relative overflow-hidden text-center"
              >
                {/* Glass shine animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl mb-3 lg:mb-4 backdrop-blur-sm group-hover:bg-[#DB5858]/20" style={{ transition: 'background-color 0.3s ease' }}>
                    <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
                  </div>

                  <div className="text-xs lg:text-sm font-bold text-[#DB5858] mb-1 lg:mb-2">Step {step.step}</div>
                  <h3 className="text-sm lg:text-lg font-bold mb-2 lg:mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-2 lg:mb-3">{step.description}</p>
                  <div className="text-xs text-gray-500 font-medium">{step.time}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Promise */}
        <div
          style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
          className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 hover:bg-white/80 hover:shadow-xl group relative overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

          <div className="relative z-10 text-center">
            <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-gray-900">
              Why Choose Our Screen Repair Service?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mt-6 lg:mt-8">
              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#DB5858]/10 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3">
                  <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Multiple Screen Options</h4>
                <p className="text-xs lg:text-sm text-gray-600">Choose from Aftermarket, AM Soft OLED, or Genuine Apple screens - all in stock and ready to install.</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#DB5858]/10 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3">
                  <Wrench className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Expert Technicians</h4>
                <p className="text-xs lg:text-sm text-gray-600">Our certified technicians have years of experience with iPhone screen replacements.</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#DB5858]/10 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3">
                  <TestTube className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Thorough Testing</h4>
                <p className="text-xs lg:text-sm text-gray-600">Every repair is tested to ensure full functionality before returning your device.</p>
              </div>
            </div>

            <div className="mt-6 lg:mt-8">
              <button className="bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Schedule Screen Repair
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}