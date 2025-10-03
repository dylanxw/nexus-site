import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Repair Services",
  description: "Professional electronics repair services in Denton, TX. iPhone, Mac, PC, tablet, and game console repairs with 60-day warranty.",
};

export default function ServicesPage() {
  return (
    <div className="container py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Repair Services</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Professional electronics repair with 60-day warranty and same-day service in Denton, TX.
        </p>

        <div className="grid gap-12">
          {siteConfig.services.map((service) => (
            <div key={service.id} id={service.id} className="border-b pb-8 last:border-b-0">
              <h2 className="text-2xl font-semibold mb-4">{service.name}</h2>
              <p className="text-lg text-muted-foreground mb-6">{service.description}</p>

              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Common Repairs Include:</h3>
                <p className="text-muted-foreground">
                  Detailed service information will be added here. Contact us for specific repair needs and pricing.
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Don&apos;t See Your Device?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            We repair many types of electronics. Call us to discuss your specific repair needs.
          </p>
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Call {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>
  );
}