'use client';

import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="text-center py-12 px-4">
      <AlertCircle className="mx-auto text-main" size={80} />
      <h1 className="text-xl font-semibold text-main mt-4">
        오류가 발생했습니다.
      </h1>
      <p className="text-gray-500 mt-2">
        요청하신 페이지를 확인할 수 없습니다.
      </p>

      <button
        onClick={reset} // ✅ 추가
        className="mt-6 bg-main hover:bg-[#e08585] text-white font-bold py-2 px-4 rounded"
      >
        다시 시도하기
      </button>
    </div>
  );
}
