// hooks/useInfiniteScroll.ts
import qs from 'qs';
import useSWRInfinite from 'swr/infinite';
import { fetcher } from '../../fetch/base';

export const useInfiniteScroll = <TQuery extends Record<string, any>, TResult>({
  baseUrl,
  initialPage = 1,
  queryParams = {} as TQuery,
  limit = 5,
}: {
  baseUrl: string;
  initialPage?: number;
  queryParams?: TQuery;
  limit: number;
}) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    const totalCount = previousPageData?.data?.totalCount ?? Infinity;

    // ❗ 추가 조건: 이미 모든 데이터를 불러왔으면 요청 차단
    if (
      previousPageData &&
      (previousPageData.data?.items?.length === 0 ||
        (pageIndex + initialPage - 1) * limit >= totalCount)
    ) {
      return null;
    }

    const query = qs.stringify({
      ...queryParams,
      page: pageIndex + initialPage,
      limit: limit,
    });

    return `${baseUrl}?${query}`;
  };

  const swr = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    revalidateOnFocus: false,
  });

  const allItems: TResult[] =
    swr.data?.flatMap((page) => page.data?.items ?? []) ?? [];
  const totalCount = swr.data?.[0]?.data?.totalCount ?? 0;
  const isReachingEnd = allItems.length >= totalCount;

  return {
    ...swr,
    allItems,
    isReachingEnd,
  };
};
