import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdmin() {
  try {
    console.log('🌱 Seeding admin user...');

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@nexus.com' },
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('NexusAdmin2024!', 12);

    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@nexus.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN',
        active: true,
      },
    });

    console.log('✅ Admin user created successfully');
    console.log('📧 Email: admin@nexus.com');
    console.log('🔑 Password: NexusAdmin2024!');
    console.log('');
    console.log('⚠️  IMPORTANT: Change this password after first login!');
    console.log('');
    console.log('Admin user details:', {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
    });
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed
seedAdmin().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});