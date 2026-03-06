import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const sort = searchParams.get('sort') ?? '-created';

    const filters: string[] = [];

    // 기본 조건 (AND)
    filters.push(`currentStatus = true`);
    filters.push(`paymentType = "regular"`);

    const filter = filters.join(' && ');

    const data = await pb.collection('student').getFullList({
      filter,
      sort,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/payment]', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
