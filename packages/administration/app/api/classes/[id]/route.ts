import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();

    const updatedClass = await pb.collection('class').update(params.id, body);

    return NextResponse.json({
      class: updatedClass,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: '클래스 수정 실패', error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const classId = params.id;

    await pb.collection('class').delete(classId);

    return NextResponse.json({
      message: '클래스 삭제 완료',
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: '클래스 삭제 실패', error: error.message },
      { status: 500 },
    );
  }
}
