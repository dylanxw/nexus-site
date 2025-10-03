const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function activateAdmin() {
  try {
    const updatedUser = await prisma.user.update({
      where: { email: 'admin@nexus.com' },
      data: { active: true },
    });

    console.log('✅ Admin user activated:', updatedUser.email);
    console.log('   Active:', updatedUser.active);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

activateAdmin();