import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';
import { getSession } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit-production';

const sheets = google.sheets('v4');

// Paths
const CACHED_INVENTORY_PATH = path.join(process.cwd(), 'data', 'cached-inventory.json');
const PRODUCT_METADATA_PATH = path.join(process.cwd(), 'data', 'product-metadata.json');

async function getGoogleAuth() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return auth;
}

// Auto-detect category and brand from model/inventory string
function detectCategoryAndBrand(inventoryStr: string, model: string) {
  const combined = `${inventoryStr} ${model}`.toLowerCase();

  // Category detection
  let category = 'smartphone'; // default
  let brand = '';

  // Smartphones
  if (combined.includes('iphone')) {
    category = 'smartphone';
    brand = 'Apple';
  } else if (combined.includes('samsung') || combined.includes('galaxy') && !combined.includes('watch')) {
    category = 'smartphone';
    brand = 'Samsung';
  } else if (combined.includes('pixel')) {
    category = 'smartphone';
    brand = 'Google';
  } else if (combined.includes('oneplus')) {
    category = 'smartphone';
    brand = 'OnePlus';
  } else if (combined.includes('moto') || combined.includes('motorola')) {
    category = 'smartphone';
    brand = 'Motorola';
  }
  // Tablets
  else if (combined.includes('ipad')) {
    category = 'tablet';
    brand = 'Apple';
  } else if (combined.includes('tab') || combined.includes('tablet')) {
    category = 'tablet';
    if (combined.includes('galaxy') || combined.includes('samsung')) {
      brand = 'Samsung';
    }
  }
  // Computers
  else if (combined.includes('macbook') || combined.includes('imac') || combined.includes('mac mini')) {
    category = 'computer';
    brand = 'Apple';
  }
  // Smartwatches
  else if (combined.includes('apple watch') || combined.includes('watch') && combined.includes('apple')) {
    category = 'smartwatch';
    brand = 'Apple';
  } else if (combined.includes('galaxy watch')) {
    category = 'smartwatch';
    brand = 'Samsung';
  }
  // Headphones/Audio
  else if (combined.includes('airpods')) {
    category = 'headphones';
    brand = 'Apple';
  }
  // Game Consoles
  else if (combined.includes('xbox') || combined.includes('series x') || combined.includes('series s')) {
    category = 'console';
    brand = 'Microsoft';
  } else if (combined.includes('ps5') || combined.includes('ps4') || combined.includes('playstation')) {
    category = 'console';
    brand = 'Sony';
  } else if (combined.includes('switch') || combined.includes('nintendo')) {
    category = 'console';
    brand = 'Nintendo';
  } else if (combined.includes('steam deck')) {
    category = 'console';
    brand = 'Valve';
  }

  return { category, brand };
}

