import { NextRequest, NextResponse } from 'next/server';
import prisma  from '../../../../lib/prisma'; // Adjust path based on your project structure

export async function POST(req: NextRequest) {
  try {
    const { name, description, html, css, javascript, userId } = await req.json();
    console.log('in here')
    console.log(name, description, html, css, javascript, userId)
    const project = await prisma.project.create({
      data: {
        name,
        description,
        html,
        css,
        javascript,
        userId
      },
    });

    return NextResponse.json({ message: 'Project saved successfully!', project }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}
