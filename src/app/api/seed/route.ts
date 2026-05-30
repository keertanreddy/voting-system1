import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const existing = await prisma.candidate.count();
  if (existing > 0) {
    return NextResponse.json({ message: 'Candidates already seeded.' });
  }

  await prisma.candidate.createMany({
    data: [
      { name: 'Alice Smith', description: 'Experienced leader with a focus on innovation.', imageUrl: 'https://i.pravatar.cc/150?u=alice' },
      { name: 'Bob Jones', description: 'Dedicated to community growth and transparency.', imageUrl: 'https://i.pravatar.cc/150?u=bob' },
      { name: 'Charlie Brown', description: 'Advocating for sustainable development.', imageUrl: 'https://i.pravatar.cc/150?u=charlie' },
    ]
  });
  return NextResponse.json({ message: 'Seeded candidates!' });
}
