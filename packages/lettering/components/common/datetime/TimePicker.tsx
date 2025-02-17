import { Box, Typography } from '@mui/material';
import { useRef, useEffect, useState } from 'react';

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

  // ✅ 시간 클릭 시 해당 위치로 스크롤 이동
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

  // ✅ 스크롤 이벤트 처리 (부드럽게 이동)
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!e.currentTarget || !containerRef.current || isScrolling) return;

    setIsScrolling(true);

    if (!e.currentTarget) return; // ✅ 방어 코드 추가
    const index = Math.round(e.currentTarget.scrollTop / 40);
    // if (index + 1 !== time.length || Number(selectedTime) + 1 !== time.length)
    // setSelectedTime(time[index] || '00');

    setTimeout(() => setIsScrolling(false), 300);
  };

  // ✅ 선택된 시간이 바뀌면 자동 스크롤 이동
  useEffect(() => {
    if (!containerRef.current) return;

    const index = time.indexOf(selectedTime);
    const maxIndex = time.length - 1;

    if (index >= maxIndex) return;

    requestAnimationFrame(() => {
      if (!containerRef.current) return; // ✅ 방어 코드 추가
      containerRef.current.scrollTo({
        top: index * 40,
        behavior: 'smooth',
      });
    });
  }, [selectedTime]);

  return (
    <Box
      sx={{ height: 140, width: 80, position: 'relative', overflow: 'hidden' }}
    >
      {/* 선택 박스 */}
      <Box
        sx={{
          position: 'absolute',
          top: 50,
          width: '100%',
          height: 40,
          borderTop: '1px solid gray',
          borderBottom: '1px solid gray',
          pointerEvents: 'none',
        }}
      />
      {/* 스크롤 박스 */}
      <Box
        ref={containerRef}
        sx={{
          height: '100%',
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          py: 7,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
        onScroll={handleScroll} // ✅ 스크롤 이벤트 추가
        // onMouseUp={handleScrollEnd}
        // onTouchEnd={handleScrollEnd}
      >
        {time.map((t) => (
          <Typography
            key={t}
            onClick={() => handleTimeClick(t)}
            sx={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              scrollSnapAlign: 'center',
              color: selectedTime === t ? 'black' : '#d9d9d9',
              fontWeight: selectedTime === t ? 'bold' : 'normal',
              cursor: 'pointer',
              '&:hover': { color: 'black' },
            }}
          >
            {t}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
