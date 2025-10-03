import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Store - Refurbished Devices",
  description: "Quality refurbished phones, tablets, and electronics for sale in Denton, TX. All devices tested and backed by warranty.",
};

const placeholderProducts = [
  {
    id: 1,
    name: "iPhone 13 - Refurbished",
    price: "$449",
    condition: "Excellent",
    image: "/placeholder-phone.jpg"
  },
  {
    id: 2,
    name: "iPad Air - Refurbished",
    price: "$329",
    condition: "Very Good",
    image: "/placeholder-tablet.jpg"
  },
  {
    id: 3,
    name: "MacBook Pro 13\" - Refurbished",
    price: "$799",
    condition: "Good",
    image: "/placeholder-laptop.jpg"
  },
];

export default function StorePage() {
  return (
    <div className="container py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Refurbished Devices</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quality tested and refurbished electronics with warranty. All devices are thoroughly inspected and backed by our guarantee.
          </p>
        </div>

        {/* Filters Placeholder */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            {["All", "iPhones", "Android", "iPads", "Laptops", "Accessories"].map((filter) => (
              <Button key={filter} variant="outline" size="sm">
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {placeholderProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Product Image</span>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <span className="text-sm text-muted-foreground">{product.condition}</span>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <a href={`tel:${siteConfig.phone}`}>
                    Call to Purchase
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-16 text-center bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Online Store Coming Soon</h2>
          <p className="text-lg text-muted-foreground mb-6">
            We&apos;re working on our online store. For now, call us to inquire about available refurbished devices.
          </p>
          <Button asChild size="lg">
            <a href={`tel:${siteConfig.phone}`}>
              Call {siteConfig.phone}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}