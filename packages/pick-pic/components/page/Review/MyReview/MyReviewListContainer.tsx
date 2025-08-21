'use client';

import { useMyReviewsInfinite } from '@/api/client/review';
import EmptyDataOverlay from '@/components/common/layout/EmptyDataOverlay';
import ErrorPage from '@/components/error/ErrorPage';
import useInfiniteScrollObserver from '@/config/utils/hooks/infinite-scroll/useInfiniteScrollObserver';
import { useRef } from 'react';
import ReviewSkeleton from '../review/ReviewSkeleton';
import ReviewBox from './MyReviewBox';

interface MyReviewListContainerProps {
  userId: string;
}

export default function MyReviewListContainer({
  userId,
}: MyReviewListContainerProps) {
  if (!userId)
    return (
      <ErrorPage
        height="40vh"
        title="로그인 후 이용할 수 있어요!"
        isForAuthentification
      />
    );

  const limit = 10;
  const { data, size, setSize, isValidating, ...rest } = useMyReviewsInfinite({
    page: 1,
    limit,
    userId,
  });

  const items =
    data && data[0]?.message !== 'error'
      ? data.flatMap((page) => page.data.items)
      : [];

  const observerRef = useRef(null);
  const totalPage = Math.ceil((data?.[0]?.data?.totalCount ?? 0) / limit);
  const currentPage = size;

  useInfiniteScrollObserver({
    observerRef,
    isValidating,
    currentPage,
    totalPage,
    loadMore: () => setSize(size + 1),
  });

  return (
    <div className="w-full">
      {isValidating && size === 1 ? (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-6">
              <ReviewSkeleton />
            </div>
          ))}
        </>
      ) : (
        <>
          {items?.length ? (
            items.map((item) => (
              <div key={item._id} className="my-10">
                <ReviewBox {...item} onClick={() => rest.mutate()} />
              </div>
            ))
          ) : (
            <div className="h-[200px] flex items-center justify-center mt-[50%]">
              <EmptyDataOverlay title="작성된 리뷰가 없어요!" />
            </div>
          )}
        </>
      )}

      {currentPage < totalPage && (
        <div ref={observerRef} className="flex justify-center my-4">
          {isValidating && (
            <div className="w-6 h-6 border-4 border-t-transparent border-main rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
}
