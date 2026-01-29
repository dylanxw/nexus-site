import { DefaultSeoProps } from 'next-seo';
import { siteConfig } from '@/config/site';

// Type definitions for schema generators
export interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceRange?: string;
  serviceType?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

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

/**
 * Generate Service schema for individual service pages
 * Helps search engines understand specific repair services offered
 */
export function generateServiceJsonLd(props: ServiceSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${props.url}/#service`,
    name: props.name,
    description: props.description,
    url: props.url,
    image: props.image || `${siteConfig.url}/images/hero/nexus-storefront-image.jpeg`,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${siteConfig.url}/#business`,
      name: siteConfig.name,
      telephone: siteConfig.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        postalCode: siteConfig.address.zip,
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'City',
      name: siteConfig.address.city,
      '@id': 'https://en.wikipedia.org/wiki/Denton,_Texas',
    },
    serviceType: props.serviceType || 'Device Repair',
    priceRange: props.priceRange || '$$',
    termsOfService: `${siteConfig.url}/warranty`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: props.name,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: props.name,
            description: props.description,
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'USD',
          },
          availability: 'https://schema.org/InStock',
          areaServed: {
            '@type': 'City',
            name: siteConfig.address.city,
          },
        },
      ],
    },
  };
}

/**
 * Generate ContactPoint schema for the contact page
 * Helps search engines display contact info in search results
 */
export function generateContactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${siteConfig.url}/contact/#webpage`,
    name: `Contact ${siteConfig.name}`,
    description: `Contact ${siteConfig.name} for expert device repair in ${siteConfig.address.city}, ${siteConfig.address.state}. Phone, computer, tablet, and drone repair services.`,
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      '@type': 'LocalBusiness',
      '@id': `${siteConfig.url}/#business`,
      name: siteConfig.name,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        postalCode: siteConfig.address.zip,
        addressCountry: 'US',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: siteConfig.phone,
          contactType: 'customer service',
          areaServed: 'US',
          availableLanguage: ['English', 'Spanish'],
          hoursAvailable: [
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
        },
        {
          '@type': 'ContactPoint',
          email: siteConfig.email,
          contactType: 'customer support',
          areaServed: 'US',
          availableLanguage: ['English'],
        },
      ],
    },
  };
}

/**
 * Generate Organization schema for the about page
 * Provides rich information about the business
 */
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: 'Nexus Tech',
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/nexus-favicon.png`,
    image: `${siteConfig.url}/images/hero/nexus-storefront-image.jpeg`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    foundingDate: '2024',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        addressCountry: 'US',
      },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: 'US',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Denton',
        '@id': 'https://en.wikipedia.org/wiki/Denton,_Texas',
      },
      { '@type': 'City', name: 'Lewisville' },
      { '@type': 'City', name: 'Flower Mound' },
      { '@type': 'City', name: 'Highland Village' },
      { '@type': 'City', name: 'Corinth' },
      { '@type': 'City', name: 'Lake Dallas' },
    ],
    sameAs: [
      'https://www.facebook.com/NexusTechSolutionsLLC',
      'https://www.instagram.com/nexustechsolutionsllc/',
      'https://www.google.com/maps/place/Nexus+Tech+Solutions',
    ],
    knowsAbout: [
      'iPhone Repair',
      'Samsung Phone Repair',
      'Computer Repair',
      'Laptop Repair',
      'Tablet Repair',
      'iPad Repair',
      'Game Console Repair',
      'Drone Repair',
      'Data Recovery',
      'Device Buyback',
    ],
    slogan: 'Expert Device Repair in Denton, TX',
  };
}

/**
 * Generate FAQ schema for pages with frequently asked questions
 * Helps display FAQ rich snippets in search results
 */
export function generateFAQJsonLd(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList schema for better navigation display in search
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}