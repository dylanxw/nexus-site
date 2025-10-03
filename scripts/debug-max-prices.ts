import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Checking iPhone 17 series pricing data:\n');

  const models17 = await prisma.pricingData.findMany({
    where: {
      modelName: { contains: '17' },
      network: 'Unlocked',
      isActive: true
    },
    select: {
      modelName: true,
      storage: true,
      priceGradeA: true,
      offerGradeA: true
    },
    orderBy: [{ modelName: 'asc' }, { storage: 'asc' }]
  });

  const grouped = models17.reduce((acc, m) => {
    if (!acc[m.modelName]) acc[m.modelName] = [];
    acc[m.modelName].push(m);
    return acc;
  }, {} as Record<string, typeof models17>);

  Object.entries(grouped).forEach(([name, items]) => {
    console.log(`\n${name}:`);
    items.forEach(m => {
      console.log(`  ${m.storage.padEnd(6)}: Atlas $${m.priceGradeA} → Offer $${m.offerGradeA}`);
    });
    const maxOffer = Math.max(...items.map(m => m.offerGradeA || 0));
    console.log(`  MAX OFFER: $${maxOffer}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
