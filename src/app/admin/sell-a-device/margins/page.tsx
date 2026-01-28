"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, Save, TrendingUp, Calculator, Info, Percent, Hash, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type MarginMode = "percentage" | "tiered";

interface PercentageMargins {
  gradeA: number;  // Flawless
  gradeB: number;  // Good
  gradeC: number;  // Fair
  gradeD: number;  // Broken
  gradeDOA: number; // No Power
}

interface SeriesOverride {
  enabled: boolean;
  margins: PercentageMargins;
}

interface SeriesOverrides {
  [series: string]: SeriesOverride; // e.g., "17", "16", "15", etc.
}

interface TieredMargins {
  tier1: { min: 0; max: 100; gradeA: number; gradeB: number; gradeC: number; gradeD: number; gradeDOA: number };
  tier2: { min: 100; max: 300; gradeA: number; gradeB: number; gradeC: number; gradeD: number; gradeDOA: number };
  tier3: { min: 300; max: 500; gradeA: number; gradeB: number; gradeC: number; gradeD: number; gradeDOA: number };
  tier4: { min: 500; max: 750; gradeA: number; gradeB: number; gradeC: number; gradeD: number; gradeDOA: number };
  tier5: { min: 750; max: 999999; gradeA: number; gradeB: number; gradeC: number; gradeD: number; gradeDOA: number };
}

interface MarginSettings {
  mode: MarginMode;
  percentageMargins: PercentageMargins;
  tieredMargins: TieredMargins;
  seriesOverrides?: SeriesOverrides;
}

const defaultSettings: MarginSettings = {
  mode: "percentage",
  percentageMargins: {
    gradeA: 25,   // 25% margin on Flawless
    gradeB: 20,   // 20% margin on Good
    gradeC: 12,   // 12% margin on Fair (competitive!)
    gradeD: 22,   // 22% margin on Broken
    gradeDOA: 30, // 30% margin on No Power
  },
  tieredMargins: {
    tier1: { min: 0, max: 100, gradeA: 30, gradeB: 25, gradeC: 15, gradeD: 35, gradeDOA: 40 },
    tier2: { min: 100, max: 300, gradeA: 60, gradeB: 50, gradeC: 30, gradeD: 55, gradeDOA: 70 },
    tier3: { min: 300, max: 500, gradeA: 100, gradeB: 80, gradeC: 50, gradeD: 85, gradeDOA: 110 },
    tier4: { min: 500, max: 750, gradeA: 140, gradeB: 110, gradeC: 70, gradeD: 120, gradeDOA: 150 },
    tier5: { min: 750, max: 999999, gradeA: 180, gradeB: 150, gradeC: 90, gradeD: 150, gradeDOA: 180 },
  },
  seriesOverrides: {}
};

const IPHONE_SERIES = ["17", "16", "15", "14", "13", "12", "11", "X", "XS", "XR", "8", "7", "SE"];

