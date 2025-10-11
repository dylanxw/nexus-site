"use client";

import Image from "next/image";

export function OurStory() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="rounded-xl lg:rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about/owner-storefront-photo.jpg"
                  alt="Nexus Tech Solutions storefront in Denton, TX"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 lg:mb-6 text-gray-900">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-sm lg:text-base leading-relaxed">
                <p>
                  Welcome to Nexus Tech Solutions, your trusted partner for device repair, buying, and selling in Denton, Texas. We're passionate about technology and committed to providing reliable, affordable repair services to our local community.
                </p>
                <p>
                  What started as a passion for fixing broken devices has grown into a full-service repair shop serving Denton residents, UNT students, and North Texas businesses. We understand how important your devices are to your daily life, which is why we offer fast, professional repairs with transparent pricing.
                </p>
                <p>
                  At Nexus Tech Solutions, we pride ourselves on honest service, quality workmanship, and building lasting relationships with our customers. Whether it's your smartphone, laptop, gaming console, or drone, we treat every repair with the same care and attention to detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
