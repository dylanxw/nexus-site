"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Star, ExternalLink, MapPin, Clock, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Mock review data - this will be replaced with real Google Reviews API data
const mockReviews = [
  {
    id: 1,
    author: "Wiseau Serious",
    rating: 5,
    text: "These guys do great work and very reasonable prices, can't recommend them enough",
    date: "in the last week",
    avatar: "W"
  },
  {
    id: 2,
    author: "Andrew Reise",
    rating: 5,
    text: "I brought in a laptop for a broken screen. Reasonable pricing. Knowledgeable about the laptop in question. Personal data was completely safe during the entire service time.",
    date: "a week ago",
    avatar: "A"
  },
  {
    id: 3,
    author: "kaden robinson",
    rating: 5,
    text: "I recently went in there with a friend, he was on the hunt for a PSP and I almost passed on shopping. I ended up getting a fair trade on a Lenovo Legion for my MacBook, super cool guy.",
    date: "4 weeks ago",
    avatar: "K"
  },
  {
    id: 4,
    author: "Josey Bland",
    rating: 5,
    text: "5 star they are absolutely amazing. And the prices are reasonable. Thank you so much",
    date: "a week ago",
    avatar: "J"
  },
  {
    id: 5,
    author: "Jani Whitsett",
    rating: 5,
    text: "Help clean up my computer and assisted me in putting on the right protective software and helping me to change to a browser that is much safer. They always help me and teach me things.",
    date: "3 weeks ago",
    avatar: "J"
  },
  {
    id: 6,
    author: "Christina Lederer",
    rating: 5,
    text: "Chris and his team fixed my iPhone 15 pro max after it was fully submerged in water after I accidentally dropped it into some water while swimming this past weekend. Not only was their...",
    date: "4 month ago",
    avatar: "C"
  },
  {
    id: 7,
    author: "Michael Torres",
    rating: 5,
    text: "Fast service and great communication. Had my phone screen replaced in under an hour. Highly recommend!",
    date: "2 weeks ago",
    avatar: "M"
  },
  {
    id: 8,
    author: "Sarah Johnson",
    rating: 5,
    text: "Professional service and fair pricing. They fixed my laptop and it works better than ever. Will definitely come back.",
    date: "1 month ago",
    avatar: "S"
  },
  {
    id: 9,
    author: "David Chen",
    rating: 5,
    text: "Amazing customer service! They recovered all my data from a damaged hard drive. Life savers!",
    date: "3 weeks ago",
    avatar: "D"
  }
];

