'use client';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const banners = ['/note.png', '/banner-test.png', '/cake2.png']; // ✅ 여러 개의 배경 이미지 배열

const INTERVAL_TIME = 3000; // ✅ 3초마다 변경

export default function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, INTERVAL_TIME);

    return () => clearInterval(interval); // ✅ 클린업
  }, []);

  return (
    <Box
      sx={{
        height: 140,
        backgroundColor: 'info.main', // ✅ 이미지 로드 실패 대비
        backgroundImage: `url(${banners[currentIndex]})`, // ✅ 동적으로 이미지 변경
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.5s ease-in-out', // ✅ 부드러운 전환 효과
      }}
    />
  );
}
