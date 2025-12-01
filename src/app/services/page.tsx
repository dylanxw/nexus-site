import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Smartphone, Laptop, Tablet, HardDrive, Gamepad2,
  DollarSign, ShoppingCart, Wrench, Phone, MapPin,
  Clock, Shield, CheckCircle, ArrowRight, Star, Zap
} from "lucide-react";

export const metadata: Metadata = {
  title: "Electronics Repair Services in Denton, TX | Nexus Tech Solutions",
  description: "Professional phone repair, computer repair, tablet repair, and game console repair in Denton, TX. Same-day service available with 60-day warranty. Serving Denton, Corinth, Highland Village, and Lewisville.",
  keywords: "phone repair denton tx, iphone repair denton, computer repair denton tx, tablet repair denton, game console repair denton, electronics repair near me, mac repair denton, samsung repair denton, laptop repair denton texas",
  openGraph: {
    title: "Electronics Repair Services in Denton, TX | Nexus Tech Solutions",
    description: "Fast, reliable electronics repair in Denton. iPhone, Samsung, Mac, PC, tablet, and gaming console repairs with 60-day warranty.",
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.name,
    images: [{
      url: `${siteConfig.url}/og-services.jpg`,
      width: 1200,
      height: 630,
      alt: "Nexus Tech Solutions - Electronics Repair Services in Denton, TX"
    }],
  },
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
};

// Service icon mapping
const iconMap: { [key: string]: any } = {
  smartphone: Smartphone,
  laptop: Laptop,
  tablet: Tablet,
  harddrive: HardDrive,
  gamepad2: Gamepad2,
  dollarSign: DollarSign,
  shoppingCart: ShoppingCart,
  wrench: Wrench,
};

// Service details with local SEO keywords
const serviceDetails: { [key: string]: {
  link: string;
  highlights: string[];
  popular: string[];
  startingPrice?: string;
}} = {
  "iphone-repair": {
    link: "/services/iphone-repair",
    highlights: ["Same-Day Service", "All iPhone Models", "Lifetime Warranty on Glass"],
    popular: ["Screen Repair", "Battery Replacement", "Charging Port", "Camera Repair"],
    startingPrice: "$79"
  },
  "mac-pc-repair": {
    link: "/services/computer-repair",
    highlights: ["Free Diagnostic", "Mac & Windows", "Hardware & Software"],
    popular: ["Virus Removal", "SSD Upgrade", "Screen Replacement", "Data Recovery"],
    startingPrice: "$69"
  },
  "tablet-repair": {
    link: "/services/tablet-repair",
    highlights: ["iPad Specialist", "Android Tablets", "Quick Turnaround"],
    popular: ["Screen Replacement", "Battery Service", "Charging Issues", "Software Repair"],
    startingPrice: "$89"
  },
  "data-recovery": {
    link: "/repair",
    highlights: ["Professional Recovery", "All Device Types", "No Data, No Fee"],
    popular: ["Hard Drive Recovery", "SSD Recovery", "Phone Data", "Deleted Files"],
    startingPrice: "Free Evaluation"
  },
  "console-repair": {
    link: "/services/console-repair",
    highlights: ["All Major Consoles", "HDMI Repairs", "Fast Service"],
    popular: ["PS5 Repair", "Xbox Repair", "Nintendo Switch", "Controller Fix"],
    startingPrice: "$59"
  },
  "device-buyback": {
    link: "/sell-a-device",
    highlights: ["Instant Cash", "Best Prices", "All Conditions"],
    popular: ["iPhones", "Samsung Phones", "iPads", "MacBooks"],
    startingPrice: "Get up to $1020"
  },
  "pre-owned-sales": {
    link: "/shop",
    highlights: ["90-Day Warranty", "Tested & Certified", "Great Prices"],
    popular: ["iPhones", "Android Phones", "Tablets", "Laptops"],
    startingPrice: "Starting at $79.99"
  },
  "other-repair": {
    link: "/repair",
    highlights: ["Drone Repair", "Smart Watch", "Audio Equipment"],
    popular: ["AirPods", "Smart Watches", "Drones", "Speakers"],
    startingPrice: "Varies"
  }
};

