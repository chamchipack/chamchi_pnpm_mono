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
  data: T[];
}

/**
 *
 * @param params 요청할 쿼리 파라미터 (JSON)
 *
 * DataStructureKey에 맞는 제네릭을 넣어야 함
 *
 * * @returns 서버에서 받은 데이터 (ClientResponse 형식)
 */
export const useProducts = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  productIds: string[],
) => {
  const queryString = qs.stringify({ productIds }, { arrayFormat: 'repeat' });
  // 결과: productIds=abc123&productIds=def456

  return useSWR<ClientResponse<SchemaTransform<T, Op, F>>>(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/product?${queryString}`,
  );
};

type PopularListType = {
  lat: number;
  lng: number;
  page: number;
  limit?: number;
};

interface ProductClientResponse<T> {
  message: string;
  data: {
    items: T[];
    totalCount: number;
  };
}

export const usePopularProducts = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params: PopularListType,
) => {
  const queryString = { ...params };

  return useSWR<ProductClientResponse<SchemaTransform<T, Op, F>>>(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/product/popular/list?${queryString}`,
  );
};

export const useProductsInfinite = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params: any,
) => {
  const limit = params?.limit || 5;

  const latng =
    params?.lat && params?.lng ? { lat: params?.lat, lng: params?.lng } : {};

  return useSWRInfinite<ProductClientResponse<SchemaTransform<T, Op, F>>>(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.data.items.length === 0)
        return null;
      if (
        previousPageData &&
        pageIndex >= Math.ceil(previousPageData?.data?.totalCount / limit)
      )
        return null;
      return `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/product/popular/list?${qs.stringify({ page: pageIndex + 1, limit, ...latng })}`;
    },
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false, // 포커스 시 refetch 비활성화 → UX 향상
      revalidateIfStale: true, // 데이터가 오래됐으면 자동 revalidate
      dedupingInterval: 10000, // 10초 동안 중복 요청 방지
      keepPreviousData: true, // 페이지 바뀔 때 깜빡임 방지
      // revalidateOnFocus: false,
    },
  );
};

export const useProductSearchInfinite = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params: any,
) => {
  const limit = params?.limit || 5;

  const latng =
    params?.lat && params?.lng ? { lat: params?.lat, lng: params?.lng } : {};

  const keyword = params?.keyword ? { keyword: params?.keyword } : {};
  const date = params?.date ? { date: params?.date } : {};
  const field = params?.field ? { field: params?.field } : {};

  return useSWRInfinite<ProductClientResponse<SchemaTransform<T, Op, F>>>(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.data.items.length === 0)
        return null;
      if (
        previousPageData &&
        pageIndex >= Math.ceil(previousPageData?.data?.totalCount / limit)
      )
        return null;
      return `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/product/search/available?${qs.stringify({ page: pageIndex + 1, limit, ...latng, ...keyword, ...date, ...field })}`;
    },
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false, // 포커스 시 refetch 비활성화 → UX 향상
      revalidateIfStale: true, // 데이터가 오래됐으면 자동 revalidate
      dedupingInterval: 10000, // 10초 동안 중복 요청 방지

      keepPreviousData: true, // 페이지 바뀔 때 깜빡임 방지
      // revalidateOnFocus: false,
    },
  );
};

interface OneClientResponse<T> {
  message: string;
  data: T;
}

export const useProduct = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  productId: string,
) => {
  return useSWR<OneClientResponse<SchemaTransform<T, Op, F>>>(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/product/product/${productId}`,
  );
};
