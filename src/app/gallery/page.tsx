import { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Repair Gallery - Before & After",
  description: "See examples of our professional electronics repair work. Before and after photos of phone, tablet, and computer repairs in Denton, TX.",
};

const placeholderRepairs = [
  {
    id: 1,
    title: "iPhone 14 Screen Replacement",
    description: "Cracked screen to pristine condition",
    category: "Screen Repair"
  },
  {
    id: 2,
    title: "MacBook Water Damage Recovery",
    description: "Complete restoration after liquid spill",
    category: "Water Damage"
  },
  {
    id: 3,
    title: "iPad Air Charging Port Repair",
    description: "Replaced damaged charging connector",
    category: "Port Repair"
  },
  {
    id: 4,
    title: "PlayStation 5 Overheating Fix",
    description: "Thermal paste replacement and cleaning",
    category: "Console Repair"
  },
  {
    id: 5,
    title: "Samsung Galaxy Screen Repair",
    description: "Shattered display restored to perfect condition",
    category: "Screen Repair"
  },
  {
    id: 6,
    title: "Data Recovery Success",
    description: "1TB of photos recovered from failed hard drive",
    category: "Data Recovery"
  },
];

export default function GalleryPage() {
  return (
    <div className="container py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Repair Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See examples of our professional repair work. Every device gets the same careful attention to detail.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter by Repair Type</h2>
          <div className="flex flex-wrap gap-2">
            {["All", "Screen Repair", "Water Damage", "Port Repair", "Console Repair", "Data Recovery"].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 text-sm border rounded-md hover:bg-muted transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {placeholderRepairs.map((repair) => (
            <Card key={repair.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <span className="text-sm text-muted-foreground">Before & After Photos</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {repair.category}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{repair.title}</h3>
                <p className="text-sm text-muted-foreground">{repair.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Note about photos */}
        <div className="mt-16 text-center bg-muted/30 rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Real Repair Photos Coming Soon</h2>
          <p className="text-muted-foreground">
            We&apos;re collecting before and after photos of our recent repairs to showcase our quality work.
            Visit us in-store to see examples of completed repairs.
          </p>
        </div>
      </div>
    </div>
  );
}