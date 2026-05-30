import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const candidatesWithVotes = await prisma.candidate.findMany({
      include: {
        _count: {
          select: { votes: true }
        }
      }
    });
    
    const results = candidatesWithVotes.map(c => ({
      name: c.name,
      votes: c._count.votes
    }));
    
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { candidateId, voterId } = await request.json();
    
    const vote = await prisma.vote.create({
      data: {
        candidateId,
        voterId,
      }
    });
    
    return NextResponse.json({ success: true, vote });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'You have already voted.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to cast vote.' }, { status: 500 });
  }
}
