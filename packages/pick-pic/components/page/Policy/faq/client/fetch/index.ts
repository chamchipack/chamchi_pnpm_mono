'use client';

import { fetchWithZodArray, SWRResponseArray } from '@/config/utils/fetch/zod';
import { FAQSchema, FAQZodType } from '@/types/schema/FAQSchema';
import qs from 'qs';
import useSWRInfinite from 'swr/infinite';
import z from 'zod';

interface Parameters {
  page: number;
  limit?: number;
}

export const ZodFAQSchema = z.array(FAQZodType);

const fetcher = (url: string) => fetchWithZodArray(url, ZodFAQSchema);

export const useFAQsInfinite = (params: Parameters) => {
  const limit = params.limit ?? 5;
  return useSWRInfinite<SWRResponseArray<FAQSchema>>(
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
    fetcher,
    {
      fallbackData: [
        {
          status: 102,
          message: '로딩중',
          result: 'pending',
          data: {
            items: [],
            totalCount: 0,
          },
        },
      ],
      revalidateFirstPage: false,
      revalidateOnFocus: false, // 포커스 시 refetch 비활성화 → UX 향상
      revalidateIfStale: true, // 데이터가 오래됐으면 자동 revalidate
      dedupingInterval: 10000, // 10초 동안 중복 요청 방지
      keepPreviousData: true, // 페이지 바뀔 때 깜빡임 방지
    },
  );
};
