'use client';

import { useBookmarksInfinite } from '@/api/client/bookmark';
import EmptyDataOverlay from '@/components/common/layout/EmptyDataOverlay';
import ErrorPage from '@/components/error/ErrorPage';
import useInfiniteScrollObserver from '@/config/utils/hooks/infinite-scroll/useInfiniteScrollObserver';
import { DataStructureKey } from '@/types/schema/default';
import { useRef } from 'react';
import BookmarkComponent from './BookmarkComponent';

interface MyBookmarkListContainerProps {
  userId: string;
}

const limit = 10;

export default function MyBookmarkListContainer({
  userId = '',
}: MyBookmarkListContainerProps) {
  if (!userId)
    return (
      <ErrorPage
        height="40vh"
        title="로그인 후 이용할 수 있어요!"
        isForAuthentification
      />
    );

  const { data, size, setSize, isValidating } =
    useBookmarksInfinite<DataStructureKey.bookmark>({
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
        Array.from({ length: 1 }).map((_, index) => (
          <div key={index} className="my-6 pr-4">
            <div className="w-full h-32 rounded-lg bg-gray-200 animate-pulse mb-2" />
            <div className="w-24 h-5 rounded bg-gray-200 animate-pulse mb-1" />
            <div className="w-48 h-5 rounded bg-gray-200 animate-pulse" />
          </div>
        ))
      ) : items?.length ? (
        <>
          {items.map((item) => (
            <div key={item._id} className="my-6">
              <BookmarkComponent {...item} />
            </div>
          ))}
        </>
      ) : (
        <EmptyDataOverlay title="내가 찜한 리스트가 없어요!" />
      )}

      {currentPage < totalPage && (
        <div ref={observerRef} className="flex justify-center my-4">
          <div className="w-6 h-6 border-4 border-pink-300 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
