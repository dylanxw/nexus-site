import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SimpleAboutHero } from "@/components/about/simple-hero";
import { OurStory } from "@/components/about/our-story";
import { CoreValues } from "@/components/about/core-values";
import { WhyChooseUs } from "@/components/about/why-choose-us";
import { generateOrganizationJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us | Nexus Tech Solutions - Denton, TX Device Repair",
  description: "Learn about Nexus Tech Solutions, founded in Denton, TX. Our mission is to provide honest, reliable device repair with exceptional customer care.",
  keywords: [
    "About Nexus Tech Solutions",
    "Denton TX device repair company",
    "local tech repair business",
    "founder story device repair",
    "Denton electronics repair history",
    "independent tech repair shop",
    "community tech services",
    "device repair mission",
    "local business Denton TX",
    "tech repair values",
    "honest device repair",
    "reliable tech services",
    "UNT area tech repair",
    "North Texas electronics",
    "family owned tech business"
  ],
  openGraph: {
    title: "About Us | Nexus Tech Solutions - Local Device Repair Experts",
    description: "Discover the story behind Nexus Tech Solutions and our commitment to providing exceptional device repair services to the Denton, TX community.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Nexus Tech Solutions - Local Device Repair Experts",
    description: "Learn about our mission to provide honest, reliable device repair services to Denton, TX and surrounding areas.",
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function AboutPage() {
  const organizationJsonLd = generateOrganizationJsonLd();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "About Us", url: `${siteConfig.url}/about` },
  ]);

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SimpleAboutHero />
      <OurStory />
      <CoreValues />
      <WhyChooseUs />
    </main>
  );
}