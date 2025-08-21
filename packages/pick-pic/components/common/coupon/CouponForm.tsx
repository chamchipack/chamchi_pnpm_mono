'use client';

import { useAvailableCoupons } from '@/api/client/coupon';
import { selectedProductAtom } from '@/store/orderStore/order-info';
import { CouponSchema } from '@/types/schema/CouponSchema';
import { DataStructureKey } from '@/types/schema/default';
import { CheckCircle } from 'lucide-react';
import React from 'react';
import { useRecoilState } from 'recoil';
import BottomFixed from '../bottom-fixed/BottomFixed';
import EmptyDataOverlay from '../layout/EmptyDataOverlay';
import ErrorCommonComponent from '../layout/error/ErrorCommonComponent';

interface CouponFormProps {
  isCheckable?: boolean;
  value?: string | null;
  setValue?: (coupon: string | null) => void;
  onClickCheck?: () => void;
  userId: string;
  price?: number;
  sellerId: string;
}

const CouponForm = ({
  isCheckable = false,
  value,
  setValue,
  onClickCheck,
  userId,
  price = 0,
  sellerId = '',
}: CouponFormProps) => {
  if (!userId)
    return (
      <ErrorCommonComponent
        height="100%"
        isBackwardAvailable={false}
        isSigninAvailable={false}
        isHomeRouteAvailable={false}
        isNativeStackInitialize={false}
      />
    );

  const { data, isLoading, isValidating } =
    useAvailableCoupons<DataStructureKey.coupon>({
      userId,
      sellerId,
      page: 1,
      limit: 10,
    });

  const coupons = data?.data?.items || [];

  const [products, setProductState] = useRecoilState(selectedProductAtom);

  const handleSelectCoupon = (data: CouponSchema) => {
    if (!isCheckable || !setValue) return;

    setValue(value === data?._id ? null : data?._id);
    setProductState((prev) => {
      if (!prev) return prev;

      const isDeselected = value === data._id;
      const newDiscount = isDeselected ? 0 : data.point;
      const newCouponId = isDeselected ? undefined : data._id;

      return {
        ...prev,
        couponId: newCouponId,
        discount: newDiscount,
        totalPrice: prev.price - newDiscount,
      };
    });
  };

  if (isLoading || isValidating) {
    return (
      <div className="flex flex-col gap-4 mt-2">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-full h-20 rounded-lg p-4 bg-gray-100 animate-pulse"
          >
            <div className="w-2/5 h-6 bg-gray-300 mb-2"></div>
            <div className="w-3/5 h-4 bg-gray-300"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!coupons.length)
    return <EmptyDataOverlay title={'지금은 쿠폰이 없어요!'} />;

  return (
    <>
      <div className={`flex flex-col gap-4 ${isCheckable ? 'pb-24' : ''}`}>
        {coupons.map((coupon, index) => {
          const isSelected = value === coupon._id;
          const isUsed = coupon.isUsed;
          const isMinPriceNotMet = price < coupon.minOrderPrice;
          const isDisabled = isUsed || isMinPriceNotMet;

          return (
            <div
              key={index}
              className={`flex border border-gray-200 rounded-lg overflow-hidden transition-all duration-150 ${
                isDisabled
                  ? 'opacity-50 cursor-default'
                  : isCheckable
                    ? 'cursor-pointer'
                    : 'cursor-default'
              } bg-gray-200`}
              onClick={() => !isDisabled && handleSelectCoupon(coupon)}
            >
              {/* Left - Info */}
              <div
                className={`flex-1 p-4 border-r border-dashed ${
                  isSelected ? 'border-white' : 'border-gray-400'
                } bg-gray-100`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-base font-bold">
                    {coupon.point.toLocaleString()}원 쿠폰
                  </span>
                </div>
                <p className="text-sm font-medium">{coupon.name}</p>
                {isUsed ? (
                  <p
                    className={`text-xs mt-1 font-bold ${isSelected ? 'text-white' : 'text-red-600'}`}
                  >
                    이미 사용한 쿠폰
                  </p>
                ) : isMinPriceNotMet ? (
                  <p
                    className={`text-xs mt-1 ${isSelected ? 'text-white' : 'text-gray-500'}`}
                  >
                    {coupon.minOrderPrice.toLocaleString()}원 이상 주문 시 사용
                    가능
                  </p>
                ) : (
                  <p className="text-xs mt-1 text-gray-500">사용 가능</p>
                )}
              </div>

              {/* Right - Icon */}
              <div
                className={`w-16 flex items-center justify-center ${
                  isSelected ? 'bg-main' : 'bg-white'
                }`}
              >
                {isSelected ? (
                  <CheckCircle className="text-white w-6 h-6" />
                ) : (
                  <img
                    src="/coupon.png"
                    alt="쿠폰 아이콘"
                    className="w-8 h-8 object-contain"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isCheckable && (
        <BottomFixed
          isDisabled={!value}
          label="쿠폰 선택하기"
          onClickMove={onClickCheck ? onClickCheck : () => {}}
        />
      )}
    </>
  );
};

export default React.memo(CouponForm);
