import {
  DataStructureKey,
  SchemaTransform,
  StructuredDataSchemas,
} from '@/types/schema/default';
import { UserSchema } from '@/types/schema/UserSchema';
import qs from 'qs';
import { cache } from 'react';
import {
  ClientResponseGetItem,
  ClientResponseGetItemsArray,
  fetchGetItem,
  fetchGetItemsArray,
} from '.';

type ExceptionForm = {
  isBookmarked: boolean;
  additionalProducts: AdditionalProductSchema[];
};

type AliasHeadForm = {
  sellerName: string;
  image: string;
};

/**
 * 서버에서 데이터를 가져오는 함수
 * @param params 요청할 쿼리 파라미터 (JSON 형식)
 *
 * DataStructureKey에 맞는 제네릭을 넣어야 함
 * @returns 서버에서 받은 데이터 (ClientResponse 형식)
 */

export const useSellerById = async <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  sellerId = '',
  userId = '',
): Promise<
  ClientResponseGetItem<SchemaTransform<T, Op, F> & ExceptionForm>
> => {
  const isUser = userId ? { userId } : {};
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/seller/detailById/${sellerId}?${qs.stringify(isUser)}`;
  return fetchGetItem<SchemaTransform<T, Op, F> & ExceptionForm>(url, 100);
};

// store/review 매장 리뷰페이지 -> 캐시 필요
export const useSellerMetaDataById = async <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  sellerId = '',
): Promise<ClientResponseGetItem<SchemaTransform<T, Op, F>>> => {
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/seller/metadata/${sellerId}`;
  return fetchGetItem<SchemaTransform<T, Op, F>>(url, 100);
};

// 리뷰 삭제시 사용중
// purchase detail 에서 사용중 -> no cache
export const useOrderById = async <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  orderId = '',
): Promise<ClientResponseGetItem<SchemaTransform<T, Op, F>>> => {
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/order/${orderId}`;
  return fetchGetItem<SchemaTransform<T, Op, F>>(url, 0);
};

// /store/view -> no cache
export const useSellerByAlias = cache(
  async <
    T extends DataStructureKey,
    Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
    F extends keyof StructuredDataSchemas[T] = never,
  >(
    alias = '',
    userId = '',
  ): Promise<
    ClientResponseGetItem<SchemaTransform<T, Op, F> & ExceptionForm>
  > => {
    const isUser = userId ? { userId } : {};
    const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/seller/detailByAlias/${alias}?${qs.stringify(isUser)}`;
    return fetchGetItem<SchemaTransform<T, Op, F> & ExceptionForm>(url, 0);
  },
);

// alias 에서 사용중. 캐시 어느정도 필요한듯
export const useSellerForMetadata = async <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  alias = '',
): Promise<
  ClientResponseGetItem<SchemaTransform<T, Op, F> & AliasHeadForm>
> => {
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/seller/alias/${alias}`;
  return fetchGetItem<SchemaTransform<T, Op, F> & AliasHeadForm>(url, 100);
};

// alias/product 캐시 어느정도 필요한듯
export const useProductForMetadata = async <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  productId = '',
): Promise<
  ClientResponseGetItem<SchemaTransform<T, Op, F> & AliasHeadForm>
> => {
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/product/metadata/${productId}`;
  return fetchGetItem<SchemaTransform<T, Op, F> & AliasHeadForm>(url, 100);
};

// home/popular-seller 캐시 조금 있어도 될듯
export const useSellers = async <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params = {},
): Promise<ClientResponseGetItemsArray<SchemaTransform<T, Op, F>>> => {
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/seller/list?${qs.stringify(params)}`;
  return fetchGetItemsArray<SchemaTransform<T, Op, F>>(url, 50);
};

//store/[alias] jsonld
export const useSellersForJSONLD = async <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params = {},
): Promise<ClientResponseGetItemsArray<SchemaTransform<T, Op, F>>> => {
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/seller/list?${qs.stringify(params)}`;
  return fetchGetItemsArray<SchemaTransform<T, Op, F>>(url, 600);
};

//store/[alias] jsonld2
export const useProductsForJSONLD = async <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params = {},
): Promise<ClientResponseGetItemsArray<SchemaTransform<T, Op, F>>> => {
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/product/search/available?${qs.stringify(params)}`;
  return fetchGetItemsArray<SchemaTransform<T, Op, F>>(url, 600);
};

// 인기검색어 캐시 있어도 될듯
export const usePopularSearches = async <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(): Promise<ClientResponseGetItem<SchemaTransform<T, Op, F>>> => {
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/search/popular`;
  return fetchGetItem<SchemaTransform<T, Op, F>>(url, 100);
};

// home/ 인기상품
// popular 페이지
// export const usePopularProducts = async <T extends DataStructureKey, >(
//   params = {},
// ): Promise<ClientResponseGetItemsArray<StructuredDataSchemas[T]>> => {
//   const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/product/popular/list?${qs.stringify(params)}`;
//   return fetchGetItemsArray<StructuredDataSchemas[T]>(url, 60);
// };

export const usePopularProducts = async <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params = {},
): Promise<ClientResponseGetItemsArray<SchemaTransform<T, Op, F>>> => {
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/product/popular/list?${qs.stringify(params)}`;
  return fetchGetItemsArray<SchemaTransform<T, Op, F>>(url, 60);
};

// export const useEvents = async <
//   T extends DataStructureKey,
//   Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
//   F extends keyof StructuredDataSchemas[T] = never,
// >(
//   params = {},
// ): Promise<ClientResponseGetItemsArray<SchemaTransform<T, Op, F>>> => {
//   const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/event?${qs.stringify(params)}`;
//   return fetchGetItemsArray<SchemaTransform<T, Op, F>>(url, 60);
// };

export const useEvent = async <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  eventId = '',
): Promise<ClientResponseGetItem<SchemaTransform<T, Op, F>>> => {
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/event/${eventId}`;
  return fetchGetItem<SchemaTransform<T, Op, F>>(url, 100);
};

// no cache
export const useProductsById = async <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  productId = '',
  limit: number,
): Promise<ClientResponseGetItemsArray<SchemaTransform<T, Op, F>>> => {
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/product/${productId}?${qs.stringify({ page: 1, limit: limit || 20 })}`;
  return fetchGetItemsArray<SchemaTransform<T, Op, F>>(url, 0);
};

// no cache
export const useProductById = cache(
  async <
    T extends DataStructureKey,
    Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
    F extends keyof StructuredDataSchemas[T] = never,
  >(
    productId = '',
  ): Promise<ClientResponseGetItem<SchemaTransform<T, Op, F>>> => {
    const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/product/product/${productId}?t=${Date.now()}`;
    return fetchGetItem<SchemaTransform<T, Op, F>>(url, 0);
  },
);

type User = Omit<
  UserSchema,
  'isDeleted' | 'socialId' | 'createdAt' | 'updatedAt'
>;

export const useAuthCheck = async (userId: string): Promise<User | null> => {
  if (!userId) return null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/user/auth/check/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      },
    );

    if (!res.ok) {
      console.error('응답 오류:', res.status);
      return null;
    }

    const data = await res.json();
    return data.result === true ? data.data : null;
  } catch (error) {
    console.error('auth check 오류:', error);
    return null;
  }
};
