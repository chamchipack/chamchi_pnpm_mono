'use client';

import { EventSchema } from '@/types/schema/EventSchema';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import AdInfoSection from './AdInfoSection';
import AdSlide from './AdSlide';
import { useAdBanner } from './hooks/useAdBanner';

const CommonSwipeableDrawer = dynamic(
  () => import('@/components/common/backdrop/CommonSwipeableDrawer'),
  { ssr: false, loading: () => null },
);

interface Props {
  items: EventSchema[];
}

export default function AdvertisementContainer({ items }: Props) {
  const {
    open,
    index,
    current,
    closeBanner,
    closeToday,
    nextSlide,
    prevSlide,
  } = useAdBanner(items);

  if (!open || items.length === 0) return null;

  return (
    <CommonSwipeableDrawer
      open={open}
      onClose={closeBanner}
      onOpen={() => {}}
      maxHeight="60vh"
      minHeight="60vh"
    >
      <div className="relative w-full bg-white">
        {/* 우측 상단 버튼 */}
        <div className="absolute top-3 right-3 z-20 flex gap-2 max-w-[480px] w-full justify-end pr-1">
          <button
            onClick={closeToday}
            className="bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs hover:bg-opacity-80"
          >
            오늘은 그만 보기
          </button>
          <button
            onClick={closeBanner}
            className="bg-black bg-opacity-60 text-white p-1 rounded-full hover:bg-opacity-80"
          >
            <X size={16} />
          </button>
        </div>

        {/* 광고 슬라이드 */}
        <AdSlide
          item={current}
          index={index}
          total={items.length}
          onNext={nextSlide}
          onPrev={prevSlide}
        />

        {/* 설명 */}
        <AdInfoSection item={current} />
      </div>
    </CommonSwipeableDrawer>
  );
}
