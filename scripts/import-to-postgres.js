// Script to import data to PostgreSQL database
// Run with: node scripts/import-to-postgres.js

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function importData() {
  const dataPath = path.join(__dirname, 'exported-data.json');

  if (!fs.existsSync(dataPath)) {
    console.error('Error: exported-data.json not found!');
    console.log('Run export-sqlite-data.js first to generate the file.');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log('Importing data to PostgreSQL...\n');

  // Map SQLite table names (PascalCase) to Prisma model names (camelCase)
  // Import order matters due to foreign keys
  const importOrder = [
    { sqliteTable: 'User', prismaModel: 'user' },
    { sqliteTable: 'Setting', prismaModel: 'setting' },
    { sqliteTable: 'MarginTier', prismaModel: 'marginTier' },
    { sqliteTable: 'PricingData', prismaModel: 'pricingData' },
    { sqliteTable: 'RepairDevice', prismaModel: 'repairDevice' },
    { sqliteTable: 'RepairIssue', prismaModel: 'repairIssue' },
    { sqliteTable: 'RepairBrand', prismaModel: 'repairBrand' },
    { sqliteTable: 'RepairModel', prismaModel: 'repairModel' },
    { sqliteTable: 'RepairDeviceIssue', prismaModel: 'repairDeviceIssue' },
    { sqliteTable: 'RepairModelIssue', prismaModel: 'repairModelIssue' },
    { sqliteTable: 'Quote', prismaModel: 'quote' },
    { sqliteTable: 'EmailLog', prismaModel: 'emailLog' },
    { sqliteTable: 'ActivityLog', prismaModel: 'activityLog' },
    { sqliteTable: 'PricingUpdateLog', prismaModel: 'pricingUpdateLog' },
    { sqliteTable: 'RepairBooking', prismaModel: 'repairBooking' },
    { sqliteTable: 'Session', prismaModel: 'session' },
    { sqliteTable: 'RefreshToken', prismaModel: 'refreshToken' },
    { sqliteTable: 'TrustedDevice', prismaModel: 'trustedDevice' },
    { sqliteTable: 'VerificationToken', prismaModel: 'verificationToken' },
  ];

  for (const { sqliteTable, prismaModel } of importOrder) {
    const records = data[sqliteTable] || [];
    if (records.length === 0) {
      console.log(`  ${sqliteTable}: skipped (no records)`);
      continue;
    }

    try {
      // Convert date strings back to Date objects and handle BigInt
      const processedRecords = records.map(record => {
        const processed = { ...record };
        for (const key of Object.keys(processed)) {
          if (processed[key] && typeof processed[key] === 'string') {
            // Check if it looks like a date
            if (/^\d{4}-\d{2}-\d{2}T/.test(processed[key])) {
              processed[key] = new Date(processed[key]);
            }
          }
          // Handle BigInt fields (like resetTime in rate_limits)
          if (typeof processed[key] === 'number' && key === 'resetTime') {
            processed[key] = BigInt(processed[key]);
          }
        }
        return processed;
      });

      // Use createMany for bulk insert
      const result = await prisma[prismaModel].createMany({
        data: processedRecords,
        skipDuplicates: true,
      });
      console.log(`  ${sqliteTable}: ${result.count} records imported`);
    } catch (e) {
      console.log(`  ${sqliteTable}: error - ${e.message}`);
    }
  }

  console.log('\nImport complete!');
  await prisma.$disconnect();
}

importData().catch(console.error);
