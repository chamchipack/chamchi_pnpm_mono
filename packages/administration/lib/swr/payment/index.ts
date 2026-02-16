export async function getIndividualPayments(studentId: string) {
  try {
    const res = await fetch(`/api/payment/individual/${studentId}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('결제 조회 실패');
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
