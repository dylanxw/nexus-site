"use client";

import { Star, ExternalLink, CheckCircle } from "lucide-react";

// Placeholder Google reviews - will be replaced with live API integration
const googleReviews = [
  {
    id: 1,
    name: "Jennifer Martinez",
    avatar: "JM",
    rating: 5,
    date: "2 weeks ago",
    text: "Excellent service! My iPhone screen was cracked and they fixed it in less than 2 hours. The staff was friendly and professional. Definitely recommend Nexus Tech Solutions for any phone repair needs in Denton!",
    verified: true,
    device: "iPhone 14 Pro"
  },
  {
    id: 2,
    name: "David Chen",
    avatar: "DC",
    rating: 5,
    date: "1 month ago",
    text: "Had my MacBook Pro repaired here after it wouldn't turn on. They diagnosed the issue quickly and had it working perfectly within the same day. Great pricing and excellent customer service. Will definitely be back!",
    verified: true,
    device: "MacBook Pro"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    avatar: "SJ",
    rating: 5,
    date: "3 weeks ago",
    text: "Amazing experience! My Samsung Galaxy screen was completely shattered and they made it look brand new. The 60-day warranty gave me peace of mind. Fast, professional, and reasonably priced.",
    verified: true,
    device: "Samsung Galaxy S23"
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    avatar: "MR",
    rating: 5,
    date: "1 week ago",
    text: "Best repair shop in Denton! They fixed my gaming laptop that overheated and cleaned it thoroughly. The technician explained everything they were doing. Highly professional service!",
    verified: true,
    device: "Gaming Laptop"
  },
  {
    id: 5,
    name: "Emily Davis",
    avatar: "ED",
    rating: 5,
    date: "2 months ago",
    text: "Brought my water-damaged iPad here after dropping it in the pool. I thought it was completely ruined, but they were able to save it! Incredible work and very reasonable pricing. Thank you so much!",
    verified: true,
    device: "iPad Pro"
  },
  {
    id: 6,
    name: "Robert Wilson",
    avatar: "RW",
    rating: 5,
    date: "1 month ago",
    text: "Professional and efficient service. My drone camera gimbal was damaged and they repaired it perfectly. They even tested it thoroughly before returning it to me. Great attention to detail!",
    verified: true,
    device: "DJI Mavic Pro"
  }
];

export function GoogleReviews() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
    }}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-[#DB5858]/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-blue-500/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="wide-container relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Google Reviews
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Real reviews from verified Google customers who chose Nexus Tech Solutions for their device repairs.
          </p>

          {/* Google Rating Summary */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">4.9</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600">150+ Google Reviews</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {googleReviews.map((review) => (
            <div
              key={review.id}
              className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-6 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col h-full"
            >
              {/* Glass shine animation */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#DB5858] rounded-full flex items-center justify-center text-white font-semibold text-sm">
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
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">G</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
                  "{review.text}"
                </p>

                {/* Device Info */}
                <div className="pt-3 border-t border-gray-200/50">
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Device:</span> {review.device}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Google Reviews CTA */}
        <div className="text-center">
          <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Read All Our Google Reviews
            </h3>
            <p className="text-gray-600 mb-6">
              See what all our customers are saying about our device repair services on Google.
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Google Reviews <ExternalLink className="h-4 w-4" />
            </a>
            <p className="text-xs text-gray-500 mt-3">
              Google My Business integration coming soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}