import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Cache for 5 minutes
let cache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

export async function GET() {
  try {
    // Check cache
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
      return NextResponse.json(cache.data);
    }

    // Fetch active devices with their brands and models
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

    // Transform to the format the frontend expects
    const formattedDevices = devices.map(device => ({
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

    const responseData = { devices: formattedDevices };

    // Update cache
    cache = {
      data: responseData,
      timestamp: Date.now()
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching devices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch devices' },
      { status: 500 }
    );
  }
}
