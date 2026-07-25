// app/api/statistics/cohort/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase/server';
import dayjs from 'dayjs';

interface StudentRecord {
  id: string;
  enrollmentDate: string; // 'YYYY-MM-DD'
}

interface PaymentRecord {
  studentId: string;
  paymentYearMonth: string; // 'YYYY-MM'
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // 코호트별로 몇 개월차까지의 유지율을 볼지 (기본 6개월)
    const months = Number(searchParams.get('months') ?? 6);

    // 등록일 기준 코호트 범위 필터 (선택)
    const from = searchParams.get('from'); // 'YYYY-MM-DD'
    const to = searchParams.get('to'); // 'YYYY-MM-DD'

    /**
     * 1️⃣ 코호트 생성을 위한 학생 목록 (필요한 필드만)
     */
    const studentFilters: string[] = [];
    if (from) studentFilters.push(`enrollmentDate >= "${from}"`);
    if (to) studentFilters.push(`enrollmentDate <= "${to}"`);

    const students = await pb.collection('student').getFullList<StudentRecord>({
      filter: studentFilters.join(' && '),
      fields: 'id,enrollmentDate',
    });

    if (!students.length) {
      return NextResponse.json({ cohorts: [] });
    }

    /**
     * 2️⃣ 결제 기록 전체 조회 (studentId + paymentYearMonth만)
     */
    const payments = await pb.collection('payment').getFullList<PaymentRecord>({
      fields: 'studentId,paymentYearMonth',
    });

    /**
     * 3️⃣ 학생별로 "결제한 월"들을 Set으로 구성
     *    → 같은 달에 여러 번 결제해도 자동으로 중복 제거됨
     */
    const paidMonthsByStudent = new Map<string, Set<string>>();
    for (const payment of payments) {
      if (!payment.studentId) continue;
      if (!paidMonthsByStudent.has(payment.studentId)) {
        paidMonthsByStudent.set(payment.studentId, new Set());
      }
      paidMonthsByStudent.get(payment.studentId)!.add(payment.paymentYearMonth);
    }

    /**
     * 4️⃣ 학생을 등록월(코호트) 기준으로 그룹화
     */
    const studentsByCohort = new Map<string, StudentRecord[]>();
    for (const student of students) {
      if (!student.enrollmentDate) continue;
      const cohortMonth = dayjs(student.enrollmentDate).format('YYYY-MM');
      if (!studentsByCohort.has(cohortMonth)) {
        studentsByCohort.set(cohortMonth, []);
      }
      studentsByCohort.get(cohortMonth)!.push(student);
    }

    /**
     * 5️⃣ 코호트별 개월차별 유지율 계산
     */
    const now = dayjs();

    const cohorts = Array.from(studentsByCohort.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([cohortMonth, cohortStudents]) => {
        const totalCount = cohortStudents.length;
        const retention = [];

        for (let offset = 0; offset < months; offset++) {
          const targetMonth = dayjs(`${cohortMonth}-01`).add(offset, 'month');

          // 아직 도래하지 않은 미래 월이면 계산 불가 → null 처리
          if (targetMonth.isAfter(now, 'month')) {
            retention.push({
              monthOffset: offset,
              yearMonth: targetMonth.format('YYYY-MM'),
              retainedCount: null,
              retentionRate: null,
            });
            continue;
          }

          const targetYearMonth = targetMonth.format('YYYY-MM');

          const retainedCount = cohortStudents.filter((student) =>
            paidMonthsByStudent.get(student.id)?.has(targetYearMonth),
          ).length;

          retention.push({
            monthOffset: offset,
            yearMonth: targetYearMonth,
            retainedCount,
            retentionRate: Number(
              ((retainedCount / totalCount) * 100).toFixed(1),
            ),
          });
        }

        return { cohortMonth, totalCount, retention };
      });

    return NextResponse.json({ cohorts });
  } catch (error) {
    console.error('[GET /api/statistics/cohort]', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
