import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Phone, Mail, MapPin, Clock, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Coming Soon | Nexus Tech Solutions",
  description: "Nexus Tech Solutions is launching soon. Expert phone, computer, and electronics repair in Denton, TX.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
    }}>
      <div className="max-w-2xl w-full text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#DB5858] to-[#c94848] mb-6 shadow-lg shadow-[#DB5858]/20">
            <Wrench className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Nexus Tech Solutions
          </h1>
          <p className="text-[#DB5858] text-lg font-medium">
            Phone & Computer Repair
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            🚀 Launching Soon!
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            We're putting the finishing touches on our new website.
            In the meantime, you can still reach us for all your repair needs!
          </p>

          {/* Contact Info */}
          <div className="grid gap-4 md:grid-cols-2 text-left">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-3 bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-[#DB5858] flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold group-hover:text-[#DB5858] transition-colors">
                  {siteConfig.phone}
                </p>
                <p className="text-gray-400 text-sm">Call or Text</p>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-[#DB5858] flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold group-hover:text-[#DB5858] transition-colors text-sm md:text-base">
                  {siteConfig.email}
                </p>
                <p className="text-gray-400 text-sm">Email Us</p>
              </div>
            </a>

            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-[#DB5858] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {siteConfig.address.street}
                </p>
                <p className="text-gray-400 text-sm">
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-[#DB5858] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">Open Now</p>
                <p className="text-gray-400 text-sm">Mon-Sat: 10AM-7PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Preview */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["iPhone Repair", "Samsung Repair", "Computer Repair", "iPad Repair", "Game Console Repair", "Data Recovery"].map((service) => (
            <span
              key={service}
              className="px-4 py-2 bg-white/10 rounded-full text-gray-300 text-sm border border-white/20"
            >
              {service}
            </span>
          ))}
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Nexus Tech Solutions. All rights reserved.
        </p>
      </div>
    </div>
  );
}
