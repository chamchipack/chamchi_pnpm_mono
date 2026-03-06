// lib/api/getClassesByIds.ts

export const getTodaySessions = async (date: string) => {
  if (!date) return [];

  const res = await fetch(`/api/attendance/today?date=${date}`);

  if (!res.ok) {
    throw new Error('Failed to fetch classes');
  }

  return res.json() as Promise<{ id: string; name: string }[]>;
};

export const createAttendanceData = async (data: any) => {
  const res = await fetch('/api/attendance/active', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('데이터 생성 실패');
  }

  return res.json();
};
