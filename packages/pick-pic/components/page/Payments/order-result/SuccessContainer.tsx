'use client';

import PageAccessWrapper from '@/components/common/pagewrapper/PageAccessWrapper';
import { useSmartNavigation } from '@/config/navigation';
import { useResetOnDateChange } from '@/config/utils/hooks/reset/useResetOnDateChange';
import { useResetOnSellerChange } from '@/config/utils/hooks/reset/useResetOnSellerChange';
import { useResetS3Images } from '@/config/utils/hooks/reset/useResetS3Images';
import celebrationAnimation from '@/public/lottie/celebration.json';
import successAnimation from '@/public/lottie/success.json';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';

export default function SuccessContainer() {
  const router = useRouter();
  const navigator = useSmartNavigation();

  const handleRouter = (path: 'home' | 'purchases') => {
    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      return (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'STACK_INITIALIZE',
          data: path,
        }),
      );
    }

    navigator({ path, status: 'replace' });
  };

  useResetOnSellerChange();
  useResetOnDateChange();
  useResetS3Images();

  return (
    <PageAccessWrapper name="success">
      <div
        className="relative min-h-screen flex flex-col items-center justify-start px-4 py-6"
        style={{
          background: `linear-gradient(to bottom, #ffffff 0%, #ffffff 40%, #e0f2ff 60%, #bae6fd 100%)`,
        }}
      >
        {/* 🎉 폭죽 애니메이션 (카드보다 위로) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full z-20 pointer-events-none">
          <Lottie animationData={celebrationAnimation} loop />
        </div>

        {/* 📦 카드 영역 */}
        <div className="relative z-10 w-full max-w-sm bg-white rounded-xl shadow-2xl px-6 py-8 mt-28">
          {/* ✅ success 애니메이션을 카드 위에 걸치게 */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[220px] h-[220px] z-30">
            <Lottie animationData={successAnimation} loop={false} />
          </div>

          {/* 🎯 상단 메시지 */}
          <div className="text-center mt-12 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">주문 완료!</h2>
            <p className="text-sm text-gray-500">
              주문이 정상적으로 접수되었어요.
            </p>
            <p className="text-sm text-gray-500">
              주문내역에서 주문의 진행상황을 확인할 수 있어요!
            </p>
          </div>

          {/* 📄 주문 요약 */}
          {/* <div className="bg-[#f0fdf4] rounded-xl px-5 py-4 text-sm text-gray-700 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">주문번호</span>
            <span className="font-medium">#ORD-20250715</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">주문금액</span>
            <span className="font-medium">₩23,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">결제수단</span>
            <span className="font-medium">카카오페이</span>
          </div>
        </div> */}

          <div className="relative my-6 w-full">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-dashed border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-gray-400"></span>
            </div>
          </div>

          {/* 🧾 버튼들 */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleRouter('purchases')}
              className="w-full py-3 rounded-md bg-blue-500 text-white font-semibold text-sm shadow transition"
            >
              주문내역 보기
            </button>
            <button
              onClick={() => handleRouter('home')}
              className="w-full py-3 rounded-md border-2 border-blue-500 text-blue-500 font-semibold text-sm transition"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </PageAccessWrapper>
  );
}
