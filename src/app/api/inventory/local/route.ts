import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to cached inventory (created when admin page syncs with sheets)
const CACHED_INVENTORY_PATH = path.join(process.cwd(), 'data', 'cached-inventory.json');

// Read cached inventory
function readCachedInventory() {
  try {
    if (!fs.existsSync(CACHED_INVENTORY_PATH)) {
      console.log('No cached inventory found, returning empty array');
      return [];
    }
    const data = fs.readFileSync(CACHED_INVENTORY_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading cached inventory:', error);
    return [];
  }
}

// GET - Fetch inventory items from cached JSON only (fast)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const inStock = searchParams.get('inStock') === 'true';
    const model = searchParams.get('model');

    console.log('Fetching inventory from cached data (fast mode)');

    // Load cached inventory
    const items = readCachedInventory();

    // Apply filters
    let filteredItems = items;

    if (inStock) {
      // Filter for items that are marked as available
      filteredItems = filteredItems.filter((item: any) =>
        item.websiteStatus === 'available' &&
        item.Price &&
        parseFloat(item.Price.toString().replace(/[$,]/g, '') || '0') > 0
      );
    }

    if (model) {
      filteredItems = filteredItems.filter((item: any) =>
        item.Model?.toLowerCase().includes(model.toLowerCase()) ||
        item.Inventory?.toLowerCase().includes(model.toLowerCase())
      );
    }

    console.log(`Returned ${filteredItems.length} items from cached inventory`);

    return NextResponse.json({ items: filteredItems });

  } catch (error) {
    console.error('Error fetching cached inventory:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch cached inventory',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
