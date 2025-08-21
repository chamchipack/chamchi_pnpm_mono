'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useBannerSlider(images: string[]) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isSingle = images.length <= 1;

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const resetAutoSlide = useCallback(() => {
    if (isSingle) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 5000);
  }, [nextSlide, isSingle]);

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoSlide, images]);

  return {
    index,
    nextSlide,
    prevSlide,
    resetAutoSlide,
    isSingle,
  };
}
