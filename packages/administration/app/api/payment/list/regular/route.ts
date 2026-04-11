// import { NextRequest, NextResponse } from 'next/server';
// import { pb } from '@/lib/pocketbase/server';

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const sort = searchParams.get('sort') ?? '-created';

//     const filters: string[] = [];

//     // 기본 조건 (AND)
//     filters.push(`currentStatus = true`);
//     filters.push(`paymentType = "regular"`);

//     const filter = filters.join(' && ');

//     const data = await pb.collection('student').getFullList({
//       filter,
//       sort,
//     });

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('[GET /api/payment]', error);

//     return NextResponse.json(
//       { message: 'Internal Server Error' },
//       { status: 500 },
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const yearMonth = searchParams.get('yearMonth'); // 예: "2026-04"
    const sort = searchParams.get('sort') ?? '-created';

    if (!yearMonth) {
      return NextResponse.json(
        { message: 'yearMonth 파라미터가 필요합니다.' },
        { status: 400 },
      );
    }

    // 1. 해당 월 결제자 조회 (기존 로직 유지)
    const paidPayments = await pb.collection('payment').getFullList({
      filter: `paymentYearMonth = "${yearMonth}" && paymentType = "regular"`,
      fields: 'studentId',
    });
    const paidStudentIds = Array.from(
      new Set(paidPayments.map((p) => p.studentId)),
    );

    // 2. 학생 필터 구성
    const filters: string[] = [];
    filters.push(`currentStatus = true`);
    filters.push(`paymentType = "regular"`);

    /**
     * 핵심 로직 추가: 등록일 필터링
     * 선택한 달(yearMonth)의 마지막 날을 구해서, 그보다 늦게 등록한 사람은 제외합니다.
     * 예: yearMonth가 "2026-04"라면, enrollmentDate <= "2026-04-30 23:59:59"
     */
    const [year, month] = yearMonth.split('-').map(Number);
    const lastDay = new Date(year, month, 0).getDate(); // 해당 월의 마지막 날짜 계산
    const endOfMonth = `${yearMonth}-${String(lastDay).padStart(2, '0')} 23:59:59`;

    filters.push(`enrollmentDate <= "${endOfMonth}"`);

    // 3. 결제 완료자 제외 필터 (기존 로직 유지)
    if (paidStudentIds.length > 0) {
      const excludeFilter = paidStudentIds
        .map((id) => `id != "${id}"`)
        .join(' && ');
      filters.push(`(${excludeFilter})`);
    }

    const filter = filters.join(' && ');

    // 4. 최종 미납 학생 명단 조회
    const unpaidStudents = await pb.collection('student').getFullList({
      filter,
      sort,
    });

    return NextResponse.json(unpaidStudents);
  } catch (error) {
    console.error('[GET /api/payment]', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
