import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const keyword = searchParams.get('keyword');
    const sort = searchParams.get('sort') ?? '-created';

    const filters: string[] = [];

    // 기본 조건 (AND)
    filters.push(`currentStatus = true`);
    filters.push(`paymentType = "package"`);
    filters.push(`lessonBasedPayment.isPaid = false`);

    // 이름 검색
    if (keyword) {
      filters.push(`studentName ~ "${keyword}"`);
    }

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
