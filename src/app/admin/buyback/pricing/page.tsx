"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  RefreshCw,
  Edit,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Upload,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface PricingData {
  id: string;
  model: string;
  deviceType: string;
  modelName: string;
  storage: string;
  network: string;
  series: string | null;
  priceSwap: number | null;
  priceGradeA: number | null;
  priceGradeB: number | null;
  priceGradeC: number | null;
  priceGradeD: number | null;
  priceDOA: number | null;
  crackedBack: number | null;
  crackedLens: number | null;
  lastUpdated: string;
  isActive: boolean;
  overrideGradeA: number | null;
  overrideGradeB: number | null;
  overrideGradeC: number | null;
  overrideGradeD: number | null;
  overrideDOA: number | null;
  overrideSetAt: string | null;
  overrideSetBy: string | null;
  // Cached calculated offer prices (with margins applied)
  offerGradeA: number | null;
  offerGradeB: number | null;
  offerGradeC: number | null;
  offerGradeD: number | null;
  offerDOA: number | null;
  offersCalculatedAt: string | null;
}

interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PricingStats {
  totalModels: number;
  activeModels: number;
  overrideCount: number;
  lastSync: string | null;
}

export default function BuybackPricingPage() {
  const [pricing, setPricing] = useState<PricingData[]>([]);
  const [stats, setStats] = useState<PricingStats | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(""); // What user types
  const [searchQuery, setSearchQuery] = useState(""); // What gets sent to API
  const [deviceFilter, setDeviceFilter] = useState("all");
  const [showOverridesOnly, setShowOverridesOnly] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editOverrides, setEditOverrides] = useState<any>({});
  const [marginSettings, setMarginSettings] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle Enter key press to trigger search
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, [currentPage, searchQuery]); // Re-fetch when search changes

  useEffect(() => {
    fetchMarginSettings();
    fetchStats();
  }, []); // Only fetch margin settings and stats once

  const fetchPricing = async () => {
    try {
      setLoading(true);

      // Build query params with search
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '50',
      });

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/admin/buyback/pricing?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setPricing(data.pricing);
        setPagination(data.pagination);
      } else {
        toast.error("Failed to load pricing data");
      }
    } catch (error) {
      console.error("Error fetching pricing:", error);
      toast.error("Error loading pricing data");
    } finally {
      setLoading(false);
    }
  };

  const fetchMarginSettings = async () => {
    try {
      const response = await fetch("/api/admin/buyback/margins");
      if (response.ok) {
        const data = await response.json();
        setMarginSettings(data.settings);
      }
    } catch (error) {
      console.error("Error fetching margin settings:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/buyback/pricing/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      } else {
        console.error("Failed to load pricing stats");
      }
    } catch (error) {
      console.error("Error fetching pricing stats:", error);
    }
  };

  const calculateBuybackPrice = (atlasPrice: number | null, grade: 'gradeA' | 'gradeB' | 'gradeC' | 'gradeD' | 'gradeDOA') => {
    if (!atlasPrice || !marginSettings) return null;

    let margin = 0;

    if (marginSettings.mode === "percentage") {
      margin = atlasPrice * (marginSettings.percentageMargins[grade] / 100);
    } else {
      const tiers = marginSettings.tieredMargins;
      let tier = tiers.tier1;

      if (atlasPrice >= tiers.tier5.min) tier = tiers.tier5;
      else if (atlasPrice >= tiers.tier4.min) tier = tiers.tier4;
      else if (atlasPrice >= tiers.tier3.min) tier = tiers.tier3;
      else if (atlasPrice >= tiers.tier2.min) tier = tiers.tier2;
      else tier = tiers.tier1;

      margin = tier[grade];
    }

    return Math.max(0, atlasPrice - margin);
  };

  // Calculate price using ONLY global margins (ignoring series overrides)
  const calculateBuybackPriceWithDefaultMargins = (atlasPrice: number | null, grade: 'gradeA' | 'gradeB' | 'gradeC' | 'gradeD' | 'gradeDOA') => {
    if (!atlasPrice || !marginSettings) return null;

    let margin = 0;

    if (marginSettings.mode === "percentage") {
      // Always use global percentage margins (not series override)
      margin = atlasPrice * (marginSettings.percentageMargins[grade] / 100);
    } else {
      const tiers = marginSettings.tieredMargins;
      let tier = tiers.tier1;

      if (atlasPrice >= tiers.tier5.min) tier = tiers.tier5;
      else if (atlasPrice >= tiers.tier4.min) tier = tiers.tier4;
      else if (atlasPrice >= tiers.tier3.min) tier = tiers.tier3;
      else if (atlasPrice >= tiers.tier2.min) tier = tiers.tier2;
      else tier = tiers.tier1;

      margin = tier[grade];
    }

    return Math.max(0, atlasPrice - margin);
  };

  const hasOverride = (item: PricingData) => {
    return !!(item.overrideGradeA || item.overrideGradeB ||
           item.overrideGradeC || item.overrideGradeD ||
           item.overrideDOA);
  };

  const hasSeriesOverrideActive = (item: PricingData) => {
    if (!marginSettings || !item.series) return false;
    return !!(marginSettings.seriesOverrides?.[item.series]?.enabled);
  };

  const handleEditRow = (item: PricingData) => {
    setEditingItemId(item.id);
    // Store both the current values and the original calculated prices for comparison
    setEditOverrides({
      gradeA: item.overrideGradeA ?? calculateBuybackPrice(item.priceGradeA, 'gradeA'),
      gradeB: item.overrideGradeB ?? calculateBuybackPrice(item.priceGradeB, 'gradeB'),
      gradeC: item.overrideGradeC ?? calculateBuybackPrice(item.priceGradeC, 'gradeC'),
      gradeD: item.overrideGradeD ?? calculateBuybackPrice(item.priceGradeD, 'gradeD'),
      gradeDOA: item.overrideDOA ?? calculateBuybackPrice(item.priceDOA, 'gradeDOA'),
      // Store the original item for comparison
      _originalItem: item,
    });
  };

  const handleSaveOverrides = async (itemId: string) => {
    try {
      const item = editOverrides._originalItem;

      // Only send overrides for prices that differ from the calculated price
      const overridesToSave: any = {};

      const grades: Array<'gradeA' | 'gradeB' | 'gradeC' | 'gradeD' | 'gradeDOA'> =
        ['gradeA', 'gradeB', 'gradeC', 'gradeD', 'gradeDOA'];

      const atlasFields: any = {
        gradeA: item.priceGradeA,
        gradeB: item.priceGradeB,
        gradeC: item.priceGradeC,
        gradeD: item.priceGradeD,
        gradeDOA: item.priceDOA,
      };

      grades.forEach(grade => {
        const editedValue = editOverrides[grade];
        const calculatedValue = calculateBuybackPrice(atlasFields[grade], grade);

        // Only save as override if it's different from calculated AND not null/undefined
        if (editedValue !== null && editedValue !== undefined && calculatedValue !== null) {
          // Check if the value actually changed (with small tolerance for floating point)
          if (Math.abs(editedValue - calculatedValue) > 0.01) {
            overridesToSave[grade] = editedValue;
          } else {
            // If it matches the calculated price, clear any existing override
            overridesToSave[grade] = null;
          }
        }
      });

      const response = await fetch(`/api/admin/buyback/pricing/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          overrides: overridesToSave,
          userId: "admin" // TODO: Get from auth context
        }),
      });

      if (response.ok) {
        toast.success("Overrides saved successfully");
        setEditingItemId(null);
        setEditOverrides({});
        fetchPricing();
      } else {
        toast.error("Failed to save overrides");
      }
    } catch (error) {
      console.error("Error saving overrides:", error);
      toast.error("Error saving overrides");
    }
  };

  const handleClearOverride = async (itemId: string, grade?: string) => {
    try {
      const url = grade
        ? `/api/admin/buyback/pricing/${itemId}?grade=${grade}`
        : `/api/admin/buyback/pricing/${itemId}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success(grade ? "Override cleared" : "All overrides cleared");
        fetchPricing();
      } else {
        toast.error("Failed to clear override");
      }
    } catch (error) {
      console.error("Error clearing override:", error);
      toast.error("Error clearing override");
    }
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditOverrides({});
  };

  const handleSyncFromAtlas = async () => {
    const loadingToast = toast.loading("Syncing pricing from Atlas...");
    try {
      const response = await fetch("/api/admin/buyback/pricing/sync", {
        method: "POST",
      });

      if (response.ok) {
        const result = await response.json();
        toast.dismiss(loadingToast);
        toast.success(
          `Successfully synced! Added: ${result.added}, Updated: ${result.updated}`
        );
        fetchPricing();
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed to sync pricing");
      }
    } catch (error) {
      console.error("Error syncing pricing:", error);
      toast.dismiss(loadingToast);
      toast.error("Error syncing pricing");
    }
  };

  // Server handles search, client handles device and override filters
  const filteredPricing = pricing.filter((item) => {
    const matchesDevice = deviceFilter === "all" || item.deviceType === deviceFilter;
    const matchesOverride = !showOverridesOnly || hasOverride(item) || hasSeriesOverrideActive(item);

    return matchesDevice && matchesOverride;
  });

  const overrideCount = pricing.filter(item => hasOverride(item) || hasSeriesOverrideActive(item)).length;

  const deviceTypes = Array.from(new Set(pricing.map((p) => p.deviceType)));

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Buyback Pricing</h1>
              <p className="text-gray-600 mt-1">
                Manage pricing data from Atlas and adjust offers
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={fetchPricing}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={handleSyncFromAtlas} className="bg-[#DB5858] hover:bg-[#c94848]">
                <Upload className="w-4 h-4 mr-2" />
                Sync from Atlas
              </Button>
            </div>
          </div>

          {/* Stats - from API (all data, not just current page) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Models</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.totalModels || 0}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stats?.activeModels || 0}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overrides</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.overrideCount || 0}</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Sync</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {stats?.lastSync
                      ? new Date(stats.lastSync).toLocaleDateString()
                      : "Never"}
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by model... (Press Enter to search)"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={deviceFilter === "all" ? "default" : "outline"}
                  onClick={() => setDeviceFilter("all")}
                  size="sm"
                >
                  All
                </Button>
                {deviceTypes.map((type) => (
                  <Button
                    key={type}
                    variant={deviceFilter === type ? "default" : "outline"}
                    onClick={() => setDeviceFilter(type)}
                    size="sm"
                  >
                    {type}
                  </Button>
                ))}
                {overrideCount > 0 && (
                  <Button
                    variant={showOverridesOnly ? "default" : "outline"}
                    onClick={() => setShowOverridesOnly(!showOverridesOnly)}
                    size="sm"
                    className={showOverridesOnly ? "bg-orange-600 hover:bg-orange-700" : "border-orange-600 text-orange-600 hover:bg-orange-50"}
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Overrides ({overrideCount})
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Network
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade A<br/><span className="text-xs font-normal">(Flawless)</span>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade B<br/><span className="text-xs font-normal">(Good)</span>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade C<br/><span className="text-xs font-normal">(Fair)</span>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade D<br/><span className="text-xs font-normal">(Broken)</span>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DOA<br/><span className="text-xs font-normal">(No Power)</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPricing.map((item, index) => {
                    const isEditing = editingItemId === item.id;
                    const itemHasOverride = hasOverride(item);

                    // Check if this model has a series override active
                    const hasSeriesOverride = hasSeriesOverrideActive(item);

                    const renderGradeCell = (
                      atlasPrice: number | null,
                      grade: 'gradeA' | 'gradeB' | 'gradeC' | 'gradeD' | 'gradeDOA',
                      overridePrice: number | null,
                      cachedOfferPrice: number | null
                    ) => {
                      if (!atlasPrice || !marginSettings) {
                        return <div className="text-sm text-gray-400">—</div>;
                      }

                      // Calculate what the price WOULD be with GLOBAL margins (ignoring series override)
                      const standardCalcPrice = calculateBuybackPriceWithDefaultMargins(atlasPrice, grade);

                      // Priority: 1) Manual Override, 2) Cached Offer (includes series override), 3) Calculate on-the-fly
                      const displayPrice = overridePrice ?? cachedOfferPrice ?? standardCalcPrice;

                      // Determine if this is showing a custom price (either manual override or series override)
                      const hasManualOverride = overridePrice !== null && overridePrice !== undefined;
                      const hasActiveSeriesOverride = hasSeriesOverride && !hasManualOverride && cachedOfferPrice !== null && standardCalcPrice !== null && Math.abs(cachedOfferPrice - standardCalcPrice) > 0.5;

                      if (isEditing) {
                        return (
                          <div className="flex flex-col gap-1">
                            <input
                              type="number"
                              value={editOverrides[grade] || ''}
                              onChange={(e) => setEditOverrides({
                                ...editOverrides,
                                [grade]: Number(e.target.value)
                              })}
                              className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                            />
                            <div className="text-xs text-gray-500">
                              Atlas: ${atlasPrice}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div className="group relative">
                          {hasManualOverride ? (
                            <div>
                              <div className="text-sm text-gray-400 line-through">
                                ${standardCalcPrice?.toFixed(0)}
                              </div>
                              <div className="text-sm font-bold text-orange-600">
                                ${overridePrice?.toFixed(0)}
                              </div>
                              <div className="text-xs text-gray-500">
                                Atlas: ${atlasPrice}
                              </div>
                              <button
                                onClick={() => handleClearOverride(item.id, grade)}
                                className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold shadow-sm"
                              >
                                ×
                              </button>
                            </div>
                          ) : hasActiveSeriesOverride ? (
                            <div>
                              <div className="text-sm text-gray-400 line-through">
                                ${standardCalcPrice?.toFixed(0)}
                              </div>
                              <div className="text-sm font-bold text-orange-600">
                                ${displayPrice?.toFixed(0)}
                              </div>
                              <div className="text-xs text-gray-500">
                                Atlas: ${atlasPrice}
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="text-sm font-bold text-gray-900">
                                ${displayPrice?.toFixed(0)}
                              </div>
                              <div className="text-xs text-gray-500">
                                Atlas: ${atlasPrice}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    };

                    return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className={`hover:bg-gray-50 ${(itemHasOverride || hasSeriesOverride) && !isEditing ? 'bg-orange-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.modelName}</div>
                        <div className="text-xs text-gray-500">{item.storage}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary" className="text-xs">
                          {item.deviceType}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.network}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {renderGradeCell(item.priceGradeA, 'gradeA', item.overrideGradeA, item.offerGradeA)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {renderGradeCell(item.priceGradeB, 'gradeB', item.overrideGradeB, item.offerGradeB)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {renderGradeCell(item.priceGradeC, 'gradeC', item.overrideGradeC, item.offerGradeC)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {renderGradeCell(item.priceGradeD, 'gradeD', item.overrideGradeD, item.offerGradeD)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {renderGradeCell(item.priceDOA, 'gradeDOA', item.overrideDOA, item.offerDOA)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          className={
                            item.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {isEditing ? (
                          <div className="flex flex-col gap-1 min-w-[80px]">
                            <Button
                              size="sm"
                              onClick={() => handleSaveOverrides(item.id)}
                              className="bg-green-600 hover:bg-green-700 text-white w-full"
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancelEdit}
                              className="w-full"
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditRow(item)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        )}
                      </td>
                    </motion.tr>
                  );
                  })}
                </tbody>
              </table>
            </div>

            {filteredPricing.length === 0 && (
              <div className="text-center py-12">
                <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pricing data found</h3>
                <p className="text-gray-500 mb-4">
                  Sync from Atlas to import pricing data
                </p>
                <Button onClick={handleSyncFromAtlas} className="bg-[#DB5858] hover:bg-[#c94848]">
                  <Upload className="w-4 h-4 mr-2" />
                  Sync from Atlas
                </Button>
              </div>
            )}

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of {pagination.totalCount} items
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={!pagination.hasPreviousPage}
                  >
                    Previous
                  </Button>
                  <div className="text-sm text-gray-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
