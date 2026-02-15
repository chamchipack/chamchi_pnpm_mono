// lib/api/getClassesByIds.ts

export const getClassByIds = async (ids: string[]) => {
  if (!ids.length) return [];

  const res = await fetch(`/api/classes/list?ids=${ids.join(',')}`);

  if (!res.ok) {
    throw new Error('Failed to fetch classes');
  }

  return res.json() as Promise<{ id: string; name: string }[]>;
};
