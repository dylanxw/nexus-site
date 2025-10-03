"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Save, Loader2, Upload, Image as ImageIcon } from "lucide-react";

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
  RAM?: string;
  CPU?: string;
  GPU?: string;
  Size?: string;
  Material?: string;
  Connectivity?: string;
  Controllers?: string;
  Accessories?: string;
}

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  item?: InventoryItem;
  mode: 'add' | 'edit';
}

export function InventoryModal({ isOpen, onClose, onSave, item, mode }: InventoryModalProps) {
  const [formData, setFormData] = useState({
    description: '',
    photos: [] as string[],
    status: 'draft',
    batteryHealth: '',
    brand: '',
    category: '',
    // Category-specific fields
    ram: '',
    cpu: '',
    gpu: '',
    size: '',
    material: '',
    connectivity: '',
    controllers: '',
    accessories: '',
    color: '',
  });
  const [listingId, setListingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing metadata when modal opens
  useEffect(() => {
    if (isOpen && item) {
      const id = item.SKU || item.IMEI;
      fetch(`/api/inventory/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setFormData({
              description: data.data.description || '',
              photos: data.data.photos || [],
              status: data.data.status || 'draft',
              batteryHealth: data.data.batteryHealth || '',
              brand: data.data.brand || item.Brand || '',
              category: data.data.category || item.Category || '',
              ram: data.data.ram || item.RAM || '',
              cpu: data.data.cpu || item.CPU || '',
              gpu: data.data.gpu || item.GPU || '',
              size: data.data.size || item.Size || '',
              material: data.data.material || item.Material || '',
              connectivity: data.data.connectivity || item.Connectivity || '',
              controllers: data.data.controllers || item.Controllers || '',
              accessories: data.data.accessories || item.Accessories || '',
              color: data.data.color || item.Color || '',
            });
            setListingId(data.data.listingId || null);
          }
        })
        .catch(err => console.error('Error loading metadata:', err));
    }
  }, [isOpen, item]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = `/api/inventory/${item?.SKU || item?.IMEI}`;
      const method = 'PUT';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save item');
      }

      const result = await response.json();

      // Update listing ID if it was generated
      if (result.data?.listingId) {
        setListingId(result.data.listingId);
      }

      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPhotos.push(reader.result as string);
        if (newPhotos.length === files.length) {
          setFormData(prev => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Item</h2>
            <p className="text-sm text-gray-600 mt-1">
              {item?.Model || item?.Inventory} - {item?.SKU}
              {item?.OriginalGrade && (
                <span className="ml-2 text-[#DB5858] font-medium">
                  Grade: {item.OriginalGrade}
                </span>
              )}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Sheet Notes (Read-only) */}
            {item?.Notes && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes from Sheet
                </label>
                <p className="text-sm text-gray-600">
                  {item.Notes}
                </p>
              </div>
            )}

            {/* Category & Brand - Side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                >
                  <option value="">Select category...</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="tablet">Tablet</option>
                  <option value="computer">Computer/Laptop</option>
                  <option value="smartwatch">Smartwatch</option>
                  <option value="headphones">Headphones/Audio</option>
                  <option value="console">Game Console</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {item?.Category ? (
                    <>Auto: <strong>{item.Category}</strong></>
                  ) : (
                    'Auto-detected'
                  )}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => handleChange('brand', e.target.value)}
                  placeholder={item?.Brand || 'e.g., Apple, Samsung'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {item?.Brand ? (
                    <>Auto: <strong>{item.Brand}</strong></>
                  ) : (
                    'Auto-detected'
                  )}
                </p>
              </div>
            </div>

            {/* Battery Health - Only for smartphones and tablets */}
            {(formData.category === 'smartphone' || formData.category === 'tablet') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Battery Health (Website Display)
                </label>
                <input
                  type="text"
                  value={formData.batteryHealth}
                  onChange={(e) => handleChange('batteryHealth', e.target.value)}
                  placeholder={item?.['Battery Health'] ? `Sheet value: ${item['Battery Health']}` : 'e.g., 95%'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {item?.['Battery Health'] ? (
                    <>Sheet value: <strong>{item['Battery Health']}</strong>. Override it here for website display (e.g., just the percentage)</>
                  ) : (
                    'Enter battery health to display on website (e.g., 95%)'
                  )}
                </p>
              </div>
            )}

            {/* Computer-specific fields */}
            {formData.category === 'computer' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RAM <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.ram}
                      onChange={(e) => handleChange('ram', e.target.value)}
                      placeholder="e.g., 16GB"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CPU <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.cpu}
                      onChange={(e) => handleChange('cpu', e.target.value)}
                      placeholder="e.g., M3 Pro, Intel i7"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPU (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.gpu}
                    onChange={(e) => handleChange('gpu', e.target.value)}
                    placeholder="e.g., RTX 4060, Integrated"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                  />
                </div>
              </>
            )}

            {/* Smartwatch-specific fields */}
            {formData.category === 'smartwatch' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.size}
                      onChange={(e) => handleChange('size', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                    >
                      <option value="">Select size...</option>
                      <option value="38mm">38mm</option>
                      <option value="40mm">40mm</option>
                      <option value="41mm">41mm</option>
                      <option value="42mm">42mm</option>
                      <option value="44mm">44mm</option>
                      <option value="45mm">45mm</option>
                      <option value="49mm">49mm</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      {item?.Size ? (
                        <>Auto: <strong>{item.Size}</strong></>
                      ) : (
                        'Auto-detected from title'
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.material}
                      onChange={(e) => handleChange('material', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                    >
                      <option value="">Select material...</option>
                      <option value="Aluminum">Aluminum</option>
                      <option value="Stainless Steel">Stainless Steel</option>
                      <option value="Titanium">Titanium</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      {item?.Material ? (
                        <>Auto: <strong>{item.Material}</strong></>
                      ) : (
                        'Auto-detected from title'
                      )}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Connectivity <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.connectivity}
                      onChange={(e) => handleChange('connectivity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                    >
                      <option value="">Select connectivity...</option>
                      <option value="GPS Only">GPS Only</option>
                      <option value="GPS + Cellular">GPS + Cellular</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      {item?.Connectivity ? (
                        <>Auto: <strong>{item.Connectivity}</strong></>
                      ) : (
                        'Auto-detected from title'
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => handleChange('color', e.target.value)}
                      placeholder={item?.Color || 'e.g., Midnight, Starlight'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {item?.Color ? (
                        <>Auto: <strong>{item.Color}</strong></>
                      ) : (
                        'Auto-detected (if in title)'
                      )}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Game Console-specific fields */}
            {formData.category === 'console' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Included Controllers
                  </label>
                  <input
                    type="text"
                    value={formData.controllers}
                    onChange={(e) => handleChange('controllers', e.target.value)}
                    placeholder="e.g., 1, 2, or None"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Included Accessories (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.accessories}
                    onChange={(e) => handleChange('accessories', e.target.value)}
                    placeholder="e.g., HDMI cable, power adapter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                  />
                </div>
              </>
            )}

            {/* Product Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Add a short description for this product (e.g., condition details, included accessories, etc.)"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be displayed on the product page
              </p>
            </div>

            {/* Product Photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Photos
              </label>

              {/* Photo Upload Button */}
              <div className="mb-4">
                <label className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#DB5858] transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload photos</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Photo Preview Grid */}
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858] text-base"
              >
                <option value="draft">Draft</option>
                <option value="available">Available - {listingId ? `Will keep ID: ${listingId}` : 'Will generate 4-digit Listing ID'}</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {formData.status === 'available' ? (
                  listingId ? (
                    <span className="font-semibold text-[#DB5858]">Listing ID: {listingId}</span>
                  ) : (
                    <span className="font-semibold text-green-600">A unique 4-digit Listing ID will be generated when you save</span>
                  )
                ) : (
                  'Only products marked as "Available" will show on the shop page'
                )}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#DB5858] hover:bg-[#c94848]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}