import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const n = Number(searchParams.get('month') ?? 3); // 기본 3개월

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - (n - 1), 1);

    const startISO = startDate.toISOString();

    /**
     * 최근 n개월 등록 학생 가져오기
     */
    const records = await pb.collection('student').getFullList({
      filter: `enrollmentDate >= "${startISO}"`,
      sort: 'enrollmentDate',
    });

    /**
     * 월별 그룹핑
     */
    const map = new Map<
      string,
      { year: number; month: number; count: number }
    >();

    records.forEach((record) => {
      if (!record.enrollmentDate) return;

      const date = new Date(record.enrollmentDate);
      if (isNaN(date.getTime())) return;

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${month}`;

      if (!map.has(key)) {
        map.set(key, {
          year,
          month,
          count: 1,
        });
      } else {
        const existing = map.get(key)!;
        existing.count += 1;
      }
    });

    /**
     * 배열 변환 + 최신순 정렬
     */
    const result = Array.from(map.values()).sort((a, b) => {
      if (a.year === b.year) return b.month - a.month;
      return b.year - a.year;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[GET /api/students/enrollment-summary]', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
