'use client';

import { deleteReview, MyReviewProps } from '@/api/client/review';
import ActionConfirmationModal from '@/components/common/backdrop/ActionConfirmationModal';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import { formatTimeAgo } from '@/config/utils/time/formatTimeAgo';
import { ResponseStatus } from '@/types/enums/enums';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const MyReviewBox = ({
  comment = '주문에 대한 리뷰를 남겨주세요!',
  productId,
  sellerId,
  images = [],
  createdAt,
  rating,
  _id,
  onClick,
}: MyReviewProps & { onClick: () => void }) => {
  const router = useRouter();
  const alert = useAlert();

  const [imgError, setImgError] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setOpen(false);
    const { message, status } = await deleteReview(_id);

    alert({
      message,
      type: status,
    });
    setLoading(false);

    if (status == ResponseStatus.success) onClick(); // 선택적 실행
  };

  const handleRouter = () => {
    const path = `/store/${sellerId?.alias}`;

    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'ALIAS',
          data: sellerId?.alias,
        }),
      );
    } else {
      router.push(path);
    }
  };

  return (
    <>
      <div className="flex items-start w-full">
        {/* 이미지 */}
        <img
          src="/pencil.png"
          alt="리뷰 아이콘"
          className="w-9 h-9 rounded-full object-cover mr-2"
        />

        <div className="ml-2 flex-1 flex flex-col">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold" onClick={handleRouter}>
              {sellerId?.marketName}
            </span>
            <span className="text-xs text-gray-500">
              {formatTimeAgo(createdAt)}
            </span>
          </div>

          {/* 별점 */}
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
                }
                fill={i < Math.round(rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>

          {/* 코멘트 */}
          <div className="mt-2">
            <p className="text-sm text-black">{comment}</p>
          </div>

          {/* 상품명 */}
          <div className="mt-1">
            <span className="inline-block bg-blue-100 text-blue-600 text-[10px] rounded-full px-3 py-1">
              {productId?.name}
            </span>
          </div>

          {/* 이미지 */}
          {images[0] && (
            <div className="mt-2">
              <img
                src={!imgError ? images[0] : ''}
                alt="리뷰 이미지"
                onError={() => setImgError(true)}
                className="w-[140px] h-[140px] rounded object-cover bg-gray-200"
              />
            </div>
          )}

          {/* 삭제 버튼 */}
          <button
            className="text-xs text-gray-500 hover:underline mt-2"
            onClick={() => setOpen(true)}
          >
            리뷰 삭제하기
          </button>
        </div>
      </div>

      <ActionConfirmationModal
        open={open}
        handleClose={() => setOpen(false)}
        title={'리뷰삭제'}
        content={'선택한 리뷰를 삭제하시겠어요?'}
        processing={loading}
        onClickCheck={handleDelete}
      />
    </>
  );
};

export default React.memo(MyReviewBox);
