import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

config();

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const positions = [
    { name: 'Portero' },
    { name: 'Defensa Central' },
    { name: 'Lateral Derecho' },
    { name: 'Lateral Izquierdo' },
    { name: 'Mediocampista Defensivo' },
    { name: 'Mediocampista Central' },
    { name: 'Mediocampista Ofensivo' },
    { name: 'Extremo Derecho' },
    { name: 'Extremo Izquierdo' },
    { name: 'Delantero Centro' },
  ];

  for (const position of positions) {
    await prisma.position.upsert({
      where: { name: position.name },
      update: {},
      create: position,
    });
  }

  console.log('✅ Positions seeded');

  const categories = [
    { name: 'Sub-13', minAge: 11, maxAge: 13 },
    { name: 'Sub-15', minAge: 13, maxAge: 15 },
    { name: 'Sub-17', minAge: 15, maxAge: 17 },
    { name: 'Sub-20', minAge: 17, maxAge: 20 },
    { name: 'Senior', minAge: 20, maxAge: null },
    { name: 'Veteranos', minAge: 35, maxAge: null },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

