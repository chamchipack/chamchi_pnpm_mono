import { ResponseStatus, Status } from '@/types/enums/enums';
import {
  DataStructureKey,
  SchemaTransform,
  StructuredDataSchemas,
} from '@/types/schema/default';
import { OrderEnum } from '@/types/schema/OrderSchema';
import qs from 'qs';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { useOrderById } from '../server/server-api';

interface ClientResponse<T> {
  message: string;
  data: {
    items: T[];
    totalCount: number;
  };
}

interface Parameters {
  page: number;
  limit?: number;
  userId: string;
  query?: string;
  month?: any;
  date?: string;
  field?: string;
}

/**
 *
 * @param params 요청할 쿼리 파라미터 (JSON)
 *
 * DataStructureKey에 맞는 제네릭을 넣어야 함
 *
 * * @returns 서버에서 받은 데이터 (ClientResponse 형식)
 */

export const useOrders = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params = {},
) => {
  return useSWR<ClientResponse<SchemaTransform<T, Op, F>>>(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/order?${qs.stringify(params)}`,
  );
};

// marketName location locationDetail
// name, image
export const useOrderListInfinite = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params: Parameters,
) => {
  const limit = params?.limit || 5;
  const keyword = params?.query ? { keyword: params?.query } : {};
  const date = params?.date ? { date: params?.date } : {};
  const userId = params?.userId ? { userId: params?.userId } : {};
  const field = params?.field ? { field: params?.field } : {};

  return useSWRInfinite<ClientResponse<SchemaTransform<T, Op, F>>>(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.data.items.length === 0)
        return null;
      if (
        previousPageData &&
        pageIndex >= Math.ceil(previousPageData?.data?.totalCount / limit)
      )
        return null;
      return `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/order?${qs.stringify({ page: pageIndex + 1, limit, ...keyword, ...date, ...userId, ...field })}`;
    },
    {
      revalidateOnMount: true, // 컴포넌트 mount될 때 항상 fetch
      revalidateOnFocus: true, // 탭 다시 포커싱될 때도 fetch
      revalidateIfStale: false, // 데이터가 오래됐으면 자동 revalidate
      dedupingInterval: 10000, // 10초 동안 중복 요청 방지
      keepPreviousData: true, // 페이지 바뀔 때 깜빡임 방지
    },
  );
};

export async function useDeleteOrder(
  userId: string,
  orderId: string,
): Promise<{ message: string; status: Status }> {
  if (!userId || !orderId)
    return { message: '주문 정보가 없습니다.', status: ResponseStatus.error };

  const { data } = await useOrderById<DataStructureKey.order, 'Pick', 'status'>(
    orderId,
  );

  if (data?.status !== 'pending')
    return {
      message: '이미 주문이 접수되었습니다',
      status: ResponseStatus.error,
    };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/order/${orderId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      },
    );

    if (!response.ok) {
      const { message = '' } = await response.json();
      return { message, status: ResponseStatus.error };
    }

    return {
      message: '정상적으로 처리되었습니다.',
      status: ResponseStatus.success,
    };
  } catch (err) {
    return {
      message: '오류가 발생했습니다',
      status: ResponseStatus.error,
    };
  }
}

export async function refundRequest(
  userId: string,
  orderId: string,
): Promise<{ message: string; status: Status }> {
  if (!userId || !orderId)
    return { message: '주문 정보가 없습니다.', status: ResponseStatus.error };

  const { data } = await useOrderById<DataStructureKey.order, 'Pick', 'status'>(
    orderId,
  );

  if (
    ![OrderEnum.in_progress, OrderEnum.packed, OrderEnum.completed].includes(
      data?.status as OrderEnum,
    )
  )
    return {
      message: '환불신청이 가능한 단계가 아닙니다.',
      status: ResponseStatus.error,
    };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/order/refund/${orderId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      },
    );

    if (!response.ok) {
      const { message = '' } = await response.json();
      return { message, status: ResponseStatus.error };
    }

    return {
      message: '환불 신청을 완료했습니다',
      status: ResponseStatus.success,
    };
  } catch (err) {
    return {
      message: '오류가 발생했습니다',
      status: ResponseStatus.error,
    };
  }
}

export async function confirmOrder(
  orderId: string,
  userId: string,
): Promise<{ message: string; status: Status }> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/order/confirm/${orderId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      },
    );

    const { message } = await res.json();
    if (!res.ok) {
      return { message, status: ResponseStatus.error };
    }

    return { message, status: ResponseStatus.success };
  } catch (err) {
    console.error('API 오류:', err);
    return { message: '오류가 발생했습니다', status: ResponseStatus.error };
  }
}

export async function createOrder(
  formData: FormData,
): Promise<{ message: string; status: Status }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/order`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: formData,
        body: JSON.stringify(formData),
      },
    );

    if (!response.ok) {
      const { message = '' } = await response.json();
      return { message, status: ResponseStatus.error };
    }

    return {
      message: '정상적으로 처리되었습니다.',
      status: ResponseStatus.success,
    };
  } catch (err) {
    return { message: '오류가 발생했습니다', status: ResponseStatus.error };
  }
}
