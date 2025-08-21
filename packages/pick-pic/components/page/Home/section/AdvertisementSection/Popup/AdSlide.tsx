'use client';

import CommonImage from '@/components/common/image/CommonImage';

interface Props {
  item: { images?: string[] };
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function AdSlide({ item, index, total, onPrev, onNext }: Props) {
  return (
    <div className="relative w-full h-[300px] flex items-center justify-center bg-black">
      <CommonImage
        src={item?.images?.[0] || '/fallback.jpg'}
        alt={`Banner ${index + 1}`}
        width="100%"
        height="300px"
        className="object-cover"
      />
      <button
        onClick={onPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full px-3 py-1"
      >
        ←
      </button>
      <button
        onClick={onNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full px-3 py-1"
      >
        →
      </button>
      <div className="absolute bottom-2 right-3 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
        {index + 1} / {total}
      </div>
    </div>
  );
}
