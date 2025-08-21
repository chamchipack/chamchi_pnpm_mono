import {
  DataStructureKey,
  SchemaTransform,
  StructuredDataSchemas,
} from '@/types/schema/default';
import qs from 'qs';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

interface ClientResponse<T> {
  status: number;
  message: string;
  result: 'OK' | 'failed';
  data: {
    items: T[];
    page: {
      currentPage: number;
      pageSize: number;
      totalPage: number;
      totalCount: number;
    };
  };
}

/**
 *
 * @param params 요청할 쿼리 파라미터 (JSON)
 *
 * DataStructureKey에 맞는 제네릭을 넣어야 함
 *
 * * @returns 서버에서 받은 데이터 (ClientResponse 형식)
 */
export const useRequestDatas = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params = {},
) => {
  return useSWR<ClientResponse<SchemaTransform<T, Op, F>>>(
    `/api/route?${qs.stringify(params)}`,
  );
};

export const useRequestDatasInfinite = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>() => {
  return useSWRInfinite<ClientResponse<SchemaTransform<T, Op, F>>>(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.data.items.length === 0)
        return null;
      if (
        previousPageData &&
        previousPageData.data.page.currentPage >=
          previousPageData.data.page.totalPage
      )
        return null;
      return `/api/route?page=${pageIndex + 1}`;
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
