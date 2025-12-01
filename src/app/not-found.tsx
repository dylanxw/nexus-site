import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Home, Search, Wrench, ShoppingCart, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Nexus Tech Solutions",
  description: "The page you're looking for could not be found. Let us help you find what you need.",
  robots: "noindex, follow",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary/20 select-none">404</div>
          <div className="relative -mt-8">
            <div className="h-16 w-16 mx-auto rounded-full brand-gradient flex items-center justify-center text-white shadow-xl">
              <Search className="h-8 w-8" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you may have typed the URL incorrectly.
        </p>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>
          <Link
            href="/services"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
          >
            <Wrench className="h-5 w-5" />
            <span>View Services</span>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="border-t pt-8">
          <h2 className="text-lg font-semibold mb-4">Popular Pages</h2>
          <div className="grid gap-2 sm:grid-cols-2 text-sm">
            <Link href="/repair" className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors">
              <Wrench className="h-4 w-4 text-primary" />
              <span>Schedule a Repair</span>
            </Link>
            <Link href="/shop" className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <span>Shop Pre-Owned Devices</span>
            </Link>
            <Link href="/sell-a-device" className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors">
              <span className="text-primary">💰</span>
              <span>Sell Your Device</span>
            </Link>
            <Link href="/about" className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors">
              <span className="text-primary">ℹ️</span>
              <span>About Us</span>
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground mb-3">
            Need help? Contact us directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">{siteConfig.phoneFormatted}</span>
            </a>
            <div className="text-sm">
              <p>{siteConfig.hours.display}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}