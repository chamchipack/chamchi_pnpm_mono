'use client';

import { isBackdropVisable } from '@/store/otherStore/backdrop/homeBackdrop';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  children: React.ReactNode;
}

export default function WebviewWrapper({ children }: Props) {
  const [isWebView, setIsWebView] = useState<boolean | null>(false);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [useBackdrop, setUseBackdrop] = useRecoilState(isBackdropVisable);
  const [backdropState, setBackdropState] = useState(false);

  const onClickClose = () => {
    setIsBackdropOpen(false);
    setUseBackdrop(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase();
      setIsWebView(
        /wv|android.*version\/[\d.]+.*chrome\/[.\d]+ mobile/i.test(userAgent) ||
          (/iphone|ipod|ipad/i.test(userAgent) && !/safari/i.test(userAgent)),
      );
    }
    setBackdropState(useBackdrop ? true : false);
  }, []);

  if (isWebView || !backdropState) return <>{children}</>;

  return (
    <>
      {isBackdropOpen && (
        <div className="fixed inset-0 bg-black/70 z-[1300] flex items-center justify-center">
          <div className="relative w-[85%] max-w-[340px] bg-white rounded-xl p-8 text-center shadow-2xl">
            {/* 닫기 버튼 */}
            <button
              onClick={onClickClose}
              aria-label="닫기"
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition"
            >
              <X size={20} />
            </button>

            {/* 앱 이미지 */}
            <img
              src="/logo/logo4_4x.png"
              alt="앱 미리보기"
              className="h-20 object-cover rounded mb-4 mx-auto"
            />

            {/* 타이틀 */}
            <p className="text-sm font-bold mb-1">앱에서 더 간편하게</p>

            {/* 설명 */}
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              주문부터 혜택까지, 앱에서 손쉽게 경험해보세요!
            </p>

            {/* 앱 다운로드 버튼 */}
            <button
              onClick={() =>
                (window.location.href = 'https://your-app-download-link.com')
              }
              className="w-full bg-main hover:bg-orange-600 text-white font-semibold text-sm py-3 rounded-lg transition-all"
            >
              앱 다운로드 하기
            </button>

            {/* 보조 버튼 */}
            <button
              onClick={onClickClose}
              className="w-full text-sm text-gray-500 mt-3 hover:underline"
            >
              웹에서 계속 둘러볼게요
            </button>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
