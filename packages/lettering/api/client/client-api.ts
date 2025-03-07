import useSWR from 'swr';
import qs from 'qs';
import {
  DataStructureKey,
  StructuredDataSchemas,
} from '@/types/schema/default';

interface ClientResponse<T> {
  status: number;
  message: string;
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

export const useRequestDatas = <T extends DataStructureKey>(params = {}) => {
  return useSWR<ClientResponse<StructuredDataSchemas[T]>>(
    `/api/route?${qs.stringify(params)}`,
  );
};
