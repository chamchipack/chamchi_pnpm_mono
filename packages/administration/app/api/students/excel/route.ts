import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(req: NextRequest) {
  try {
    // 기본 최대 200개 (필요하면 늘려도 됨)
    const students = await pb.collection('student').getFullList({
      sort: '-created', // 최신순 정렬 (선택)
    });

    return NextResponse.json(students);
  } catch (error: any) {
    return NextResponse.json(
      { message: '학생 목록 조회 실패', error: error.message },
      { status: 500 },
    );
  }
}
