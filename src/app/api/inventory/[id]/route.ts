import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to store product metadata (status, description, photos)
const METADATA_PATH = path.join(process.cwd(), 'data', 'product-metadata.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Read metadata
function readMetadata() {
  ensureDataDirectory();
  if (!fs.existsSync(METADATA_PATH)) {
    return {};
  }
  const data = fs.readFileSync(METADATA_PATH, 'utf-8');
  return JSON.parse(data);
}

// Write metadata
function writeMetadata(metadata: any) {
  ensureDataDirectory();
  fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2));
}

// Generate unique 4-digit listing ID
function generateListingId(metadata: any): string {
  const usedIds = new Set(
    Object.values(metadata)
      .map((item: any) => item.listingId)
      .filter(Boolean)
  );

  // Generate random 4-digit number
  let listingId: string;
  do {
    listingId = Math.floor(1000 + Math.random() * 9000).toString();
  } while (usedIds.has(listingId));

  return listingId;
}

// GET - Get product metadata by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const metadata = readMetadata();

    return NextResponse.json({
      success: true,
      data: metadata[id] || {
        status: 'draft',
        description: '',
        photos: [],
        batteryHealth: '',
        brand: '',
        category: '',
        ram: '',
        cpu: '',
        gpu: '',
        size: '',
        material: '',
        connectivity: '',
        controllers: '',
        accessories: '',
        color: '',
      }
    });
  } catch (error) {
    console.error('Error reading product metadata:', error);
    return NextResponse.json(
      { error: 'Failed to read product metadata' },
      { status: 500 }
    );
  }
}

// PUT - Update product metadata (status, description, photos)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updateData = await request.json();

    const metadata = readMetadata();

    // Generate listing ID when status changes to 'available' and it doesn't have one yet
    let listingId = metadata[id]?.listingId;
    if (updateData.status === 'available' && !listingId) {
      listingId = generateListingId(metadata);
    }

    // Validate required fields before allowing status change to 'available'
    if (updateData.status === 'available') {
      const photos = updateData.photos || metadata[id]?.photos || [];
      const brand = updateData.brand || metadata[id]?.brand || '';

      if (photos.length === 0) {
        return NextResponse.json(
          { error: 'Cannot publish product without photos. Please upload at least one photo.' },
          { status: 400 }
        );
      }

      if (!brand) {
        return NextResponse.json(
          { error: 'Cannot publish product without a brand. Please set the brand.' },
          { status: 400 }
        );
      }
    }

    // Update or create metadata for this product
    metadata[id] = {
      ...metadata[id],
      status: updateData.status || metadata[id]?.status || 'draft',
      description: updateData.description ?? metadata[id]?.description ?? '',
      photos: updateData.photos || metadata[id]?.photos || [],
      batteryHealth: updateData.batteryHealth ?? metadata[id]?.batteryHealth ?? '',
      brand: updateData.brand ?? metadata[id]?.brand ?? '',
      category: updateData.category ?? metadata[id]?.category ?? '',
      // Category-specific fields
      ram: updateData.ram ?? metadata[id]?.ram ?? '',
      cpu: updateData.cpu ?? metadata[id]?.cpu ?? '',
      gpu: updateData.gpu ?? metadata[id]?.gpu ?? '',
      size: updateData.size ?? metadata[id]?.size ?? '',
      material: updateData.material ?? metadata[id]?.material ?? '',
      connectivity: updateData.connectivity ?? metadata[id]?.connectivity ?? '',
      controllers: updateData.controllers ?? metadata[id]?.controllers ?? '',
      accessories: updateData.accessories ?? metadata[id]?.accessories ?? '',
      color: updateData.color ?? metadata[id]?.color ?? '',
      listingId: listingId,
      updatedAt: new Date().toISOString()
    };

    writeMetadata(metadata);

    return NextResponse.json({
      success: true,
      message: 'Product metadata updated successfully',
      data: metadata[id]
    });

  } catch (error) {
    console.error('Error updating product metadata:', error);
    return NextResponse.json(
      { error: 'Failed to update product metadata' },
      { status: 500 }
    );
  }
}