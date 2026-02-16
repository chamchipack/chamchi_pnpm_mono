// import { NextRequest, NextResponse } from 'next/server';
// import { pb } from '@/lib/pocketbase/server';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   try {
//     const { id } = params;

//     if (!id) {
//       return NextResponse.json(
//         { message: 'studentId가 필요합니다.' },
//         { status: 400 },
//       );
//     }

//     const result = await pb.collection('payment').getFullList({
//       filter: `studentId="${id}"`,
//       sort: '-created',
//     });

//     return NextResponse.json(result, { status: 200 });
//   } catch (error) {
//     console.error('PocketBase GET error:', error);
//     return NextResponse.json({ message: '결제 조회 실패' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: 'studentId가 필요합니다.' },
        { status: 400 },
      );
    }

    // 전체 가져오기 (최신순)
    const result = await pb.collection('payment').getFullList({
      filter: `studentId="${id}"`,
      sort: '-created',
    });
    console.log(result);

    // 🔥 연도별 그룹핑
    const groupedByYear = result.reduce((acc: Record<string, any[]>, item) => {
      const year = new Date(item.created).getFullYear().toString();

      if (!acc[year]) {
        acc[year] = [];
      }

      acc[year].push(item);
      return acc;
    }, {});

    // 🔥 연도도 최신순으로 정렬
    const sortedGrouped = Object.keys(groupedByYear)
      .sort((a, b) => Number(b) - Number(a))
      .reduce((acc: Record<string, any[]>, year) => {
        acc[year] = groupedByYear[year];
        return acc;
      }, {});

    return NextResponse.json(sortedGrouped, { status: 200 });
  } catch (error) {
    console.error('PocketBase GET error:', error);
    return NextResponse.json({ message: '결제 조회 실패' }, { status: 500 });
  }
}
