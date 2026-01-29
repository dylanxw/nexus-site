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

  // Fields that need boolean conversion (SQLite uses 0/1)
  const booleanFields = [
    'active', 'twoFactorEnabled', 'emailVerified', 'isActive',
    'usePercentage', 'watch', 'autorestart', 'time'
  ];

  for (const { sqliteTable, prismaModel } of importOrder) {
    const records = data[sqliteTable] || [];
    if (records.length === 0) {
      console.log(`  ${sqliteTable}: skipped (no records)`);
      continue;
    }

    try {
      // Process each record
      const processedRecords = records.map(record => {
        const processed = { ...record };

        for (const key of Object.keys(processed)) {
          const value = processed[key];

          // Convert SQLite booleans (0/1) to JavaScript booleans
          if (booleanFields.includes(key) && typeof value === 'number') {
            processed[key] = value === 1;
          }

          // Convert date timestamps to Date objects
          if (value && typeof value === 'number' &&
              (key.includes('At') || key.includes('Date') || key === 'expiresAt' || key === 'lastUsedAt')) {
            processed[key] = new Date(value);
          }

          // Convert date strings to Date objects
          if (value && typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
            processed[key] = new Date(value);
          }

          // Handle BigInt fields
          if (key === 'resetTime' && typeof value === 'number') {
            processed[key] = BigInt(value);
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
      // Log first record for debugging
      if (records.length > 0) {
        console.log(`    First record sample:`, JSON.stringify(records[0]).substring(0, 200));
      }
    }
  }

  console.log('\nImport complete!');
  await prisma.$disconnect();
}

importData().catch(console.error);
