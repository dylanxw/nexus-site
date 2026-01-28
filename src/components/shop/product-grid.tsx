"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Battery, Smartphone, Wifi, Monitor, Watch, Gamepad2, Headphones } from "lucide-react";
import { siteConfig } from "@/config/site";

// Inventory item as received from API
interface InventoryItem {
  SKU?: string;
  IMEI?: string;
  Model?: string;
  Brand?: string;
  Category?: string;
  Condition?: string;
  Price?: string | number;
  Storage?: string;
  Color?: string;
  'Battery Health'?: string;
  Carrier?: string;
  Connectivity?: string;
  Notes?: string;
  Size?: string;
  Material?: string;
  RAM?: string;
  CPU?: string;
  GPU?: string;
  photos?: string[];
  description?: string;
  listingId?: string;
  websiteStatus?: string;
}

// API response shape
interface ShopInventoryResponse {
  items: InventoryItem[];
  total: number;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
    hasPrevious: boolean;
  };
  cached: boolean;
}

// Transformed product for display
interface Product {
  id: string;
  model: string;
  brand: string;
  deviceType: string;
  condition: "new" | "like new" | "excellent" | "good" | "fair" | "damaged";
  price: number;
  originalPrice?: number;
  storage: string;
  color: string;
  batteryHealth?: string;
  carrier?: string;
  images: string[];
  features: string[];
  inStock: boolean;
  description?: string;
  listingId?: string;
  // Category-specific fields
  size?: string;
  material?: string;
  connectivity?: string;
  ram?: string;
  cpu?: string;
  gpu?: string;
}

// Mock products - this will be fetched from your inventory API
const mockProducts: Product[] = [
  {
    id: "1",
    model: "iPhone 15 Pro",
    brand: "Apple",
    deviceType: "smartphone",
    condition: "excellent",
    price: 899,
    originalPrice: 999,
    storage: "128GB",
    color: "Natural Titanium",
    batteryHealth: "95%",
    carrier: "Unlocked",
    images: ["/images/products/iphone-15-pro.jpg"],
    features: ["Face ID", "Triple Camera", "5G Ready"],
    inStock: true,
    description: "Like new condition with minimal signs of use"
  },
  {
    id: "2",
    model: "Galaxy S24 Ultra",
    brand: "Samsung",
    deviceType: "smartphone",
    condition: "good",
    price: 749,
    originalPrice: 899,
    storage: "256GB",
    color: "Titanium Black",
    batteryHealth: "88%",
    carrier: "Unlocked",
    images: ["/images/products/galaxy-s24-ultra.jpg"],
    features: ["S Pen", "Quad Camera", "5G Ready"],
    inStock: true,
    description: "Great condition with light wear on corners"
  },
  {
    id: "3",
    model: "iPad Air",
    brand: "Apple",
    deviceType: "tablet",
    condition: "excellent",
    price: 499,
    originalPrice: 599,
    storage: "64GB",
    color: "Space Gray",
    carrier: "WiFi",
    images: ["/images/products/ipad-air.jpg"],
    features: ["Touch ID", "Apple Pencil Compatible", "10.9-inch Display"],
    inStock: true,
    description: "Perfect condition, barely used"
  },
  {
    id: "4",
    model: "iPhone 14",
    brand: "Apple",
    deviceType: "smartphone",
    condition: "good",
    price: 599,
    originalPrice: 799,
    storage: "128GB",
    color: "Blue",
    batteryHealth: "91%",
    carrier: "Unlocked",
    images: ["/images/products/iphone-14.jpg"],
    features: ["Face ID", "Dual Camera", "5G Ready"],
    inStock: false,
    description: "Good condition with minor scratches on back"
  },
  {
    id: "5",
    model: "Pixel 8",
    brand: "Google",
    deviceType: "smartphone",
    condition: "excellent",
    price: 549,
    originalPrice: 699,
    storage: "128GB",
    color: "Obsidian",
    batteryHealth: "93%",
    carrier: "Unlocked",
    images: ["/images/products/pixel-8.jpg"],
    features: ["Magic Eraser", "Night Sight", "5G Ready"],
    inStock: true,
    description: "Excellent condition, well maintained"
  },
  {
    id: "6",
    model: "Galaxy Tab S9",
    brand: "Samsung",
    deviceType: "tablet",
    condition: "fair",
    price: 399,
    originalPrice: 549,
    storage: "128GB",
    color: "Graphite",
    carrier: "WiFi",
    images: ["/images/products/galaxy-tab-s9.jpg"],
    features: ["S Pen Included", "11-inch Display", "Android 14"],
    inStock: true,
    description: "Some wear on corners but fully functional"
  }
];

