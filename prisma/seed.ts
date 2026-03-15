import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

config();

const prisma = new PrismaClient();

// Load Colombia geo data from JSON file
const colombiaGeoPath = path.join(__dirname, '../data/colombia-geo.json');
const colombiaGeoData = JSON.parse(fs.readFileSync(colombiaGeoPath, 'utf-8'));

// Transform the geo data from departments/municipalities to code/name/cities format
const colombiaGeo: { code: string; name: string; cities: string[] }[] = colombiaGeoData.departments.map(
  (dept: { id: string; name: string; municipalities: { name: string }[] }) => ({
    code: dept.id,
    name: dept.name,
    cities: dept.municipalities.map((municipality: { name: string }) => municipality.name),
  })
);

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

  console.log('✅ Categories seeded');

  // Seed Colombia departments and cities
  for (const dept of colombiaGeo) {
    const department = await prisma.department.upsert({
      where: { code: dept.code },
      update: { name: dept.name },
      create: { code: dept.code, name: dept.name },
    });

    for (const cityName of dept.cities) {
      await prisma.city.upsert({
        where: { name_departmentId: { name: cityName, departmentId: department.id } },
        update: {},
        create: { name: cityName, departmentId: department.id },
      });
    }
  }

  console.log('✅ Colombia departments and cities seeded');
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

