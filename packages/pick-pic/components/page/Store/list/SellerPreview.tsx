'use client';

import StarRatingscore from '@/components/common/rating/StarRatingScore';
import {
  DataStructureKey,
  StructuredDataSchemas,
} from '@/types/schema/default';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

const convertImage = (index: number, length: number): string => {
  if (index === 0) return 'rounded-l-lg';
  if (index === length - 1) return 'rounded-r-lg';
  return '';
};

export const useDistanceCalculator = () => {
  const getFormattedDistance = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number): string => {
      const R = 6371;
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceInKm = R * c;
      const distanceInM = distanceInKm * 1000;

      return distanceInM < 1000
        ? `${Math.round(distanceInM)}m`
        : `${distanceInKm.toFixed(1)}km`;
    },
    [],
  );

  const deg2rad = (deg: number) => deg * (Math.PI / 180);

  return { getFormattedDistance };
};

const placeholderCount = 5;

export default function SellerPreview({
  _id,
  marketName,
  location,
  images,
  rating = 0,
  alias = '',
  reviewCount,
  bookmarkCount,
  isImageClickable = true,
  index = 0,
  lat = 0,
  lng = 0,
  latitude,
  longitude,
}: Partial<StructuredDataSchemas[DataStructureKey.seller]> & {
  bookmarkCount?: number;
  isImageClickable?: boolean;
  index: number;
  latitude?: string;
  longitude?: string;
}) {
  const router = useRouter();
  const { getFormattedDistance } = useDistanceCalculator();

  const imageList = useMemo(
    () =>
      images && images.length > 0
        ? images
        : Array.from({ length: placeholderCount }),
    [images],
  );

  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleRouter = () => {
    const path = `store/${alias}`;
    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({ type: 'ALIAS', data: alias }),
      );
    } else {
      router.push(path);
    }
  };

  const distance = useMemo(() => {
    try {
      if (!latitude || !longitude) return null;
      return getFormattedDistance(
        Number(latitude),
        Number(longitude),
        lat,
        lng,
      );
    } catch {
      return null;
    }
  }, [latitude, longitude, lat, lng, getFormattedDistance]);

  const url = `/store/${alias}`;

  return (
    <>
      <div className="my-2 px-4">
        <div className="flex items-center">
          <h2
            className="text-lg font-semibold mr-2 max-w-[200px] truncate cursor-pointer"
            onClick={handleRouter}
            onMouseEnter={() => router.prefetch(url)}
          >
            {marketName}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 items-center text-xs text-gray-400">
          {rating > 0 && <StarRatingscore rating={rating} />}
          {reviewCount ? <span>리뷰 ({reviewCount})</span> : null}
          {bookmarkCount ? <span>찜 ({bookmarkCount})</span> : null}
          <span className="truncate max-w-[180px]">{location}</span>
        </div>
      </div>

      <div
        className="flex overflow-x-auto gap-0.5 no-scrollbar hover:cursor-pointer scrollbar-hidden"
        onMouseEnter={() => router.prefetch(url)}
      >
        {imageList.map((image, idx) => (
          <div
            key={idx}
            className={`mr-${
              idx === imageList.length - 1 ? 1 : 0
            } flex flex-col items-start`}
            style={{ marginLeft: idx === 0 ? '12px' : 0 }}
          >
            <div
              className={`w-[130px] h-[130px] bg-gray-200 flex items-center justify-center overflow-hidden relative flex-shrink-0 ${convertImage(idx, imageList.length)}`}
              onClick={() => {
                if (isImageClickable) handleRouter();
              }}
            >
              {typeof image === 'string' && !imageErrors[idx] ? (
                <img
                  src={image}
                  alt={`seller-image-${idx}`}
                  loading="lazy"
                  onError={() =>
                    setImageErrors((prev) => ({ ...prev, [idx]: true }))
                  }
                  className="absolute w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-xs text-center px-1 z-10">
                  이미지 준비 중입니다
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {distance && (
        <div className="px-4 mt-1 text-xs text-gray-500">
          내 위치에서 약{' '}
          <span className="font-normal text-black text-sm">{distance}</span>{' '}
          거리
        </div>
      )}
    </>
  );
}
