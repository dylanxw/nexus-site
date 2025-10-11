'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit2, Trash2, Upload, Package, Smartphone, Tablet, Laptop, Gamepad2, Watch } from 'lucide-react';
import { toast } from 'sonner';

type RepairModel = {
  id: string;
  name: string;
  brandId: string;
};

type RepairBrand = {
  id: string;
  name: string;
  deviceId: string;
  models: RepairModel[];
};

type RepairDevice = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  order: number;
  active: boolean;
  brands: RepairBrand[];
};

const iconOptions = [
  { value: 'Smartphone', label: 'Smartphone', icon: Smartphone },
  { value: 'Tablet', label: 'Tablet', icon: Tablet },
  { value: 'Laptop', label: 'Laptop', icon: Laptop },
  { value: 'Gamepad2', label: 'Game Console', icon: Gamepad2 },
  { value: 'Watch', label: 'Watch', icon: Watch },
  { value: 'Package', label: 'Package', icon: Package },
];

export default function DeviceManagementPage() {
  const [devices, setDevices] = useState<RepairDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<RepairDevice | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<RepairBrand | null>(null);

  // Dialog states
  const [deviceDialogOpen, setDeviceDialogOpen] = useState(false);
  const [brandDialogOpen, setBrandDialogOpen] = useState(false);
  const [modelDialogOpen, setModelDialogOpen] = useState(false);
  const [bulkUploadDialogOpen, setBulkUploadDialogOpen] = useState(false);

  // Form states
  const [deviceForm, setDeviceForm] = useState({ name: '', icon: 'Package', order: 0, active: true });
  const [brandForm, setBrandForm] = useState({ name: '', deviceId: '' });
  const [modelForm, setModelForm] = useState({ name: '', brandId: '' });
  const [bulkData, setBulkData] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/repairs/devices');
      const data = await response.json();
      setDevices(data.devices);
    } catch (error) {
      toast.error('Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDevice = async () => {
    try {
      const response = await fetch('/api/admin/repairs/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deviceForm),
      });

      if (response.ok) {
        toast.success('Device type created successfully');
        setDeviceDialogOpen(false);
        setDeviceForm({ name: '', icon: 'Package', order: 0, active: true });
        fetchDevices();
      }
    } catch (error) {
      toast.error('Failed to create device type');
    }
  };

  const handleUpdateDevice = async () => {
    try {
      const response = await fetch('/api/admin/repairs/devices', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...deviceForm, id: editingId }),
      });

      if (response.ok) {
        toast.success('Device type updated successfully');
        setDeviceDialogOpen(false);
        setDeviceForm({ name: '', icon: 'Package', order: 0, active: true });
        setEditingId(null);
        fetchDevices();
      }
    } catch (error) {
      toast.error('Failed to update device type');
    }
  };

  const handleDeleteDevice = async (id: string) => {
    if (!confirm('Are you sure? This will delete all brands and models under this device type.')) return;

    try {
      const response = await fetch(`/api/admin/repairs/devices?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Device type deleted successfully');
        fetchDevices();
      }
    } catch (error) {
      toast.error('Failed to delete device type');
    }
  };

  const handleCreateBrand = async () => {
    try {
      const response = await fetch('/api/admin/repairs/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandForm),
      });

      if (response.ok) {
        toast.success('Brand created successfully');
        setBrandDialogOpen(false);
        setBrandForm({ name: '', deviceId: '' });
        fetchDevices();
      }
    } catch (error) {
      toast.error('Failed to create brand');
    }
  };

  const handleDeleteBrand = async (id: string) => {
    if (!confirm('Are you sure? This will delete all models under this brand.')) return;

    try {
      const response = await fetch(`/api/admin/repairs/brands?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Brand deleted successfully');
        fetchDevices();
      }
    } catch (error) {
      toast.error('Failed to delete brand');
    }
  };

  const handleCreateModel = async () => {
    try {
      const response = await fetch('/api/admin/repairs/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modelForm),
      });

      if (response.ok) {
        toast.success('Model created successfully');
        setModelDialogOpen(false);
        setModelForm({ name: '', brandId: '' });
        fetchDevices();
      }
    } catch (error) {
      toast.error('Failed to create model');
    }
  };

  const handleDeleteModel = async (id: string) => {
    if (!confirm('Are you sure you want to delete this model?')) return;

    try {
      const response = await fetch(`/api/admin/repairs/models?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Model deleted successfully');
        fetchDevices();
      }
    } catch (error) {
      toast.error('Failed to delete model');
    }
  };

  const handleBulkUpload = async () => {
    try {
      // Parse CSV data
      const lines = bulkData.trim().split('\n');
      const data = lines.slice(1).map(line => {
        const [deviceType, brand, model] = line.split(',').map(s => s.trim());
        return { deviceType, brand, model };
      });

      const response = await fetch('/api/admin/repairs/bulk-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`Bulk upload complete! Created: ${result.results.created}, Skipped: ${result.results.skipped}`);
        if (result.results.errors.length > 0) {
          console.error('Upload errors:', result.results.errors);
        }
        setBulkUploadDialogOpen(false);
        setBulkData('');
        fetchDevices();
      }
    } catch (error) {
      toast.error('Failed to process bulk upload');
    }
  };

  const getIcon = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName);
    return iconOption ? iconOption.icon : Package;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Device Management</h1>
          <p className="text-gray-600">Manage device types, brands, and models</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setBulkUploadDialogOpen(true)} variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          <Button onClick={() => {
            setDeviceForm({ name: '', icon: 'Package', order: 0, active: true });
            setEditingId(null);
            setDeviceDialogOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Device Type
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {devices.map((device) => {
            const Icon = getIcon(device.icon);
            return (
              <div key={device.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{device.name}</h2>
                      <p className="text-sm text-gray-500">
                        {device.brands.length} brands • Order: {device.order} • {device.active ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeviceForm({
                          name: device.name,
                          icon: device.icon,
                          order: device.order,
                          active: device.active
                        });
                        setEditingId(device.id);
                        setDeviceDialogOpen(true);
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDevice(device.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setBrandForm({ name: '', deviceId: device.id });
                        setBrandDialogOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Brand
                    </Button>
                  </div>
                </div>

                {device.brands.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {device.brands.map((brand) => (
                      <div key={brand.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium">{brand.name}</h3>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteBrand(brand.id)}
                            >
                              <Trash2 className="h-3 w-3 text-red-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setModelForm({ name: '', brandId: brand.id });
                                setSelectedBrand(brand);
                                setModelDialogOpen(true);
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{brand.models.length} models</p>
                        {brand.models.length > 0 && (
                          <div className="space-y-1 max-h-40 overflow-y-auto">
                            {brand.models.map((model) => (
                              <div key={model.id} className="flex items-center justify-between text-sm py-1 px-2 hover:bg-white rounded">
                                <span>{model.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteModel(model.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Trash2 className="h-3 w-3 text-red-600" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Device Dialog */}
      <Dialog open={deviceDialogOpen} onOpenChange={setDeviceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Device Type' : 'Add Device Type'}</DialogTitle>
            <DialogDescription>
              {editingId ? 'Update device type details' : 'Create a new device type'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={deviceForm.name}
                onChange={(e) => setDeviceForm({ ...deviceForm, name: e.target.value })}
                placeholder="e.g., Smartphones"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Icon</label>
              <Select value={deviceForm.icon} onValueChange={(value) => setDeviceForm({ ...deviceForm, icon: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Display Order</label>
              <Input
                type="number"
                value={deviceForm.order}
                onChange={(e) => setDeviceForm({ ...deviceForm, order: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={deviceForm.active}
                onChange={(e) => setDeviceForm({ ...deviceForm, active: e.target.checked })}
                className="h-4 w-4"
              />
              <label className="text-sm font-medium">Active</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeviceDialogOpen(false)}>Cancel</Button>
            <Button onClick={editingId ? handleUpdateDevice : handleCreateDevice}>
              {editingId ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Brand Dialog */}
      <Dialog open={brandDialogOpen} onOpenChange={setBrandDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Brand</DialogTitle>
            <DialogDescription>Create a new brand for this device type</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Brand Name</label>
              <Input
                value={brandForm.name}
                onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                placeholder="e.g., Apple"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBrandDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateBrand}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Model Dialog */}
      <Dialog open={modelDialogOpen} onOpenChange={setModelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Model</DialogTitle>
            <DialogDescription>
              Add a new model for {selectedBrand?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Model Name</label>
              <Input
                value={modelForm.name}
                onChange={(e) => setModelForm({ ...modelForm, name: e.target.value })}
                placeholder="e.g., iPhone 15 Pro Max"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModelDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateModel}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Upload Dialog */}
      <Dialog open={bulkUploadDialogOpen} onOpenChange={setBulkUploadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bulk Upload Devices</DialogTitle>
            <DialogDescription>
              Paste CSV data with format: DeviceType, Brand, Model (one per line)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">CSV Data</label>
              <textarea
                value={bulkData}
                onChange={(e) => setBulkData(e.target.value)}
                placeholder="DeviceType,Brand,Model
Smartphones,Apple,iPhone 15 Pro Max
Smartphones,Apple,iPhone 15 Pro
Smartphones,Samsung,Galaxy S24 Ultra"
                className="w-full h-64 p-3 border rounded-lg font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                First line should be header. Each subsequent line: DeviceType, Brand, Model
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkUploadDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleBulkUpload}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
