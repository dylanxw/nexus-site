import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST - Bulk upload devices, brands, and models from CSV
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = body; // Array of { deviceType, brand, model }

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid data format. Expected array of { deviceType, brand, model }' },
        { status: 400 }
      );
    }

    const results = {
      created: 0,
      skipped: 0,
      errors: [] as string[]
    };

    // Group by device type
    const deviceGroups = data.reduce((acc: any, row: any, index: number) => {
      const { deviceType, brand, model } = row;

      if (!deviceType || !brand || !model) {
        results.errors.push(`Row ${index + 1}: Missing required fields (deviceType, brand, model)`);
        results.skipped++;
        return acc;
      }

      if (!acc[deviceType]) {
        acc[deviceType] = {};
      }
      if (!acc[deviceType][brand]) {
        acc[deviceType][brand] = [];
      }
      acc[deviceType][brand].push(model);

      return acc;
    }, {});

    // Process each device type
    for (const [deviceTypeName, brands] of Object.entries(deviceGroups)) {
      try {
        const deviceSlug = deviceTypeName.toLowerCase().replace(/\s+/g, '-');

        // Find or create device type
        let device = await prisma.repairDevice.findUnique({
          where: { slug: deviceSlug }
        });

        if (!device) {
          device = await prisma.repairDevice.create({
            data: {
              name: deviceTypeName,
              slug: deviceSlug,
              icon: 'Package',
              order: 999,
              active: true,
            }
          });
        }

        // Process brands
        for (const [brandName, models] of Object.entries(brands as Record<string, string[]>)) {
          try {
            // Find or create brand
            let brand = await prisma.repairBrand.findFirst({
              where: {
                name: brandName,
                deviceId: device.id
              }
            });

            if (!brand) {
              brand = await prisma.repairBrand.create({
                data: {
                  name: brandName,
                  deviceId: device.id,
                }
              });
            }

            // Process models
            for (const modelName of models) {
              try {
                // Check if model already exists
                const existingModel = await prisma.repairModel.findFirst({
                  where: {
                    name: modelName,
                    brandId: brand.id
                  }
                });

                if (existingModel) {
                  results.skipped++;
                } else {
                  await prisma.repairModel.create({
                    data: {
                      name: modelName,
                      brandId: brand.id,
                    }
                  });
                  results.created++;
                }
              } catch (error: any) {
                results.errors.push(`Failed to create model "${modelName}": ${error.message}`);
                results.skipped++;
              }
            }
          } catch (error: any) {
            results.errors.push(`Failed to create brand "${brandName}": ${error.message}`);
            results.skipped++;
          }
        }
      } catch (error: any) {
        results.errors.push(`Failed to create device type "${deviceTypeName}": ${error.message}`);
        results.skipped++;
      }
    }

    return NextResponse.json({
      success: true,
      results
    });
  } catch (error) {
    console.error('Error in bulk upload:', error);
    return NextResponse.json(
      { error: 'Failed to process bulk upload' },
      { status: 500 }
    );
  }
}
