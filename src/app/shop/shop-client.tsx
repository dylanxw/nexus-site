"use client";

import { useState } from "react";
import { ProductFilters } from "@/components/shop/product-filters";
import { ProductGrid } from "@/components/shop/product-grid";
import { ShopErrorBoundary } from "@/components/shop/shop-error-boundary";

interface ShopClientProps {
  initialProducts?: {
    items: Record<string, unknown>[];
    total: number;
  } | null;
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const [filters, setFilters] = useState({
    devices: [] as string[],
    brands: [] as string[],
    conditions: [] as string[],
    storage: [] as string[],
  });

  return (
    <ShopErrorBoundary>
      <div className="py-4 md:py-16 lg:py-20 bg-gray-50">
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
    </ShopErrorBoundary>
  );
}