export const searchClasses = async (keyword: string) => {
  if (!keyword.trim()) return [];

  const res = await fetch(
    `/api/classes/search?keyword=${encodeURIComponent(keyword)}`,
  );

  if (!res.ok) {
    throw new Error('Failed to search classes');
  }

  return res.json() as Promise<{ id: string; name: string }[]>;
};
