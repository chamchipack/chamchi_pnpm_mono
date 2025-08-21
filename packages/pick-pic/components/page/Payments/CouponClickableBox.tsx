'use client';

import DrawerForm from '@/components/common/backdrop/DrawerForm';
import CouponForm from '@/components/common/coupon/CouponForm';
import useLockBodyScroll from '@/config/utils/hooks/useLockBodyScroll';
import {
  selectedProductAtom,
  useProductInfoKeys,
} from '@/store/orderStore/order-info';
import { CheckCircle, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

const data = [
  {
    keyname: 'couponId',
    label: '쿠폰적용',
    value: '',
    placeholder: '쿠폰',
    type: 'text',
  },
];

const CouponClickableBox = ({ userId }: { userId: string }) => {
  const hasFetched = useRef(false);
  const { price, sellerId } = useProductInfoKeys([
    'couponId',
    'price',
    'sellerId',
  ]);
  const setProductState = useSetRecoilState(selectedProductAtom);
  const [open, setOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

  const onClose = () => setOpen(false);
  useLockBodyScroll(open);

  useEffect(() => {
    setSelectedCoupon(null);
    setProductState((prev) => ({
      ...prev!,
      discount: 0,
      couponId: undefined,
      totalPrice: price,
    }));
  }, []);

  return (
    <>
      <div
        className="flex flex-row border border-gray-300 rounded-lg p-4 relative hover:cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="flex justify-between w-full">
          <div className="w-[95%] flex flex-col gap-2">
            {data.map((item) => (
              <div
                key={item.keyname}
                className="flex justify-between items-center"
              >
                <p className="text-sm font-medium text-gray-800">
                  {item.label}
                </p>
                {selectedCoupon && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
              </div>
            ))}
          </div>

          <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
        </div>
      </div>

      <DrawerForm
        open={open}
        onClose={onClose}
        minHeight="40vh"
        maxHeight="60vh"
        onOpen={() => setOpen(false)}
      >
        <div className="bg-white p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-base">쿠폰 선택</p>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <CouponForm
            userId={userId}
            sellerId={sellerId}
            isCheckable={true}
            value={selectedCoupon}
            setValue={setSelectedCoupon}
            onClickCheck={onClose}
            price={price}
          />
        </div>
      </DrawerForm>
    </>
  );
};

export default CouponClickableBox;
