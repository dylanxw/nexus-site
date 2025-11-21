import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Path to cached inventory data
const CACHED_INVENTORY_PATH = path.join(process.cwd(), 'data', 'cached-inventory.json');
const PRODUCT_METADATA_PATH = path.join(process.cwd(), 'data', 'product-metadata.json');

// Read cached inventory
async function getCachedInventory() {
  try {
    const data = await fs.readFile(CACHED_INVENTORY_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading cached inventory:', error);
    return [];
  }
}

// Read product metadata
async function getProductMetadata() {
  try {
    const data = await fs.readFile(PRODUCT_METADATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading product metadata:', error);
    return {};
  }
}

// GET - Fetch available products for shop
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const condition = searchParams.get('condition');
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Read cached inventory (much faster than Google Sheets)
    const inventory = await getCachedInventory();
    const metadata = await getProductMetadata();

    // Filter for available products only
    let availableProducts = inventory.filter((item: any) => {
      // Skip section headers from spreadsheet
      if (item.Inventory?.includes('Devices') ||
          item.Inventory?.includes('Phones') ||
          item.Brand?.includes('SECTION') ||
          item.Brand?.includes('---') ||
          !item.Inventory ||
          !item.Brand) {
        return false;
      }

      // Skip items with invalid battery health
      if (item['Battery Health']) {
        const battery = parseInt(item['Battery Health']?.toString().replace('%', ''));
        if (isNaN(battery) || battery > 100 || battery < 0) {
          // Clear invalid battery value but don't skip the item
          item['Battery Health'] = null;
        }
      }

      // Must have some form of identifier (IMEI, SKU, or Serial Number)
      if (!item.IMEI && !item.SKU && !item['Serial Number']) {
        return false;
      }

      // Must be marked for Nexus Site
      const nexusSiteValue = item['Nexus Site']?.toString().toUpperCase();
      const isForNexusSite = nexusSiteValue === 'TRUE' || nexusSiteValue === 'YES' || nexusSiteValue === '1';

      if (!isForNexusSite) return false;

      // Must have a valid price
      const priceStr = item.Price?.toString().replace(/[$,]/g, '');
      const price = parseFloat(priceStr || '0');
      if (!price || price <= 0 || isNaN(price)) return false;

      // Check the product's status - either from cached inventory or metadata
      const productId = item.SKU || item.IMEI;

      // First check if websiteStatus is already in the cached item
      if (item.websiteStatus && item.websiteStatus !== 'available') {
        return false;
      }

      // Also check metadata for status override
      const productMeta = metadata[productId];
      if (productMeta && productMeta.status && productMeta.status !== 'available') {
        return false;
      }

      // Product must have explicit 'available' status in either cached data or metadata
      const hasAvailableStatus = item.websiteStatus === 'available' || (productMeta && productMeta.status === 'available');

      if (!hasAvailableStatus) {
        return false;
      }

      return true;
    });

    // Apply additional filters
    if (category) {
      availableProducts = availableProducts.filter((item: any) =>
        item.Category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (brand) {
      availableProducts = availableProducts.filter((item: any) =>
        item.Brand?.toLowerCase() === brand.toLowerCase()
      );
    }

    if (condition) {
      availableProducts = availableProducts.filter((item: any) =>
        item.Condition?.toLowerCase() === condition.toLowerCase()
      );
    }

    if (priceMin) {
      const min = parseFloat(priceMin);
      availableProducts = availableProducts.filter((item: any) => {
        const price = parseFloat(item.Price?.toString().replace(/[$,]/g, '') || '0');
        return price >= min;
      });
    }

    if (priceMax) {
      const max = parseFloat(priceMax);
      availableProducts = availableProducts.filter((item: any) => {
        const price = parseFloat(item.Price?.toString().replace(/[$,]/g, '') || '0');
        return price <= max;
      });
    }

    // Enhance products with metadata
    const enhancedProducts = availableProducts.map((item: any) => {
      const productId = item.SKU || item.IMEI;
      const productMeta = metadata[productId] || {};

      return {
        ...item,
        // Override with metadata if available
        description: productMeta.description || item.Notes || '',
        photos: productMeta.photos || [],
        listingId: productMeta.listingId || null,
        websiteStatus: productMeta.status || 'available',
        // Include any additional metadata fields
        batteryHealth: productMeta.batteryHealth || item['Battery Health'],
        brand: productMeta.brand || item.Brand,
        category: productMeta.category || item.Category,
      };
    });

    // Sort by newest first (assuming newer items have higher listing IDs or were added more recently)
    enhancedProducts.sort((a: any, b: any) => {
      // First sort by listing ID if available
      if (a.listingId && b.listingId) {
        return parseInt(b.listingId) - parseInt(a.listingId);
      }
      // Then by date if available
      if (a.Date && b.Date) {
        return new Date(b.Date).getTime() - new Date(a.Date).getTime();
      }
      return 0;
    });

    // Apply pagination
    const totalItems = enhancedProducts.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedProducts = enhancedProducts.slice(skip, skip + limit);

    // Return response with cache headers for better performance
    return NextResponse.json(
      {
        items: paginatedProducts,
        total: totalItems,
        pagination: {
          page,
          limit,
          totalPages,
          hasMore: page < totalPages,
          hasPrevious: page > 1,
        },
        cached: true
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );

  } catch (error) {
    console.error('Error fetching shop inventory:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch inventory',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Update cached inventory (admin only)
export async function POST(request: NextRequest) {
  try {
    // This endpoint can be called by admin to refresh the cache
    // from Google Sheets when needed

    // For now, just return success
    // In production, you'd add authentication and actual cache refresh logic

    return NextResponse.json({
      success: true,
      message: 'Cache refresh initiated'
    });

  } catch (error) {
    console.error('Error refreshing cache:', error);
    return NextResponse.json(
      { error: 'Failed to refresh cache' },
      { status: 500 }
    );
  }
}