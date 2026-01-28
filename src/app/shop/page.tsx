import { Metadata } from "next";
import { Suspense } from "react";
import { ShopHero } from "@/components/shop/shop-hero";
import ShopClient from "./shop-client";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Shop Pre-Owned Devices | Nexus Tech Solutions",
  description: "Browse our selection of certified pre-owned phones, tablets, computers, smartwatches, and gaming consoles. 90-day warranty on all devices. Best prices in Denton, TX.",
  keywords: "pre-owned phones, used iphones, refurbished electronics, used tablets, gaming consoles, smartwatches, denton tx",
  robots: "index, follow",
  openGraph: {
    title: "Shop Pre-Owned Devices | Nexus Tech Solutions",
    description: "Quality refurbished electronics with 90-day warranty. Phones, tablets, computers, and more.",
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/shop`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/shop-preowned-devices/shop-pre-owned-devices.webp`,
        width: 1200,
        height: 630,
        alt: "Nexus Tech Solutions - Pre-Owned Devices"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Pre-Owned Devices | Nexus Tech Solutions",
    description: "Quality refurbished electronics with warranty",
    images: [`${siteConfig.url}/images/shop-preowned-devices/shop-pre-owned-devices.webp`],
  },
  alternates: {
    canonical: `${siteConfig.url}/shop`,
  },
};

// Fetch initial products on the server for SEO
async function getInitialProducts() {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
    const res = await fetch(`${baseUrl}/api/shop-inventory?limit=20`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
      cache: 'force-cache',
    });

    if (!res.ok) {
      console.error('Failed to fetch initial products:', res.status);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching initial products:', error);
    return null;
  }
}

// Add JSON-LD structured data for product listing
function generateJsonLd(products: { items: Record<string, string>[]; total: number } | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Pre-Owned Devices',
    description: 'Quality refurbished electronics with warranty',
    numberOfItems: products?.total || 0,
    itemListElement: products?.items?.slice(0, 10).map((product: Record<string, string>, index: number) => ({
      '@type': 'Product',
      position: index + 1,
      name: `${product.Brand} ${product.Model}`,
      description: product.description || `Pre-owned ${product.Brand} ${product.Model} in ${product.Condition} condition`,
      offers: {
        '@type': 'Offer',
        price: product.Price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        itemCondition: `https://schema.org/${product.Condition === 'New' ? 'NewCondition' : 'RefurbishedCondition'}`,
        seller: {
          '@type': 'Organization',
          name: siteConfig.name,
        },
      },
    })) || [],
  };
}

export default async function ShopPage() {
  const initialProducts = await getInitialProducts();

  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd(initialProducts)),
        }}
      />

      <main className="min-h-screen">
        <ShopHero />
        <Suspense fallback={
          <div className="py-4 md:py-16 lg:py-20 bg-gray-50">
            <div className="wide-container">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading products...</p>
                </div>
              </div>
            </div>
          </div>
        }>
          <ShopClient initialProducts={initialProducts} />
        </Suspense>
      </main>
    </>
  );
}