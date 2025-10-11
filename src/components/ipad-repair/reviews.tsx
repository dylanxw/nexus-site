"use client";

import { Star, Quote, CheckCircle } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Emily Davis",
    repair: "iPad Pro 12.9 Screen Replacement",
    rating: 5,
    text: "Dropped my iPad Pro and completely shattered the screen. Nexus Tech Solutions had it fixed in just 2 hours and it looks perfect! The team was professional and the pricing was very fair. Highly recommend for iPad repair in Denton!",
    verified: true
  },
  {
    id: 2,
    name: "Carlos Martinez",
    repair: "iPad Air Battery Replacement",
    rating: 5,
    text: "My iPad Air wasn't holding a charge anymore. They replaced the battery same day and now it lasts all day again. Great service and they stand behind their 60-day warranty. Will definitely come back for any future repairs.",
    verified: true
  },
  {
    id: 3,
    name: "Rachel Thompson",
    repair: "iPad Mini Water Damage Repair",
    rating: 5,
    text: "Spilled coffee all over my iPad Mini and thought it was ruined. The technicians at Nexus saved it! They cleaned all the water damage and it works perfectly now. Amazing iPad repair service in Denton.",
    verified: true
  },
  {
    id: 4,
    name: "Jason Kim",
    repair: "iPad 9th Gen Charging Port Repair",
    rating: 5,
    text: "My iPad wouldn't charge and other shops wanted to replace the whole device. Nexus fixed just the charging port for a fraction of the cost. Professional work and honest pricing. Best iPad repair shop in Denton!",
    verified: true
  },
  {
    id: 5,
    name: "Lisa Rodriguez",
    repair: "iPad Pro 11 Home Button Repair",
    rating: 5,
    text: "Touch ID stopped working on my iPad Pro. They diagnosed and fixed the issue same day. Now it works like new again. Excellent customer service and technical expertise.",
    verified: true
  },
  {
    id: 6,
    name: "Mark Johnson",
    repair: "iPad Air 4 Speaker Repair",
    rating: 5,
    text: "No sound was coming from my iPad Air speakers. Nexus Tech Solutions fixed it quickly and the sound quality is perfect now. Great work and reasonable prices for iPad repair in Denton, TX.",
    verified: true
  }
];

export function IPadReviews() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-6 text-gray-900">
            What Our iPad Repair Customers Say
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 lg:mb-8">
            Don't just take our word for it. Here's what real customers say about our iPad repair services in Denton, TX.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 mb-6 lg:mb-8">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 lg:h-5 lg:w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm lg:text-lg font-semibold text-gray-900">4.9/5 Rating</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-gray-300" />
            <div className="text-sm lg:text-lg font-semibold text-gray-900">85+ Reviews</div>
            <div className="hidden sm:block h-6 w-px bg-gray-300" />
            <div className="text-sm lg:text-lg font-semibold text-gray-900">97% Satisfaction</div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-16">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              style={{ transition: 'box-shadow 0.3s ease' }}
              className="bg-gray-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 hover:shadow-lg relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4">
                <Quote className="h-5 w-5 lg:h-6 lg:w-6 text-[#DB5858]/30" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3 lg:mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 lg:h-4 lg:w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-3 lg:mb-4 leading-relaxed text-xs lg:text-sm">
                "{review.text}"
              </p>

              {/* Customer Info */}
              <div className="border-t border-gray-200 pt-3 lg:pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-sm lg:text-base">
                      {review.name}
                      {review.verified && (
                        <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 text-green-500" />
                      )}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{review.repair}</p>
                  </div>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-xl lg:rounded-2xl p-6 lg:p-8 text-white">
            <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4">
              Join Our Satisfied iPad Repair Customers
            </h3>
            <p className="text-base lg:text-lg mb-4 lg:mb-6 opacity-90 max-w-2xl mx-auto">
              Experience the same quality iPad repair service that has earned us 85+ five-star reviews in Denton, TX.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center max-w-lg mx-auto">
              <button className="bg-white text-[#DB5858] px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:bg-gray-100 transition-colors">
                Get Your Free Quote
              </button>
              <button className="border-2 border-white text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:bg-white hover:text-[#DB5858] transition-colors">
                Read More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}