'use client';

import TermContainer from '@/components/page/Policy/detail/TermContainer';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const CommonSwipeableDrawer = dynamic(
  () => import('@/components/common/backdrop/CommonSwipeableDrawer'),
  { ssr: false, loading: () => null },
);

export default function PaymentPolicy() {
  const [open, setOpen] = useState(false);
  const [termId, setTermId] = useState<'2' | '3'>('3');

  const handleOpen = (id: '2' | '3') => {
    setTermId(id);
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* 결제 관련 약관 */}
        <div className="flex flex-row justify-between">
          <p className="text-sm text-gray-500">
            구매조건 확인 및 결제대행 서비스 동의
          </p>
          <p
            className="text-sm text-gray-500 hover:cursor-pointer"
            onClick={() => handleOpen('3')}
          >
            보기
          </p>
        </div>

        {/* 개인정보 처리방침 */}
        <div className="flex flex-row justify-between">
          <p className="text-sm text-gray-500">개인정보 수집 및 이용 동의</p>
          <p
            className="text-sm text-gray-500 hover:cursor-pointer"
            onClick={() => handleOpen('2')}
          >
            보기
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        결제시, 결제대행 서비스 약관 및 개인정보 처리방침에 동의하신 것으로
        간주됩니다.
      </p>

      <CommonSwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        maxHeight="60vh"
        minHeight="60vh"
      >
        <div className="px-4">
          <div className="w-[50px] h-[5px] bg-gray-300 rounded-full mx-auto mt-2 mb-4" />
        </div>

        <div className="px-4 pt-10 pb-2">
          <TermContainer _id={termId} />
        </div>
      </CommonSwipeableDrawer>
    </>
  );
}
