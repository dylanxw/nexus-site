import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service | Nexus Tech Solutions",
  description: "Terms and conditions for using Nexus Tech Solutions services including device repair, sales, and buyback programs.",
  robots: "index, follow",
  openGraph: {
    title: "Terms of Service | Nexus Tech Solutions",
    description: "Our terms and conditions for service",
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/terms`,
    siteName: siteConfig.name,
  },
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "December 1, 2024";

  return (
    <main className="min-h-screen py-8 md:py-16 lg:py-20">
      <div className="wide-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last Updated: {lastUpdated}</p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <p className="lead text-xl text-gray-700">
                Welcome to Nexus Tech Solutions. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website and our services, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Our Services</h2>
              <p>Nexus Tech Solutions provides the following services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device repair services for phones, tablets, computers, and gaming consoles</li>
                <li>Sale of pre-owned and refurbished electronics</li>
                <li>Device buyback program</li>
                <li>Tech support and consultation</li>
                <li>Related products and accessories</li>
              </ul>
            </section>

            {/* Repair Services */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Repair Services</h2>

              <h3 className="text-xl font-medium mt-6 mb-3">3.1 Diagnostic and Quote</h3>
              <p>
                We provide free diagnostics for most devices. Repair quotes are estimates and may change upon physical inspection of the device. We will contact you for approval if the repair cost exceeds the original quote.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3">3.2 Repair Warranty</h3>
              <p>
                All repairs come with a 60-day warranty on parts and labor from the date of service completion. This warranty covers defects in parts and workmanship but does not cover:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Physical damage or liquid damage after repair</li>
                <li>Issues unrelated to the original repair</li>
                <li>Damage caused by unauthorized modifications</li>
                <li>Normal wear and tear</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3">3.3 Device Liability</h3>
              <p>
                While we take utmost care with your devices, we are not responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Data loss - please backup your data before service</li>
                <li>Pre-existing conditions not related to our repair</li>
                <li>Devices left unclaimed for more than 30 days</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3">3.4 Abandoned Property</h3>
              <p>
                Devices not picked up within 30 days after notification of repair completion will be considered abandoned. We reserve the right to dispose of or sell abandoned devices to recover repair costs.
              </p>
            </section>

            {/* Pre-Owned Device Sales */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Pre-Owned Device Sales</h2>

              <h3 className="text-xl font-medium mt-6 mb-3">4.1 Product Condition</h3>
              <p>
                All pre-owned devices are thoroughly tested and graded according to condition. Product descriptions accurately reflect the condition at the time of listing. Actual products may vary slightly from photos.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3">4.2 Sales Warranty</h3>
              <p>
                Pre-owned devices come with a 90-day warranty unless otherwise specified. This warranty covers functionality but not cosmetic issues or physical damage after purchase.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3">4.3 Returns and Exchanges</h3>
              <p>
                Returns are accepted within 14 days of purchase for devices in the same condition as sold. Refunds will be issued minus any restocking fees. No returns on clearance items or accessories.
              </p>
            </section>

            {/* Device Buyback Program */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Device Buyback Program</h2>

              <h3 className="text-xl font-medium mt-6 mb-3">5.1 Quote Validity</h3>
              <p>
                Online quotes are estimates based on the information provided and are valid for 7 days. Final pricing is determined after physical inspection of the device.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3">5.2 Device Requirements</h3>
              <p>
                To sell your device, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be the legal owner of the device</li>
                <li>Remove all personal data and accounts</li>
                <li>Provide valid identification</li>
                <li>Disable any security features (Find My iPhone, Google Lock, etc.)</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3">5.3 Payment</h3>
              <p>
                Payment is issued after device inspection and acceptance. We reserve the right to refuse any device that is stolen, has been reported lost, or shows signs of being illegally obtained.
              </p>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Payment Terms</h2>
              <p>
                Payment is due upon completion of repairs or at the time of purchase for products. We accept cash, credit cards, and debit cards. Financing options may be available for qualifying purchases.
              </p>
            </section>

            {/* User Conduct */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. User Conduct</h2>
              <p>When using our services, you agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide false or misleading information</li>
                <li>Attempt to sell stolen or illegally obtained devices</li>
                <li>Use our services for any unlawful purpose</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and software, is the property of Nexus Tech Solutions or its content suppliers and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Disclaimer of Warranties</h2>
              <p>
                Our services are provided "as is" without any warranties, express or implied, except as explicitly stated in these terms. We do not guarantee that our services will be uninterrupted, secure, or error-free.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Nexus Tech Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid by you for the specific service in question.
              </p>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">11. Indemnification</h2>
              <p>
                You agree to indemnify and hold Nexus Tech Solutions harmless from any claims, losses, damages, liabilities, and expenses arising from your violation of these Terms or your use of our services.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Denton County, Texas.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">13. Changes to Terms</h2>
              <p>
                We reserve the right to update or modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">14. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            {/* Contact Information */}
            <section className="border-t pt-8 mt-12">
              <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p className="font-semibold text-lg mb-2">{siteConfig.name}</p>
                <p>{siteConfig.address.street}</p>
                <p>{siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}</p>
                <p className="mt-3">
                  <strong>Phone:</strong>{" "}
                  <a href={`tel:${siteConfig.phone}`} className="text-primary hover:underline">
                    {siteConfig.phoneFormatted}
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                    {siteConfig.email}
                  </a>
                </p>
                <p className="mt-2">
                  <strong>Hours:</strong> {siteConfig.hours.weekday}
                </p>
              </div>
            </section>

            {/* Agreement */}
            <section className="bg-primary/5 p-6 rounded-lg mt-8">
              <p className="font-medium text-center">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </section>

            {/* Back to Home */}
            <div className="text-center pt-8">
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}