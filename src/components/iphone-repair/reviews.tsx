"use client";

import { Star, Quote, CheckCircle } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    repair: "iPhone 14 Pro Screen Replacement",
    rating: 5,
    text: "Amazing service! My iPhone 14 Pro screen was completely shattered and they had it fixed in under 2 hours. The screen looks and feels exactly like the original. Highly recommend Nexus Tech Solutions for iPhone repair in Denton!",
    verified: true
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    repair: "iPhone 12 Battery Replacement",
    rating: 5,
    text: "My iPhone 12 battery was dying by noon every day. The team at Nexus replaced it with a genuine battery and now it lasts all day again. Great pricing and they stand behind their 60-day warranty.",
    verified: true
  },
  {
    id: 3,
    name: "Jennifer Lee",
    repair: "iPhone 13 Water Damage Repair",
    rating: 5,
    text: "Dropped my iPhone 13 in the lake while boating. I thought it was a total loss, but Nexus Tech Solutions saved it! They got all the water out and it works perfectly now. Their water damage repair service is incredible.",
    verified: true
  },
  {
    id: 4,
    name: "David Thompson",
    repair: "iPhone 11 Pro Camera Repair",
    rating: 5,
    text: "The camera on my iPhone 11 Pro was taking blurry photos. They diagnosed and fixed the issue same day. Now my photos are crystal clear again. Professional service and fair pricing in Denton.",
    verified: true
  },
  {
    id: 5,
    name: "Amanda Wilson",
    repair: "iPhone XS Charging Port Repair",
    rating: 5,
    text: "My iPhone XS stopped charging properly. Other shops said I needed a new phone, but Nexus fixed the charging port and it works like new. Saved me hundreds of dollars! Best iPhone repair shop in Denton, TX.",
    verified: true
  },
  {
    id: 6,
    name: "Robert Martinez",
    repair: "iPhone 15 Pro Max Screen Replacement",
    rating: 5,
    text: "Cracked my brand new iPhone 15 Pro Max screen just 2 weeks after getting it. Nexus Tech Solutions had the right parts in stock and fixed it the same day. You can't even tell it was ever damaged. Outstanding work!",
    verified: true
  }
];

export function IPhoneReviews() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            What Our iPhone Repair Customers Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Don't just take our word for it. Here's what real customers say about our iPhone repair services in Denton, TX.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">4.9/5 Rating</span>
            </div>
            <div className="h-6 w-px bg-gray-300" />
            <div className="text-lg font-semibold text-gray-900">150+ iPhone Repair Reviews</div>
            <div className="h-6 w-px bg-gray-300" />
            <div className="text-lg font-semibold text-gray-900">98% Customer Satisfaction</div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              style={{ transition: 'box-shadow 0.3s ease' }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4">
                <Quote className="h-6 w-6 text-[#DB5858]/30" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                "{review.text}"
              </p>

              {/* Customer Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      {review.name}
                      {review.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
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
          <div className="bg-gradient-to-r from-[#DB5858] to-[#c94848] rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Satisfied iPhone Repair Customers
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Experience the same quality iPhone repair service that has earned us 150+ five-star reviews in Denton, TX.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <button className="bg-white text-[#DB5858] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Your Free Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#DB5858] transition-colors">
                Read More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}