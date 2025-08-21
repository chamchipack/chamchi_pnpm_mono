'use client';

import { selectedProductAtom } from '@/store/orderStore/order-info';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const AlertLoginCallback = dynamic(
  () => import('@/components/common/backdrop/AlertLoginCallback'),
  {
    ssr: false,
    loading: () => null,
  },
);

interface FixedBottomButtonProps {
  label: string;
  onClick: (total: number) => void;
  isVailable: boolean;
  userId: string;
  isActive: boolean;
}

export default function TotalAccountBox({
  label,
  onClick,
  isVailable = false,
  userId,
  isActive,
}: FixedBottomButtonProps) {
  const recoilValue = useRecoilValue(selectedProductAtom);
  const pathname = usePathname();

  const [price, setPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [preparation, setPreparation] = useState<boolean>(false);

  useEffect(() => {
    let optionTotal = 0;
    let additionalTotal = 0;
    let parcelFee = 0;

    if (recoilValue?.options) {
      Object.values(recoilValue.options).forEach((opt: any) => {
        if (typeof opt.value === 'number' && opt.value > 0) {
          optionTotal += opt.value;
        }
      });
    }

    if (recoilValue?.additionalProduct) {
      Object.values(recoilValue.additionalProduct).forEach((item: any) => {
        if (item?.count > 0 && item?.price > 0) {
          additionalTotal += item.count * item.price;
        }
      });
    }

    if (recoilValue?.parcelFee) {
      parcelFee = recoilValue?.parcelFee || 0;
    }

    const combined =
      optionTotal +
      parcelFee +
      additionalTotal +
      (recoilValue?.productPrice || 0);
    setPrice(combined);
  }, [recoilValue]);

  useEffect(() => {
    setPreparation(isVailable);
  }, [isVailable]);

  // 결제 심사 테스트용
  if (!userId)
    return (
      <>
        <div
          className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] px-4 py-3 h-[70px] z-50 flex items-center justify-center transition-opacity ${'bg-main text-white cursor-pointer'}`}
          onClick={() => {
            localStorage.setItem('redirectAfterLogin', pathname);

            if (!userId) setOpen(true);
          }}
        >
          <span className="text-lg font-semibold">로그인 후 주문하기</span>
        </div>

        <AlertLoginCallback open={open} onClose={() => setOpen(false)} />
      </>
    );

  return (
    <>
      <div
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] px-4 py-3 h-[70px] z-50 flex items-center justify-center transition-opacity ${
          preparation
            ? 'bg-main text-white cursor-pointer'
            : 'bg-gray-500 text-white pointer-events-none cursor-default'
        }`}
        onClick={() => {
          // 결제 심사 테스트용
          if (!userId) setOpen(true);
          else {
            if (preparation) onClick(price);
          }
        }}
      >
        {isActive ? (
          <>
            {/* 결제 심사 테스트용 */}
            {/* <span className="text-lg font-semibold">
              {price.toLocaleString()}원{' '}
              <span className="font-semibold">{label}</span>
            </span> */}
            {userId ? (
              <span className="text-lg font-semibold">
                {price.toLocaleString()}원{' '}
                <span className="font-semibold">{label}</span>
              </span>
            ) : (
              <span className="text-lg font-semibold">로그인 후 주문하기</span>
            )}
          </>
        ) : (
          '지금은 판매하지 않는 상품입니다'
        )}
      </div>

      <AlertLoginCallback open={open} onClose={() => setOpen(false)} />
    </>
  );
}
