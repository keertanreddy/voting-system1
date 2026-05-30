import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let candidates = await prisma.candidate.findMany();
    if (candidates.length === 0) {
      await prisma.candidate.createMany({
        data: [
          { name: 'Alice Smith', description: 'Experienced leader with a focus on innovation.', imageUrl: 'https://i.pravatar.cc/150?u=alice' },
          { name: 'Bob Jones', description: 'Dedicated to community growth and transparency.', imageUrl: 'https://i.pravatar.cc/150?u=bob' },
          { name: 'Charlie Brown', description: 'Advocating for sustainable development.', imageUrl: 'https://i.pravatar.cc/150?u=charlie' },
        ]
      });
      candidates = await prisma.candidate.findMany();
    }
    return NextResponse.json(candidates);
  } catch (error: any) {
    console.error("Fetch candidates error:", error);
    return NextResponse.json({ error: 'Failed to fetch candidates', details: error.message }, { status: 500 });
  }
}
