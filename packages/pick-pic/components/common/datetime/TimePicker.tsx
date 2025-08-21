'use client';

import { useEffect, useRef, useState } from 'react';

interface TimePickerProps {
  time: string[];
  handleTimeScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

export default function TimePicker({
  time,
  handleTimeScroll,
  selectedTime,
  setSelectedTime,
}: TimePickerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleTimeClick = (t: string) => {
    if (!containerRef.current) return;

    setSelectedTime(t);
    setIsScrolling(true);

    const index = time.indexOf(t);
    containerRef.current.scrollTo({
      top: index * 40,
      behavior: 'smooth',
    });

    setTimeout(() => setIsScrolling(false), 500);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!e.currentTarget || !containerRef.current || isScrolling) return;

    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 1000);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const index = time.indexOf(selectedTime);
    const maxIndex = time.length - 1;
    if (index >= maxIndex) return;

    requestAnimationFrame(() => {
      containerRef.current?.scrollTo({
        top: index * 40,
        behavior: 'smooth',
      });
    });
  }, [selectedTime]);

  return (
    <div className="relative h-[140px] w-[80px] overflow-hidden">
      {/* 선택 박스 */}
      <div className="absolute top-[50px] w-full h-10 border-t border-b border-gray-300 pointer-events-none" />

      {/* 스크롤 영역 */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto scroll-snap-y py-7 no-scrollbar"
      >
        {time.map((t) => (
          <div
            key={t}
            onClick={() => handleTimeClick(t)}
            className={`h-10 flex items-center justify-center scroll-snap-center cursor-pointer 
              ${selectedTime === t ? 'text-black font-bold' : 'text-gray-400 hover:text-black'}`}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