// JSON-LD Structured Data for Local SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/services`,
  "name": siteConfig.name,
  "description": "Professional electronics repair services in Denton, TX",
  "url": `${siteConfig.url}/services`,
  "telephone": siteConfig.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": siteConfig.address.street,
    "addressLocality": siteConfig.address.city,
    "addressRegion": siteConfig.address.state,
    "postalCode": siteConfig.address.zip,
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.1649,
    "longitude": -97.0655
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "10:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "13:00",
      "closes": "17:00"
    }
  ],
  "areaServed": [
    "Denton, TX",
    "Corinth, TX",
    "Highland Village, TX",
    "Lewisville, TX",
    "Flower Mound, TX",
    "Argyle, TX",
    "Denton County"
  ],
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": siteConfig.trustSignals.rating,
    "reviewCount": "150"
  }
};

export default function ServicesPage() {
  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <section className="bg-white border-b">
          <div className="wide-container py-12 md:py-16">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Electronics Repair Services in Denton, TX
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Professional repair services for all your electronic devices. Fast turnaround,
                expert technicians, and a 60-day warranty on all repairs. Serving Denton and
                surrounding areas since 2022.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{siteConfig.trustSignals.rating} Rating</span>
                  <span className="text-gray-500">({siteConfig.trustSignals.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-500" />
                  <span className="font-semibold">Same-Day Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="font-semibold">60-Day Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold">5,000+ Devices Fixed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="wide-container">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Complete Service Catalog
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {siteConfig.services.map((service) => {
                const Icon = iconMap[service.icon] || Wrench;
                const details = serviceDetails[service.id];
                const link = details?.link || "/repair";

                return (
                  <Link
                    key={service.id}
                    href={link}
                    className="group bg-white rounded-lg border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                              {service.name}
                            </h3>
                            {details?.startingPrice && (
                              <p className="text-sm text-primary font-medium">
                                {details.startingPrice.includes('Starting') ||
                                 details.startingPrice.includes('up to') ||
                                 details.startingPrice === 'Varies' ||
                                 details.startingPrice === 'Free Evaluation'
                                  ? details.startingPrice
                                  : `From ${details.startingPrice}`}
                              </p>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>

                      {/* Highlights */}
                      {details?.highlights && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {details.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Popular Services */}
                      {details?.popular && (
                        <div className="border-t pt-4">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Popular:</p>
                          <div className="flex flex-wrap gap-1">
                            {details.popular.map((item, i) => (
                              <span key={i} className="text-sm text-gray-600">
                                {item}{i < details.popular.length - 1 ? " •" : ""}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Areas - Local SEO */}
        <section className="py-12 bg-white border-t">
          <div className="wide-container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Serving Denton and Surrounding Areas
              </h2>
              <p className="text-gray-600 mb-6">
                We're proud to be Denton's trusted electronics repair shop. Customers from across
                Denton County visit us for reliable, professional service.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="py-2">Denton, TX</div>
                <div className="py-2">Corinth, TX</div>
                <div className="py-2">Highland Village, TX</div>
                <div className="py-2">Lewisville, TX</div>
                <div className="py-2">Flower Mound, TX</div>
                <div className="py-2">Argyle, TX</div>
                <div className="py-2">Little Elm, TX</div>
                <div className="py-2">Lake Dallas, TX</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-primary text-white">
          <div className="wide-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Your Device Fixed Today?
              </h2>
              <p className="text-lg mb-8 opacity-95">
                Walk-ins welcome! Most repairs completed same-day.
                Free diagnostics available for all devices.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="/repair"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Schedule Repair Online
                </Link>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call {siteConfig.phoneFormatted}
                </a>
              </div>

              {/* Location Info */}
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{siteConfig.address.street}, {siteConfig.address.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{siteConfig.hours.display}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Link */}
        <section className="py-12 bg-gray-50">
          <div className="wide-container">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Have questions about our services or repair process?
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                View Frequently Asked Questions
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}