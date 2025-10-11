import { siteConfig } from "@/config/site";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    image: `${siteConfig.url}/images/hero/nexus-storefront-image.jpeg`,
    logo: `${siteConfig.url}/images/nexus-favicon.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "33.2148",
      longitude: "-97.1331",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "13:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.trustSignals.rating,
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Denton",
        "@id": "https://en.wikipedia.org/wiki/Denton,_Texas",
      },
      {
        "@type": "City",
        name: "Lewisville",
      },
      {
        "@type": "City",
        name: "Flower Mound",
      },
      {
        "@type": "City",
        name: "Highland Village",
      },
      {
        "@type": "City",
        name: "Corinth",
      },
      {
        "@type": "City",
        name: "Lake Dallas",
      },
    ],
    sameAs: [
      "https://www.facebook.com/NexusTechSolutionsLLC",
      "https://www.google.com/maps/place/Nexus+Tech+Solutions",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Device Repair Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "iPhone Repair",
            description: "Professional iPhone screen replacement, battery repair, charging port repair, and more",
            areaServed: "Denton, TX",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Samsung Repair",
            description: "Expert Samsung Galaxy phone repair including screen, battery, and charging port services",
            areaServed: "Denton, TX",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Computer Repair",
            description: "MacBook, PC, and laptop repair services including hardware and software fixes",
            areaServed: "Denton, TX",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Game Console Repair",
            description: "PlayStation, Xbox, and Nintendo Switch repair services",
            areaServed: "Denton, TX",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Device Buyback",
            description: "Cash for phones, tablets, laptops, and other electronics. Instant quotes and same-day payment",
            areaServed: "Denton, TX",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
