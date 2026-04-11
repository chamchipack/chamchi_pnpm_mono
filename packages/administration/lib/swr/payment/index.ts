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
export async function getPaymentForRegular(selectedMonth: string) {
  try {
    // 1. 쿼리 파라미터 생성 (yearMonth=2026-04 형태)
    const params = new URLSearchParams({
      yearMonth: selectedMonth,
      // 필요한 경우 sort 파라미터도 여기서 추가 가능
      // sort: '-created'
    });

    // 2. API 경로에 파라미터 붙여서 호출
    const res = await fetch(`/api/payment/list/regular?${params.toString()}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      // 400이나 500 에러 시 메시지 확인을 위해 텍스트 추출 시도
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || '결제 명단 조회 실패');
    }

    return await res.json();
  } catch (error) {
    console.error('[Fetch Error: getPaymentForRegular]', error);
    return [];
  }
}

export async function createRegularPayment(payload: any) {
  try {
    const res = await fetch('/api/payment/pay/regular', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || '결제 처리 서버 오류');
    }

    return await res.json();
  } catch (error) {
    console.error('[Fetch Error: createRegularPayment]', error);
    throw error; // 컴포넌트에서 에러 처리를 할 수 있도록 throw
  }
}

/**
 * 회차(패키지) 결제 데이터를 생성합니다.
 */
export async function createPackagePayment(payload: any) {
  try {
    const res = await fetch('/api/payment/pay/package', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || '회차 결제 처리 실패');
    }

    return await res.json();
  } catch (error) {
    console.error('[Fetch Error: createPackagePayment]', error);
    throw error;
  }
}
