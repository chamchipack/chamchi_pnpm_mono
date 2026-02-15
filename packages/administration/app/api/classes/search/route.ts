import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

function escapeFilter(value: string) {
  return value
    .replace(/\\/g, '\\\\') // \ → \\
    .replace(/"/g, '\\"'); // " → \"
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword')?.trim();

    if (!keyword) {
      return NextResponse.json([]);
    }

    if (!/[a-zA-Z0-9가-힣]/.test(keyword)) {
      return NextResponse.json([]);
    }

    // PocketBase 부분일치 검색 (~)
    const safeKeyword = escapeFilter(keyword);

    const filter = `name ~ "${safeKeyword}"`;

    console.log(filter);

    const data = await pb.collection('class').getList(1, 20, {
      filter,
      fields: 'id,name',
      sort: 'name',
    });

    return NextResponse.json(data.items);
  } catch (error) {
    console.error('[GET /api/classes/search]', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
