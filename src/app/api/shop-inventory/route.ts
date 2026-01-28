import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';

const sheets = google.sheets('v4');
const PRODUCT_METADATA_PATH = path.join(process.cwd(), 'data', 'product-metadata.json');

async function getGoogleAuth() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  return auth;
}

async function getProductMetadata() {
  try {
    const data = await fs.readFile(PRODUCT_METADATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading product metadata:', error);
    return {};
  }
}

function parseInventoryString(inventoryStr: string) {
  if (!inventoryStr) {
    return { model: '', storage: '', color: '', carrier: '', category: 'smartphone', brand: '', size: '', material: '', connectivity: '' };
  }

  const combined = inventoryStr.toLowerCase();

  // Category and brand detection
  let category = 'smartphone';
  let brand = '';

  if (combined.includes('iphone')) { category = 'smartphone'; brand = 'Apple'; }
  else if (combined.includes('samsung') || combined.includes('galaxy') && !combined.includes('watch')) { category = 'smartphone'; brand = 'Samsung'; }
  else if (combined.includes('pixel')) { category = 'smartphone'; brand = 'Google'; }
  else if (combined.includes('oneplus')) { category = 'smartphone'; brand = 'OnePlus'; }
  else if (combined.includes('moto') || combined.includes('motorola')) { category = 'smartphone'; brand = 'Motorola'; }
  else if (combined.includes('ipad')) { category = 'tablet'; brand = 'Apple'; }
  else if (combined.includes('tab') || combined.includes('tablet')) { category = 'tablet'; if (combined.includes('galaxy') || combined.includes('samsung')) brand = 'Samsung'; }
  else if (combined.includes('macbook') || combined.includes('imac') || combined.includes('mac mini')) { category = 'computer'; brand = 'Apple'; }
  else if (combined.includes('apple watch') || combined.includes('watch') && combined.includes('apple')) { category = 'smartwatch'; brand = 'Apple'; }
  else if (combined.includes('galaxy watch')) { category = 'smartwatch'; brand = 'Samsung'; }
  else if (combined.includes('airpods')) { category = 'headphones'; brand = 'Apple'; }
  else if (combined.includes('xbox') || combined.includes('series x') || combined.includes('series s')) { category = 'console'; brand = 'Microsoft'; }
  else if (combined.includes('ps5') || combined.includes('ps4') || combined.includes('playstation')) { category = 'console'; brand = 'Sony'; }
  else if (combined.includes('switch') || combined.includes('nintendo')) { category = 'console'; brand = 'Nintendo'; }
  else if (combined.includes('steam deck')) { category = 'console'; brand = 'Valve'; }

  const storageMatch = inventoryStr.match(/(\d+(?:GB|TB))/i);
  const storage = storageMatch ? storageMatch[1] : '';

  const carrierKeywords = ['Unlocked', 'Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'WiFi', 'GPS Only', 'GPS + Cellular'];
  let carrier = '';
  for (const keyword of carrierKeywords) {
    if (inventoryStr.toLowerCase().includes(keyword.toLowerCase())) {
      carrier = keyword;
      break;
    }
  }

  let model = inventoryStr;
  if (storageMatch) {
    model = inventoryStr.substring(0, inventoryStr.indexOf(storageMatch[0])).trim();
  }

  let color = '';
  if (storageMatch && carrier) {
    const afterStorage = inventoryStr.substring(inventoryStr.indexOf(storageMatch[0]) + storageMatch[0].length);
    const beforeCarrier = afterStorage.substring(0, afterStorage.toLowerCase().indexOf(carrier.toLowerCase()));
    color = beforeCarrier.trim();
  } else if (storageMatch) {
    const afterStorage = inventoryStr.substring(inventoryStr.indexOf(storageMatch[0]) + storageMatch[0].length);
    color = afterStorage.trim();
  }

  color = color.replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
  if (!color || /^[^\w\s]+$/.test(color)) {
    color = '';
  }

  return { model, storage, color, carrier, category, brand, size: '', material: '', connectivity: '' };
}

// GET - Fetch available products for shop (live from Google Sheets + metadata)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const condition = searchParams.get('condition');
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Fetch live from Google Sheets
    const auth = await getGoogleAuth();
    const spreadsheetId = process.env.GOOGLE_SHEETS_INVENTORY_ID;

    const response = await Promise.race([
      sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Retail Stock!A:L',
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Google Sheets API timeout after 8s')), 8000)
      )
    ]) as any;

    const rows = response.data.values || [];
    const metadata = await getProductMetadata();

    if (rows.length === 0) {
      return NextResponse.json({ items: [], total: 0, pagination: { page, limit, totalPages: 0, hasMore: false, hasPrevious: false } });
    }

    // Parse sheet rows into inventory items
    const inventory = rows
      .slice(1)
      .filter((row: any) => row[1] || row[2])
      .map((row: any) => {
        // 2026 sheet: A=Photos, B=Inventory, C=IMEI, D=Battery Health, E=Condition, F=Notes, G=Cost, H=Price, I=B2B Price, J=Facebook, K=eBay, L=Nexus Site
        const inventoryData = parseInventoryString(row[1] || '');

        const grade = row[4]?.toString().trim() || '';
        let mappedCondition = 'Good';
        if (['N', 'New Sealed', 'NIB'].includes(grade)) mappedCondition = 'New';
        else if (['A+', 'A', 'A-'].includes(grade)) mappedCondition = 'Like New';
        else if (grade === 'B+') mappedCondition = 'Excellent';
        else if (grade === 'B') mappedCondition = 'Good';
        else if (grade === 'B-') mappedCondition = 'Fair';
        else if (grade === 'C') mappedCondition = 'Damaged';

        return {
          Photos: row[0] || '',
          Inventory: row[1] || '',
          IMEI: row[2] || '',
          'Battery Health': row[3] || '',
          Condition: mappedCondition,
          OriginalGrade: row[4] || '',
          Notes: row[5] || '',
          Cost: row[6] || '',
          Price: row[7] || '',
          'B2B Price': row[8] || '',
          'Facebook Price': row[9] || '',
          'eBay Price': row[10] || '',
          'Nexus Site': row[11] || '',
          SKU: row[2] || '',
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
        };
      });

    // Filter for available products only
    let availableProducts = inventory.filter((item: any) => {
      // Skip section headers
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
          item['Battery Health'] = null;
        }
      }

      // Must have an identifier
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

      // Must be marked as "available" in metadata
      const productId = item.SKU || item.IMEI;
      const productMeta = metadata[productId];
      const hasAvailableStatus = productMeta && productMeta.status === 'available';
      if (!hasAvailableStatus) return false;

      return true;
    });

    // Apply filters
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

    // Enhance with metadata
    const enhancedProducts = availableProducts.map((item: any) => {
      const productId = item.SKU || item.IMEI;
      const productMeta = metadata[productId] || {};

      return {
        ...item,
        description: productMeta.description || item.Notes || '',
        photos: productMeta.photos || [],
        listingId: productMeta.listingId || null,
        websiteStatus: productMeta.status || 'available',
        'Battery Health': productMeta.batteryHealth || item['Battery Health'],
        batteryHealth: productMeta.batteryHealth || item['Battery Health'],
        Brand: productMeta.brand || item.Brand,
        brand: productMeta.brand || item.Brand,
        Category: productMeta.category || item.Category,
        category: productMeta.category || item.Category,
        Color: productMeta.color || item.Color,
      };
    });

    // Sort by newest first
    enhancedProducts.sort((a: any, b: any) => {
      if (a.listingId && b.listingId) {
        return parseInt(b.listingId) - parseInt(a.listingId);
      }
      return 0;
    });

    // Pagination
    const totalItems = enhancedProducts.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedProducts = enhancedProducts.slice(skip, skip + limit);

    return NextResponse.json({
      items: paginatedProducts,
      total: totalItems,
      pagination: {
        page,
        limit,
        totalPages,
        hasMore: page < totalPages,
        hasPrevious: page > 1,
      },
    });

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
