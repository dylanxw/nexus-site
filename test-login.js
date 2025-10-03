const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testLogin() {
  try {
    console.log('🔍 Checking for admin user...');

    const user = await prisma.user.findUnique({
      where: { email: 'admin@nexus.com' },
    });

    if (!user) {
      console.log('❌ Admin user not found!');
      console.log('Creating admin user...');

      const hashedPassword = await bcrypt.hash('NexusAdmin2024!', 12);

      const newUser = await prisma.user.create({
        data: {
          email: 'admin@nexus.com',
          password: hashedPassword,
          name: 'Admin User',
          role: 'ADMIN',
          active: true,
        },
      });

      console.log('✅ Admin user created:', newUser.email);
    } else {
      console.log('✅ Admin user found:', user.email);
      console.log('   Name:', user.name);
      console.log('   Role:', user.role);
      console.log('   Active:', user.active);

      // Test password
      const isValid = await bcrypt.compare('NexusAdmin2024!', user.password);
      console.log('   Password test:', isValid ? '✅ Valid' : '❌ Invalid');

      if (!isValid) {
        console.log('Resetting password...');
        const hashedPassword = await bcrypt.hash('NexusAdmin2024!', 12);
        await prisma.user.update({
          where: { id: user.id },
          data: { password: hashedPassword },
        });
        console.log('✅ Password reset successfully');
      }
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testLogin();