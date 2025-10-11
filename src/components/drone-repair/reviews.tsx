"use client";

import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Jake M.",
    device: "DJI Mavic Air 2",
    text: "Crashed my Mavic Air 2 into a tree and thought it was done for. They repaired the gimbal and camera perfectly - now it shoots better than before! Amazing drone repair service.",
    rating: 5,
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Sarah L.",
    device: "DJI Mini 3 Pro",
    text: "My Mini 3 Pro's propellers were damaged after a hard landing. Same-day propeller replacement and thorough inspection. Excellent service and fair pricing!",
    rating: 5,
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Mike T.",
    device: "Autel EVO Lite+",
    text: "Battery wouldn't hold a charge on my Autel drone. They diagnosed and replaced it quickly. Back to getting amazing aerial footage! Highly recommend.",
    rating: 5,
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "Lisa K.",
    device: "DJI Phantom 4 Pro",
    text: "Remote controller joystick was drifting badly on my Phantom 4 Pro. They fixed it perfectly and explained what caused the issue. Professional drone repair!",
    rating: 5,
    date: "1 week ago"
  }
];

export function DroneRepairReviews() {
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
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-4 text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Real reviews from real customers who trust us with their drone repairs in Denton, TX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col h-full"
            >
              {/* Glass shine animation */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Stars */}
                <div className="flex items-center mb-3 lg:mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <div className="relative mb-3 lg:mb-4 flex-grow">
                  <Quote className="absolute -top-2 -left-2 h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]/20" />
                  <p className="text-gray-700 leading-relaxed pl-4 text-xs lg:text-base">
                    {review.text}
                  </p>
                </div>

                {/* Customer Info */}
                <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-gray-200/50">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm lg:text-base">{review.name}</p>
                    <p className="text-xs lg:text-sm text-gray-600">{review.device}</p>
                  </div>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 lg:mt-12">
          <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-xl lg:rounded-2xl p-6 lg:p-8 text-white">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">
              Join Our Satisfied Drone Repair Customers
            </h3>
            <p className="text-sm lg:text-base xl:text-lg mb-4 lg:mb-6 opacity-90 max-w-2xl mx-auto">
              Experience the same quality drone repair service that has earned us 150+ five-star reviews in Denton, TX.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center max-w-lg mx-auto">
              <button className="bg-white text-[#DB5858] px-6 py-2 lg:px-8 lg:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm lg:text-base">
                Get Your Free Quote
              </button>
              <button className="border-2 border-white text-white px-6 py-2 lg:px-8 lg:py-3 rounded-lg font-semibold hover:bg-white hover:text-[#DB5858] transition-colors text-sm lg:text-base">
                Read More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}