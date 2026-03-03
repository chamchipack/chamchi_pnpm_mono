// app/api/sessions/route.ts
import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const date = searchParams.get('date');
    if (!date) {
      return NextResponse.json(
        { message: 'date is required' },
        { status: 400 },
      );
    }

    // 1️⃣ date → 요일 변환
    const day = new Date(date).getDay().toString();

    // 2️⃣ session 조회
    const sessions = await pb.collection('session').getFullList({
      filter: `regularDays ~ "${day}"`,
      sort: '-created',
    });

    const sessionIds = sessions.map((s) => s.id);

    if (sessionIds.length === 0) {
      return NextResponse.json({
        sessions: [],
        students: [],
      });
    }

    // 3️⃣ session OR 필터
    const sessionFilter = `(${sessionIds
      .map((id) => `sessionId~"${id}"`)
      .join(' || ')})`;

    const studentFilter = `
      ${sessionFilter}
      && currentStatus = true
      && enrollmentDate <= "${date}"
    `;

    // 4️⃣ student 조회
    const students = await pb.collection('student').getFullList({
      filter: studentFilter,
      sort: '-created',
    });

    // 5️⃣ 해당 날짜 attendance 조회
    const attendLog = await pb.collection('attendance').getFullList({
      filter: `attendanceDate ~ "${date}"`,
      sort: '-created',
    });

    // 🔥 6️⃣ attendance Map 생성
    const attendanceMap = new Map();
    attendLog.forEach((log) => {
      attendanceMap.set(log.studentId, log);
    });

    // 🔥 7️⃣ students에 출석 정보 merge
    const enrichedStudents = students.map((student) => {
      const log = attendanceMap.get(student.id);

      return {
        ...student,
        attendanceId: log?.id ?? null,
        attendanceStatus: log?.status ?? null, // present / late / absent / makeup
        isAttended: !!log,
      };
    });

    return NextResponse.json(enrichedStudents);
  } catch (error) {
    console.error('[GET /api/sessions]', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
