// app/api/students/[id]/route.ts
import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

interface Context {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, { params }: Context) {
  try {
    const { id } = params;
    const body = await req.json();
    const { currentStatus } = body;

    if (!id) {
      return NextResponse.json(
        { message: 'Student id is required' },
        { status: 400 },
      );
    }

    if (typeof currentStatus !== 'boolean') {
      return NextResponse.json(
        { message: 'currentStatus must be boolean' },
        { status: 400 },
      );
    }

    const updated = await pb.collection('student').update(id, {
      currentStatus,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('[PATCH /api/students/[id]]', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
