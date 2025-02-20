'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import { useSwipeable } from 'react-swipeable';

const banners = ['/note.png', '/banner-test.png', '/cake2.png'];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  // 다음 배너로 이동
  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % banners.length);
  }, []);

  // 이전 배너로 이동
  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // 3초마다 변경
    return () => clearInterval(interval);
  }, [nextSlide]);

  // 스와이프 기능 추가
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  return (
    <Box
      {...handlers}
      sx={{
        position: 'relative',
        width: '100%',
        // maxWidth: 600,
        height: 160,
        overflow: 'hidden',
        margin: 'auto',
      }}
    >
      {banners.map((src, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transition: 'transform 0.5s ease-in-out',
            transform: `translateX(${(i - index) * 100}%)`,
          }}
        >
          <Image
            src={src}
            alt={`Banner ${i}`}
            layout="fill"
            objectFit="cover"
          />
        </Box>
      ))}

      {/* 클릭으로 배너 넘기기 */}
      <Box
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40%',
          height: '100%',
          cursor: 'pointer',
        }}
      />

      <Box
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          cursor: 'pointer',
        }}
      />
    </Box>
  );
}
