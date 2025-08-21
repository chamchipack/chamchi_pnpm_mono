'use client';

// import { useAlarmsInfinite } from '@/api/client/alarm';
import useInfiniteScrollObserver from '@/config/utils/hooks/infinite-scroll/useInfiniteScrollObserver';
import { useRef } from 'react';

import EmptyDataOverlay from '@/components/common/layout/EmptyDataOverlay';
import ErrorCommonComponent from '@/components/common/layout/error/ErrorCommonComponent';
import { useAlarmsInfinite } from '../fetch';
import NotificationBox from './NotificationBox';

interface Props {
  userId: string;
}

export default function NotificationContainer({ userId }: Props) {
  if (!userId) {
    return (
      <ErrorCommonComponent
        title="로그인 후 확인할 수 있어요!"
        height="40vh"
        isSigninAvailable={true}
        isBackwardAvailable={false}
        isHomeRouteAvailable={false}
        isNativeStackInitialize={false}
      />
    );
  }

  const limit = 10;
  const { data, size, setSize, isValidating } = useAlarmsInfinite({
    page: 1,
    limit,
    userId,
  });

  const items =
    data && data[0]?.result !== 'failed'
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

  if (!items.length && !isValidating) {
    return <EmptyDataOverlay title="알려드릴 소식이 없어요!" />;
  }

  return (
    <div className="w-full">
      {isValidating && size === 1 ? (
        <div className="my-6 space-y-2">
          <div className="w-full h-28 rounded bg-gray-200 animate-pulse" />
          <div className="w-24 h-5 rounded bg-gray-200 animate-pulse" />
          <div className="w-48 h-5 rounded bg-gray-200 animate-pulse" />
        </div>
      ) : (
        <>
          {items?.length ? (
            items.map((item) => (
              <div key={item._id} className="my-12">
                <NotificationBox {...item} />
              </div>
            ))
          ) : (
            <div className="mt-[50%] h-[200px]">
              <EmptyDataOverlay title="검색 결과가 없어요!" />
            </div>
          )}
        </>
      )}

      {currentPage < totalPage && (
        <div ref={observerRef} className="flex justify-center my-4 w-full h-10">
          {isValidating && (
            <div className="w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
}
