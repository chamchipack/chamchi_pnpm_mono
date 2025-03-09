import useSWR from 'swr';
import qs from 'qs';
import {
  DataStructureKey,
  StructuredDataSchemas,
} from '@/types/schema/default';
import useSWRInfinite from 'swr/infinite';

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

export const useRequestDatasInfinite = <T extends DataStructureKey>() => {
  return useSWRInfinite<ClientResponse<StructuredDataSchemas[T]>>(
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
    },
  );
};
