'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Trash2, Upload, Download, Settings2, GripVertical, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type RepairModel = {
  id: string;
  name: string;
  brandId: string;
  issues: { issueId: string }[];
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
  brands: RepairBrand[];
};

type RepairIssue = {
  id: string;
  name: string;
  emoji: string;
};

const iconOptions = [
  { value: 'Smartphone', label: '📱 Smartphone' },
  { value: 'Tablet', label: '📱 Tablet' },
  { value: 'Laptop', label: '💻 Laptop' },
  { value: 'Monitor', label: '🖥️ Desktop' },
  { value: 'Gamepad2', label: '🎮 Gaming Console' },
  { value: 'Watch', label: '⌚ Watch' },
  { value: 'Package', label: '📦 Other' },
];

// Sortable Item Component
function SortableItem({ id, children, onDelete, color = 'blue' }: {
  id: string;
  children: React.ReactNode;
  onDelete: () => void;
  color?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    green: 'bg-green-50 text-green-700 hover:bg-green-100',
    purple: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
    orange: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
  };

  return (
    <span
      ref={setNodeRef}
      style={style}
      className={`group relative inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors cursor-grab active:cursor-grabbing ${colorClasses[color]}`}
    >
      <GripVertical className="h-3 w-3 opacity-40" {...attributes} {...listeners} />
      {children}
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity ml-1"
      >
        <Trash2 className={`h-3 w-3 text-${color}-700 hover:text-red-600`} />
      </button>
    </span>
  );
}

