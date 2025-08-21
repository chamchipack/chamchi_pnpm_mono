'use client';

import { handleNavigation } from '@/config/navigation';
import { isWebView } from '@/config/utils/hooks/isWebView';
import { pageHistoryAtom } from '@/store/routeStore/state';
import { ArrowLeft, House } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

type SellerImageProps = {
  isProduct?: boolean;
  images: string[];
  intervalSec?: number;
  marketName: string;
};

const SellerMainImageSection = ({
  isProduct = false,
  images = [],
  intervalSec = 3,
  marketName = '',
}: SellerImageProps) => {
  const history = useRecoilValue(pageHistoryAtom);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const startX = useRef<number | null>(null);
  const endX = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleRouterBack = () => {
    if (history.prev || isWebView()) {
      const isWebView = handleNavigation({ path: '', status: 'back' });
      if (!isWebView) router.back();
    } else {
      router.replace('/');
    }
  };

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalSec * 1000);
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, intervalSec * 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length, intervalSec]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    clearInterval(intervalRef.current!);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    endX.current = e.changedTouches[0].clientX;
    handleSwipe();
    startAutoSlide();
  };

  const handleSwipe = () => {
    if (startX.current === null || endX.current === null) return;
    const deltaX = startX.current - endX.current;

    if (deltaX > 50) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (deltaX < -50) {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }

    startX.current = null;
    endX.current = null;
  };

  return (
    <div className="relative w-full h-[280px] flex items-center justify-center overflow-hidden">
      {/* ← 뒤로가기 버튼 */}
      {!isProduct && (
        <div className="absolute top-2 left-2 z-20 flex gap-2">
          <button
            onClick={handleRouterBack}
            className="w-[40px] h-[40px] flex items-center justify-center bg-black/50 text-white rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              if (
                typeof window !== 'undefined' &&
                (window as any).ReactNativeWebView
              ) {
                return (window as any).ReactNativeWebView?.postMessage(
                  JSON.stringify({
                    type: 'STACK_INITIALIZE',
                    data: '',
                  }),
                );
              }
              router.replace('/');
            }}
            className="w-[40px] h-[40px] flex items-center justify-center bg-black/50 text-white rounded-full"
          >
            <House className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 슬라이드 이미지들 */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            data-testid="alias-main-image"
            key={index}
            src={img}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/fallback.png';
            }}
            alt={marketName}
            className="w-full h-full object-cover shrink-0"
          />
        ))}
      </div>

      {/* 현재 인덱스 표시 */}
      <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded h-5 flex items-center z-20">
        {currentIndex + 1} / {images.length}
      </span>
    </div>
  );
};

export default React.memo(SellerMainImageSection);
