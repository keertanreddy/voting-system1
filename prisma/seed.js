const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.candidate.count();
  if (existing > 0) {
    console.log('Candidates already seeded.');
    return;
  }

  await prisma.candidate.createMany({
    data: [
      { name: 'Alice Smith', description: 'Experienced leader with a focus on innovation.', imageUrl: 'https://i.pravatar.cc/150?u=alice' },
      { name: 'Bob Jones', description: 'Dedicated to community growth and transparency.', imageUrl: 'https://i.pravatar.cc/150?u=bob' },
      { name: 'Charlie Brown', description: 'Advocating for sustainable development.', imageUrl: 'https://i.pravatar.cc/150?u=charlie' },
    ]
  });
  console.log('Seeded candidates!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
