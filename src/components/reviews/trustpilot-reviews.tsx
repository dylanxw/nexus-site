"use client";

import { Star, ExternalLink, CheckCircle } from "lucide-react";

// Placeholder Trustpilot reviews - will be replaced with live API integration
const trustpilotReviews = [
  {
    id: 1,
    name: "Amanda Thompson",
    avatar: "AT",
    rating: 5,
    date: "1 week ago",
    text: "Outstanding service from start to finish. My laptop had a virus that was slowing it down terribly. They cleaned it up completely and now it runs like new. Very professional team!",
    verified: true,
    title: "Excellent laptop repair service"
  },
  {
    id: 2,
    name: "Carlos Rivera",
    avatar: "CR",
    rating: 5,
    date: "2 weeks ago",
    text: "Highly recommend! They repaired my cracked Samsung phone screen perfectly. The quality of work is exceptional and the price was very fair. Will definitely return for any future repairs.",
    verified: true,
    title: "Perfect Samsung screen repair"
  },
  {
    id: 3,
    name: "Jessica Lee",
    avatar: "JL",
    rating: 5,
    date: "3 weeks ago",
    text: "Amazing experience with my iPad repair. The battery wasn't holding charge and they replaced it same day. Staff was very knowledgeable and explained everything clearly. 5 stars!",
    verified: true,
    title: "Quick iPad battery replacement"
  },
  {
    id: 4,
    name: "Mark Anderson",
    avatar: "MA",
    rating: 4,
    date: "1 month ago",
    text: "Good service overall. They fixed my gaming console HDMI port issue. Took a little longer than expected but the repair was done properly and it's working great now.",
    verified: true,
    title: "Gaming console HDMI repair"
  }
];

export function TrustpilotReviews() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Trustpilot Reviews
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Independent reviews from verified Trustpilot customers sharing their honest experiences with our repair services.
          </p>

          {/* Trustpilot Rating Summary */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-green-500 text-green-500" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">4.8</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600">50+ Trustpilot Reviews</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {trustpilotReviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group relative overflow-hidden flex flex-col h-full"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        {review.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">T</span>
                  </div>
                </div>

                {/* Title */}
                <h5 className="font-semibold text-gray-900 mb-3">{review.title}</h5>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-green-500 text-green-500' : 'fill-gray-300 text-gray-300'}`} />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                  "{review.text}"
                </p>

                {/* Verified Badge */}
                {review.verified && (
                  <div className="pt-3 border-t border-gray-200 mt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">Verified Trustpilot Review</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trustpilot Rating Breakdown */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Trustpilot Rating Breakdown</h3>
          <div className="max-w-md mx-auto space-y-3">
            {[
              { stars: 5, percentage: 85, count: 42 },
              { stars: 4, percentage: 12, count: 6 },
              { stars: 3, percentage: 2, count: 1 },
              { stars: 2, percentage: 1, count: 1 },
              { stars: 1, percentage: 0, count: 0 }
            ].map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 w-6">{item.stars}</span>
                <Star className="h-4 w-4 fill-green-500 text-green-500" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">{item.percentage}%</span>
                <span className="text-sm text-gray-500 w-8">({item.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* View All Trustpilot Reviews CTA */}
        <div className="text-center">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Read All Our Trustpilot Reviews
            </h3>
            <p className="text-gray-600 mb-6">
              See independent, verified reviews from customers on Trustpilot's trusted platform.
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Trustpilot Reviews <ExternalLink className="h-4 w-4" />
            </a>
            <p className="text-xs text-gray-500 mt-3">
              Trustpilot API integration coming soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}