import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. 필수 데이터 검증
    if (!body.studentId || !body.classId || !body.method) {
      return NextResponse.json(
        { message: '필수 데이터가 누락되었습니다.' },
        { status: 400 },
      );
    }

    // 2. 클래스 정보 조회 (금액 가져오기)
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

    // 3. 결제 데이터(payment) 생성
    const paymentRecord = await pb.collection('payment').create({
      ...body,
      amount: classAmount,
    });

    /**
     * 4. 학생의 regularPayment 정보 업데이트
     */
    try {
      const payDate = new Date(body.paymentDate || new Date());

      // 차기 결제일 계산 (한 달 뒤)
      // setMonth는 일(date)이 해당 월의 마지막 날보다 크면 자동으로 다음 달로 넘기므로
      // 안전한 날짜 계산이 필요합니다.
      const nextDate = new Date(payDate);
      const currentMonth = nextDate.getMonth();
      nextDate.setMonth(currentMonth + 1);

      // 예: 1월 31일 결제 -> 2월 31일은 없으므로 3월로 넘어가는 현상 방지
      if (nextDate.getMonth() > (currentMonth + 1) % 12) {
        nextDate.setDate(0); // 전월의 마지막 날로 세팅
      }

      const formatDate = (d: Date) => d.toISOString().split('T')[0];

      const updatedRegularPayment = {
        lastPaymentDate: formatDate(payDate),
        nextDueDate: formatDate(nextDate),
      };

      // 학생 컬렉션 업데이트
      await pb.collection('student').update(body.studentId, {
        regularPayment: updatedRegularPayment,
      });
    } catch (studentErr) {
      console.error('학생 정보 업데이트 실패:', studentErr);
      // 결제는 생성되었으므로 전체 에러를 내지 않고 로그만 남기거나
      // 서비스 정책에 따라 처리를 결정합니다.
    }

    return NextResponse.json(paymentRecord, { status: 201 });
  } catch (error: any) {
    console.error('[POST /api/payment/regular] Error:', error);
    return NextResponse.json(
      { message: error.message || '처리 오류' },
      { status: 500 },
    );
  }
}
