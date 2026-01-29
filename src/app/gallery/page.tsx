import { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Repair Gallery | Before & After Photos | Denton TX",
  description: "See examples of our professional electronics repair work. Before and after photos of phone, tablet, and computer repairs in Denton, TX.",
  keywords: [
    "device repair gallery Denton TX",
    "before and after phone repair",
    "iPhone repair photos",
    "Samsung repair examples",
    "professional repair work",
    "screen repair gallery",
    "repair portfolio Denton",
    "device repair photos",
    "electronics repair examples",
    "repair work showcase",
    "console repair photos",
    "water damage repair examples"
  ],
  openGraph: {
    title: "Repair Gallery | Before & After Photos | Denton TX",
    description: "See examples of our professional electronics repair work. Before and after photos of phone, tablet, and computer repairs in Denton, TX.",
    url: `${siteConfig.url}/gallery`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Repair Gallery | Before & After Photos | Denton TX",
    description: "See examples of our professional electronics repair work. Before and after photos in Denton, TX.",
  },
  alternates: {
    canonical: `${siteConfig.url}/gallery`,
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

const repairs = [
  {
    id: 1,
    title: "iPhone 13 Pro Max Back Glass Replacement",
    description: "Shattered back glass restored to pristine condition",
    category: "Back Glass Repair",
    beforeImage: "/images/gallery/iphone 13 pro max back glass repair/before.jpg",
    afterImage: "/images/gallery/iphone 13 pro max back glass repair/after.jpg"
  },
  {
    id: 2,
    title: "PlayStation 5 HDMI Port Repair",
    description: "Professional HDMI port replacement and restoration",
    category: "Console Repair",
    beforeImage: null,
    afterImage: "/images/gallery/playstation 5 hdmi port repiar/ps5 hdmi port repair.jpg"
  },
];

export default function GalleryPage() {
  return (
    <div className="container py-8 lg:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 lg:mb-6">Repair Gallery</h1>
          <p className="text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            See examples of our professional repair work. Every device gets the same careful attention to detail.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="mb-6 lg:mb-8">
          <h2 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Filter by Repair Type</h2>
          <div className="flex flex-wrap gap-2">
            {["All", "Screen Repair", "Water Damage", "Port Repair", "Console Repair", "Data Recovery"].map((filter) => (
              <button
                key={filter}
                className="px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm border rounded-md hover:bg-muted transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2">
          {repairs.map((repair) => {
            const hasBothImages = repair.beforeImage && repair.afterImage;
            const hasSingleImage = (repair.beforeImage || repair.afterImage) && !hasBothImages;

            return (
              <Card key={repair.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                {/* Image Container */}
                {hasBothImages ? (
                  // Before & After side by side with consistent height
                  <div className="grid grid-cols-2 gap-0 h-[280px] lg:h-[400px]">
                    <div className="bg-gradient-to-br from-muted to-muted/50 flex flex-col items-center justify-center border-r relative overflow-hidden">
                      <Image
                        src={repair.beforeImage!}
                        alt={`${repair.title} - Before`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm py-1.5 lg:py-2 z-10">
                        <span className="text-xs lg:text-sm text-white font-medium block text-center">Before</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-muted/50 to-muted flex flex-col items-center justify-center relative overflow-hidden">
                      <Image
                        src={repair.afterImage!}
                        alt={`${repair.title} - After`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm py-1.5 lg:py-2 z-10">
                        <span className="text-xs lg:text-sm text-white font-medium block text-center">After</span>
                      </div>
                    </div>
                  </div>
                ) : hasSingleImage ? (
                  // Single image with consistent height
                  <div className="h-[280px] lg:h-[400px] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src={(repair.beforeImage || repair.afterImage)!}
                      alt={repair.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  // No images - placeholder
                  <div className="h-[280px] lg:h-[400px] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl lg:text-5xl mb-2">📱</div>
                      <span className="text-xs lg:text-sm text-muted-foreground">Before & After Photos</span>
                    </div>
                  </div>
                )}

                {/* Card Info */}
                <div className="p-3 lg:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {repair.category}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm lg:text-base">{repair.title}</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">{repair.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}