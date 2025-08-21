'use client';

import { useSellersInfinite } from '@/api/client/seller';
import useInfiniteScrollObserver from '@/config/utils/hooks/infinite-scroll/useInfiniteScrollObserver';
import { useUserInfoKeys } from '@/store/userStore/state';
import { DataStructureKey } from '@/types/schema/default';
import dayjs from 'dayjs';
import EmptyDataOverlay from 'package/src/Overlay/empty/EmptyDataOverlay';
import { useRef } from 'react';
import SellerPreview from './SellerPreview';

interface Props {
  params: {
    order?: string;
    date?: string | null;
    keyword?: string;
    type?: string;
  };
}

type SellerPick =
  | '_id'
  | 'alias'
  | 'images'
  | 'location'
  | 'marketName'
  | 'startTime'
  | 'endTime'
  | 'lat'
  | 'lng'
  | 'rating'
  | 'reviewCount';

export default function ListContainer({ params }: Props) {
  const { latitude, longitude } = useUserInfoKeys(['latitude', 'longitude']);

  const latng = latitude && longitude ? { lat: latitude, lng: longitude } : {};
  const order = params?.order ? { order: params?.order } : {};
  const keyword = params?.keyword ? { keyword: params?.keyword } : {};
  const date: any = params?.date ? { date: dayjs(params?.date).toDate() } : {};

  const limit = 10;
  const { data, size, setSize, isValidating, isLoading } = useSellersInfinite<
    DataStructureKey.seller,
    'Pick',
    SellerPick
  >({
    page: 1,
    limit,
    ...order,
    ...latng,
    ...date,
    field: 'alias,images,location,marketName,startTime,endTime,lat,lng',
    ...keyword,
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

  if (isLoading || isValidating)
    return (
      <>
        <div className="px-4 mt-4">
          {' '}
          <div className="w-1/5 h-4 bg-gray-200 animate-pulse rounded-md" />
          <div className="w-3/5 h-4 bg-gray-200 animate-pulse rounded-md mt-2" />
          <div className="w-full h-30 bg-gray-200 animate-pulse rounded-md mt-2" />
        </div>

        <div className="px-4 mt-8">
          {' '}
          <div className="w-1/5 h-4 bg-gray-200 animate-pulse rounded-md" />
          <div className="w-3/5 h-4 bg-gray-200 animate-pulse rounded-md mt-2" />
          <div className="w-full h-30 bg-gray-200 animate-pulse rounded-md mt-2" />
        </div>
      </>
    );

  return (
    <div className="my-2 z-0">
      {items?.length ? (
        <>
          {items.map((item, index) => (
            <div key={item._id} className="my-8">
              <SellerPreview
                {...item}
                index={index}
                latitude={latitude}
                longitude={longitude}
              />
            </div>
          ))}
        </>
      ) : (
        <div className="mt-[50%] h-[200px]">
          <EmptyDataOverlay title="검색 결과가 없어요!" />
        </div>
      )}

      {currentPage < totalPage && (
        <div ref={observerRef} className="flex justify-center my-4">
          {isValidating && (
            <div className="w-6 h-6 border-2 border-main border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
}
