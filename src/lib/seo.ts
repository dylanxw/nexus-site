import { DefaultSeoProps } from 'next-seo';
import { siteConfig } from '@/config/site';

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: `%s | ${siteConfig.name} (${siteConfig.address.city}, ${siteConfig.address.state})`,
  defaultTitle: `${siteConfig.name} - Electronics Repair in ${siteConfig.address.city}, ${siteConfig.address.state}`,
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Electronics Repair Services`,
      },
    ],
  },
  twitter: {
    handle: '@nexustechsolutions',
    site: '@nexustechsolutions',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'keywords',
      content: 'phone repair, iphone repair, computer repair, tablet repair, game console repair, data recovery, denton tx, electronics repair',
    },
    {
      name: 'author',
      content: siteConfig.name,
    },
  ],
};

export function generateLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/images/hero/nexus-storefront-image.jpeg`,
    logo: `${siteConfig.url}/images/nexus-favicon.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '33.2148',
      longitude: '-97.1331',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '13:00',
        closes: '17:00',
      },
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Denton',
        '@id': 'https://en.wikipedia.org/wiki/Denton,_Texas',
      },
      {
        '@type': 'City',
        name: 'Lewisville',
      },
      {
        '@type': 'City',
        name: 'Flower Mound',
      },
      {
        '@type': 'City',
        name: 'Highland Village',
      },
      {
        '@type': 'City',
        name: 'Corinth',
      },
      {
        '@type': 'City',
        name: 'Lake Dallas',
      },
    ],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.trustSignals.rating,
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    paymentAccepted: 'Cash, Credit Card, Debit Card, Check',
    currenciesAccepted: 'USD',
    sameAs: [
      'https://www.facebook.com/NexusTechSolutionsLLC',
      'https://www.google.com/maps/place/Nexus+Tech+Solutions',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Device Repair, Buyback & Sales Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'iPhone Repair',
            description: 'Professional iPhone screen replacement, battery repair, charging port repair, water damage restoration, and camera repair',
            areaServed: 'Denton, TX',
            provider: {
              '@type': 'LocalBusiness',
              name: siteConfig.name,
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Samsung Phone Repair',
            description: 'Expert Samsung Galaxy phone repair including screen replacement, battery repair, and charging port services',
            areaServed: 'Denton, TX',
            provider: {
              '@type': 'LocalBusiness',
              name: siteConfig.name,
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Computer & Laptop Repair',
            description: 'MacBook, PC, and laptop repair services including hardware diagnostics, virus removal, and upgrades',
            areaServed: 'Denton, TX',
            provider: {
              '@type': 'LocalBusiness',
              name: siteConfig.name,
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Game Console Repair',
            description: 'PlayStation, Xbox, and Nintendo Switch repair services with 1-year warranty on HDMI port repairs',
            areaServed: 'Denton, TX',
            provider: {
              '@type': 'LocalBusiness',
              name: siteConfig.name,
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Drone Repair',
            description: 'Professional DJI, Autel, and other drone repair services including crash damage repair',
            areaServed: 'Denton, TX',
            provider: {
              '@type': 'LocalBusiness',
              name: siteConfig.name,
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Device Buyback',
            description: 'Instant cash for phones, tablets, laptops, and other electronics. Same-day payment with competitive prices',
            areaServed: 'Denton, TX',
            provider: {
              '@type': 'LocalBusiness',
              name: siteConfig.name,
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Pre-Owned Device Sales',
            description: 'Quality refurbished phones, tablets, laptops, and electronics. Professionally tested with warranty coverage',
            category: 'Electronics',
            brand: 'Various',
            areaServed: 'Denton, TX',
            seller: {
              '@type': 'LocalBusiness',
              name: siteConfig.name,
            },
          },
        },
      ],
    },
  };
}