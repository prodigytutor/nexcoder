import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjust path based on your project structure

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}