// Parse the combined inventory data
function parseInventoryString(inventoryStr: string) {
  if (!inventoryStr) {
    return { model: '', storage: '', color: '', carrier: '', category: 'smartphone', brand: '', size: '', material: '', connectivity: '' };
  }

  // Detect category and brand first
  const { category, brand } = detectCategoryAndBrand(inventoryStr, inventoryStr);

  // Extract storage (e.g., "128GB", "256GB", "1TB")
  const storageMatch = inventoryStr.match(/(\d+(?:GB|TB))/i);
  const storage = storageMatch ? storageMatch[1] : '';

  // Extract carrier/unlock status
  const carrierKeywords = ['Unlocked', 'Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'WiFi', 'GPS Only', 'GPS + Cellular'];
  let carrier = '';
  for (const keyword of carrierKeywords) {
    if (inventoryStr.toLowerCase().includes(keyword.toLowerCase())) {
      carrier = keyword;
      break;
    }
  }

  // Extract model
  let model = inventoryStr;
  if (storageMatch) {
    model = inventoryStr.substring(0, inventoryStr.indexOf(storageMatch[0])).trim();
  }

  // Extract color
  let color = '';
  if (storageMatch && carrier) {
    const afterStorage = inventoryStr.substring(inventoryStr.indexOf(storageMatch[0]) + storageMatch[0].length);
    const beforeCarrier = afterStorage.substring(0, afterStorage.toLowerCase().indexOf(carrier.toLowerCase()));
    color = beforeCarrier.trim();
  } else if (storageMatch) {
    const afterStorage = inventoryStr.substring(inventoryStr.indexOf(storageMatch[0]) + storageMatch[0].length);
    color = afterStorage.trim();
  }

  // Clean up color
  color = color.replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();

  return { model, storage, color, carrier, category, brand, size: '', material: '', connectivity: '' };
}

// POST - Refresh cache from Google Sheets
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    // Check user has appropriate role (only admin and manager can refresh cache)
    if (!['ADMIN', 'MANAGER'].includes(session.role)) {
      return NextResponse.json(
        { error: 'Forbidden - Only managers and admins can refresh inventory cache' },
        { status: 403 }
      );
    }

    // Apply rate limiting - 10 refreshes per hour
    const rateLimitResponse = await rateLimit(request, {
      windowMs: 60 * 60 * 1000, // 1 hour
      maxRequests: 10, // 10 refreshes per hour
    });

    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    console.log(`Cache refresh initiated by ${session.email}`);

    // Check if Google Sheets credentials are configured
    const hasValidCredentials =
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL &&
      process.env.GOOGLE_SHEETS_PRIVATE_KEY &&
      process.env.GOOGLE_SHEETS_INVENTORY_ID;

    if (!hasValidCredentials) {
      return NextResponse.json(
        { error: 'Google Sheets credentials not configured' },
        { status: 500 }
      );
    }

    const auth = await getGoogleAuth();
    const spreadsheetId = process.env.GOOGLE_SHEETS_INVENTORY_ID;

    // Fetch data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Retail Stock!A:N',
    });

    const rows = response.data.values || [];

    if (rows.length === 0) {
      return NextResponse.json({ error: 'No data found in spreadsheet' }, { status: 400 });
    }

    // Load existing metadata
    let metadata = {};
    try {
      const metadataData = await fs.readFile(PRODUCT_METADATA_PATH, 'utf-8');
      metadata = JSON.parse(metadataData);
    } catch (error) {
      console.log('No existing metadata file, creating new one');
    }

    // Process rows
    const items = rows
      .slice(1)
      .filter((row: any) => row[2] || row[3] || row[11]) // Skip blank rows
      .map((row: any) => {
        const inventoryData = parseInventoryString(row[2] || '');

        // Map grade to condition
        const grade = row[5]?.toString().trim() || '';
        let mappedCondition = 'Good';

        if (['N', 'New Sealed', 'NIB'].includes(grade)) {
          mappedCondition = 'New';
        } else if (['A+', 'A', 'A-'].includes(grade)) {
          mappedCondition = 'Like New';
        } else if (grade === 'B+') {
          mappedCondition = 'Excellent';
        } else if (grade === 'B') {
          mappedCondition = 'Good';
        } else if (grade === 'B-') {
          mappedCondition = 'Fair';
        } else if (grade === 'C') {
          mappedCondition = 'Damaged';
        }

        const productId = row[3] || ''; // IMEI as ID
        const itemMetadata = metadata[productId] || {};

        return {
          Date: row[0] || '',
          Supplier: row[1] || '',
          Inventory: row[2] || '',
          IMEI: row[3] || '',
          'Battery Health': row[4] || '',
          Condition: mappedCondition,
          OriginalGrade: row[5] || '',
          Notes: row[6] || '',
          Cost: row[7] || '',
          Price: row[8] || '',
          'B2B Price': row[9] || '',
          'Facebook Price': row[10] || '',
          'Swappa Price': row[11] || '',
          'eBay Price': row[12] || '',
          'Nexus Site': row[13] || '',
          SKU: row[3] || '', // Using IMEI as SKU
          Status: '',
          Model: inventoryData.model,
          Storage: inventoryData.storage,
          Color: inventoryData.color,
          Carrier: inventoryData.carrier,
          Category: inventoryData.category,
          Brand: inventoryData.brand,
          Size: inventoryData.size,
          Material: inventoryData.material,
          Connectivity: inventoryData.connectivity,
          // Add metadata
          websiteStatus: itemMetadata.status || 'draft',
          description: itemMetadata.description || '',
          photos: itemMetadata.photos || [],
          listingId: itemMetadata.listingId || null,
          RAM: itemMetadata.ram || '',
          CPU: itemMetadata.cpu || '',
          GPU: itemMetadata.gpu || '',
          Controllers: itemMetadata.controllers || '',
          Accessories: itemMetadata.accessories || '',
        };
      });

    // Save to cached inventory file
    await fs.writeFile(CACHED_INVENTORY_PATH, JSON.stringify(items, null, 2));

    console.log(`Cache refreshed successfully with ${items.length} items`);

    return NextResponse.json({
      success: true,
      message: `Cache refreshed with ${items.length} items`,
      itemsCount: items.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error refreshing cache:', error);
    return NextResponse.json(
      {
        error: 'Failed to refresh cache',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}