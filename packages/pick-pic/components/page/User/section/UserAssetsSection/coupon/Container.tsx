'use client';
import CouponListContainer from '@/components/common/coupon/CouponListContainer';
import HeadComponent from '@/components/common/HeadComponent';

export default function Container({ userId = '' }: { userId: string }) {
  return (
    <div className="py-4 pb-40">
      <div className="px-4">
        <HeadComponent isLeftButtonVisable={true} title="쿠폰 보관함" />
      </div>

      <div className="px-4 mt-6">
        <CouponListContainer userId={userId} />
      </div>
    </div>
  );
}
