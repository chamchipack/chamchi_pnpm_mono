// lib/api/getClassesByIds.ts

export const getTodaySessions = async (date: string) => {
  if (!date) return [];

  const res = await fetch(`/api/attendance/today?date=${date}`);

  if (!res.ok) {
    throw new Error('Failed to fetch classes');
  }

  return res.json() as Promise<{ id: string; name: string }[]>;
};
