// app/api/attendance/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      sessionId,
      classId,
      studentId,
      studentName,
      paymentType,
      dayOfWeek,
      attendanceDate, // "2026-03-05"
      status,
      confirmationDate,
      excusedDate,
    } = body;

    console.log(body);

    // ✅ 필수값 체크
    if (!sessionId || !studentId || !attendanceDate || !status || !dayOfWeek) {
      return NextResponse.json(
        { message: 'Required fields are missing' },
        { status: 400 },
      );
    }

    // 🔥 1️⃣ session 조회
    const session = await pb.collection('session').getOne(sessionId);

    if (!session?.lessonTimes?.[dayOfWeek]?.stime) {
      return NextResponse.json(
        { message: 'Lesson time not found' },
        { status: 400 },
      );
    }

    // 🔥 2️⃣ stime 추출 (예: "14:00")
    const stime = session.lessonTimes[dayOfWeek].stime;

    // 🔥 3️⃣ attendanceDate + stime 합치기
    const finalAttendanceDate = `${attendanceDate} ${stime}:00`;

    // ✅ 생성 데이터
    const data = {
      sessionId,
      classId: classId ?? null,
      studentId,
      studentName: studentName ?? '',
      paymentType: paymentType ?? '',
      dayOfWeek,
      attendanceDate: finalAttendanceDate, // 🔥 여기 변경됨
      status,
      confirmationDate: confirmationDate ?? null,
      excusedDate: excusedDate ?? null,
    };

    const record = await pb.collection('attendance').create(data);

    return NextResponse.json(record);
  } catch (error) {
    console.error('[POST /api/attendance]', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
