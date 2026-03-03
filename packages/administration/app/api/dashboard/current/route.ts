// app/api/students/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // pagination
    const page = Number(searchParams.get('page') ?? 1);
    const perPage = Number(searchParams.get('perPage') ?? 10);

    // query params
    const keyword = searchParams.get('keyword');
    const currentStatus = searchParams.get('currentStatus');
    const sort = searchParams.get('sort') ?? '-created';

    /**
     * PocketBase filter builder
     */
    const filters: string[] = [];

    if (keyword) {
      // name LIKE 검색
      filters.push(`name ~ "${keyword}"`);
    }

    if (currentStatus !== null) {
      filters.push(
        `currentStatus = ${currentStatus === 'true' ? currentStatus : false}`,
      );
    }

    const filter = filters.length > 0 ? filters.join(' && ') : '';

    const data = await pb
      .collection('student')
      .getList(Number(page), Number(perPage), {
        filter,
        sort,
      });

    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/students]', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.name) {
      return NextResponse.json(
        { message: '이름은 필수입니다.' },
        { status: 400 },
      );
    }

    /**
     * 1️⃣ session 먼저 생성
     */
    const sessionData = {
      name: body.name,
      studentId: [], // 나중에 업데이트
      instructorId: body?.instructorId || [],
      regularDays: body?.regularDays || [],
      lessonTimes: body?.lessonTimes || {},
      type: body?.type || 'lesson',
    };

    const createdSession = await pb.collection('session').create(sessionData);

    /**
     * 2️⃣ student 생성 (sessionId 연결)
     */
    const studentData = {
      ...body,
      sessionId: [createdSession.id], // relation 필드라고 가정
    };

    const createdStudent = await pb.collection('student').create(studentData);

    /**
     * 3️⃣ 기존 session에 studentId 업데이트
     */
    await pb.collection('session').update(createdSession.id, {
      studentId: [createdStudent.id],
    });

    return NextResponse.json(
      {
        student: createdStudent,
        session: createdSession,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Student POST error:', error);
    return NextResponse.json({ message: '학생 생성 실패' }, { status: 500 });
  }
}
