import {
  DataStructureKey,
  StructuredDataSchemas,
} from '@/types/schema/default';
import { ClientResponseGetItem, fetchGetItem } from '.';

/**
 * 서버에서 데이터를 가져오는 함수
 * @param params 요청할 쿼리 파라미터 (JSON 형식)
 *
 * DataStructureKey에 맞는 제네릭을 넣어야 함
 * @returns 서버에서 받은 데이터 (ClientResponse 형식)
 */
export const useAnnouncementById = async <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  _id = '',
): Promise<ClientResponseGetItem<StructuredDataSchemas[T]>> => {
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/admin/announcement/${_id}`;
  return fetchGetItem<StructuredDataSchemas[T]>(url, 100);
};

// export const useSellers = async <
// T extends DataStructureKey,
// Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
// F extends keyof StructuredDataSchemas[T] = never,
// >(
//   params = {},
// ): Promise<ClientResponse<SchemaTransform<T, Op, F>>> => {
//   const url = `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/api/server/seller?${qs.stringify(params)}`;
//   return fetchApi<StructuredDataSchemas[T]>(url);
// };

// export const useOrderById = async <
// T extends DataStructureKey,
// Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
// F extends keyof StructuredDataSchemas[T] = never,
// >(
//   orderId = '',
// ): Promise<ClientResponse<SchemaTransform<T, Op, F>>> => {
//   const url = `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/api/server/order/${orderId}`;
//   return fetchApi<StructuredDataSchemas[T]>(url);
// };
