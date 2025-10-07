"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const conditions = [
  { id: "new", label: "New", description: "Brand new, sealed in box" },
  { id: "like new", label: "Like New", description: "Pristine condition, barely used" },
  { id: "excellent", label: "Excellent", description: "Minimal wear, looks great" },
  { id: "good", label: "Good", description: "Light wear, fully functional" },
  { id: "fair", label: "Fair", description: "Noticeable wear, works perfectly" },
  { id: "damaged", label: "Damaged", description: "Significant wear, discounted" },
];

const storageOptions = [
  { id: "64gb", label: "64GB" },
  { id: "128gb", label: "128GB" },
  { id: "256gb", label: "256GB" },
  { id: "512gb", label: "512GB" },
  { id: "1tb", label: "1TB" },
];

interface ProductFiltersProps {
  filters: {
    devices: string[];
    brands: string[];
    conditions: string[];
    storage: string[];
  };
  onFiltersChange: (filters: any) => void;
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [deviceTypes, setDeviceTypes] = useState<Array<{ id: string; label: string; count: number }>>([]);
  const [brands, setBrands] = useState<Array<{ id: string; label: string; count: number }>>([]);

  // Fetch inventory to calculate counts
  useEffect(() => {
    const fetchInventoryCounts = async () => {
      try {
        const response = await fetch('/api/inventory?inStock=true');
        const data = await response.json();
        const items = data.items || [];

        // Count device types
        const deviceTypeCounts: Record<string, number> = {};
        const brandCounts: Record<string, number> = {};

        items.forEach((item: any) => {
          // Count device types using the Category field from API
          const category = (item.Category || 'smartphone').toLowerCase();
          deviceTypeCounts[category] = (deviceTypeCounts[category] || 0) + 1;

          // Count brands using the Brand field from API
          const brand = (item.Brand || '').toLowerCase();
          if (brand) {
            brandCounts[brand] = (brandCounts[brand] || 0) + 1;
          }
        });

        // Update device types - use singular to match API Category values
        setDeviceTypes([
          { id: "smartphone", label: "Smartphones", count: deviceTypeCounts['smartphone'] || 0 },
          { id: "tablet", label: "Tablets", count: deviceTypeCounts['tablet'] || 0 },
          { id: "computer", label: "Computers", count: deviceTypeCounts['computer'] || 0 },
          { id: "smartwatch", label: "Smartwatches", count: deviceTypeCounts['smartwatch'] || 0 },
          { id: "headphones", label: "Headphones", count: deviceTypeCounts['headphones'] || 0 },
          { id: "console", label: "Game Consoles", count: deviceTypeCounts['console'] || 0 },
        ].filter(type => type.count > 0)); // Only show types with items

        // Update brands - dynamically build from actual data
        const brandList = Object.entries(brandCounts)
          .map(([id, count]) => ({
            id: id.toLowerCase(),
            label: id.charAt(0).toUpperCase() + id.slice(1), // Capitalize first letter
            count
          }))
          .filter(brand => brand.count > 0)
          .sort((a, b) => b.count - a.count); // Sort by count descending

        setBrands(brandList);

      } catch (error) {
        console.error('Error fetching inventory counts:', error);
      }
    };

    fetchInventoryCounts();
  }, []);

  const handleDeviceToggle = (deviceId: string) => {
    const newDevices = filters.devices.includes(deviceId)
      ? filters.devices.filter(id => id !== deviceId)
      : [...filters.devices, deviceId];
    onFiltersChange({ ...filters, devices: newDevices });
  };

  const handleBrandToggle = (brandId: string) => {
    const newBrands = filters.brands.includes(brandId)
      ? filters.brands.filter(id => id !== brandId)
      : [...filters.brands, brandId];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleConditionToggle = (conditionId: string) => {
    const newConditions = filters.conditions.includes(conditionId)
      ? filters.conditions.filter(id => id !== conditionId)
      : [...filters.conditions, conditionId];
    onFiltersChange({ ...filters, conditions: newConditions });
  };

  const handleStorageToggle = (storageId: string) => {
    const newStorage = filters.storage.includes(storageId)
      ? filters.storage.filter(id => id !== storageId)
      : [...filters.storage, storageId];
    onFiltersChange({ ...filters, storage: newStorage });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      devices: [],
      brands: [],
      conditions: [],
      storage: [],
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-[#DB5858]" />
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-[#DB5858] hover:text-[#c94848] hover:bg-[#DB5858]/10"
        >
          Clear All
        </Button>
      </div>

      {/* Device Type */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Device Type</h3>
        <div className="space-y-2">
          {deviceTypes.map((device) => (
            <div key={device.id} className="flex items-center space-x-2">
              <Checkbox
                id={device.id}
                checked={filters.devices.includes(device.id)}
                onCheckedChange={() => handleDeviceToggle(device.id)}
              />
              <Label
                htmlFor={device.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-between w-full cursor-pointer"
              >
                <span>{device.label}</span>
                <span className="text-gray-500">({device.count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={brand.id}
                checked={filters.brands.includes(brand.id)}
                onCheckedChange={() => handleBrandToggle(brand.id)}
              />
              <Label
                htmlFor={brand.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-between w-full cursor-pointer"
              >
                <span>{brand.label}</span>
                <span className="text-gray-500">({brand.count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-semibold text-gray-900">Condition</h3>
          <div className="group relative">
            <Info className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
              <div className="space-y-2">
                <div><strong>New:</strong> Brand new, sealed in box</div>
                <div><strong>Like New:</strong> Pristine condition, barely used</div>
                <div><strong>Excellent:</strong> Minimal wear, looks great</div>
                <div><strong>Good:</strong> Light wear, fully functional</div>
                <div><strong>Fair:</strong> Noticeable wear, works perfectly</div>
                <div><strong>Damaged:</strong> Significant wear, discounted</div>
              </div>
              <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition.id} className="flex items-center space-x-2">
              <Checkbox
                id={condition.id}
                checked={filters.conditions.includes(condition.id)}
                onCheckedChange={() => handleConditionToggle(condition.id)}
              />
              <Label
                htmlFor={condition.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {condition.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Storage */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Storage</h3>
        <div className="space-y-2">
          {storageOptions.map((storage) => (
            <div key={storage.id} className="flex items-center space-x-2">
              <Checkbox
                id={storage.id}
                checked={filters.storage.includes(storage.id)}
                onCheckedChange={() => handleStorageToggle(storage.id)}
              />
              <Label
                htmlFor={storage.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {storage.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-0">
        <Button
          onClick={() => setShowMobileFilters(true)}
          className="w-full bg-[#DB5858] hover:bg-[#c94848] text-white"
        >
          <Filter className="h-4 w-4 mr-2" />
          Show Filters
        </Button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <FilterContent />
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <FilterContent />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}