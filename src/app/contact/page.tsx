import { Metadata } from "next";
import { ContactHero } from "@/components/contact/hero";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Nexus Tech Solutions - Device Repair in Denton, TX",
  description: "Contact Nexus Tech Solutions for expert device repair in Denton, TX. Visit our store, call for quotes, or schedule repairs. iPhone, iPad, Samsung, computer, drone repair services.",
  keywords: "contact Nexus Tech Solutions, device repair Denton TX, repair shop location, phone repair near me, computer repair Denton, drone repair contact",
  openGraph: {
    title: "Contact Us | Nexus Tech Solutions - Device Repair in Denton, TX",
    description: "Get in touch with Denton's premier device repair shop. Same-day repairs, expert technicians, 60-day warranty.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Nexus Tech Solutions - Device Repair in Denton, TX",
    description: "Contact Denton's trusted device repair experts. Same-day service for phones, tablets, computers, and drones.",
  },
  alternates: {
    canonical: "/contact",
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