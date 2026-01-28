import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const sheets = google.sheets('v4');

// Path to product metadata
const METADATA_PATH = path.join(process.cwd(), 'data', 'product-metadata.json');

// Read metadata
function readMetadata() {
  try {
    if (!fs.existsSync(METADATA_PATH)) {
      return {};
    }
    const data = fs.readFileSync(METADATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading metadata:', error);
    return {};
  }
}

interface InventoryItem {
  intakeDate: string;
  supplier: string;
  model: string;
  inventory: string;
  color: string;
  carrier: string;
  imei: string;
  batteryHealth: string;
  condition: string;
  cost: number;
  price: number;
  b2bPrice: number;
  facebookPrice: number;
  swappaPrice: number;
  sku: string;
  ebayPrice: number;
  shopifyPrice: number;
  notes: string;
  storage: string;
  status: string;
}

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


// GET - Fetch inventory items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const inStock = searchParams.get('inStock') === 'true';
    const model = searchParams.get('model');

    // Check if Google Sheets credentials are properly configured
    const hasValidCredentials =
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL &&
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL.includes('@') &&
      process.env.GOOGLE_SHEETS_PRIVATE_KEY &&
      process.env.GOOGLE_SHEETS_PRIVATE_KEY.includes('-----BEGIN PRIVATE KEY-----') &&
      process.env.GOOGLE_SHEETS_PRIVATE_KEY.length > 100 &&
      process.env.GOOGLE_SHEETS_INVENTORY_ID;

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

    // Parse Apple Watch specific details
    function parseAppleWatchDetails(inventoryStr: string) {
      const lower = inventoryStr.toLowerCase();

      // Extract size (look for pattern like "42mm", "44MM", etc.)
      const sizeMatch = inventoryStr.match(/(\d+)\s*mm/i);
      const size = sizeMatch ? `${sizeMatch[1]}mm` : '';

      // Detect material (Aluminum, Stainless Steel, Titanium)
      let material = '';
      if (lower.includes('aluminum') || lower.includes('aluminium')) {
        material = 'Aluminum';
      } else if (lower.includes('stainless steel') || lower.includes('stainless')) {
        material = 'Stainless Steel';
      } else if (lower.includes('titanium')) {
        material = 'Titanium';
      }

      // Detect connectivity
      let connectivity = '';
      if (lower.includes('gps + cellular') || lower.includes('gps+cellular') || lower.includes('cellular')) {
        connectivity = 'GPS + Cellular';
      } else if (lower.includes('gps')) {
        connectivity = 'GPS Only';
      }

      // Extract color if present (common watch colors)
      const watchColors = ['midnight', 'starlight', 'silver', 'gold', 'graphite', 'space gray', 'space black', 'rose gold', 'product red', 'blue', 'green', 'pink'];
      let color = '';
      for (const watchColor of watchColors) {
        if (lower.includes(watchColor)) {
          color = watchColor.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          break;
        }
      }

      return { size, material, connectivity, color };
    }

    // Parse the combined inventory data from column C
    function parseInventoryString(inventoryStr: string) {
      if (!inventoryStr) {
        return { model: '', storage: '', color: '', carrier: '', category: 'smartphone', brand: '', size: '', material: '', connectivity: '' };
      }

      // Detect category and brand first
      const { category, brand } = detectCategoryAndBrand(inventoryStr, inventoryStr);

      // Special handling for Apple Watch
      if (category === 'smartwatch' && brand === 'Apple') {
        const watchDetails = parseAppleWatchDetails(inventoryStr);

        // Extract model name (e.g., "Apple Watch Series 10")
        let model = inventoryStr;
        const sizeMatch = inventoryStr.match(/(\d+)\s*mm/i);
        if (sizeMatch) {
          model = inventoryStr.substring(0, inventoryStr.indexOf(sizeMatch[0])).trim();
        }

        // Clean up model name - remove material/connectivity/GPS mentions
        model = model
          .replace(/\s*(aluminum|aluminium|stainless steel|stainless|titanium)\s*/gi, ' ')
          .replace(/\s*(gps only|gps \+ cellular|gps\+cellular|cellular|gps)\s*/gi, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        return {
          model,
          storage: '', // Watches typically don't have user-accessible storage in the same way
          color: watchDetails.color,
          carrier: watchDetails.connectivity,
          category,
          brand,
          size: watchDetails.size,
          material: watchDetails.material,
          connectivity: watchDetails.connectivity,
        };
      }

      // Common patterns: "iPhone 15 Pro 128GB Natural Titanium Unlocked"
      // Extract storage (e.g., "128GB", "256GB", "1TB")
      const storageMatch = inventoryStr.match(/(\d+(?:GB|TB))/i);
      const storage = storageMatch ? storageMatch[1] : '';

      // Extract carrier/unlock status (usually at the end)
      const carrierKeywords = ['Unlocked', 'Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'WiFi', 'GPS Only', 'GPS + Cellular'];
      let carrier = '';
      for (const keyword of carrierKeywords) {
        if (inventoryStr.toLowerCase().includes(keyword.toLowerCase())) {
          carrier = keyword;
          break;
        }
      }

      // Extract model (everything before storage or before color keywords)
      let model = inventoryStr;
      if (storageMatch) {
        model = inventoryStr.substring(0, inventoryStr.indexOf(storageMatch[0])).trim();
      }

      // Extract color (what's between storage and carrier, or after storage)
      let color = '';
      if (storageMatch && carrier) {
        const afterStorage = inventoryStr.substring(inventoryStr.indexOf(storageMatch[0]) + storageMatch[0].length);
        const beforeCarrier = afterStorage.substring(0, afterStorage.toLowerCase().indexOf(carrier.toLowerCase()));
        color = beforeCarrier.trim();
      } else if (storageMatch) {
        const afterStorage = inventoryStr.substring(inventoryStr.indexOf(storageMatch[0]) + storageMatch[0].length);
        color = afterStorage.trim();
      }

      // Clean up color - remove parentheses and their contents, trim whitespace
      color = color.replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();

      // If color is just punctuation or empty after cleanup, clear it
      if (!color || /^[^\w\s]+$/.test(color)) {
        color = '';
      }

      return { model, storage, color, carrier, category, brand, size: '', material: '', connectivity: '' };
    }

    if (!hasValidCredentials) {
      return NextResponse.json(
        { error: 'Google Sheets credentials not configured' },
        { status: 500 }
      );
    }

    console.log('Attempting to fetch from Google Sheets...');

    const auth = await getGoogleAuth();
    const spreadsheetId = process.env.GOOGLE_SHEETS_INVENTORY_ID;

    console.log('Auth created, fetching spreadsheet:', spreadsheetId);

    const response = await Promise.race([
      sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Retail Stock!A:L', // Fetch columns A through L (Nexus Site checkbox)
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Google Sheets API timeout after 8s')), 8000)
      )
    ]) as any;

    console.log('Google Sheets response received, rows:', response.data.values?.length || 0);

    const rows = response.data.values || [];

    if (rows.length === 0) {
      return NextResponse.json({ items: [] });
    }

    // Convert rows to objects using the actual column structure from the screenshot
    const items = rows
      .slice(1)
      .filter((row: any) => {
        // Skip blank rows - check if inventory/IMEI columns have data
        return row[1] || row[2];
      })
      .map((row: any, index: number) => {
        // 2026 sheet: A=Photos, B=Inventory, C=IMEI, D=Battery Health, E=Condition, F=Notes, G=Cost, H=Price, I=B2B Price, J=Facebook, K=eBay, L=Nexus Site
        const inventoryData = parseInventoryString(row[1] || ''); // Column B

        // Map grade to standardized condition
        const grade = row[4]?.toString().trim() || '';
        let mappedCondition = 'Good'; // Default

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

        return {
          Photos: row[0] || '',          // Column A - Photos
          Inventory: row[1] || '',       // Column B - Inventory (Model/GB/Color/Carrier)
          IMEI: row[2] || '',            // Column C - IMEI
          'Battery Health': row[3] || '', // Column D - Battery Health
          Condition: mappedCondition,    // Column E - Condition (mapped from grade)
          OriginalGrade: row[4] || '',   // Keep original grade for reference
          Notes: row[5] || '',           // Column F - Notes
          Cost: row[6] || '',            // Column G - Cost
          Price: row[7] || '',           // Column H - Price (Retail)
          'B2B Price': row[8] || '',     // Column I - B2B Price
          'Facebook Price': row[9] || '', // Column J - Facebook
          'eBay Price': row[10] || '',   // Column K - eBay
          'Nexus Site': row[11] || '',   // Column L - Nexus Site (checkbox)
          SKU: row[2] || '',             // Using IMEI as SKU
          Status: '',                    // No status column in sheet
          // Parsed fields from the combined inventory string
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

    // Load metadata and merge with items
    const metadata = readMetadata();

    // Merge metadata with items
    const itemsWithMetadata = items.map((item: any) => {
      const id = item.SKU || item.IMEI;
      const itemMetadata = metadata[id] || {
        status: 'draft',
        description: '',
        photos: [],
        listingId: null,
        batteryHealth: '',
        brand: '',
        category: '',
        // Category-specific fields
        ram: '',
        cpu: '',
        gpu: '',
        size: '',
        material: '',
        connectivity: '',
        controllers: '',
        accessories: '',
        color: '',
      };

      return {
        ...item,
        websiteStatus: itemMetadata.status, // Use websiteStatus to distinguish from sheet Status
        description: itemMetadata.description,
        photos: itemMetadata.photos,
        listingId: itemMetadata.listingId,
        // Use manual overrides if set, otherwise fall back to auto-detected/sheet values
        'Battery Health': itemMetadata.batteryHealth || item['Battery Health'],
        Brand: itemMetadata.brand || item.Brand,
        Category: itemMetadata.category || item.Category,
        // Category-specific fields - prioritize metadata override, then auto-detected
        RAM: itemMetadata.ram || item.RAM || '',
        CPU: itemMetadata.cpu || item.CPU || '',
        GPU: itemMetadata.gpu || item.GPU || '',
        Size: itemMetadata.size || item.Size || '',
        Material: itemMetadata.material || item.Material || '',
        Connectivity: itemMetadata.connectivity || item.Connectivity || '',
        Controllers: itemMetadata.controllers || item.Controllers || '',
        Accessories: itemMetadata.accessories || item.Accessories || '',
        Color: itemMetadata.color || item.Color || '',
      };
    });

    // Apply filters
    let filteredItems = itemsWithMetadata;

    // Filter for items marked for Nexus Site (checkbox is checked)
    filteredItems = filteredItems.filter((item: any) => {
      const nexusSiteValue = item['Nexus Site']?.toString().toUpperCase();
      return nexusSiteValue === 'TRUE' || nexusSiteValue === 'YES' || nexusSiteValue === '1';
    });

    if (inStock) {
      // Filter for items that are in stock AND marked as available
      filteredItems = filteredItems.filter((item: any) =>
        item.websiteStatus === 'available' &&
        item.Price &&
        parseFloat(item.Price.toString().replace(/[$,]/g, '')) > 0
      );
    }

    if (model) {
      filteredItems = filteredItems.filter((item: any) =>
        item.Model?.toLowerCase().includes(model.toLowerCase()) ||
        item.Inventory?.toLowerCase().includes(model.toLowerCase())
      );
    }

    return NextResponse.json({ items: filteredItems });

  } catch (error) {
    console.error('Error fetching inventory:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      hasCredentials: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    });
    return NextResponse.json(
      {
        error: 'Failed to fetch inventory',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Add new inventory item
export async function POST(request: NextRequest) {
  try {
    const data: InventoryItem = await request.json();

    // Validate required fields
    const requiredFields = ['model', 'condition', 'cost', 'price'];
    for (const field of requiredFields) {
      if (!data[field as keyof InventoryItem]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const auth = await getGoogleAuth();
    const spreadsheetId = process.env.GOOGLE_SHEETS_INVENTORY_ID;

    // Prepare row data according to 2026 sheet structure
    const rowData = [
      '',                              // A: Photos (leave empty, managed in sheet)
      data.inventory || `${data.model || ''} ${data.storage || ''} ${data.color || ''} ${data.carrier || ''}`.trim(), // B: Inventory (combined)
      data.imei || '',                 // C: IMEI
      data.batteryHealth || '',        // D: Battery Health
      data.condition,                  // E: Condition
      data.notes || '',                // F: Notes
      data.cost,                       // G: Cost
      data.price,                      // H: Price
      data.b2bPrice || '',             // I: B2B Price
      data.facebookPrice || '',        // J: Facebook
      data.ebayPrice || '',            // K: eBay
      '',                              // L: Nexus Site (checkbox, managed in sheet)
    ];

    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'Retail Stock!A:L',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Inventory item added successfully'
    });

  } catch (error) {
    console.error('Error adding inventory item:', error);
    return NextResponse.json(
      { error: 'Failed to add inventory item' },
      { status: 500 }
    );
  }
}