const conditionColors: Record<string, string> = {
  'new': 'bg-purple-100 text-purple-800 border-purple-300',
  'like new': 'bg-emerald-100 text-emerald-800 border-emerald-300',
  'excellent': 'bg-green-100 text-green-800 border-green-300',
  'good': 'bg-blue-100 text-blue-800 border-blue-300',
  'fair': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'damaged': 'bg-red-100 text-red-800 border-red-300',
};

const conditionLabels: Record<string, string> = {
  'new': 'New',
  'like new': 'Like New',
  'excellent': 'Excellent',
  'good': 'Good',
  'fair': 'Fair',
  'damaged': 'Damaged',
};

interface ProductGridProps {
  filters: {
    devices: string[];
    brands: string[];
    conditions: string[];
    storage: string[];
  };
}

// Calculate "original" price with consistent seeded markup
function calculateOriginalPrice(actualPrice: number, productId: string): number | undefined {
  // Use product ID as seed for consistent results
  const seed = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Only show discount for ~70% of products
  const shouldShowDiscount = (seed % 100) < 70;
  if (!shouldShowDiscount) {
    return undefined; // No original price shown
  }

  const markup = 0.15 + ((seed % 100) / 1000); // 15-25% markup based on ID

  const markedUpPrice = actualPrice * (1 + markup);

  // Round to nearest $5, then subtract 0.01 to make it end in .99
  const roundedToFive = Math.round(markedUpPrice / 5) * 5;
  return roundedToFive - 0.01;
}

