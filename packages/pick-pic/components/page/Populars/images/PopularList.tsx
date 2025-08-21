'use client';

import { useProductsInfinite } from '@/api/client/product';
import CommonImage from '@/components/common/image/CommonImage';
import useInfiniteScrollObserver from '@/config/utils/hooks/infinite-scroll/useInfiniteScrollObserver';
import { useUserInfoKeys } from '@/store/userStore/state';
import { DataStructureKey } from '@/types/schema/default';
import { useRouter } from 'next/navigation';
import EmptyDataOverlay from 'package/src/Overlay/empty/EmptyDataOverlay';
import { useRef } from 'react';

const PopularList = () => {
  const router = useRouter();
  const { latitude, longitude } = useUserInfoKeys(['latitude', 'longitude']);
  const latng = latitude && longitude ? { lat: latitude, lng: longitude } : {};

  const limit = 20;
  const { data, size, setSize, isValidating } =
    useProductsInfinite<DataStructureKey.product>({
      page: 1,
      limit,
      ...latng,
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
    <div className="my-0.5 z-0">
      {isValidating && size === 1 ? (
        <div className="grid grid-cols-3 w-full">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="mb-px mx-0.5">
              <div className="w-full h-[200px] bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      ) : items?.length ? (
        <div className="grid grid-cols-3 w-full">
          {items.map((item, index) => (
            <div
              key={item._id}
              className={`relative w-full h-[200px] overflow-hidden mb-px ${
                (index + 1) % 3 !== 0 ? 'border-r border-white' : ''
              } border-b border-white hover:cursor-pointer`}
              onClick={() => handleRouter(item?.sellerId?.alias, item?._id)}
            >
              <CommonImage
                src={item?.image?.[0]}
                alt={`케이크 ${index + 1}`}
                width="100%"
                height="100%"
              />

              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-b from-transparent to-black" />

              {/* Text overlay */}
              <div className="absolute bottom-2 left-2 right-2 text-white z-10">
                <p className="text-xs truncate">{item?.name || ''}</p>
                <p className="text-[10px] leading-3 truncate">
                  {item?.price?.toLocaleString('ko-KR') || '-'}원
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-[50%] h-[200px]">
          <EmptyDataOverlay title="검색 결과가 없어요!" />
        </div>
      )}

      {currentPage < totalPage && (
        <div ref={observerRef} className="flex justify-center my-4">
          {isValidating && (
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
};

export default PopularList;
