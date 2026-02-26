// app/api/sessions/route.ts
import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const day = searchParams.get('day');
    const page = searchParams.get('page') ?? '1';
    const perPage = searchParams.get('perPage') ?? '50';

    const filters: string[] = [];

    // 🔥 regularDays 배열 안에 day 포함 검색
    if (day) {
      filters.push(`regularDays ~ "${day}"`);
    }

    const filter = filters.length > 0 ? filters.join(' && ') : '';

    const data = await pb.collection('session').getFullList({
      filter,
      sort: '-created',
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/sessions]', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
