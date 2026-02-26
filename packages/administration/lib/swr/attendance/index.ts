// lib/api/getClassesByIds.ts

export const getTodaySessions = async (day: string) => {
  if (!day) return [];

  const res = await fetch(`/api/attendance/today?day=${day}`);

  if (!res.ok) {
    throw new Error('Failed to fetch classes');
  }

  return res.json() as Promise<{ id: string; name: string }[]>;
};
