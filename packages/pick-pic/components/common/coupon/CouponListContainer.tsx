'use client';

import { useCoupons } from '@/api/client/coupon';
import { DataStructureKey } from '@/types/schema/default';
import React from 'react';
import EmptyDataOverlay from '../layout/EmptyDataOverlay';
import ErrorCommonComponent from '../layout/error/ErrorCommonComponent';

interface CouponListContainerProps {
  userId: string;
}

const CouponListContainer = ({ userId }: CouponListContainerProps) => {
  if (!userId) {
    return (
      <ErrorCommonComponent
        height="50vh"
        isSigninAvailable={false}
        isBackwardAvailable={true}
        isHomeRouteAvailable={false}
        isNativeStackInitialize={false}
      />
    );
  }

  const { data, isLoading, isValidating } = useCoupons<DataStructureKey.coupon>(
    {
      userId,
      page: 1,
      limit: 10,
    },
  );

  const coupons = data?.data?.items || [];

  if (isLoading || isValidating) {
    return (
      <div className="flex flex-col gap-4 mt-2">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-full h-20 rounded-md p-4 bg-gray-100 animate-pulse"
          >
            <div className="w-2/5 h-6 bg-gray-300 rounded mb-2"></div>
            <div className="w-3/5 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!coupons.length) {
    return <EmptyDataOverlay title="저장된 쿠폰이 없어요!" />;
  }

  return (
    <div className="flex flex-col gap-3">
      {coupons.map((coupon) => {
        const isUsed = coupon.isUsed;

        return (
          <div
            key={coupon._id}
            className={`flex border border-gray-300 rounded-md overflow-hidden bg-white ${
              isUsed ? 'opacity-50' : ''
            }`}
          >
            {/* 왼쪽: 쿠폰 정보 */}
            <div className="flex-[8] p-4 border-r border-dashed border-gray-300 bg-gray-100">
              <p className="text-base font-bold mb-1">
                {coupon.point.toLocaleString()}원 쿠폰
              </p>
              <p className="text-sm font-medium">{coupon.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                {coupon.minOrderPrice.toLocaleString()}원 이상 주문 시 사용 가능
              </p>
              {isUsed && (
                <p className="text-xs text-red-500 font-bold mt-1 ml-1">
                  이미 사용한 쿠폰
                </p>
              )}
            </div>

            {/* 오른쪽: 쿠폰 아이콘 */}
            <div className="flex-[2] flex items-center justify-center">
              <img
                src="/coupon.png"
                alt="쿠폰 아이콘"
                className="w-8 h-8 object-contain"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(CouponListContainer);
