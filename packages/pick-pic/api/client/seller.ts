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

/**
 *
 * useSellers 판매자 리스트
 */
export const useSellers = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params = {},
) => {
  return useSWR<ClientResponse<SchemaTransform<T, Op, F>>>(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/seller/list?${qs.stringify(params)}`,
  );
};

/**
 *
 * useSellersLocation 지도에서 판매자 리스트 호출용
 * @returns
 */
export const useSellersLocation = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params: LocationParameters,
) => {
  return useSWR<ClientResponseForLocation<SchemaTransform<T, Op, F>>>(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/seller/list/${params?.level || 5}?${qs.stringify(params)}`,
  );
};

type ClientResponseForLocation<T> = {
  message: string;
  data: T[];
};

type LocationParameters = {
  level: number;
  lat: number;
  lng: number;
  field: string;
  date?: any;
};

/**
 * useSellersInfinite 판매자 리스트 - 무한스크롤용
 * @param params
 * @returns
 */
export const useSellersInfinite = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params: Parameters,
) => {
  const limit = params?.limit || 5;

  const latng =
    params?.lat && params?.lng ? { lat: params?.lat, lng: params?.lng } : {};
  const order = params?.order ? { order: params?.order } : {};
  const date = params?.date ? { date: params?.date } : {};
  const field = params?.field ? { field: params?.field } : {};
  const keyword = params?.keyword ? { keyword: params?.keyword } : {};

  return useSWRInfinite<ClientResponse<SchemaTransform<T, Op, F>>>(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.data.items.length === 0)
        return null;
      if (
        previousPageData &&
        pageIndex >= Math.ceil(previousPageData?.data?.totalCount / limit)
      )
        return null;
      return `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/seller/list?${qs.stringify({ page: pageIndex + 1, limit, ...latng, ...order, ...date, ...field, ...keyword })}`;
    },
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false, // 포커스 시 refetch 비활성화 → UX 향상
      revalidateIfStale: false, // 데이터가 오래됐으면 자동 revalidate
      dedupingInterval: 10000, // 10초 동안 중복 요청 방지
      keepPreviousData: true, // 페이지 바뀔 때 깜빡임 방지
    },
  );
};

type Parameters = {
  page: number;
  limit?: number;
  lat?: string;
  lng?: string;
  order?: string;
  date?: string;
  field: string;
  keyword?: string;
};
