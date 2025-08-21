'use client';

import EmptyDataOverlay from '@/components/common/layout/EmptyDataOverlay';
import { useInfiniteScroll } from '@/config/utils/hooks/infinite-scroll/useInfiniteScroll';
import { useIntersectionObserver } from '@/config/utils/hooks/infinite-scroll/useIntersectionObserver';
import { useUserInfoKeys } from '@/store/userStore/state';
import { ProductSchema } from '@/types/schema/ProductSchema';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import CSR_ProductImage from './CSR_ProductImage';

type Params = {
  lat?: string;
  lng?: string;
};

const CSR_PopularList = ({
  initialPage,
  limit,
}: {
  initialPage: number;
  limit: number;
}) => {
  const router = useRouter();
  const { latitude, longitude } = useUserInfoKeys(['latitude', 'longitude']);
  const latng = latitude && longitude ? { lat: latitude, lng: longitude } : {};

  const baseUrl = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/product/popular/list`;
  const queryParams = { ...latng };

  const { data, size, setSize, isValidating, allItems, isReachingEnd } =
    useInfiniteScroll<Params, ProductSchema>({
      baseUrl,
      initialPage,
      queryParams,
      limit,
    });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver(
    observerRef,
    () => setSize((prev) => prev + 1),
    !isValidating && !isReachingEnd,
  );

  const handleRouter = (alias: string, productId: string) => {
    let path = `store/${alias}/${productId}`;
    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'ALIAS',
          data: `${alias}/${productId}`,
        }),
      );
    } else {
      router.push(path);
    }
  };

  return (
    <>
      {isValidating && size === 1 ? (
        <div className="grid grid-cols-3 w-full">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="mb-px mx-0.5">
              <div className="w-full h-[200px] bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      ) : allItems?.length ? (
        <div className="grid grid-cols-3 w-full">
          {allItems.map((item, index) => (
            <CSR_ProductImage
              key={item._id}
              product={item}
              alias={item?.sellerId?.alias}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="mt-[50%] h-[200px]">
          <EmptyDataOverlay title="검색 결과가 없어요!" />
        </div>
      )}

      {!isReachingEnd && <div ref={observerRef} className="h-10" />}

      {isValidating && (
        <p className="text-center text-sm text-gray-400 mt-2">불러오는 중...</p>
      )}
      {isReachingEnd && (
        <p className="text-center text-sm text-gray-400 mt-2">
          모든 상품을 불러왔습니다.
        </p>
      )}
    </>
  );
};

export default React.memo(CSR_PopularList);
