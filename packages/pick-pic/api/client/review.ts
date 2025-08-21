import { ResponseStatus, Status } from '@/types/enums/enums';
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
    rating?: string;
    totalCount: number;
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
export const useReviews = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params = {},
) => {
  return useSWR<ClientResponse<SchemaTransform<T, Op, F>>>(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/review?${qs.stringify(params)}`,
  );
};

type Parameters = {
  page: number;
  limit?: number;
  sellerId: string;
};

/**
 * useSellerReviewsInfinite 판매자 리뷰 - 무한스크롤용
 */
export const useSellerReviewsInfinite = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params: Parameters,
) => {
  const limit = params?.limit || 5;
  const sellerId = params?.sellerId || '';

  if (!sellerId) throw new Error('판매자 ID가 없습니다');

  return useSWRInfinite<ClientResponse<SchemaTransform<T, Op, F>>>(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.data.items.length === 0)
        return null;
      if (
        previousPageData &&
        pageIndex >= Math.ceil(previousPageData?.data?.totalCount / limit)
      )
        return null;
      return `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/review/${sellerId}?${qs.stringify({ page: pageIndex + 1, limit })}`;
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

export type MyReviewProps = {
  comment: string;
  productId: { _id: string; name: string };
  sellerId: { _id: string; marketName: string; alias: string };
  images: string[];
  createdAt: string;
  rating: number;
  _id: string;
};

type MyReviewClientResponse<T> = {
  message: string;
  data: {
    items: MyReviewProps[];
    rating?: string;
    totalCount: number;
  };
};

type MyReviews = {
  page: number;
  limit?: number;
  userId: string;
};

/**
 * useMyReviewsInfinite 사용자가 등록한 리뷰 - 무한스크롤용
 */
export const useMyReviewsInfinite = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  params: MyReviews,
) => {
  const limit = params?.limit || 5;
  const userId = params?.userId || '';

  return useSWRInfinite<MyReviewClientResponse<SchemaTransform<T, Op, F>>>(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.data.items.length === 0)
        return null;
      if (
        previousPageData &&
        pageIndex >= Math.ceil(previousPageData?.data?.totalCount / limit)
      )
        return null;
      return `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/review/my/${userId}?${qs.stringify({ page: pageIndex + 1, limit })}`;
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

/**
 * useCreateReview 리뷰 등록
 * @param formData 이미지, 코멘트, 평점
 * @returns
 */
export async function useCreateReview(
  formData: FormData,
): Promise<{ message: string; status: Status }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/review`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!response.ok) {
      const { message = '' } = await response.json();
      return { message, status: ResponseStatus.error };
    }

    return { message: '리뷰를 등록했어요!', status: ResponseStatus.success };
  } catch (err) {
    return {
      message: '리뷰 등록중 오류가 발생했습니다',
      status: ResponseStatus.error,
    };
  }
}

/**
 * deleteReview 리뷰 삭제
 * @param reviewId 리뷰 아이디
 * @returns
 */
export async function deleteReview(
  reviewId: string,
): Promise<{ message: string; status: Status }> {
  if (!reviewId)
    return { message: '잘못된 리뷰 정보입니다.', status: ResponseStatus.error };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/review/${reviewId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const { message = '' } = await response.json();
      return { message, status: ResponseStatus.error };
    }

    return { message: '리뷰를 삭제했어요!', status: ResponseStatus.success };
  } catch (err) {
    return {
      message: '리뷰 등록중 오류가 발생했습니다',
      status: ResponseStatus.error,
    };
  }
}
