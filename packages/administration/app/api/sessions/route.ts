import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(req: NextRequest) {
  try {
    // 기본 최대 200개 (필요하면 늘려도 됨)
    const data = await pb.collection('session').getFullList({
      sort: '-created', // 최신순 정렬 (선택)
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: '학생 목록 조회 실패', error: error.message },
      { status: 500 },
    );
  }
}
