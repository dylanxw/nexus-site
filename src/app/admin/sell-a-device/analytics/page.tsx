"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingBag,
  Calendar,
  BarChart3,
  PieChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AnalyticsData {
  overview: {
    totalQuotes: number;
    totalValue: number;
    avgQuoteValue: number;
    conversionRate: number;
    totalMargin: number;
  };
  trends: {
    quotesChange: number;
    valueChange: number;
    marginChange: number;
  };
  byDevice: Array<{
    deviceType: string;
    count: number;
    totalValue: number;
    avgValue: number;
  }>;
  byCondition: Array<{
    condition: string;
    count: number;
    percentage: number;
  }>;
  byStatus: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;
  recentQuotes: Array<{
    date: string;
    count: number;
    value: number;
  }>;
}

export default function BuybackAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/sell-a-device/analytics?range=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        toast.error("Failed to load analytics");
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Error loading analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data</h3>
            <p className="text-gray-500">Analytics will appear once you have buyback quotes</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Buyback Analytics</h1>
              <p className="text-gray-600 mt-1">
                Track performance metrics and trends
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={timeRange === "7d" ? "default" : "outline"}
                onClick={() => setTimeRange("7d")}
                size="sm"
              >
                7 Days
              </Button>
              <Button
                variant={timeRange === "30d" ? "default" : "outline"}
                onClick={() => setTimeRange("30d")}
                size="sm"
              >
                30 Days
              </Button>
              <Button
                variant={timeRange === "90d" ? "default" : "outline"}
                onClick={() => setTimeRange("90d")}
                size="sm"
              >
                90 Days
              </Button>
              <Button
                variant={timeRange === "all" ? "default" : "outline"}
                onClick={() => setTimeRange("all")}
                size="sm"
              >
                All Time
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center text-sm">
                  {analytics.trends.quotesChange >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                  )}
                  <span
                    className={
                      analytics.trends.quotesChange >= 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {Math.abs(analytics.trends.quotesChange)}%
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Total Quotes</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {analytics.overview.totalQuotes}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center text-sm">
                  {analytics.trends.valueChange >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                  )}
                  <span
                    className={
                      analytics.trends.valueChange >= 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {Math.abs(analytics.trends.valueChange)}%
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                ${analytics.overview.totalValue.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center text-sm">
                  {analytics.trends.marginChange >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                  )}
                  <span
                    className={
                      analytics.trends.marginChange >= 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {Math.abs(analytics.trends.marginChange)}%
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Total Margin</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                ${analytics.overview.totalMargin.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Avg Quote Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                ${analytics.overview.avgQuoteValue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {analytics.overview.conversionRate}% conversion rate
              </p>
            </motion.div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* By Device Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-gray-600" />
                By Device Type
              </h2>
              <div className="space-y-4">
                {analytics.byDevice.map((device, index) => (
                  <div key={device.deviceType}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {device.deviceType}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {device.count} quotes
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#DB5858] h-2 rounded-full"
                          style={{
                            width: `${(device.count / analytics.overview.totalQuotes) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-16 text-right">
                        ${device.totalValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* By Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-gray-600" />
                By Status
              </h2>
              <div className="space-y-4">
                {analytics.byStatus.map((status) => (
                  <div key={status.status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {status.status.toLowerCase()}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {status.count} ({status.percentage}%)
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#DB5858] h-2 rounded-full"
                        style={{ width: `${status.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* By Condition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-gray-600" />
              By Condition
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {analytics.byCondition.map((condition) => (
                <div key={condition.condition} className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#DB5858"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(condition.percentage / 100) * 251.2} 251.2`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">
                        {condition.percentage}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{condition.condition}</p>
                  <p className="text-xs text-gray-500">{condition.count} quotes</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
