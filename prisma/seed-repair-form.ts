import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding repair form data...');

  // Create device categories
  const smartphones = await prisma.repairDevice.upsert({
    where: { slug: 'smartphones' },
    update: {},
    create: {
      name: 'Smartphones',
      slug: 'smartphones',
      icon: 'Smartphone',
      order: 1,
    },
  });

  const tablets = await prisma.repairDevice.upsert({
    where: { slug: 'tablet' },
    update: {},
    create: {
      name: 'Tablet',
      slug: 'tablet',
      icon: 'Tablet',
      order: 2,
    },
  });

  const computers = await prisma.repairDevice.upsert({
    where: { slug: 'computer' },
    update: {},
    create: {
      name: 'Computer',
      slug: 'computer',
      icon: 'Monitor',
      order: 3,
    },
  });

  const gamingSystems = await prisma.repairDevice.upsert({
    where: { slug: 'gaming-system' },
    update: {},
    create: {
      name: 'Gaming System',
      slug: 'gaming-system',
      icon: 'Gamepad2',
      order: 4,
    },
  });

  const wearables = await prisma.repairDevice.upsert({
    where: { slug: 'wearables' },
    update: {},
    create: {
      name: 'Wearables',
      slug: 'wearables',
      icon: 'Watch',
      order: 5,
    },
  });

  const other = await prisma.repairDevice.upsert({
    where: { slug: 'other' },
    update: {},
    create: {
      name: 'Other',
      slug: 'other',
      icon: 'HardDrive',
      order: 6,
    },
  });

  console.log('✅ Created device categories');

  // Create repair issues
  const issues = [
    { name: 'Screen Damage', slug: 'screen-damage', emoji: '📱', order: 1 },
    { name: 'Battery Drains Fast', slug: 'battery-drains-fast', emoji: '🔋', order: 2 },
    { name: 'Charging Issue', slug: 'charging-issue', emoji: '🔌', order: 3 },
    { name: 'Rear Camera Issue', slug: 'rear-camera-issue', emoji: '📷', order: 4 },
    { name: 'Front Camera Issue (Selfie)', slug: 'front-camera-issue', emoji: '🤳', order: 5 },
    { name: 'Rear Camera Lens Damage', slug: 'rear-camera-lens-damage', emoji: '📸', order: 6 },
    { name: 'Back Housing / Glass Damage', slug: 'back-housing-glass-damage', emoji: '📱', order: 7 },
    { name: 'Water / Liquid Damage', slug: 'water-liquid-damage', emoji: '💧', order: 8 },
    { name: 'Other', slug: 'other', emoji: '❓', order: 9 },
  ];

  for (const issue of issues) {
    await prisma.repairIssue.upsert({
      where: { slug: issue.slug },
      update: {},
      create: issue,
    });
  }

  console.log('✅ Created repair issues');

  // Map all issues to smartphones, tablets, and computers
  const commonDevices = [smartphones.id, tablets.id, computers.id];
  const allIssues = await prisma.repairIssue.findMany();

  for (const deviceId of commonDevices) {
    for (const issue of allIssues) {
      await prisma.repairDeviceIssue.upsert({
        where: {
          deviceId_issueId: {
            deviceId,
            issueId: issue.id,
          },
        },
        update: {},
        create: {
          deviceId,
          issueId: issue.id,
        },
      });
    }
  }

  // Map limited issues to gaming systems and wearables
  const limitedIssues = allIssues.filter(i =>
    ['charging-issue', 'water-liquid-damage', 'other'].includes(i.slug)
  );

  for (const deviceId of [gamingSystems.id, wearables.id]) {
    for (const issue of limitedIssues) {
      await prisma.repairDeviceIssue.upsert({
        where: {
          deviceId_issueId: {
            deviceId,
            issueId: issue.id,
          },
        },
        update: {},
        create: {
          deviceId,
          issueId: issue.id,
        },
      });
    }
  }

  console.log('✅ Mapped issues to devices');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
