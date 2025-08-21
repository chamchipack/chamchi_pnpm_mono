'use client';

import { useSellerReviewsInfinite } from '@/api/client/review';
import useInfiniteScrollObserver from '@/config/utils/hooks/infinite-scroll/useInfiniteScrollObserver';
import { DataStructureKey } from '@/types/schema/default';
import { Star, StarHalf, Star as StarOutline } from 'lucide-react';
import EmptyDataOverlay from 'package/src/Overlay/empty/EmptyDataOverlay';
import { useRef } from 'react';
import ReviewBox from './ReviewBox';
import ReviewSkeleton from './ReviewSkeleton';

interface ReviewListContainerProps {
  sellerId: string;
}

export default function ReviewListContainer({
  sellerId,
}: ReviewListContainerProps) {
  if (!sellerId) return <EmptyDataOverlay title="리뷰내역이 없어요!" />;

  const limit = 10;
  const { data, size, setSize, isValidating } =
    useSellerReviewsInfinite<DataStructureKey.review>({
      page: 1,
      limit,
      sellerId,
    });

  const items =
    data && data[0]?.message !== 'error'
      ? data.flatMap((page) => page.data.items)
      : [];
  const observerRef = useRef(null);
  const totalPage = Math.ceil((data?.[0]?.data?.totalCount ?? 0) / limit);
  const currentPage = size;
  const ratingAvg = data?.[0]?.data?.rating || 0;

  useInfiniteScrollObserver({
    observerRef,
    isValidating,
    currentPage,
    totalPage,
    loadMore: () => setSize(size + 1),
  });

  const renderStars = (score: number) => {
    const stars = [];
    const full = Math.floor(score);
    const hasHalf = score % 1 >= 0.5;

    for (let i = 0; i < full; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
        />,
      );
    }

    if (hasHalf) {
      stars.push(
        <StarHalf
          key="half"
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
        />,
      );
    }

    const empty = 5 - stars.length;
    for (let i = 0; i < empty; i++) {
      stars.push(
        <StarOutline key={`empty-${i}`} className="w-4 h-4 text-gray-300" />,
      );
    }

    return <div className="flex gap-1 mt-1">{stars}</div>;
  };

  return (
    <>
      {/* 평균 별점 영역 */}
      <div className="flex flex-col items-center justify-center text-center py-6">
        <p className="text-4xl font-bold">{Number(ratingAvg).toFixed(1)}</p>
        {renderStars(Number(ratingAvg))}
      </div>

      {/* 리뷰 리스트 */}
      <div>
        {isValidating && size === 1 ? (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-10">
                <ReviewSkeleton />
              </div>
            ))}
          </>
        ) : items?.length ? (
          items.map((item) => (
            <div key={item._id} className="mb-12">
              <ReviewBox {...item} />
            </div>
          ))
        ) : (
          <div className="mt-40 h-52">
            <EmptyDataOverlay title="검색된 주문내역이 없어요!" />
          </div>
        )}

        {/* 무한스크롤 감지용 */}
        {currentPage < totalPage && (
          <div ref={observerRef} className="flex justify-center my-4 text-main">
            <svg
              className="animate-spin h-5 w-5 text-main"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </>
  );
}
