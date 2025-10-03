import { Metadata } from "next";
import { slugToModel, getModelSEO } from "@/lib/model-utils";
import { getMaxPriceForModel } from "@/lib/backend/pricing-service";

export async function generateMetadata({ params }: { params: Promise<{ model: string }> }): Promise<Metadata> {
  const { model: modelSlug } = await params;
  const modelName = slugToModel(modelSlug);

  // Fetch dynamic max price from database
  const maxPrice = await getMaxPriceForModel(modelName);

  if (maxPrice === 0) {
    return {
      title: "iPhone Model Not Found | Nexus Tech Solutions",
      description: "The iPhone model you're looking for is not available in our buyback program.",
    };
  }

  const seo = getModelSEO(modelName, maxPrice);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: `https://nexustechsolutions.com/buyback/iphone/${modelSlug}`,
      images: [
        {
          url: `/images/buyback/sell-iphone/apple-${modelSlug}.avif`,
          width: 1200,
          height: 630,
          alt: `Sell ${modelName} for cash - Get up to $${maxPrice}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [`/images/buyback/sell-iphone/apple-${modelSlug}.avif`],
    },
    alternates: {
      canonical: `/buyback/iphone/${modelSlug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default function IPhoneModelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}