export function TrustBanner() {
  const [currentSlide, setCurrentSlide] = useState(1); // Start at 1 for infinite scroll
  const [reviewsPerSlide, setReviewsPerSlide] = useState(3);

  // Update reviewsPerSlide based on screen size
  useEffect(() => {
    const updateReviewsPerSlide = () => {
      if (window.innerWidth < 640) {
        setReviewsPerSlide(1); // Mobile: show 1 review
      } else if (window.innerWidth < 1024) {
        setReviewsPerSlide(2); // Tablet: show 2 reviews
      } else {
        setReviewsPerSlide(3); // Desktop: show 3 reviews
      }
    };

    updateReviewsPerSlide();
    window.addEventListener('resize', updateReviewsPerSlide);
    return () => window.removeEventListener('resize', updateReviewsPerSlide);
  }, []);

  const totalSlides = Math.ceil(mockReviews.length / reviewsPerSlide);

  // Create infinite loop by duplicating first and last slides
  const extendedSlides = totalSlides + 2; // Add clones for seamless loop

  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setCurrentSlide(prev => prev - 1);
  };

  // Handle infinite scroll wrapping
  const handleTransitionEnd = () => {
    if (currentSlide === 0) {
      setCurrentSlide(totalSlides);
    } else if (currentSlide === totalSlides + 1) {
      setCurrentSlide(1);
    }
    setIsTransitioning(false);
  };

  const getReviewsForSlide = (slideIndex: number) => {
    // Handle clone slides for infinite scroll
    let actualSlideIndex = slideIndex;
    if (slideIndex === 0) {
      actualSlideIndex = totalSlides - 1; // Last slide clone
    } else if (slideIndex === totalSlides + 1) {
      actualSlideIndex = 0; // First slide clone
    } else {
      actualSlideIndex = slideIndex - 1; // Normal slides (offset by 1)
    }

    const startIndex = actualSlideIndex * reviewsPerSlide;
    return mockReviews.slice(startIndex, startIndex + reviewsPerSlide);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Modern gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
        }}
      ></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-[#DB5858]/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-[#DB5858]/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#DB5858]/3 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-32 right-16 w-32 h-32 bg-yellow-400/5 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-32 left-16 w-36 h-36 bg-green-400/5 rounded-full blur-xl animate-pulse delay-300"></div>
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(219, 88, 88, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(219, 88, 88, 0.08) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(219, 88, 88, 0.06) 0%, transparent 50%)`,
          backgroundSize: '400px 400px, 300px 300px, 500px 500px',
          backgroundPosition: '0 0, 150px 150px, 300px 0'
        }}></div>
      </div>
      <div className="wide-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              <span className="inline-block px-6 py-2 rounded-2xl text-white backdrop-blur-md bg-white/10 border border-white/20">
                What Our Customers Say
              </span>
            </h2>

            {/* Compact Rating */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-4 py-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xl font-bold text-white ml-1">4.7</span>
              </div>
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-4 py-2">
                <span className="text-lg font-bold text-white">226+</span>
                <span className="text-gray-300 text-sm ml-1">reviews</span>
              </div>
            </div>
          </div>

          {/* Review Cards Slider */}
          <div className="relative mb-12 max-w-6xl mx-auto">
            {/* Slider Container */}
            <div className="overflow-hidden cursor-grab active:cursor-grabbing mx-8 sm:mx-12 lg:mx-16">
              <motion.div
                className="flex"
                animate={{
                  x: `-${currentSlide * (100 / reviewsPerSlide)}%` // Move by 1/reviewsPerSlide for each slide
                }}
                transition={
                  currentSlide === 0 || currentSlide === totalSlides + 1
                    ? { duration: 0 } // Instant transition for infinite wrap
                    : {
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }
                }
                onAnimationComplete={handleTransitionEnd}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipeThreshold = 50;
                  const swipeVelocityThreshold = 500;

                  if (offset.x > swipeThreshold || velocity.x > swipeVelocityThreshold) {
                    prevSlide();
                  } else if (offset.x < -swipeThreshold || velocity.x < -swipeVelocityThreshold) {
                    nextSlide();
                  }
                }}
              >
                {/* Create individual review cards in a continuous row */}
                {Array.from({ length: extendedSlides * reviewsPerSlide }).map((_, cardIndex) => {
                  const slideIndex = Math.floor(cardIndex / reviewsPerSlide);
                  const reviewIndex = cardIndex % reviewsPerSlide;
                  const reviews = getReviewsForSlide(slideIndex);
                  const review = reviews[reviewIndex];

                  if (!review) return null;

                  return (
                    <div
                      key={`${review.id}-${cardIndex}`}
                      style={{ width: `${100 / reviewsPerSlide}%` }}
                      className="flex-shrink-0 px-2 sm:px-3 lg:px-3"
                    >
                      <div className="backdrop-blur-sm bg-white/25 border border-white/40 rounded-2xl p-4 sm:p-5 text-left hover:bg-white/30 transition-all duration-300 h-56 flex flex-col pointer-events-auto select-none group shadow-lg hover:shadow-xl relative overflow-hidden">
                        {/* Glass shine animation */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                        {/* Stars & Google */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #DB5858 0%, #c94848 100%)' }}>
                            G
                          </div>
                        </div>

                        {/* Review Text */}
                        <p className="text-white/90 text-sm leading-relaxed flex-grow mb-4 line-clamp-4">
                          &quot;{review.text}&quot;
                        </p>

                        {/* Author Info */}
                        <div className="flex items-center gap-3 mt-auto">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: 'linear-gradient(135deg, #DB5858 0%, #c94848 100%)' }}>
                            {review.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-white text-sm">{review.author}</p>
                            <p className="text-white/60 text-xs">{review.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-3 text-white transition-all duration-200 z-10 hover:bg-white/30 hover:scale-105"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-3 text-white transition-all duration-200 z-10 hover:bg-white/30 hover:scale-105"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Slide Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                {[...Array(totalSlides)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index + 1)} // Offset by 1 for infinite scroll
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentSlide - 1 ||
                      (currentSlide === 0 && index === totalSlides - 1) ||
                      (currentSlide === totalSlides + 1 && index === 0)
                        ? 'bg-[#DB5858]'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Business Info & Actions - moved from LocationSection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mt-16"
          >
            <div className="backdrop-blur-md bg-white/25 border border-white/40 rounded-2xl p-6 relative overflow-hidden group">
              {/* Glass shine animation */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                {/* Business Info - Left Side */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-4 text-center lg:text-left">Nexus Tech Solutions</h3>

                  <div className="space-y-3 text-gray-200">
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <MapPin className="h-4 w-4 text-[#DB5858]" />
                      <span className="text-sm">{siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <Clock className="h-4 w-4 text-[#DB5858]" />
                      <span className="text-sm">{siteConfig.hours.display}</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-white font-medium text-sm">{siteConfig.trustSignals.rating} ({siteConfig.trustSignals.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Right Side */}
                <div className="flex flex-col gap-4 w-full lg:w-auto lg:min-w-[400px]">
                  <Button asChild className="py-4 px-12 backdrop-blur-md bg-white/10 border-2 border-white/30 hover:bg-white/20 hover:border-white/40 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google Maps
                      <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </Button>
                  <Button asChild className="py-4 px-12 bg-gradient-to-r from-[#DB5858] to-[#c94848] hover:from-[#c94848] hover:to-[#b83d3d] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-none">
                    <a
                      href={siteConfig.social.google || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Write a Review
                      <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}