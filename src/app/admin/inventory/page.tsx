"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Smartphone, Eye, Check, X as XIcon, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { InventoryModal } from "@/components/admin/inventory-modal";

interface InventoryItem {
  Date: string;
  Supplier: string;
  Inventory: string;
  IMEI: string;
  'Battery Health': string;
  Condition: string;
  OriginalGrade?: string;
  Cost: string;
  Price: string;
  'B2B Price': string;
  'Facebook Price': string;
  'Swappa Price': string;
  SKU: string;
  'eBay Price': string;
  'Shopify Price': string;
  Notes: string;
  Status: string;
  Model: string;
  Storage: string;
  Color: string;
  Carrier: string;
  Category?: string;
  Brand?: string;
  Size?: string;
  Material?: string;
  Connectivity?: string;
  websiteStatus?: string;
  description?: string;
  photos?: string[];
  listingId?: string;
}

export default function AdminPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/inventory');

      if (!response.ok) {
        throw new Error('Failed to fetch inventory');
      }

      const data = await response.json();
      setInventory(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleModalSave = () => {
    fetchInventory(); // Refresh the list after save
  };

  const handleRefreshCache = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/admin/refresh-cache', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to refresh cache');
      }

      const data = await response.json();
      alert(`Cache refreshed successfully! ${data.itemsCount} items updated.`);

      // Refresh the inventory display
      await fetchInventory();
    } catch (err) {
      console.error('Error refreshing cache:', err);
      alert('Failed to refresh cache. Check console for details.');
    } finally {
      setRefreshing(false);
    }
  };

  // Filter inventory based on search query
  const filteredInventory = inventory.filter(item => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      item.listingId?.includes(searchQuery) ||
      item.Model?.toLowerCase().includes(query) ||
      item.Inventory?.toLowerCase().includes(query) ||
      item.SKU?.toLowerCase().includes(query) ||
      item.IMEI?.toLowerCase().includes(query)
    );
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getConditionBadgeColor = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case 'new':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'like new':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'damaged':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Inventory</h1>
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchInventory}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-gray-600">Manage product descriptions, photos, and status</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleRefreshCache}
                  disabled={refreshing}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Refreshing...' : 'Sync from Sheets'}
                </Button>
                <Button variant="outline" onClick={fetchInventory}>
                  <Eye className="h-4 w-4 mr-2" />
                  Refresh View
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-md">
              <input
                type="text"
                placeholder="Search by Listing ID, Model, SKU, or IMEI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600">Total Items</h3>
                <p className="text-2xl font-bold text-blue-900">{inventory.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600">Available</h3>
                <p className="text-2xl font-bold text-green-900">
                  {inventory.filter(item => item.websiteStatus === 'available').length}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-600">Draft</h3>
                <p className="text-2xl font-bold text-yellow-900">
                  {inventory.filter(item => item.websiteStatus === 'draft' || !item.websiteStatus).length}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600">With Photos</h3>
                <p className="text-2xl font-bold text-blue-900">
                  {inventory.filter(item => item.photos && item.photos.length > 0).length}
                </p>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Listing ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pricing
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Photos
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
                {filteredInventory.map((item, index) => (
                  <motion.tr
                    key={item.SKU || item.IMEI || `row-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.listingId ? (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#DB5858]">
                            {item.listingId}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400 text-xs">
                          Draft
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <Smartphone className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.Model || item.Inventory}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {item.IMEI || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.Category ? (
                        <Badge variant="secondary" className="text-xs capitalize">
                          {item.Category}
                        </Badge>
                      ) : (
                        <span className="text-xs text-gray-400">Not set</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.Brand ? (
                        <div className="text-sm font-medium text-gray-900">{item.Brand}</div>
                      ) : (
                        <span className="text-xs text-gray-400">Not set</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex flex-wrap gap-1 mb-1">
                          {item.Storage && (
                            <Badge key={`storage-${index}`} variant="secondary" className="text-xs">
                              {item.Storage}
                            </Badge>
                          )}
                          {item.Color && (
                            <Badge key={`color-${index}`} variant="secondary" className="text-xs">
                              {item.Color}
                            </Badge>
                          )}
                          {item.Carrier && (
                            <Badge key={`carrier-${index}`} variant="secondary" className="text-xs">
                              {item.Carrier}
                            </Badge>
                          )}
                          {item.Size && (
                            <Badge key={`size-${index}`} variant="secondary" className="text-xs">
                              {item.Size}
                            </Badge>
                          )}
                          {item.Material && (
                            <Badge key={`material-${index}`} variant="secondary" className="text-xs">
                              {item.Material}
                            </Badge>
                          )}
                          {item.Connectivity && (
                            <Badge key={`connectivity-${index}`} variant="secondary" className="text-xs">
                              {item.Connectivity}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item['Battery Health'] && `Battery: ${item['Battery Health']}`}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge key={`condition-${index}`} className={`${getConditionBadgeColor(item.Condition)} border text-xs`}>
                        {item.OriginalGrade || item.Condition || 'B'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-semibold text-[#DB5858]">
                          Retail: ${parseFloat(item.Price?.toString().replace(/[$,]/g, '') || '0') || 'N/A'}
                        </div>
                        {item.Cost && (
                          <div className="text-xs text-gray-500">
                            Cost: ${parseFloat(item.Cost?.toString().replace(/[$,]/g, '') || '0') || 'N/A'}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.photos && item.photos.length > 0 ? (
                        <div className="flex items-center justify-center">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <XIcon className="h-5 w-5 text-gray-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge key={`status-${index}`} className={`${getStatusBadgeColor(item.websiteStatus || 'draft')} border text-xs`}>
                        {item.websiteStatus === 'available' ? 'Available' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button size="sm" variant="outline" onClick={() => handleEditItem(item)}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {inventory.length === 0 && (
            <div className="text-center py-12">
              <Smartphone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No inventory items found</h3>
              <p className="text-gray-500">Check your Google Sheets to add inventory items.</p>
            </div>
          )}
        </motion.div>

        {/* Modal */}
        <InventoryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleModalSave}
          item={editingItem}
          mode="edit"
        />
      </div>
    </div>
  );
}