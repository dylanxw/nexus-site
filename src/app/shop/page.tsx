"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { ShopHero } from "@/components/shop/shop-hero";
import { ProductFilters } from "@/components/shop/product-filters";
import { ProductGrid } from "@/components/shop/product-grid";

export default function ShopPage() {
  const [filters, setFilters] = useState({
    devices: [] as string[],
    brands: [] as string[],
    conditions: [] as string[],
    storage: [] as string[],
  });

  return (
    <main className="min-h-screen">
      <ShopHero />
      <div className="section-padding bg-gray-50">
        <div className="wide-container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-1/4">
              <ProductFilters filters={filters} onFiltersChange={setFilters} />
            </aside>

            {/* Product Grid */}
            <div className="lg:w-3/4">
              <ProductGrid filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}