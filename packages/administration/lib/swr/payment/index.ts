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

export async function getDashboardPayment(month: string) {
  try {
    const res = await fetch(`/api/dashboard/payment?month=${month}`, {
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

export async function getPaymentForPackage() {
  try {
    const res = await fetch(`/api/payment/list/package`, {
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

export async function getPaymentForRegular() {
  try {
    const res = await fetch(`/api/payment/list/regular`, {
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
