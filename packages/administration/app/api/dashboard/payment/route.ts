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
     * n개월 데이터 전부 가져오기
     */
    const records = await pb.collection('payment').getFullList({
      filter: `paymentDate >= "${startISO}"`,
      sort: 'paymentDate',
    });

    /**
     * 월별 그룹핑
     */
    const map = new Map<
      string,
      { year: number; month: number; totalAmount: number; count: number }
    >();

    records.forEach((record) => {
      const date = new Date(record.paymentDate);

      if (isNaN(date.getTime())) {
        return; // 해당 record 무시
      }

      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 0-index 보정
      const key = `${year}-${month}`;

      const amount = Number(record.amount ?? 0);

      if (!map.has(key)) {
        map.set(key, {
          year,
          month,
          totalAmount: amount,
          count: 1,
        });
      } else {
        const existing = map.get(key)!;
        existing.totalAmount += amount;
        existing.count += 1;
      }
    });

    /**
     * 배열로 변환 + 최신순 정렬
     */
    const result = Array.from(map.values()).sort((a, b) => {
      if (a.year === b.year) return b.month - a.month;
      return b.year - a.year;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[GET /api/payments/summary]', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
