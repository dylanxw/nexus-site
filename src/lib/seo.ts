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
    '@id': siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
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
    geo: {
      '@type': 'GeoCoordinates',
      // These would need to be filled in with actual coordinates
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
        opens: '10:00',
        closes: '18:00',
      },
    ],
    serviceArea: {
      '@type': 'City',
      name: 'Denton, TX',
    },
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.trustSignals.rating,
      reviewCount: siteConfig.trustSignals.reviewCount.replace('+', ''),
    },
    paymentAccepted: 'Cash, Credit Card, Check',
    currenciesAccepted: 'USD',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Electronics Repair Services',
      itemListElement: siteConfig.services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
        },
        position: index + 1,
      })),
    },
  };
}