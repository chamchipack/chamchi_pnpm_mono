import { pb } from '@/lib/pocketbase/server';

export const getTodayCount = async (): Promise<any> => {
  try {
    const today = new Date().getDay().toString();

    const result = await pb.collection('session').getList(1, 1, {
      filter: `regularDays ~ "${today}"`,
    });

    return result?.totalItems;
  } catch (error: any) {
    return 0;
  }
};

export const getTodaySessions = async () => {
  try {
    const today = new Date().getDay().toString();

    const records = await pb.collection('session').getFullList({
      filter: `regularDays ~ "${today}"`,
      sort: '-created',
    });

    return records;
  } catch (error) {
    console.error('getTodaySessions error:', error);
    return [];
  }
};

export const getEntireMembers = async (): Promise<number> => {
  try {
    const result = await pb.collection('student').getList(1, 1, {
      filter: 'currentStatus = true',
    });

    return result.totalItems;
  } catch (error) {
    return 0;
  }
};

export const getTaskCount = async (): Promise<number> => {
  try {
    // 1️⃣ 오늘 날짜
    const todayDate = new Date();
    const today = todayDate.getDay().toString();

    // yyyy-mm-dd 형식
    const formattedDate = todayDate.toISOString().split('T')[0];

    /**
     * 2️⃣ 오늘 수업 있는 session 조회
     */
    const sessions = await pb.collection('session').getFullList({
      filter: `regularDays ~ "${today}"`,
    });

    if (sessions.length === 0) {
      return 0;
    }

    const sessionIds = sessions.map((s) => s.id);

    /**
     * 3️⃣ 해당 세션에 속한 재원생 조회
     */
    const sessionFilter = `(${sessionIds
      .map((id) => `sessionId ~ "${id}"`)
      .join(' || ')})`;

    const students = await pb.collection('student').getFullList({
      filter: `
        ${sessionFilter}
        && currentStatus = true
        && enrollmentDate <= "${formattedDate}"
      `,
    });

    if (students.length === 0) {
      return 0;
    }

    /**
     * 4️⃣ 오늘 출석 로그 조회
     */
    const attendLog = await pb.collection('attendance').getFullList({
      filter: `attendanceDate = "${formattedDate}"`,
    });

    const attendedStudentIds = new Set(attendLog.map((log) => log.studentId));

    /**
     * 5️⃣ 출석 안 한 학생 수 계산
     */
    const notCheckedCount = students.filter(
      (student) => !attendedStudentIds.has(student.id),
    ).length;

    return notCheckedCount;
  } catch (error) {
    return 0;
  }
};

export const getMonthlyPayment = async () => {
  try {
    const now = new Date();

    // 이번 달 시작일 (YYYY-MM-01 00:00:00)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    // 다음 달 시작일
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const start = startOfMonth.toISOString();
    const end = startOfNextMonth.toISOString();

    // 이번 달 paymentDate 기준 레코드 가져오기
    const records = await pb.collection('payment').getFullList({
      filter: `paymentDate >= "${start}" && paymentDate < "${end}"`,
    });

    // 금액 필드가 amount라고 가정
    const total = records.reduce((sum, record) => {
      return sum + (record.amount || 0);
    }, 0);

    return total;
  } catch (error) {
    console.error('getMonthlyPayment error:', error);
    return 0;
  }
};
