'use client';

import { handleNavigation } from '@/config/navigation';
import { formatTimeAgo } from '@/config/utils/time/formatTimeAgo';
import { UserAlarmSchema } from '@/types/schema/UserAlarmSchema';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotificationBox = ({
  title = '알림 제목',
  content = '',
  createdAt,
  type,
  _id,
  orderId,
}: UserAlarmSchema) => {
  const router = useRouter();

  const isDeleted = orderId?.sellerId?.isDeleted;

  const handleRouter = () => {
    if (isDeleted) return;

    const path = `/store/review/create?orderId=${orderId?._id}`;
    const isWebView = handleNavigation({
      path: 'store/review/create',
      status: 'forward',
      params: JSON.stringify({ orderId: orderId?._id }),
    });

    if (!isWebView) router.push(path);
  };

  const handleRouterToAlias = () => {
    const alias = orderId?.sellerId?.alias;
    const path = `/store/${alias}`;

    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'ALIAS',
          data: alias,
        }),
      );
    } else {
      router.push(path);
    }
  };

  return (
    <div className="flex items-start w-full">
      {/* 이미지 */}
      <img
        src={
          type === 'ORDER_COMPLETED' || type === 'REVIEW_COMPLETED'
            ? '/pencil.png'
            : '/icons/alarm.png'
        }
        alt="알림"
        className="w-9 h-9 rounded-full object-cover mr-2 self-start"
      />

      {/* 텍스트 영역 */}
      <div className="ml-2 flex-grow flex flex-col">
        {/* 타이틀 + 시간 */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold">{title}</span>
          <span className="text-xs text-gray-500">
            {formatTimeAgo(createdAt)}
          </span>
        </div>

        {/* 본문 내용 */}
        <div className="mt-2">
          <p
            className="text-sm font-bold text-black cursor-pointer inline-block"
            onClick={handleRouterToAlias}
          >
            {orderId?.sellerId?.marketName || ''}
          </p>

          {isDeleted && (
            <div className="mt-2 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded flex items-center gap-1">
              <AlertCircle size={14} className="text-gray-500" />
              <span>운영이 종료된 가게입니다</span>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-2">
            {type !== 'REVIEW_COMPLETED'
              ? content
              : '고객님의 소중한의견 감사합니다'}
          </p>
        </div>

        {/* 리뷰 작성 버튼 */}
        {type === 'ORDER_COMPLETED' && (
          <div className="mt-3">
            <button
              onClick={handleRouter}
              className="w-full h-[30px] bg-main text-white text-sm font-bold rounded-sm hover:opacity-80 transition"
            >
              리뷰 작성하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(NotificationBox);
