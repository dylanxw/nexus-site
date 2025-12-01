import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Nexus Tech Solutions",
  description: "Find answers to common questions about our repair services, warranties, pricing, and more. Get the information you need about electronics repair in Denton, TX.",
  robots: "index, follow",
  openGraph: {
    title: "FAQ | Nexus Tech Solutions",
    description: "Common questions about our repair services and policies",
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/faq`,
    siteName: siteConfig.name,
  },
  alternates: {
    canonical: `${siteConfig.url}/faq`,
  },
};

// FAQ data structure
const faqCategories = [
  {
    title: "General Questions",
    faqs: [
      {
        question: "What types of devices do you repair?",
        answer: "We repair a wide variety of electronic devices including iPhones, Samsung phones, other Android devices, iPads, tablets, MacBooks, laptops, desktop computers, gaming consoles (PlayStation, Xbox, Nintendo Switch), drones, smartwatches, and more. If you don't see your device listed, give us a call!"
      },
      {
        question: "Do you offer free diagnostics?",
        answer: "Yes! We provide free diagnostics for most devices. We'll examine your device, identify the issue, and provide you with a quote before any repair work begins. There's no obligation to proceed with the repair."
      },
      {
        question: "Where are you located?",
        answer: `We're located at ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}. We're easily accessible and offer convenient parking for our customers.`
      },
      {
        question: "What are your hours of operation?",
        answer: `We're open Monday through Friday from 10:00 AM to 7:00 PM, Saturday from 1:00 PM to 5:00 PM, and closed on Sunday. You can schedule appointments online 24/7 or call us during business hours.`
      },
    ]
  },
  {
    title: "Repair Services",
    faqs: [
      {
        question: "How long do repairs typically take?",
        answer: "Most common repairs like screen replacements and battery replacements can be completed same-day, often within 1-2 hours. More complex repairs may take 1-3 business days. We'll provide you with an accurate time estimate during diagnosis."
      },
      {
        question: "What warranty do you offer on repairs?",
        answer: "All our repairs come with a 60-day warranty covering parts and labor. This warranty protects against defects in the parts we install and our workmanship. It does not cover physical damage, liquid damage, or issues unrelated to the original repair."
      },
      {
        question: "Do you use original manufacturer parts?",
        answer: "We offer both OEM (Original Equipment Manufacturer) and high-quality aftermarket parts. OEM parts are identical to the original, while our aftermarket parts are carefully selected for quality and reliability. We'll discuss your options and pricing during the quote."
      },
      {
        question: "Will my repair void my manufacturer warranty?",
        answer: "If your device is still under manufacturer warranty, third-party repairs may void that warranty. We recommend checking your warranty status before proceeding. However, many customers choose our services for faster turnaround times and competitive pricing."
      },
      {
        question: "What happens if you can't fix my device?",
        answer: "If we're unable to repair your device, you won't pay for labor - you'll only be charged for any parts used with your approval. In rare cases where a device is beyond repair, we can help you explore replacement options or our buyback program."
      },
    ]
  },
  {
    title: "Pricing & Payment",
    faqs: [
      {
        question: "How much do repairs cost?",
        answer: "Repair costs vary depending on the device and the issue. Common repairs like iPhone screen replacements typically range from $79-$299 depending on the model. We provide free quotes, so you'll know the exact cost before we begin any work."
      },
      {
        question: "Do you offer price matching?",
        answer: "Yes, we offer competitive pricing and will match legitimate written quotes from other local repair shops for the same service using comparable quality parts. The quote must be current and from a business within our service area."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept cash, all major credit cards (Visa, MasterCard, American Express, Discover), and debit cards. Payment is due when you pick up your repaired device."
      },
      {
        question: "Do you offer any discounts?",
        answer: "We periodically offer promotions and discounts. Students and senior citizens may qualify for special pricing on certain services. Ask about current promotions when you visit or call."
      },
    ]
  },
  {
    title: "Pre-Owned Devices & Sales",
    faqs: [
      {
        question: "What warranty comes with pre-owned devices?",
        answer: "All pre-owned devices come with a 90-day warranty covering functionality. This ensures your device works as expected. The warranty does not cover cosmetic issues, physical damage after purchase, or battery wear beyond normal use."
      },
      {
        question: "Are your pre-owned devices unlocked?",
        answer: "Device lock status varies. Many of our phones are unlocked and can work with any carrier, while others may be carrier-specific. Each listing clearly indicates the lock status and compatible carriers."
      },
      {
        question: "Can I return a pre-owned device?",
        answer: "Yes, we offer a 14-day return policy on pre-owned devices. The device must be in the same condition as when purchased. A restocking fee may apply. Clearance items and accessories are final sale."
      },
      {
        question: "Do you test pre-owned devices before selling?",
        answer: "Absolutely! Every pre-owned device undergoes comprehensive testing including screen, battery, cameras, speakers, buttons, ports, and wireless connectivity. We also perform a factory reset to ensure your data privacy."
      },
    ]
  },
  {
    title: "Device Buyback Program",
    faqs: [
      {
        question: "How does the buyback program work?",
        answer: "Simply bring your device to our store for a free evaluation. We'll assess its condition, verify it's not stolen or blacklisted, and make you a cash offer on the spot. If you accept, you'll receive payment immediately."
      },
      {
        question: "What devices do you buy?",
        answer: "We purchase smartphones, tablets, laptops, smartwatches, and gaming consoles. Devices should be in working condition, though we may still offer value for devices with certain issues like cracked screens."
      },
      {
        question: "How do you determine buyback prices?",
        answer: "Our pricing is based on the device model, condition, storage capacity, market demand, and current resale values. We use industry-standard pricing guides and adjust for local market conditions to ensure fair offers."
      },
      {
        question: "What do I need to sell my device?",
        answer: "You'll need a valid government-issued ID and be 18 or older. The device must be fully paid off and not reported as lost or stolen. Remember to backup your data and perform a factory reset before selling."
      },
    ]
  },
  {
    title: "Data & Privacy",
    faqs: [
      {
        question: "Will my data be safe during repair?",
        answer: "We take data privacy seriously. Our technicians are trained to respect customer privacy and won't access personal data unless necessary for testing. However, we always recommend backing up your data before any repair."
      },
      {
        question: "Do you offer data recovery services?",
        answer: "Yes, we offer professional data recovery services for devices with hardware failures, accidental deletion, or corruption. Success rates vary depending on the type and extent of damage. We'll provide an assessment before proceeding."
      },
      {
        question: "Should I remove my password before repair?",
        answer: "For most repairs, you can leave your password enabled. If we need access to test functionality, we'll ask you to temporarily provide it or disable it. For privacy, you can also backup and reset your device before repair."
      },
    ]
  },
  {
    title: "Policies & Procedures",
    faqs: [
      {
        question: "What if I can't pick up my device immediately?",
        answer: "We'll safely store your device for up to 30 days after repair completion. We'll contact you when it's ready. Devices not claimed after 30 days may be subject to storage fees or considered abandoned per our terms of service."
      },
      {
        question: "Do you offer mail-in repairs?",
        answer: "Currently, we only offer in-store service to ensure the best customer experience and avoid shipping risks. This allows us to provide accurate diagnostics and faster turnaround times."
      },
      {
        question: "Can I wait while my device is repaired?",
        answer: "Yes! We have a comfortable waiting area, and many common repairs can be completed while you wait. For longer repairs, you're welcome to drop off your device and we'll contact you when it's ready."
      },
      {
        question: "What COVID-19 safety measures are in place?",
        answer: "We maintain a clean, sanitized environment and follow all local health guidelines. We sanitize all devices before and after repair, and our staff follows strict hygiene protocols for your safety."
      },
    ]
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen py-8 md:py-16 lg:py-20">
      <div className="wide-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our services, policies, and procedures.
            </p>
          </header>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <section key={categoryIndex}>
                <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <details
                      key={faqIndex}
                      className="group bg-card border rounded-lg overflow-hidden"
                    >
                      <summary className="flex justify-between items-center cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                        <span className="font-medium pr-4">{faq.question}</span>
                        <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="px-4 pb-4 pt-2 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Still have questions? */}
          <section className="mt-16 p-8 bg-muted/30 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our friendly team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Call {siteConfig.phoneFormatted}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Contact Us Online
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {siteConfig.hours.display}
            </p>
          </section>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <Link href="/repair" className="text-primary hover:underline">
                Schedule a Repair
              </Link>
              <Link href="/shop" className="text-primary hover:underline">
                Shop Pre-Owned Devices
              </Link>
              <Link href="/sell-a-device" className="text-primary hover:underline">
                Sell Your Device
              </Link>
              <Link href="/services" className="text-primary hover:underline">
                View All Services
              </Link>
              <Link href="/about" className="text-primary hover:underline">
                About Us
              </Link>
              <Link href="/warranty" className="text-primary hover:underline">
                Warranty Information
              </Link>
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}