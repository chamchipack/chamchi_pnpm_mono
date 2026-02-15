// app/api/classes/route.ts
import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const idsParam = searchParams.get('ids');

    if (!idsParam) {
      return NextResponse.json([]);
    }

    const ids = idsParam.split(',');

    /**
     * id 여러개 OR 필터
     */
    const filter = ids.map((id) => `id = "${id}"`).join(' || ');

    const data = await pb.collection('class').getFullList({
      filter,
      fields: 'id,name', // 🔥 id, name만 가져오기
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
