import { Metadata } from "next";
import { Suspense } from "react";
import RepairFormClient from "./repair-form-client";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Device Repair Form | Nexus Tech Solutions - Denton, TX",
  description: "Complete your device repair request form. Fast, reliable electronics repair for phones, tablets, computers & consoles in Denton, TX. Same-day service available.",
  keywords: "device repair form, phone repair denton, electronics repair, same day repair, nexus tech solutions",
  robots: "index, follow",
  openGraph: {
    title: "Device Repair Form | Nexus Tech Solutions",
    description: "Complete your device repair request form. Same-day service available in Denton, TX.",
    type: "website",
    locale: "en_US",
  },
};

// Fetch devices on the server
async function getDevices() {
  try {
    const devices = await prisma.repairDevice.findMany({
      where: { active: true },
      include: {
        brands: {
          include: {
            models: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });

    return devices.map(device => ({
      value: device.slug,
      label: device.name,
      icon: device.icon,
      brands: device.brands.map(brand => ({
        value: brand.name,
        label: brand.name,
        models: brand.models.map(model => ({
          value: model.id,
          label: model.name,
          name: model.name
        }))
      }))
    }));
  } catch (error) {
    console.error('Error fetching devices:', error);
    return [];
  }
}

// Fetch all issues mapped by model ID
async function getAllModelIssues() {
  try {
    const modelIssues = await prisma.repairModelIssue.findMany({
      include: {
        issue: true,
        model: true
      }
    });

    // Group by model ID
    const issuesByModel: Record<string, any[]> = {};

    for (const mi of modelIssues) {
      if (!mi.issue || !mi.issue.active) continue;

      if (!issuesByModel[mi.modelId]) {
        issuesByModel[mi.modelId] = [];
      }

      issuesByModel[mi.modelId].push({
        value: mi.issue.slug,
        label: mi.issue.name,
        emoji: mi.issue.emoji,
        order: mi.issue.order
      });
    }

    // Sort issues by order within each model
    for (const modelId in issuesByModel) {
      issuesByModel[modelId].sort((a, b) => a.order - b.order);
    }

    return issuesByModel;
  } catch (error) {
    console.error('Error fetching model issues:', error);
    return {};
  }
}

export default async function RepairFormPage() {
  // Fetch devices and all model issues on the server in parallel
  const [devices, modelIssues] = await Promise.all([
    getDevices(),
    getAllModelIssues()
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <RepairFormClient initialDevices={devices} initialModelIssues={modelIssues} />
      </Suspense>
    </div>
  );
}