export default function SimplifiedMarginPage() {
  const [settings, setSettings] = useState<MarginSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seriesAccordionOpen, setSeriesAccordionOpen] = useState(false);

  // Test calculator
  const [testPrice, setTestPrice] = useState(500);
  const [testCondition, setTestCondition] = useState<"gradeA" | "gradeB" | "gradeC" | "gradeD" | "gradeDOA">("gradeA");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/buyback/margins");
      if (response.ok) {
        const data = await response.json();
        if (data.settings) {
          // Ensure the settings have the new structure
          const loadedSettings = {
            mode: data.settings.mode || defaultSettings.mode,
            percentageMargins: data.settings.percentageMargins || defaultSettings.percentageMargins,
            tieredMargins: data.settings.tieredMargins || defaultSettings.tieredMargins,
            seriesOverrides: data.settings.seriesOverrides || {},
          };
          setSettings(loadedSettings);
        } else {
          // No settings found, use defaults
          setSettings(defaultSettings);
        }
      } else {
        // API error, use defaults
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      const response = await fetch("/api/admin/buyback/margins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast.success("Margin settings saved successfully!");
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const calculateOffer = (atlasPrice: number, condition: "gradeA" | "gradeB" | "gradeC" | "gradeD" | "gradeDOA") => {
    let margin = 0;

    if (settings.mode === "percentage" && settings.percentageMargins) {
      // Percentage mode: Simple percentage of Atlas price
      margin = atlasPrice * (settings.percentageMargins[condition] / 100);
    } else if (settings.mode === "tiered" && settings.tieredMargins) {
      // Tiered mode: Find the right tier and use the dollar amount
      const tiers = settings.tieredMargins;

      // Define tier type for proper TypeScript inference
      type TierType = typeof tiers.tier1 | typeof tiers.tier2 | typeof tiers.tier3 | typeof tiers.tier4 | typeof tiers.tier5;
      let tier: TierType = tiers.tier1;

      if (atlasPrice >= tiers.tier5.min) tier = tiers.tier5;
      else if (atlasPrice >= tiers.tier4.min) tier = tiers.tier4;
      else if (atlasPrice >= tiers.tier3.min) tier = tiers.tier3;
      else if (atlasPrice >= tiers.tier2.min) tier = tiers.tier2;
      else tier = tiers.tier1;

      margin = tier[condition];
    }

    const offer = atlasPrice - margin;
    return { offer: Math.max(0, offer), margin };
  };

  const toggleSeriesOverride = (series: string) => {
    const currentOverrides = settings.seriesOverrides || {};
    const isEnabled = currentOverrides[series]?.enabled;

    if (isEnabled) {
      // Disable the override
      const newOverrides = { ...currentOverrides };
      delete newOverrides[series];
      setSettings({ ...settings, seriesOverrides: newOverrides });
    } else {
      // Enable with default margins (copy from global)
      setSettings({
        ...settings,
        seriesOverrides: {
          ...currentOverrides,
          [series]: {
            enabled: true,
            margins: { ...settings.percentageMargins }
          }
        }
      });
    }
  };

  const updateSeriesMargin = (series: string, grade: keyof PercentageMargins, value: number) => {
    const currentOverrides = settings.seriesOverrides || {};
    setSettings({
      ...settings,
      seriesOverrides: {
        ...currentOverrides,
        [series]: {
          ...currentOverrides[series],
          enabled: true,
          margins: {
            ...currentOverrides[series].margins,
            [grade]: value
          }
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const testResult = calculateOffer(testPrice, testCondition);
  const activeOverridesCount = Object.keys(settings.seriesOverrides || {}).length;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Margin Settings</h1>
            <p className="text-gray-600 mt-1">
              Set percentage margins for each device grade
              {activeOverridesCount > 0 && (
                <span className="ml-2 text-[#DB5858] font-medium">
                  • {activeOverridesCount} series override{activeOverridesCount !== 1 ? 's' : ''} active
                </span>
              )}
            </p>
          </div>
          <Button
            onClick={saveSettings}
            disabled={saving}
            className="bg-[#DB5858] hover:bg-[#c94848]"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Global Percentage Margins */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Percent className="w-5 h-5 mr-2 text-[#DB5858]" />
              Global Grade Margins
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Default margins applied to all devices (unless overridden by series)
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Grade A (Flawless)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="70"
                    step="1"
                    value={settings.percentageMargins.gradeA}
                    onChange={(e) => setSettings({
                      ...settings,
                      percentageMargins: { ...settings.percentageMargins, gradeA: Number(e.target.value) }
                    })}
                    className="w-32"
                  />
                  <div className="w-16 text-center">
                    <span className="text-lg font-bold text-[#DB5858]">
                      {settings.percentageMargins.gradeA}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Grade B (Good)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="70"
                    step="1"
                    value={settings.percentageMargins.gradeB}
                    onChange={(e) => setSettings({
                      ...settings,
                      percentageMargins: { ...settings.percentageMargins, gradeB: Number(e.target.value) }
                    })}
                    className="w-32"
                  />
                  <div className="w-16 text-center">
                    <span className="text-lg font-bold text-[#DB5858]">
                      {settings.percentageMargins.gradeB}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Grade C (Fair)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="70"
                    step="1"
                    value={settings.percentageMargins.gradeC}
                    onChange={(e) => setSettings({
                      ...settings,
                      percentageMargins: { ...settings.percentageMargins, gradeC: Number(e.target.value) }
                    })}
                    className="w-32"
                  />
                  <div className="w-16 text-center">
                    <span className="text-lg font-bold text-[#DB5858]">
                      {settings.percentageMargins.gradeC}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Grade D (Broken)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="70"
                    step="1"
                    value={settings.percentageMargins.gradeD}
                    onChange={(e) => setSettings({
                      ...settings,
                      percentageMargins: { ...settings.percentageMargins, gradeD: Number(e.target.value) }
                    })}
                    className="w-32"
                  />
                  <div className="w-16 text-center">
                    <span className="text-lg font-bold text-[#DB5858]">
                      {settings.percentageMargins.gradeD}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">DOA (No Power)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="70"
                    step="1"
                    value={settings.percentageMargins.gradeDOA}
                    onChange={(e) => setSettings({
                      ...settings,
                      percentageMargins: { ...settings.percentageMargins, gradeDOA: Number(e.target.value) }
                    })}
                    className="w-32"
                  />
                  <div className="w-16 text-center">
                    <span className="text-lg font-bold text-[#DB5858]">
                      {settings.percentageMargins.gradeDOA}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Tip:</strong> Lower percentages on Grade C devices to stay competitive for refurbishment opportunities!
              </p>
            </div>
          </div>

          {/* Right Column - Calculator & Examples */}
          <div className="space-y-6">
            {/* Test Calculator */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-[#DB5858]" />
                Test Your Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Atlas Price
                  </label>
                  <input
                    type="number"
                    value={testPrice}
                    onChange={(e) => setTestPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade/Condition
                  </label>
                  <select
                    value={testCondition}
                    onChange={(e) => setTestCondition(e.target.value as "gradeA" | "gradeB" | "gradeC" | "gradeD" | "gradeDOA")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="gradeA">Grade A (Flawless)</option>
                    <option value="gradeB">Grade B (Good)</option>
                    <option value="gradeC">Grade C (Fair)</option>
                    <option value="gradeD">Grade D (Broken)</option>
                    <option value="gradeDOA">DOA (No Power)</option>
                  </select>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Atlas Price:</span>
                      <span className="font-medium">${testPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Your Margin:</span>
                      <span className="font-medium text-green-600">
                        ${testResult.margin.toFixed(0)} ({((testResult.margin / testPrice) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Customer Offer:</span>
                      <span className="text-[#DB5858]">${testResult.offer.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-2">How it works:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Atlas price × Grade margin % = Your margin</li>
                    <li>Atlas price - Your margin = Customer offer</li>
                    <li>Adjust Grade C % lower for competitive refurb pricing</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Series Overrides Accordion - Bottom */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200">
          <button
            onClick={() => setSeriesAccordionOpen(!seriesAccordionOpen)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-[#DB5858]" />
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  iPhone Series Overrides
                  {activeOverridesCount > 0 && (
                    <span className="bg-[#DB5858] text-white text-xs font-bold px-2 py-1 rounded-full">
                      {activeOverridesCount}
                    </span>
                  )}
                </h2>
                <p className="text-sm text-gray-600">
                  Set custom margins for specific iPhone series
                </p>
              </div>
            </div>
            {seriesAccordionOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {seriesAccordionOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 p-5"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {IPHONE_SERIES.map((series) => {
                  const isActive = settings.seriesOverrides?.[series]?.enabled;
                  return (
                    <div key={series} className="relative group">
                      <button
                        onClick={() => !isActive && toggleSeriesOverride(series)}
                        className={`
                          w-full px-3 py-2 rounded-lg text-sm font-medium transition-all border-2
                          ${isActive
                            ? 'bg-[#DB5858] border-[#DB5858] text-white'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#DB5858] cursor-pointer'
                          }
                          ${isActive ? 'cursor-default' : ''}
                        `}
                      >
                        iPhone {series} Series
                        {isActive && ' ✓'}
                      </button>
                      {isActive && (
                        <button
                          onClick={() => toggleSeriesOverride(series)}
                          className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Active Series Override Panels */}
              {activeOverridesCount > 0 && (
                <div className="space-y-3 mt-4">
                  {Object.entries(settings.seriesOverrides || {})
                    .filter(([_, override]) => override.enabled)
                    .map(([series, override]) => (
                      <div key={series} className="bg-gray-50 rounded-lg border border-gray-300 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-gray-900">iPhone {series} Series</h3>
                          <button
                            onClick={() => toggleSeriesOverride(series)}
                            className="text-xs text-red-600 hover:text-red-700 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                          {(Object.keys(override.margins) as Array<keyof PercentageMargins>).map((grade) => {
                            const labels = {
                              gradeA: 'A (Flawless)',
                              gradeB: 'B (Good)',
                              gradeC: 'C (Fair)',
                              gradeD: 'D (Broken)',
                              gradeDOA: 'DOA (No Power)'
                            };
                            return (
                              <div key={grade} className="flex items-center justify-between bg-white p-2 rounded border border-gray-200">
                                <label className="text-gray-700 font-medium text-xs">{labels[grade]}</label>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="range"
                                    min="5"
                                    max="70"
                                    step="1"
                                    value={override.margins[grade]}
                                    onChange={(e) => updateSeriesMargin(series, grade, Number(e.target.value))}
                                    className="w-16"
                                  />
                                  <span className="font-bold text-[#DB5858] w-10 text-right text-sm">
                                    {override.margins[grade]}%
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
        </motion.div>
      </div>
    </div>
  );
}