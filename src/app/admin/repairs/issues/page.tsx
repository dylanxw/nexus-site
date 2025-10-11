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
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type RepairDevice = {
  id: string;
  name: string;
  slug: string;
};

type RepairIssue = {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  devices: {
    deviceId: string;
    device: RepairDevice;
  }[];
};

const commonEmojis = ['🔧', '📱', '🔋', '📸', '💧', '🔊', '📶', '🖥️', '⚙️', '🔌', '💻', '🎮'];

export default function IssuesManagementPage() {
  const [issues, setIssues] = useState<RepairIssue[]>([]);
  const [devices, setDevices] = useState<RepairDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [issueForm, setIssueForm] = useState({ name: '', emoji: '🔧', deviceIds: [] as string[] });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [issuesRes, devicesRes] = await Promise.all([
        fetch('/api/admin/repairs/issues'),
        fetch('/api/admin/repairs/devices')
      ]);

      const issuesData = await issuesRes.json();
      const devicesData = await devicesRes.json();

      setIssues(issuesData.issues);
      setDevices(devicesData.devices);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/admin/repairs/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issueForm),
      });

      if (response.ok) {
        toast.success('Issue created successfully');
        setDialogOpen(false);
        setIssueForm({ name: '', emoji: '🔧', deviceIds: [] });
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to create issue');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('/api/admin/repairs/issues', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...issueForm, id: editingId }),
      });

      if (response.ok) {
        toast.success('Issue updated successfully');
        setDialogOpen(false);
        setIssueForm({ name: '', emoji: '🔧', deviceIds: [] });
        setEditingId(null);
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to update issue');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this issue?')) return;

    try {
      const response = await fetch(`/api/admin/repairs/issues?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Issue deleted successfully');
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to delete issue');
    }
  };

  const toggleDevice = (deviceId: string) => {
    setIssueForm(prev => ({
      ...prev,
      deviceIds: prev.deviceIds.includes(deviceId)
        ? prev.deviceIds.filter(id => id !== deviceId)
        : [...prev.deviceIds, deviceId]
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Repair Issues Management</h1>
          <p className="text-gray-600">Manage repair issues and their device type associations</p>
        </div>
        <Button onClick={() => {
          setIssueForm({ name: '', emoji: '🔧', deviceIds: [] });
          setEditingId(null);
          setDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Issue
        </Button>
      </div>

      {loading ? (
        <div className="p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{issue.emoji}</span>
                  <div>
                    <h3 className="font-semibold">{issue.name}</h3>
                    <p className="text-xs text-gray-500">{issue.slug}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIssueForm({
                        name: issue.name,
                        emoji: issue.emoji,
                        deviceIds: issue.devices.map(d => d.deviceId)
                      });
                      setEditingId(issue.id);
                      setDialogOpen(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(issue.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Available for:</p>
                {issue.devices.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {issue.devices.map(({ device }) => (
                      <span
                        key={device.id}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                      >
                        {device.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No device types assigned</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Issue Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Issue' : 'Add Issue'}</DialogTitle>
            <DialogDescription>
              {editingId ? 'Update issue details' : 'Create a new repair issue'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Issue Name</label>
              <Input
                value={issueForm.name}
                onChange={(e) => setIssueForm({ ...issueForm, name: e.target.value })}
                placeholder="e.g., Screen Damage"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Emoji</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {commonEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIssueForm({ ...issueForm, emoji })}
                    className={`text-2xl p-2 rounded hover:bg-gray-100 ${
                      issueForm.emoji === emoji ? 'bg-blue-100 ring-2 ring-blue-500' : ''
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <Input
                value={issueForm.emoji}
                onChange={(e) => setIssueForm({ ...issueForm, emoji: e.target.value })}
                placeholder="Or enter custom emoji"
                maxLength={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Available for Device Types</label>
              <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                {devices.map((device) => (
                  <label key={device.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={issueForm.deviceIds.includes(device.id)}
                      onChange={() => toggleDevice(device.id)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{device.name}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Select which device types can have this issue
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={editingId ? handleUpdate : handleCreate}>
              {editingId ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
