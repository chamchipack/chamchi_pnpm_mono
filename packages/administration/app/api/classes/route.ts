// app/api/students/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // pagination
    const page = Number(searchParams.get('page') ?? 1);
    const perPage = Number(searchParams.get('perPage') ?? 10);

    // query params
    const keyword = searchParams.get('keyword');
    const sort = searchParams.get('sort') ?? '-created';

    /**
     * PocketBase filter builder
     */
    const filters: string[] = [];

    if (keyword) {
      // name LIKE 검색
      filters.push(`name ~ "${keyword}"`);
    }

    const filter = filters.length > 0 ? filters.join(' && ') : '';

    const data = await pb
      .collection('class')
      .getList(Number(page), Number(perPage), {
        filter,
        sort,
      });

    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/classes]', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.name) {
      return NextResponse.json(
        { message: '이름은 필수입니다.' },
        { status: 400 },
      );
    }

    const createdClass = await pb.collection('class').create(body);

    return NextResponse.json(
      {
        class: createdClass,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Class POST error:', error);
    return NextResponse.json({ message: '클래스 생성 실패' }, { status: 500 });
  }
}
