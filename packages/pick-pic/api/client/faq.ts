import {
  DataStructureKey,
  SchemaTransform,
  StructuredDataSchemas,
} from '@/types/schema/default';
import qs from 'qs';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

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
}

/**
 *
 * @param params 요청할 쿼리 파라미터 (JSON)
 *
 * DataStructureKey에 맞는 제네릭을 넣어야 함
 *
 * * @returns 서버에서 받은 데이터 (ClientResponse 형식)
 */
export const useFAQs = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params = {},
) => {
  return useSWR<ClientResponse<SchemaTransform<T, Op, F>>>(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/admin/faq?${qs.stringify(params)}`,
  );
};

export const useFAQsInfinite = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params: Parameters,
) => {
  const limit = params.limit ?? 5;
  return useSWRInfinite<ClientResponse<SchemaTransform<T, Op, F>>>(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.data.items.length === 0)
        return null;
      if (
        previousPageData &&
        pageIndex >= Math.ceil(previousPageData?.data?.totalCount / limit)
      )
        return null;
      return `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/admin/faq?${qs.stringify({ page: pageIndex + 1, limit })}`;
    },
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false, // 포커스 시 refetch 비활성화 → UX 향상
      revalidateIfStale: true, // 데이터가 오래됐으면 자동 revalidate
      dedupingInterval: 10000, // 10초 동안 중복 요청 방지
      keepPreviousData: true, // 페이지 바뀔 때 깜빡임 방지
    },
  );
};
