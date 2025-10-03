import { PrismaClient } from '@prisma/client';
import { recalculateAllOfferPrices } from '../src/lib/backend/offer-calculator';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting offer price recalculation...');

  const result = await recalculateAllOfferPrices();

  console.log(`✅ Successfully recalculated ${result.updated} offer prices`);

  // Show sample of results
  const samples = await prisma.pricingData.findMany({
    where: {
      modelName: { contains: '17 Pro Max' },
      network: 'Unlocked',
    },
    select: {
      model: true,
      priceGradeA: true,
      offerGradeA: true,
      offersCalculatedAt: true,
    },
    take: 3,
  });

  console.log('\nSample results:');
  samples.forEach(s => {
    console.log(`  ${s.model}: Atlas $${s.priceGradeA} → Offer $${s.offerGradeA}`);
  });
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
