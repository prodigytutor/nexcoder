import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjust path based on your project structure

export async function GET(req: NextRequest) {
  try {
    const {projectId} = await req.json();
    const project = await prisma.project.findFirst({
        where: {
            id: projectId
        }
    }
    );
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}
