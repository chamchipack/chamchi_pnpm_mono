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
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true); // ✅ 스크롤 중인지 상태 관리

  // ✅ 시간 클릭 시 해당 위치로 스크롤 이동
  const handleTimeClick = (t: string) => {
    if (!containerRef.current) return;

    setSelectedTime(t);
    setScrollEnabled(false); // ✅ 스크롤 이벤트 일시 정지

    const index = time.indexOf(t);
    containerRef.current.scrollTo({
      top: index * 40, // ✅ 40px 단위로 이동
      behavior: 'smooth',
    });

    // ✅ 500ms 후에 스크롤 다시 활성화 (스크롤 완료 후)
    setTimeout(() => setScrollEnabled(true), 500);
  };

  // ✅ 스크롤 이벤트 처리 (스크롤 중에는 클릭 이벤트 차단)
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!scrollEnabled) return; // ✅ 스크롤 이벤트 비활성화 시 무시
    handleTimeScroll(e);
  };

  // ✅ 선택된 시간이 바뀌면 자동 스크롤 이동 (최초 렌더링 시)
  useEffect(() => {
    if (!containerRef.current) return;

    const index = time.indexOf(selectedTime);
    containerRef.current.scrollTo({
      top: index * 40,
      behavior: 'instant', // ✅ 즉각 이동 (애니메이션 없음)
    });
  }, [selectedTime, time]);

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
        onScroll={handleScroll} // ✅ 스크롤 이벤트 수정
      >
        {time.map((t) => (
          <Typography
            key={t}
            onClick={() => handleTimeClick(t)} // ✅ 클릭하면 해당 시간으로 이동
            sx={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              scrollSnapAlign: 'center',
              color: selectedTime === t ? 'black' : 'gray',
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
