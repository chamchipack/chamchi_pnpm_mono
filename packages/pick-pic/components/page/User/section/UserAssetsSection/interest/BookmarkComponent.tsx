'use client';

import CommonImage from '@/components/common/image/CommonImage';
import StarRatingscore from '@/components/common/rating/StarRatingScore';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BookmarkComponent({ sellerId }: BookmarkSchema) {
  const router = useRouter();
  const isDeleted = sellerId?.isDeleted;

  const handleRouter = () => {
    if (!sellerId?.alias || isDeleted) return;

    const alias = sellerId.alias;

    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'ALIAS',
          data: alias,
        }),
      );
    } else {
      router.push(`/store/${alias}`);
    }
  };

  return (
    <div
      className={`flex items-center gap-4 ${isDeleted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={handleRouter}
    >
      <div className={isDeleted ? 'opacity-40' : ''}>
        <CommonImage
          src={sellerId?.images[0] ?? 'cake1.png'}
          alt="Selected"
          width="110px"
          height="110px"
          rounded="rounded-md"
        />
      </div>

      <div
        className={`flex flex-col min-h-[90px] flex-grow ${isDeleted ? 'text-gray-400' : ''}`}
      >
        <p className="text-base font-bold">{sellerId?.marketName}</p>
        <p className="text-xs text-gray-500">
          {sellerId?.location} {sellerId?.locationDetail}
        </p>
        <StarRatingscore rating={sellerId?.rating as number} />

        {isDeleted && (
          <div className="mt-2 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded flex items-center gap-1">
            <AlertCircle size={14} className="text-gray-500" />
            <span>운영이 종료된 가게입니다</span>
          </div>
        )}
      </div>
    </div>
  );
}
