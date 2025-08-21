'use client';

import {
  AdditionalProduct,
  selectedProductAtom,
} from '@/store/orderStore/order-info';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

const CategorizedAdditionalDialog = dynamic(
  () => import('./CategorizedAdditionalDialog'),
  {
    ssr: false,
    loading: () => null,
  },
);

const AdditionalProductContainer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const selection = useRecoilValue(selectedProductAtom);

  const [additional, setAdditional] = useState<AdditionalProduct | null>(null);
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    if (selection?.additionalProduct) {
      setAdditional(selection.additionalProduct);
    } else setAdditional(null);
  }, [selection?.additionalProduct]);

  // ✅ 추가상품 이름 및 가격 요약 계산
  const summary = useMemo(() => {
    if (!additional || Object.keys(additional).length === 0) return null;

    const keys = Object.keys(additional);
    const firstItem = additional[keys[0]];
    const restCount = keys.length - 1;

    const totalPrice = keys.reduce((sum, key) => {
      const item = additional[key];
      return sum + item.price * item.count;
    }, 0);

    return {
      firstName: firstItem.name,
      restCount,
      totalPrice,
    };
  }, [additional]);

  return (
    <>
      <div className="w-full max-w-[480px] px-4 mx-auto mt-6 space-y-2">
        {/* ✅ 추가상품 요약 */}

        {showButton ? (
          <button
            onClick={() => setOpen(true)}
            className="w-full px-4 py-3 bg-gradient-to-r from-[#e83b64] to-[#f25776] text-white text-sm font-semibold rounded-xl shadow-md hover:opacity-90 transition"
          >
            + 추가상품 확인하기
          </button>
        ) : null}
      </div>

      {additional === null ? null : (
        <>
          {summary && (
            <div className="text-sm text-gray-400 font-medium text-left px-4 mt-2">
              {summary.firstName}
              {summary.restCount > 0 && ` 외 ${summary.restCount}건`} :{' '}
              {summary.totalPrice.toLocaleString()}원
            </div>
          )}
        </>
      )}

      <CategorizedAdditionalDialog
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        onCheckProduct={(value) => setShowButton(value)}
      />
    </>
  );
};

export default React.memo(AdditionalProductContainer);
