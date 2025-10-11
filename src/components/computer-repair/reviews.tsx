"use client";

import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rachel S.",
    device: "MacBook Pro 13\"",
    rating: 5,
    text: "My MacBook Pro screen was completely cracked and wouldn't display anything. They replaced it with a perfect screen and now it looks brand new. Fast service and fair pricing for MacBook repair!",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Michael K.",
    device: "Dell Laptop",
    rating: 5,
    text: "Dell laptop was running extremely slow and kept freezing. They removed tons of viruses and malware, upgraded to an SSD, and now it runs like a brand new computer. Amazing transformation!",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Jennifer M.",
    device: "Gaming Laptop",
    rating: 5,
    text: "Gaming laptop was overheating and shutting down during games. They cleaned the cooling system and replaced thermal paste. Now it stays cool even during intensive gaming sessions.",
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "David L.",
    device: "HP Laptop",
    rating: 5,
    text: "HP laptop battery died completely and keyboard had several broken keys. They replaced both and it's working perfectly. Great communication throughout the repair process.",
    date: "1 week ago"
  }
];

export function ComputerRepairReviews() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-8 w-40 h-40 bg-[#DB5858]/4 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 left-8 w-48 h-48 bg-[#DB5858]/6 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-yellow-400/3 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-6 text-gray-900">
            What Our Computer & Laptop Repair Customers Say
          </h2>
          <p className="text-base lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real reviews from satisfied customers who trusted us with their computer and laptop repairs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              {/* Glass shine animation */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3 lg:mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm lg:text-base">{review.name}</h4>
                    <p className="text-xs lg:text-sm text-gray-600">{review.device}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 lg:h-4 lg:w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]/20" />
                  <p className="text-gray-700 leading-relaxed pl-4 text-xs lg:text-base">
                    {review.text}
                  </p>
                </div>

                <div className="mt-3 lg:mt-4 text-xs text-gray-500">
                  {review.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Stats */}
        <div className="text-center mt-8 lg:mt-16">
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg hover:bg-white/80 transition-all duration-300 group relative overflow-hidden">
            {/* Glass shine animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-[#DB5858] mb-1 lg:mb-2">200+</div>
                  <div className="text-gray-600 text-xs lg:text-base">Computer & Laptop Repair Reviews</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-[#DB5858] mb-1 lg:mb-2">4.9★</div>
                  <div className="text-gray-600 text-xs lg:text-base">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-[#DB5858] mb-1 lg:mb-2">96%</div>
                  <div className="text-gray-600 text-xs lg:text-base">Customer Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}