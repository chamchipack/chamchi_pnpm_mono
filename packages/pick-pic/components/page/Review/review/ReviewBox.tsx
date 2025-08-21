'use client';

import { formatTimeAgo } from '@/config/utils/time/formatTimeAgo';
import { ReviewSchema } from '@/types/schema/ReviewSchema';
import { Star, StarHalf, Star as StarOutline } from 'lucide-react';
import React, { useState } from 'react';

const ReviewBox = ({
  userId,
  createdAt,
  comment = '',
  productId,
  images,
  rating,
}: ReviewSchema) => {
  const [imgError, setImgError] = useState(false);

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

    return <div className="flex gap-0.5 mt-1">{stars}</div>;
  };

  return (
    <div className="flex items-start w-full p-2">
      {/* 아이콘 */}
      <img
        src={userId?.profile || '/pencil.png'}
        alt="icon"
        className="w-9 h-9 rounded-full object-cover mr-2"
      />

      <div className="flex flex-col flex-1">
        {/* 상단 정보 */}
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold">{userId?.nickname}</p>
          <p className="text-xs text-gray-500">{formatTimeAgo(createdAt)}</p>
        </div>

        {/* 별점 */}
        {renderStars(rating)}

        {/* 내용 */}
        <div className="mt-2">
          <p className="text-sm text-black">{comment}</p>
        </div>

        {/* 상품명 */}
        <div className="mt-1">
          <p className="text-xs text-gray-500">{productId?.name}</p>
        </div>

        {/* 이미지 */}
        {images && images.length > 0 && (
          <div className="mt-2">
            <img
              src={!imgError && images[0] ? images[0] : undefined}
              alt="리뷰 이미지"
              onError={() => setImgError(true)}
              className="w-36 h-36 object-cover rounded-md bg-gray-200"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ReviewBox);
