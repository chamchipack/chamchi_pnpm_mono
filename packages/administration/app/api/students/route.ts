// app/api/students/route.ts
import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // pagination
    const page = Number(searchParams.get('page') ?? 1);
    const perPage = Number(searchParams.get('perPage') ?? 10);

    // query params
    const keyword = searchParams.get('keyword');
    const currentStatus = searchParams.get('currentStatus');
    const sort = searchParams.get('sort') ?? '-created';

    /**
     * PocketBase filter builder
     */
    const filters: string[] = [];

    if (keyword) {
      // name LIKE 검색
      filters.push(`name ~ "${keyword}"`);
    }

    if (currentStatus !== null) {
      filters.push(
        `currentStatus = ${currentStatus === 'true' ? currentStatus : false}`,
      );
    }

    const filter = filters.length > 0 ? filters.join(' && ') : '';

    const data = await pb
      .collection('student')
      .getList(Number(page), Number(perPage), {
        filter,
        sort,
      });

    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/students]', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
