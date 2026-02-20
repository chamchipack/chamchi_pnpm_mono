import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();

    // ✅ session에 들어갈 데이터 정리
    const sessionData = {
      name: body.name,
      instructorId: body?.instructorId || [],
      regularDays: body?.regularDays || [],
      lessonTimes: body?.lessonTimes || {},
    };

    // ✅ 1. student 먼저 수정
    const updatedStudent = await pb
      .collection('student')
      .update(params.id, body);

    // ✅ 2. sessionId[0] 가져오기
    const sessionId = updatedStudent?.sessionId?.[0];

    let updatedSession = null;

    if (sessionId) {
      updatedSession = await pb
        .collection('session')
        .update(sessionId, sessionData);
    }

    return NextResponse.json({
      student: updatedStudent,
      session: updatedSession,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: '학생 수정 실패', error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const studentId = params.id;

    // ✅ 1. student 먼저 조회 (sessionId 얻기 위해)
    const student = await pb.collection('student').getOne(studentId);

    const sessionId = student?.sessionId?.[0];

    // ✅ 2. session 삭제 (있으면)
    if (sessionId) {
      await pb.collection('session').delete(sessionId);
    }

    // ✅ 3. student 삭제
    await pb.collection('student').delete(studentId);

    return NextResponse.json({
      message: '학생 및 연결된 세션 삭제 완료',
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: '학생 삭제 실패', error: error.message },
      { status: 500 },
    );
  }
}
