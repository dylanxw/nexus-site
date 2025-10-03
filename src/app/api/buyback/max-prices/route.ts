import { NextResponse } from 'next/server';
import { getMaxPricesForModels } from '@/lib/backend/pricing-service';

// List of all iPhone models we support
const IPHONE_MODELS = [
  'iPhone 17 Pro Max',
  'iPhone 17 Pro',
  'iPhone 17 Air',
  'iPhone 17',
  'iPhone 16e',
  'iPhone 16 Pro Max',
  'iPhone 16 Pro',
  'iPhone 16 Plus',
  'iPhone 16',
  'iPhone 15 Pro Max',
  'iPhone 15 Pro',
  'iPhone 15 Plus',
  'iPhone 15',
  'iPhone 14 Pro Max',
  'iPhone 14 Pro',
  'iPhone 14 Plus',
  'iPhone 14',
  'iPhone 13 Pro Max',
  'iPhone 13 Pro',
  'iPhone 13',
  'iPhone 13 Mini',
  'iPhone 12 Pro Max',
  'iPhone 12 Pro',
  'iPhone 12',
  'iPhone 12 Mini',
  'iPhone 11 Pro Max',
  'iPhone 11 Pro',
  'iPhone 11',
  'iPhone XS Max',
  'iPhone XS',
  'iPhone XR',
  'iPhone X',
  'iPhone 8 Plus',
  'iPhone 8',
  'iPhone 7 Plus',
  'iPhone 7',
];

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  try {
    const maxPrices = await getMaxPricesForModels(IPHONE_MODELS);

    return NextResponse.json({
      success: true,
      maxPrices,
    });
  } catch (error) {
    console.error('Error fetching max prices:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch max prices',
      },
      { status: 500 }
    );
  }
}
