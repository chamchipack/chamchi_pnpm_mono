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

export default function TestTotalAccountBox({
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
  const [userEnv, setUserEnv] = useState<'pc' | 'app' | 'mobile-web' | null>(
    null,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userAgent = window.navigator.userAgent;

    const isWebViewApp =
      /wv|android.*version\/[\d.]+.*chrome\/[.\d]+ mobile/i.test(userAgent) ||
      (/iphone|ipod|ipad/i.test(userAgent) && !/safari/i.test(userAgent));

    const isMobile =
      /iphone|ipod|ipad|android/i.test(userAgent) &&
      !userAgent.includes('Macintosh');

    if (!isMobile) {
      setUserEnv('pc');
    } else if (isWebViewApp) {
      setUserEnv('app');
    } else {
      setUserEnv('mobile-web');
    }
  }, []);

  useEffect(() => {
    let optionTotal = 0;
    let additionalTotal = 0;

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

    const combined =
      optionTotal + additionalTotal + (recoilValue?.productPrice || 0);
    setPrice(combined);
  }, [recoilValue]);

  const isAvailableEnv = userEnv === 'pc' || userEnv === 'app';

  // if (isAvailableEnv && !userId)
  //   return (
  //     <>
  //       <div
  //         className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] px-4 py-3 h-[70px] z-50 flex items-center justify-center transition-opacity ${'bg-main text-white cursor-pointer'}`}
  //         onClick={() => {
  //           localStorage.setItem('redirectAfterLogin', pathname);

  //           if (!userId) setOpen(true);
  //         }}
  //       >
  //         <span className="text-lg font-semibold">로그인 후 주문하기</span>
  //       </div>

  //       <AlertLoginCallback open={open} onClose={() => setOpen(false)} />
  //     </>
  //   );

  return (
    <>
      <div
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] px-4 py-3 h-[70px] z-50 flex items-center justify-center transition-opacity ${
          isVailable
            ? 'bg-main text-white cursor-pointer'
            : 'bg-gray-500 text-white pointer-events-none cursor-default'
        }`}
        onClick={() => {
          if (isVailable) onClick(price);
        }}
      >
        {isActive ? (
          userEnv === null ? (
            <span className="text-lg font-semibold">로딩 중...</span>
          ) : isAvailableEnv ? (
            <span className="text-lg font-semibold">
              {price.toLocaleString()}원{' '}
              <span className="font-semibold">{label}</span>
            </span>
          ) : (
            <span className="text-lg font-semibold">
              모바일 웹에서는 결제가 불가능합니다.
            </span>
          )
        ) : (
          '지금은 판매하지 않는 상품입니다'
        )}
      </div>

      <AlertLoginCallback open={open} onClose={() => setOpen(false)} />
    </>
  );
}