export default function FormConfigPage() {
  const [devices, setDevices] = useState<RepairDevice[]>([]);
  const [issues, setIssues] = useState<RepairIssue[]>([]);
  const [loading, setLoading] = useState(true);

  // New device form
  const [newDevice, setNewDevice] = useState({ name: '', icon: 'Smartphone' });
  const [newBrand, setNewBrand] = useState({ deviceId: '', name: '' });
  const [newModel, setNewModel] = useState({ deviceId: '', brandId: '', name: '' });
  const [newIssue, setNewIssue] = useState({ name: '', emoji: '🔧' });

  // Issue mapping
  const [mappingFilterDevice, setMappingFilterDevice] = useState<string>('');
  const [mappingFilterBrand, setMappingFilterBrand] = useState<string>('');
  const [modelIssueMap, setModelIssueMap] = useState<Map<string, Set<string>>>(new Map());

  // Spreadsheet import
  const [spreadsheetData, setSpreadsheetData] = useState('');

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Load all model-issue mappings when data is loaded
    if (devices.length > 0) {
      loadAllModelIssueMappings();
    }
  }, [devices]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [devicesRes, issuesRes] = await Promise.all([
        fetch('/api/admin/repairs/devices'),
        fetch('/api/admin/repairs/issues')
      ]);

      const devicesData = await devicesRes.json();
      const issuesData = await issuesRes.json();

      setDevices(devicesData.devices);
      setIssues(issuesData.issues);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const addDevice = async () => {
    if (!newDevice.name) return;

    try {
      const res = await fetch('/api/admin/repairs/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDevice),
      });

      if (res.ok) {
        const data = await res.json();
        // Add the new device to the end of the list
        setDevices([...devices, { ...data.device, brands: [] }]);
        toast.success('Device added');
        setNewDevice({ name: '', icon: 'Smartphone' });
      } else {
        toast.error('Failed to add device');
      }
    } catch (error) {
      toast.error('Failed to add device');
    }
  };

  const addBrand = async () => {
    if (!newBrand.name || !newBrand.deviceId) return;

    try {
      const res = await fetch('/api/admin/repairs/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBrand),
      });

      if (res.ok) {
        const data = await res.json();
        // Add the new brand to the device
        setDevices(devices.map(d =>
          d.id === newBrand.deviceId
            ? { ...d, brands: [...d.brands, { ...data.brand, models: [] }] }
            : d
        ));
        toast.success('Brand added');
        setNewBrand({ ...newBrand, name: '' }); // Keep deviceId selected
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Failed to add brand');
      }
    } catch (error) {
      toast.error('Failed to add brand');
    }
  };

  const addModel = async () => {
    if (!newModel.name || !newModel.brandId) return;

    // Split by comma and trim whitespace
    const modelNames = newModel.name.split(',').map(name => name.trim()).filter(name => name);

    if (modelNames.length === 0) return;

    try {
      const results = await Promise.all(
        modelNames.map(name =>
          fetch('/api/admin/repairs/models', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newModel, name }),
          })
        )
      );

      const successfulModels: RepairModel[] = [];
      let errorCount = 0;

      for (let i = 0; i < results.length; i++) {
        if (results[i].ok) {
          const data = await results[i].json();
          successfulModels.push(data.model);
        } else {
          errorCount++;
        }
      }

      // Update state with all successful models
      if (successfulModels.length > 0) {
        setDevices(devices.map(d => ({
          ...d,
          brands: d.brands.map(b =>
            b.id === newModel.brandId
              ? { ...b, models: [...b.models, ...successfulModels] }
              : b
          )
        })));
      }

      if (successfulModels.length > 0 && errorCount === 0) {
        toast.success(`${successfulModels.length} model${successfulModels.length > 1 ? 's' : ''} added`);
      } else if (successfulModels.length > 0 && errorCount > 0) {
        toast.success(`${successfulModels.length} added, ${errorCount} skipped (duplicates)`);
      } else {
        toast.error('Failed to add models');
      }

      setNewModel({ ...newModel, name: '' }); // Keep deviceId and brandId selected
    } catch (error) {
      toast.error('Failed to add models');
    }
  };

  const bulkDeleteModels = async () => {
    if (!newModel.brandId) return;

    const brand = devices.flatMap(d => d.brands).find(b => b.id === newModel.brandId);
    const device = devices.find(d => d.brands.some(b => b.id === newModel.brandId));

    if (!brand || !device || brand.models.length === 0) return;

    if (!confirm(`Delete all ${brand.models.length} models for ${device.name} - ${brand.name}?`)) return;

    try {
      await Promise.all(
        brand.models.map(model =>
          fetch(`/api/admin/repairs/models?id=${model.id}`, { method: 'DELETE' })
        )
      );

      setDevices(devices.map(d => ({
        ...d,
        brands: d.brands.map(b =>
          b.id === newModel.brandId
            ? { ...b, models: [] }
            : b
        )
      })));

      toast.success(`Deleted ${brand.models.length} models`);
    } catch (error) {
      toast.error('Failed to delete models');
    }
  };

  const addIssue = async () => {
    if (!newIssue.name) return;

    try {
      const res = await fetch('/api/admin/repairs/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newIssue, deviceIds: [] }),
      });

      if (res.ok) {
        const data = await res.json();
        // Add the new issue to the end of the list
        setIssues([...issues, data.issue]);
        toast.success('Issue added');
        setNewIssue({ name: '', emoji: '🔧' });
      } else {
        toast.error('Failed to add issue');
      }
    } catch (error) {
      toast.error('Failed to add issue');
    }
  };

  const loadAllModelIssueMappings = async () => {
    try {
      const allModels = devices.flatMap(d => d.brands.flatMap(b => b.models));

      if (allModels.length === 0) {
        setModelIssueMap(new Map());
        return;
      }

      // Batch request - fetch all model issues in one API call
      const modelIds = allModels.map(m => m.id).join(',');
      const res = await fetch(`/api/admin/repairs/model-issues?modelIds=${modelIds}`);
      const data = await res.json();

      const mappings = new Map<string, Set<string>>();
      Object.entries(data.modelIssues).forEach(([modelId, issues]: [string, any]) => {
        const issueIds = new Set<string>(issues.map((i: any) => i.issueId));
        mappings.set(modelId, issueIds);
      });

      setModelIssueMap(mappings);
    } catch (error) {
      console.error('Failed to load model-issue mappings');
    }
  };

  const toggleIssueForModel = (modelId: string, issueId: string) => {
    const currentIssues = modelIssueMap.get(modelId) || new Set();
    const newIssues = new Set(currentIssues);

    if (newIssues.has(issueId)) {
      newIssues.delete(issueId);
    } else {
      newIssues.add(issueId);
    }

    // Optimistic update - update UI immediately
    const newMap = new Map(modelIssueMap);
    newMap.set(modelId, newIssues);
    setModelIssueMap(newMap);

    // Save to database in background
    fetch('/api/admin/repairs/model-issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        modelId,
        issueIds: Array.from(newIssues)
      }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update');
      }
    })
    .catch((error) => {
      // Revert on error
      const revertMap = new Map(modelIssueMap);
      revertMap.set(modelId, currentIssues);
      setModelIssueMap(revertMap);
      toast.error('Failed to update');
    });
  };

  const toggleAllForIssue = (issueId: string, modelIds: string[]) => {
    if (modelIds.length === 0) return;

    // Check if all filtered models have this issue
    const allChecked = modelIds.every(modelId =>
      modelIssueMap.get(modelId)?.has(issueId)
    );

    const newMap = new Map(modelIssueMap);
    const updates: Array<{ modelId: string; issueIds: string[] }> = [];

    // Update UI immediately
    modelIds.forEach(modelId => {
      const currentIssues = modelIssueMap.get(modelId) || new Set();
      const newIssues = new Set(currentIssues);

      if (allChecked) {
        newIssues.delete(issueId);
      } else {
        newIssues.add(issueId);
      }

      newMap.set(modelId, newIssues);
      updates.push({
        modelId,
        issueIds: Array.from(newIssues)
      });
    });

    setModelIssueMap(newMap);

    // Save all to database in background - fire and forget
    updates.forEach(({ modelId, issueIds }) => {
      fetch('/api/admin/repairs/model-issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelId, issueIds }),
      }).catch(() => {
        // Silently fail, will reload on any error
      });
    });

    toast.success(`Updated ${modelIds.length} models`);
  };

  const downloadTemplate = () => {
    const csv = `DeviceType\tBrand\tModel
Smartphones\tApple\tiPhone 15 Pro Max
Smartphones\tApple\tiPhone 15 Pro
Smartphones\tSamsung\tGalaxy S24 Ultra
Gaming Consoles\tSony\tPlayStation 5
Gaming Consoles\tNintendo\tSwitch OLED`;

    const blob = new Blob([csv], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'devices-template.txt';
    a.click();
    toast.success('Template downloaded');
  };

  const importSpreadsheet = async () => {
    if (!spreadsheetData.trim()) return;

    try {
      const lines = spreadsheetData.trim().split('\n');
      const data = lines.slice(1).map(line => {
        const [deviceType, brand, model] = line.split('\t').map(s => s.trim());
        return { deviceType, brand, model };
      });

      const res = await fetch('/api/admin/repairs/bulk-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(`Imported: ${result.results.created} created, ${result.results.skipped} skipped`);
        setSpreadsheetData('');
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to import');
    }
  };

  // Drag handlers
  const handleDeviceDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = devices.findIndex(d => d.id === active.id);
    const newIndex = devices.findIndex(d => d.id === over.id);

    const reordered = arrayMove(devices, oldIndex, newIndex);
    setDevices(reordered);

    // Update order in database
    try {
      await Promise.all(
        reordered.map((device, index) =>
          fetch('/api/admin/repairs/devices', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: device.id, order: index }),
          })
        )
      );
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const handleIssueDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = issues.findIndex(i => i.id === active.id);
    const newIndex = issues.findIndex(i => i.id === over.id);

    const reordered = arrayMove(issues, oldIndex, newIndex);
    setIssues(reordered);

    // Update order in database
    try {
      await Promise.all(
        reordered.map((issue, index) =>
          fetch('/api/admin/repairs/issues', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: issue.id, order: index }),
          })
        )
      );
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const handleBrandDragEnd = async (event: DragEndEvent, deviceId: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const device = devices.find(d => d.id === deviceId);
    if (!device) return;

    const oldIndex = device.brands.findIndex(b => b.id === active.id);
    const newIndex = device.brands.findIndex(b => b.id === over.id);

    const reorderedBrands = arrayMove(device.brands, oldIndex, newIndex);

    // Update local state
    setDevices(devices.map(d =>
      d.id === deviceId ? { ...d, brands: reorderedBrands } : d
    ));

    // Update order in database
    try {
      await Promise.all(
        reorderedBrands.map((brand, index) =>
          fetch('/api/admin/repairs/brands', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: brand.id, order: index }),
          })
        )
      );
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const handleModelDragEnd = async (event: DragEndEvent, brandId: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const brand = devices.flatMap(d => d.brands).find(b => b.id === brandId);
    if (!brand) return;

    const oldIndex = brand.models.findIndex(m => m.id === active.id);
    const newIndex = brand.models.findIndex(m => m.id === over.id);

    const reorderedModels = arrayMove(brand.models, oldIndex, newIndex);

    // Update local state
    setDevices(devices.map(d => ({
      ...d,
      brands: d.brands.map(b =>
        b.id === brandId ? { ...b, models: reorderedModels } : b
      )
    })));

    // Update order in database
    try {
      await Promise.all(
        reorderedModels.map((model, index) =>
          fetch('/api/admin/repairs/models', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: model.id, order: index }),
          })
        )
      );
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Settings2 className="h-8 w-8 text-blue-600" />
          Form Configuration
        </h1>
        <p className="text-gray-600">Manage devices, brands, models, and link issues to specific models</p>
      </div>

      <div className="space-y-6 mb-8">
        {/* Top Row - Data Entry Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
          {/* Add Device */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">1. Add Device Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Device name (e.g., Smartphones)"
                value={newDevice.name}
                onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
              />
              <Select value={newDevice.icon} onValueChange={(v) => setNewDevice({ ...newDevice, icon: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addDevice} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>

              {/* Current Devices */}
              {devices.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs font-medium text-gray-500 mb-2">CURRENT (drag to reorder):</p>
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDeviceDragEnd}>
                    <SortableContext items={devices.map(d => d.id)} strategy={horizontalListSortingStrategy}>
                      <div className="flex flex-wrap gap-1">
                        {devices.map((device) => (
                          <SortableItem
                            key={device.id}
                            id={device.id}
                            color="blue"
                            onDelete={async () => {
                              if (confirm(`Delete "${device.name}"? This will delete all brands and models under it.`)) {
                                try {
                                  await fetch(`/api/admin/repairs/devices?id=${device.id}`, { method: 'DELETE' });
                                  setDevices(devices.filter(d => d.id !== device.id));
                                  toast.success('Device deleted');
                                } catch (error) {
                                  toast.error('Failed to delete');
                                }
                              }
                            }}
                          >
                            {device.name}
                          </SortableItem>
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add Brand */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">2. Add Brand</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select value={newBrand.deviceId} onValueChange={(v) => setNewBrand({ ...newBrand, deviceId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  {devices.map((d) => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Brand name (e.g., Apple)"
                value={newBrand.name}
                onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
              />
              <Button onClick={addBrand} className="w-full" disabled={!newBrand.deviceId}>
                <Plus className="h-4 w-4 mr-2" />
                Add Brand
              </Button>

              {/* Current Brands */}
              {newBrand.deviceId && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    CURRENT FOR {devices.find(d => d.id === newBrand.deviceId)?.name} (drag to reorder):
                  </p>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(e) => handleBrandDragEnd(e, newBrand.deviceId)}
                  >
                    <SortableContext
                      items={devices.find(d => d.id === newBrand.deviceId)?.brands.map(b => b.id) || []}
                      strategy={horizontalListSortingStrategy}
                    >
                      <div className="flex flex-wrap gap-1">
                        {devices.find(d => d.id === newBrand.deviceId)?.brands.map((brand) => (
                          <SortableItem
                            key={brand.id}
                            id={brand.id}
                            color="green"
                            onDelete={async () => {
                              if (confirm(`Delete "${brand.name}"? This will delete all models under it.`)) {
                                try {
                                  await fetch(`/api/admin/repairs/brands?id=${brand.id}`, { method: 'DELETE' });
                                  setDevices(devices.map(d =>
                                    d.id === newBrand.deviceId
                                      ? { ...d, brands: d.brands.filter(b => b.id !== brand.id) }
                                      : d
                                  ));
                                  toast.success('Brand deleted');
                                } catch (error) {
                                  toast.error('Failed to delete');
                                }
                              }
                            }}
                          >
                            {brand.name}
                          </SortableItem>
                        )) || <span className="text-xs text-gray-400 italic">None yet</span>}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add Model */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3. Add Model</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Select value={newModel.deviceId} onValueChange={(v) => setNewModel({ deviceId: v, brandId: '', name: '' })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select device type" />
                  </SelectTrigger>
                  <SelectContent>
                    {devices.map((d) => (
                      <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newModel.brandId} onValueChange={(v) => setNewModel({ ...newModel, brandId: v })} disabled={!newModel.deviceId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {devices.find(d => d.id === newModel.deviceId)?.brands.map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="Model name (e.g., iPhone 15 Pro Max)"
                value={newModel.name}
                onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
              />
              <Button onClick={addModel} className="w-full" disabled={!newModel.brandId}>
                <Plus className="h-4 w-4 mr-2" />
                Add Model
              </Button>

              {/* Current Models */}
              {newModel.brandId && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-gray-500">
                      CURRENT FOR {(() => {
                        const brand = devices.flatMap(d => d.brands).find(b => b.id === newModel.brandId);
                        const device = devices.find(d => d.brands.some(b => b.id === newModel.brandId));
                        return `${device?.name} - ${brand?.name}`;
                      })()} (drag to reorder):
                    </p>
                    {((devices.flatMap(d => d.brands).find(b => b.id === newModel.brandId)?.models?.length) ?? 0) > 0 && (
                      <Button
                        onClick={bulkDeleteModels}
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Delete All
                      </Button>
                    )}
                  </div>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(e) => handleModelDragEnd(e, newModel.brandId)}
                  >
                    <SortableContext
                      items={devices.flatMap(d => d.brands).find(b => b.id === newModel.brandId)?.models.map(m => m.id) || []}
                      strategy={horizontalListSortingStrategy}
                    >
                      <div className="flex flex-wrap gap-1">
                        {devices.flatMap(d => d.brands).find(b => b.id === newModel.brandId)?.models.map((model) => (
                          <SortableItem
                            key={model.id}
                            id={model.id}
                            color="purple"
                            onDelete={async () => {
                              if (confirm(`Delete "${model.name}"?`)) {
                                try {
                                  await fetch(`/api/admin/repairs/models?id=${model.id}`, { method: 'DELETE' });
                                  setDevices(devices.map(d => ({
                                    ...d,
                                    brands: d.brands.map(b =>
                                      b.id === newModel.brandId
                                        ? { ...b, models: b.models.filter(m => m.id !== model.id) }
                                        : b
                                    )
                                  })));
                                  toast.success('Model deleted');
                                } catch (error) {
                                  toast.error('Failed to delete');
                                }
                              }
                            }}
                          >
                            {model.name}
                          </SortableItem>
                        )) || <span className="text-xs text-gray-400 italic">None yet</span>}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add Issue */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">4. Add Repair Issue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Issue name (e.g., Screen Damage)"
                value={newIssue.name}
                onChange={(e) => setNewIssue({ ...newIssue, name: e.target.value })}
              />
              <Input
                placeholder="Emoji"
                value={newIssue.emoji}
                onChange={(e) => setNewIssue({ ...newIssue, emoji: e.target.value })}
                maxLength={2}
              />
              <Button onClick={addIssue} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Issue
              </Button>

              {/* Current Issues */}
              {issues.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs font-medium text-gray-500 mb-2">CURRENT (drag to reorder):</p>
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleIssueDragEnd}>
                    <SortableContext items={issues.map(i => i.id)} strategy={horizontalListSortingStrategy}>
                      <div className="flex flex-wrap gap-1">
                        {issues.map((issue) => (
                          <SortableItem
                            key={issue.id}
                            id={issue.id}
                            color="orange"
                            onDelete={async () => {
                              if (confirm(`Delete "${issue.name}"?`)) {
                                try {
                                  await fetch(`/api/admin/repairs/issues?id=${issue.id}`, { method: 'DELETE' });
                                  setIssues(issues.filter(i => i.id !== issue.id));
                                  toast.success('Issue deleted');
                                } catch (error) {
                                  toast.error('Failed to delete');
                                }
                              }
                            }}
                          >
                            {issue.emoji} {issue.name}
                          </SortableItem>
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              )}
            </CardContent>
          </Card>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Current Config Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm mb-4">
                <p><strong>{devices.length}</strong> Device Types</p>
                <p><strong>{devices.flatMap(d => d.brands).length}</strong> Brands</p>
                <p><strong>{devices.flatMap(d => d.brands.flatMap(b => b.models)).length}</strong> Models</p>
                <p><strong>{issues.length}</strong> Repair Issues</p>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>

        {/* Full Width - Issue Mapping Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">5. Link Issues to Models</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Import
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bulk Import (Spreadsheet)</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    <Button onClick={downloadTemplate} variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                    <textarea
                      className="w-full h-32 p-3 border rounded-lg font-mono text-sm"
                      placeholder="Paste from Excel/Sheets (tab-separated)"
                      value={spreadsheetData}
                      onChange={(e) => setSpreadsheetData(e.target.value)}
                    />
                    <Button onClick={importSpreadsheet} className="w-full" disabled={!spreadsheetData.trim()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Select value={mappingFilterDevice} onValueChange={(v) => {
                setMappingFilterDevice(v);
                setMappingFilterBrand('');
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Devices</SelectItem>
                  {devices.map((d) => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={mappingFilterBrand} onValueChange={setMappingFilterBrand} disabled={!mappingFilterDevice || mappingFilterDevice === 'all'}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {mappingFilterDevice && mappingFilterDevice !== 'all' &&
                    devices.find(d => d.id === mappingFilterDevice)?.brands.map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            {(() => {
              let filteredModels = devices.flatMap(d =>
                d.brands.flatMap(b =>
                  b.models.map(m => ({
                    ...m,
                    deviceName: d.name,
                    deviceId: d.id,
                    brandName: b.name,
                    brandId: b.id
                  }))
                )
              );

              // Apply filters
              if (mappingFilterDevice && mappingFilterDevice !== 'all') {
                filteredModels = filteredModels.filter(m => m.deviceId === mappingFilterDevice);
              }
              if (mappingFilterBrand && mappingFilterBrand !== 'all') {
                filteredModels = filteredModels.filter(m => m.brandId === mappingFilterBrand);
              }

              const filteredModelIds = filteredModels.map(m => m.id);

              return (
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                          <th className="text-left p-3 font-medium border-b">Model</th>
                          {issues.map((issue) => {
                            const allChecked = filteredModelIds.length > 0 && filteredModelIds.every(modelId =>
                              modelIssueMap.get(modelId)?.has(issue.id)
                            );
                            const someChecked = filteredModelIds.some(modelId =>
                              modelIssueMap.get(modelId)?.has(issue.id)
                            );

                            return (
                              <th key={issue.id} className="text-center p-3 font-medium border-b min-w-[80px]">
                                <div className="flex flex-col items-center gap-2">
                                  <Checkbox
                                    checked={allChecked}
                                    className={`h-4 w-4 border-2 ${someChecked && !allChecked ? 'opacity-50' : ''}`}
                                    onCheckedChange={() => toggleAllForIssue(issue.id, filteredModelIds)}
                                    disabled={filteredModelIds.length === 0}
                                  />
                                  <span className="text-xl">{issue.emoji}</span>
                                  <span className="text-xs font-normal">{issue.name}</span>
                                </div>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredModels.length === 0 ? (
                          <tr>
                            <td colSpan={issues.length + 1} className="text-center p-8 text-gray-500">
                              No models found. Add some models first.
                            </td>
                          </tr>
                        ) : (
                          filteredModels.map((model) => (
                            <tr key={model.id} className="hover:bg-gray-50 border-b">
                              <td className="p-3">
                                <div className="flex flex-col">
                                  <span className="font-medium">{model.name}</span>
                                  <span className="text-xs text-gray-500">{model.deviceName} - {model.brandName}</span>
                                </div>
                              </td>
                              {issues.map((issue) => {
                                const isChecked = modelIssueMap.get(model.id)?.has(issue.id) || false;
                                return (
                                  <td key={issue.id} className="text-center p-3 bg-white">
                                    <div className="flex justify-center">
                                      <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={() => toggleIssueForModel(model.id, issue.id)}
                                        className="h-5 w-5 border-2 border-gray-400 data-[state=checked]:border-primary"
                                      />
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>

      {/* All Current Data View */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All Form Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {devices.map((device) => (
              <div key={device.id} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg mb-2">{device.name}</h3>
                {device.brands.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No brands added yet</p>
                ) : (
                  <div className="space-y-3">
                    {device.brands.map((brand) => (
                      <div key={brand.id} className="ml-4">
                        <h4 className="font-semibold text-base text-gray-700">{brand.name}</h4>
                        {brand.models.length === 0 ? (
                          <p className="text-sm text-gray-500 italic ml-4">No models added yet</p>
                        ) : (
                          <div className="ml-4 mt-1">
                            <div className="flex flex-wrap gap-2">
                              {brand.models.map((model) => (
                                <span
                                  key={model.id}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                                >
                                  {model.name}
                                  {model.issues && model.issues.length > 0 && (
                                    <span className="text-green-600">({model.issues.length})</span>
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {devices.length === 0 && (
              <p className="text-gray-500 text-center py-8">No devices configured yet. Start by adding a device type above.</p>
            )}
          </div>

          {/* Issues Section */}
          {issues.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-bold text-lg mb-3">Repair Issues</h3>
              <div className="flex flex-wrap gap-2">
                {issues.map((issue) => (
                  <span
                    key={issue.id}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-900 rounded-lg text-sm"
                  >
                    <span className="text-xl">{issue.emoji}</span>
                    <span>{issue.name}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
