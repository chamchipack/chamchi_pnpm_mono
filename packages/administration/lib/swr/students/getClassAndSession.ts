export const getClassAndSession = async (
  classId: string[],
  sessionId: string[],
) => {
  if (!classId.length && !sessionId.length) return [];

  const res = await fetch(
    `/api/students/classandsession?classId=${classId.join(',')}&sessionId=${sessionId.join(',')}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch classes');
  }

  return res.json() as Promise<{ id: string; name: string }[]>;
};
