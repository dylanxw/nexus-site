"use client";

import { Clock, Shield, CheckCircle, Star, Users, Wrench } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Clock,
    title: "Same-Day Service",
    description: "Most drone repairs completed within 2-4 hours. Get your drone back in the air fast with our priority repair service."
  },
  {
    id: 2,
    icon: Shield,
    title: "60-Day Warranty",
    description: "All drone repairs come with a comprehensive 60-day warranty. Fly with confidence knowing your repair is guaranteed."
  },
  {
    id: 3,
    icon: CheckCircle,
    title: "Quality Parts",
    description: "We use only genuine OEM and high-quality aftermarket parts for all drone repairs. No cheap knockoffs, ever."
  },
  {
    id: 4,
    icon: Star,
    title: "Expert Technicians",
    description: "Our certified drone technicians have years of experience repairing all major drone brands and models."
  },
  {
    id: 5,
    icon: Users,
    title: "Local & Trusted",
    description: "Family-owned business serving Denton, TX for years. We're your neighbors, and your satisfaction is our priority."
  },
  {
    id: 6,
    icon: Wrench,
    title: "All Brands",
    description: "From DJI and Autel to custom builds - we repair all drone brands and models with the same expertise and care."
  }
];

export function WhyChooseDrone() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-4 text-gray-900">
            Why Choose Our Drone Repair Service?
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            The drone doctors of Denton! Professional drone repair with unmatched quality, speed, and customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="mb-4 lg:mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-[#DB5858]/10 rounded-xl lg:rounded-2xl mb-3 lg:mb-4 group-hover:bg-[#DB5858]/20 transition-colors duration-300">
                    <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-[#DB5858]" />
                  </div>
                  <h3 className="text-base lg:text-xl font-bold mb-2 lg:mb-3 text-gray-900 group-hover:text-[#DB5858] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-xs lg:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 lg:mt-16">
          <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200">
            <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-gray-900">
              Ready to Get Your Drone Fixed?
            </h3>
            <p className="text-sm lg:text-base xl:text-lg text-gray-600 mb-4 lg:mb-6 max-w-2xl mx-auto">
              Don't let a broken drone keep you grounded. Our expert technicians will have you back in the air in no time!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center max-w-md mx-auto">
              <a
                href="tel:940-600-1012"
                className="flex-1 bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white py-2 lg:py-3 px-4 lg:px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center text-sm lg:text-base"
              >
                Call Now
              </a>
              <button className="flex-1 bg-white border-2 border-[#DB5858] text-[#DB5858] hover:bg-[#DB5858] hover:text-white py-2 lg:py-3 px-4 lg:px-6 rounded-lg font-semibold transition-all duration-300 text-sm lg:text-base">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}