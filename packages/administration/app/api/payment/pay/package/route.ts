import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // payload: studentId, classId, method, amount, count(충전횟수) 등

    if (!body.studentId || !body.classId) {
      return NextResponse.json(
        { message: '필수 정보가 누락되었습니다.' },
        { status: 400 },
      );
    }

    let classAmount = 0;
    try {
      const classRecord = await pb.collection('class').getOne(body.classId);
      classAmount = classRecord.price || 0;
    } catch (err) {
      return NextResponse.json(
        { message: '클래스 정보 조회 실패' },
        { status: 404 },
      );
    }

    // 1. 결제 기록(payment) 생성
    const paymentRecord = await pb.collection('payment').create({
      ...body,
      amount: classAmount,
      paymentType: 'package',
    });

    // 2. 학생의 회차 정보 업데이트
    const student = await pb.collection('student').getOne(body.studentId);
    const prevPayment = student.lessonBasedPayment || {
      total: 0,
      remaining: 0,
      over: 0,
    };

    // 1. 새로운 전체 횟수: 기존 총 횟수 + 새로 결제한 횟수(body.total)
    const newTotal = (prevPayment.total || 0) + (body.total || 0);

    // 2. 새로운 남은 횟수 계산:
    // (기존 남은 횟수 + 이번에 새로 결제한 횟수) - 기존에 초과해서 들은 횟수(over)
    // * 주의: body.remaining이 이번에 새로 충전할 양을 의미한다고 가정합니다.
    const calculatedRemaining =
      (prevPayment.remaining || 0) +
      (body.remaining || 0) -
      (prevPayment.over || 0);

    await pb.collection('student').update(body.studentId, {
      lessonBasedPayment: {
        ...prevPayment,
        total: newTotal,
        remaining: calculatedRemaining < 0 ? 0 : calculatedRemaining,
        over: 0, // 결제를 완료했으므로 초과 횟수는 0으로 초기화
        isPaid: true, // 횟수가 충전되었으므로 유료 상태로 전환
      },
    });

    return NextResponse.json(paymentRecord, { status: 201 });
  } catch (error: any) {
    console.error('[POST /api/payment/package] Error:', error);
    return NextResponse.json(
      { message: error.message || '처리 오류' },
      { status: 500 },
    );
  }
}
