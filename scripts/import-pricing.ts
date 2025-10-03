import { PrismaClient } from '@prisma/client';
import { parseAndUpdatePricing } from '../src/lib/backend/csv-parser';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🚀 Starting CSV import...');

    // Check if CSV file exists
    const csvPath = path.join('C:', 'Users', 'dylan', 'Downloads', 'atlas-price-sheet.csv');

    try {
      await fs.access(csvPath);
    } catch {
      console.error('❌ CSV file not found at:', csvPath);
      console.log('Please ensure the atlas-price-sheet.csv file is in the Downloads folder');
      process.exit(1);
    }

    // Read CSV content
    const csvContent = await fs.readFile(csvPath, 'utf-8');
    console.log('📄 CSV file loaded successfully');

    // Parse and import data
    console.log('⏳ Parsing and importing data...');
    const result = await parseAndUpdatePricing(csvContent);

    if (result.errors.length > 0) {
      console.log('\n⚠️  Some errors occurred during import:');
      result.errors.slice(0, 10).forEach(err => console.log(`  - ${err}`));
      if (result.errors.length > 10) {
        console.log(`  ... and ${result.errors.length - 10} more errors`);
      }
    }

    console.log('\n✅ Import completed!');
    console.log(`  📊 Records added: ${result.recordsAdded}`);
    console.log(`  📊 Records updated: ${result.recordsUpdated}`);
    console.log(`  ❌ Errors: ${result.errors.length}`);

    // Show sample of imported data
    const samples = await prisma.pricingData.findMany({
      take: 5,
      orderBy: { lastUpdated: 'desc' },
    });

    if (samples.length > 0) {
      console.log('\n📱 Sample imported devices:');
      samples.forEach(device => {
        console.log(`  - ${device.model}: A=${device.priceGradeA || 'N/A'}, B=${device.priceGradeB || 'N/A'}`);
      });
    }

    // Initialize settings if not exists
    const marginSettings = await prisma.setting.findUnique({
      where: { key: 'margin_tiers' },
    });

    if (!marginSettings) {
      await prisma.setting.create({
        data: {
          key: 'margin_tiers',
          value: JSON.stringify([
            { min: 0, max: 75, deduction: 25 },
            { min: 76, max: 140, deduction: 35 },
            { min: 141, max: 225, deduction: 60 },
            { min: 226, max: 350, deduction: 85 },
            { min: 351, max: 500, deduction: 120 },
            { min: 501, max: 700, deduction: 160 },
            { min: 701, max: 900, deduction: 200 },
            { min: 901, max: 1200, deduction: 250 },
            { min: 1201, max: Infinity, deduction: 300 },
          ]),
          category: 'pricing',
        },
      });
      console.log('\n⚙️  Margin tiers initialized');
    }

    // Create default admin user if doesn't exist
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
    });

    if (!adminUser) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 12);

      await prisma.user.create({
        data: {
          email: 'admin@nexusrepair.com',
          password: hashedPassword,
          name: 'Admin User',
          role: 'ADMIN',
          active: true,
        },
      });

      console.log('\n👤 Admin user created:');
      console.log('  Email: admin@nexusrepair.com');
      console.log('  Password: admin123');
      console.log('  ⚠️  CHANGE THIS PASSWORD IMMEDIATELY!');
    }

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
main();