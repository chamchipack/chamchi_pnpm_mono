// app/api/attendance/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

const processAttendance = (payment: any) => {
  if (!payment?.total) return {};
  // 기존 데이터를 복사하여 새로운 객체 생성 (불변성 유지)
  const updated = { ...payment };

  if (updated.remaining > 0) {
    // 1. 남은 횟수가 있을 때: remaining 차감
    updated.remaining -= 1;

    // 차감 후 0이 되었다면 결제 필요 상태로 변경
    if (updated.remaining === 0) {
      updated.isPaid = false;
    }
  } else {
    // 2. 남은 횟수가 0일 때 (또는 이미 초과 상태일 때)
    // remaining은 0으로 고정, over(초과 횟수)를 1 증가
    updated.remaining = 0;
    updated.over += 1;
    updated.isPaid = false; // 이미 0이하이므로 항상 false
  }

  return updated;
};

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
      lessonBasedPayment,
      regularPayment,
    } = body;

    const newLessonPaymentData = processAttendance(lessonBasedPayment);

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

    if (Object.keys(newLessonPaymentData).length) {
      const updatedRecord = await pb.collection('student').update(studentId, {
        lessonBasedPayment: newLessonPaymentData,
      });
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error('[POST /api/attendance]', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
