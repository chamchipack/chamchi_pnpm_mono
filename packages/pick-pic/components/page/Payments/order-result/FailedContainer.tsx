'use client';

import PageAccessWrapper from '@/components/common/pagewrapper/PageAccessWrapper';
import { handleNavigation } from '@/config/navigation';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FailedContainer() {
  const router = useRouter();

  const handleRouter = () => {
    const isWebView = handleNavigation({
      path: 'home',
      status: 'replace',
    });

    if (!isWebView) {
      router.back();
    }
  };

  return (
    <PageAccessWrapper name="failed">
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        {/* 실패 아이콘 */}
        <AlertTriangle className="w-20 h-20 text-main mb-4" />

        {/* 실패 메시지 */}
        <h1 className="text-2xl font-bold">주문이 실패했습니다.</h1>
        <p className="text-gray-500 mt-2">
          결제 과정에서 문제가 발생했습니다. 다시 시도해 주세요.
        </p>

        <button
          onClick={handleRouter}
          className="mt-6 px-6 py-2 bg-main text-white text-sm font-semibold rounded-full hover:bg-red-500 transition-all"
        >
          홈으로 이동하기
        </button>
      </div>
    </PageAccessWrapper>
  );
}
