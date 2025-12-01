import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Nexus Tech Solutions",
  description: "Learn how Nexus Tech Solutions collects, uses, and protects your personal information. Our commitment to your privacy and data security.",
  robots: "index, follow",
  openGraph: {
    title: "Privacy Policy | Nexus Tech Solutions",
    description: "Our privacy policy and data protection practices",
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/privacy`,
    siteName: siteConfig.name,
  },
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 1, 2024";

  return (
    <main className="min-h-screen py-8 md:py-16 lg:py-20">
      <div className="wide-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last Updated: {lastUpdated}</p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <p className="lead text-xl text-gray-700">
                At Nexus Tech Solutions ("we", "our", or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>

              <h3 className="text-xl font-medium mt-6 mb-3">Personal Information</h3>
              <p>We may collect personal information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information (email address, phone number, mailing address)</li>
                <li>Device information when you request repairs or sell devices</li>
                <li>Payment information (processed securely through our payment providers)</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3">Automatically Collected Information</h3>
              <p>When you visit our website, we may automatically collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your repair requests and device sales</li>
                <li>Communicate with you about your orders and services</li>
                <li>Send appointment reminders and service updates</li>
                <li>Improve our website and services</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Prevent fraudulent transactions and protect against illegal activities</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Information Sharing and Disclosure</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following situations:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> We may share information with third-party vendors who perform services on our behalf (e.g., payment processing, email delivery)</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                <li><strong>Protection of Rights:</strong> We may disclose information to protect our rights, property, or safety, or that of others</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights and Choices</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct or update your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Disable cookies through your browser settings</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete that information promptly.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device. You can control cookie settings through your browser preferences, but disabling cookies may limit your ability to use certain features of our website.
              </p>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            {/* California Privacy Rights */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">California Privacy Rights</h2>
              <p>
                If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA). These rights include the right to know what personal information we collect, the right to delete your information, and the right to opt-out of the sale of your personal information (which we do not do).
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="border-t pt-8 mt-12">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
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
              </div>
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