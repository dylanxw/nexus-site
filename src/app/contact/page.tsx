import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/hero";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us | Nexus Tech Solutions - Device Repair in Denton, TX",
  description: "Contact Nexus Tech Solutions for expert device repair in Denton, TX. Visit our store at 3305 S Mayhill Rd, call 940-600-1012, or schedule repairs online. iPhone, Samsung, computer, drone repair.",
  keywords: [
    "contact Nexus Tech Solutions",
    "device repair Denton TX",
    "repair shop location Denton",
    "phone repair near me",
    "computer repair Denton contact",
    "drone repair contact",
    "Denton repair shop hours",
    "device repair quote",
    "repair shop Denton Texas",
    "tech repair Denton phone number",
    "iPhone repair contact",
    "Samsung repair Denton",
    "laptop repair contact",
    "UNT device repair",
  ],
  openGraph: {
    title: "Contact Us | Nexus Tech Solutions - Device Repair in Denton, TX",
    description: "Get in touch with Denton's premier device repair shop. Same-day repairs, expert technicians, 60-day warranty.",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Nexus Tech Solutions - Device Repair in Denton, TX",
    description: "Contact Denton's trusted device repair experts. Same-day service for phones, tablets, computers, and drones.",
  },
  alternates: {
    canonical: `${siteConfig.url}/contact`,
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

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <ContactInfo />
    </main>
  );
}