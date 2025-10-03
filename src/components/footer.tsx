"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/20 border-t border-border/20">
      <div className="wide-container py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 rounded-lg brand-gradient flex items-center justify-center text-white font-bold text-lg shadow-lg">
                N
              </div>
              <span className="font-bold text-2xl text-foreground">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Professional electronics repair in Denton, TX with 60-day warranty and same-day service.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-primary">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-semibold mb-4">Location</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <div>
                  <div>{siteConfig.address.street}</div>
                  <div>{siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}</div>
                </div>
              </div>
              {siteConfig.maps.embedUrl && (
                <a
                  href={siteConfig.maps.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 hover:text-primary"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Hours
            </h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Mon–Fri</span>
                <span>10:00 AM–6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>12:00–6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <div>
                <Link href="/services" className="hover:text-primary">
                  Services
                </Link>
              </div>
              <div>
                <Link href="/store" className="hover:text-primary">
                  Store
                </Link>
              </div>
              <div>
                <Link href="/gallery" className="hover:text-primary">
                  Gallery
                </Link>
              </div>
              {siteConfig.social.google && (
                <div>
                  <a
                    href={siteConfig.social.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary inline-flex items-center space-x-1"
                  >
                    <span>Reviews</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              <div>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </div>
              <div>
                <Link href="/terms" className="hover:text-primary">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}