export function ProductGrid({ filters }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "newest" | "brand">("newest");
  const [error, setError] = useState<string | null>(null);

  // Fetch products from optimized shop inventory API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Use the new optimized API endpoint that reads from cached data
        const response = await fetch('/api/shop-inventory');

        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }

        const data: ShopInventoryResponse = await response.json();

        // Transform inventory data to product format
        const transformedProducts: Product[] = data.items.map((item: InventoryItem) => {
          // Clean and parse price
          const priceStr = item.Price?.toString().replace(/[$,]/g, '') || '0';
          const price = parseFloat(priceStr) || 0;

          // Use category and brand from API (already auto-detected on backend)
          const deviceType = item.Category || 'smartphone';
          const brand = item.Brand || 'Unknown Brand';

          // Clean battery health - skip if blank or just a dash
          const batteryHealth = item['Battery Health'];
          const cleanBatteryHealth = (batteryHealth && batteryHealth.trim() !== '' && batteryHealth.trim() !== '-')
            ? batteryHealth
            : undefined;

          const productId = item.SKU || item.IMEI || Math.random().toString();
          const originalPrice = calculateOriginalPrice(price, productId);

          // Clean up model name for Apple Watches
          let modelName = item.Model || 'Unknown Model';
          if (deviceType === 'smartwatch' && brand === 'Apple') {
            // Remove parenthetical notes from model name
            modelName = modelName
              .replace(/\s*\([^)]*\)/g, '') // Remove all parenthetical content
              .replace(/\s+/g, ' ') // Clean up extra spaces
              .trim();

            // Extract just the main model name (e.g., "Apple Watch Series 10")
            const watchMatch = modelName.match(/(Apple Watch.*?(?:Series \d+|SE|Ultra))/i);
            if (watchMatch) {
              modelName = watchMatch[1];
            }
          }

          return {
            id: productId,
            model: modelName,
            brand: brand,
            deviceType: deviceType,
            condition: (item.Condition?.toLowerCase() || 'good') as "excellent" | "good" | "fair",
            price: price,
            originalPrice: originalPrice,
            storage: item.Storage || '',
            color: item.Color || '',
            batteryHealth: cleanBatteryHealth,
            carrier: item.Carrier || item.Connectivity || 'Unlocked',
            images: item.photos || [],
            features: [], // Can be populated based on model later
            inStock: true, // Already filtered for in-stock items
            description: item.description || item.Notes || '',
            listingId: item.listingId,
            // Category-specific fields
            size: item.Size || '',
            material: item.Material || '',
            connectivity: item.Connectivity || '',
            ram: item.RAM || '',
            cpu: item.CPU || '',
            gpu: item.GPU || '',
          };
        });

        setProducts(transformedProducts);
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
        // Show empty state with error message instead of fake products
        setProducts([]);
        setError('Unable to load products. Please try again later or call us at ' + siteConfig.phoneFormatted);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Device filter
    if (filters.devices.length > 0 && !filters.devices.includes(product.deviceType)) {
      return false;
    }

    // Brand filter
    if (filters.brands.length > 0) {
      const brandId = product.brand.toLowerCase();
      if (!filters.brands.includes(brandId)) {
        return false;
      }
    }

    // Condition filter
    if (filters.conditions.length > 0) {
      const conditionId = product.condition.toLowerCase();
      if (!filters.conditions.includes(conditionId)) {
        return false;
      }
    }

    // Storage filter
    if (filters.storage.length > 0) {
      const storageId = product.storage.toLowerCase();
      // Check if any filter matches (e.g., "128GB" matches "128gb")
      const hasMatchingStorage = filters.storage.some(filter =>
        storageId.includes(filter.replace('gb', '').replace('tb', ''))
      );
      if (!hasMatchingStorage) {
        return false;
      }
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "brand":
        return a.brand.localeCompare(b.brand);
      case "newest":
      default:
        return 0; // Keep original order for "newest"
    }
  });

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Header */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>

        {/* Loading Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Products</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
            <Button asChild>
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredProducts.length} Device{filteredProducts.length !== 1 ? 's' : ''} Available
          </h2>
          <p className="text-gray-600">Quality pre-owned electronics with warranty</p>
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          aria-label="Sort products by"
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#DB5858] focus:border-transparent"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="brand">Brand A-Z</option>
        </select>
      </div>

      {/* Product Grid */}
      <div
        role="region"
        aria-label="Product listings"
        className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6"
      >
        {sortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-100">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={`${product.brand} ${product.model}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  unoptimized={product.images[0].startsWith('http')}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {/* Dynamic icon based on device type */}
                  {product.deviceType === 'computer' && <Monitor className="h-16 w-16 text-gray-400" aria-hidden="true" />}
                  {product.deviceType === 'smartwatch' && <Watch className="h-16 w-16 text-gray-400" aria-hidden="true" />}
                  {product.deviceType === 'console' && <Gamepad2 className="h-16 w-16 text-gray-400" aria-hidden="true" />}
                  {product.deviceType === 'headphones' && <Headphones className="h-16 w-16 text-gray-400" aria-hidden="true" />}
                  {(product.deviceType === 'smartphone' || product.deviceType === 'tablet' || !product.deviceType) && (
                    <Smartphone className="h-16 w-16 text-gray-400" aria-hidden="true" />
                  )}
                </div>
              )}

              {/* Condition Badge */}
              <div className="absolute top-3 left-3">
                <Badge key={`condition-${product.id}`} className={`${conditionColors[product.condition.toLowerCase()]} border font-medium`}>
                  {conditionLabels[product.condition.toLowerCase()]}
                </Badge>
              </div>

              {/* Stock Status */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge key={`stock-${product.id}`} variant="secondary" className="bg-gray-800 text-white">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-3 md:p-6 flex flex-col h-full">
              {/* Brand & Model */}
              <div className="mb-2 md:mb-3 flex justify-between items-start">
                <div>
                  <p className="text-xs md:text-sm text-[#DB5858] font-semibold">{product.brand}</p>
                  <h3 className="text-sm md:text-lg font-bold text-gray-900">{product.model}</h3>
                </div>
                {/* Listing ID Badge */}
                {product.listingId && (
                  <Badge className="bg-white text-[#DB5858] border-[#DB5858] border-2 font-bold text-[10px] md:text-sm shrink-0 ml-1 md:ml-2">
                    ID: {product.listingId}
                  </Badge>
                )}
              </div>

              {/* Specs */}
              <div className="space-y-1 md:space-y-2 mb-2 md:mb-4 text-xs md:text-sm">
                {/* Smartphones & Tablets */}
                {(product.deviceType === 'smartphone' || product.deviceType === 'tablet') && (
                  <>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {product.storage && (
                        <span className="flex items-center gap-1">
                          <Smartphone className="h-3 w-3" />
                          {product.storage}
                        </span>
                      )}
                      {product.color && <span>{product.color}</span>}
                    </div>
                    {product.batteryHealth && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Battery className="h-3 w-3" />
                        Battery: {product.batteryHealth}
                      </div>
                    )}
                    {product.carrier && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Wifi className="h-3 w-3" />
                        {product.carrier}
                      </div>
                    )}
                  </>
                )}

                {/* Smartwatches - Apple Watch formatting */}
                {product.deviceType === 'smartwatch' && (
                  <>
                    {/* Size and Material on same line */}
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                      {product.size && (
                        <span className="font-medium">{product.size}</span>
                      )}
                      {product.material && (
                        <span>{product.material}</span>
                      )}
                    </div>

                    {/* Connectivity/Carrier info */}
                    {(product.connectivity || product.carrier) && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Wifi className="h-3 w-3" />
                        {product.connectivity || product.carrier}
                      </div>
                    )}

                    {/* Color if present */}
                    {product.color && (
                      <div className="text-sm text-gray-600">
                        {product.color}
                      </div>
                    )}
                  </>
                )}

                {/* Computers */}
                {product.deviceType === 'computer' && (
                  <>
                    {product.ram && (
                      <div className="text-sm text-gray-600">
                        RAM: {product.ram}
                      </div>
                    )}
                    {product.cpu && (
                      <div className="text-sm text-gray-600">
                        CPU: {product.cpu}
                      </div>
                    )}
                    {product.storage && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Smartphone className="h-3 w-3" />
                        {product.storage}
                      </div>
                    )}
                    {product.gpu && (
                      <div className="text-sm text-gray-600">
                        GPU: {product.gpu}
                      </div>
                    )}
                  </>
                )}

                {/* Game Consoles */}
                {product.deviceType === 'console' && (
                  <>
                    {product.storage && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Smartphone className="h-3 w-3" />
                        {product.storage}
                      </div>
                    )}
                    {product.color && (
                      <div className="text-sm text-gray-600">
                        Color: {product.color}
                      </div>
                    )}
                  </>
                )}

                {/* Headphones - Simple display */}
                {product.deviceType === 'headphones' && (
                  <>
                    {product.color && (
                      <div className="text-sm text-gray-600">
                        Color: {product.color}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-2 md:mb-4">
                <div className="flex items-center gap-1 md:gap-2">
                  <span className="text-lg md:text-2xl font-bold text-[#DB5858]">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs md:text-base text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-xs md:text-sm text-green-600 font-medium">
                    Save ${product.originalPrice - product.price}
                  </p>
                )}
              </div>

              {/* Spacer to push button and description to bottom */}
              <div className="flex-grow"></div>

              {/* Description - Above button */}
              {product.description && (
                <p className="text-xs text-gray-500 mb-3">{product.description}</p>
              )}

              {/* Action Buttons - At bottom */}
              <div className="space-y-2 mt-auto">
                <Button
                  size="sm"
                  className="w-full bg-[#DB5858] hover:bg-[#c94848] text-white text-xs md:text-sm py-2"
                  disabled={!product.inStock}
                  asChild
                >
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="h-3 w-3 mr-1" />
                    Call to Purchase
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <Smartphone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No devices found</h3>
          <p className="text-gray-500">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
}