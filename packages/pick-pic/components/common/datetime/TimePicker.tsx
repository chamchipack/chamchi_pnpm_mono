'use client';

import { useEffect, useRef } from 'react';

interface TimePickerProps {
  time: string[];
  selectedTime: string;
  onChange: (time: string) => void;
}

export default function TimePicker({
  time,
  selectedTime,
  onChange,
}: TimePickerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const ITEM_HEIGHT = 40;

  const scrollToIndex = (index: number) => {
    containerRef.current?.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: 'smooth',
    });
  };

  const handleClick = (t: string) => {
    const index = time.indexOf(t);
    onChange(t); // ✅ 부모에 값 전달
    scrollToIndex(index); // ✅ 중앙 정렬
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const index = time.indexOf(selectedTime);
    if (index >= 0) scrollToIndex(index);
  }, [selectedTime]);

  return (
    <div className="relative h-[160px] w-[90px] overflow-hidden rounded-md border bg-white">
      {/* 중앙 선택 영역 */}
      <div className="absolute top-[60px] w-full h-10 border-y border-gray-300 pointer-events-none z-10" />

      <div
        ref={containerRef}
        className="h-full overflow-y-auto py-[60px] scrollbar-hide"
      >
        {time.map((t) => (
          <div
            key={t}
            onClick={() => handleClick(t)}
            className={`h-10 flex items-center justify-center cursor-pointer transition
              ${
                selectedTime === t
                  ? 'text-black font-semibold'
                  : 'text-gray-400 hover:text-black'
              }`}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
