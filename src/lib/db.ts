import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Ensure the client is connected
prisma.$connect().catch((err) => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});