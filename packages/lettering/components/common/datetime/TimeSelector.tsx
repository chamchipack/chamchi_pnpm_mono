import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface TimeSelectorProps {
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
}

export default function TimeSelector({
  startTime,
  endTime,
  selectedTime,
  setSelectedTime,
}: TimeSelectorProps) {
  // 🔹 시작 & 종료 시간을 Date 객체로 변환
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);

  // 🔹 30분 간격으로 시간 생성
  const timeSlots: string[] = [];
  let current = new Date(start);

  while (current < end) {
    timeSlots.push(current.toTimeString().slice(0, 5)); // HH:MM 형식으로 변환
    current.setMinutes(current.getMinutes() + 30);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // ✅ 전체 가운데 정렬
        width: '100%',
        px: 2,
        mt: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)', // ✅ 5개씩 배치
          gap: 1, // ✅ 버튼 간 간격
          width: '100%',
          maxWidth: '600px', // ✅ 최대 너비 제한 (반응형 조절)
        }}
      >
        {timeSlots.map((time) => (
          <Button
            key={time}
            onClick={() => setSelectedTime(time)}
            sx={{
              border: '1px solid',
              borderColor: selectedTime === time ? 'common.main' : 'grey.300',
              backgroundColor: selectedTime === time ? 'common.main' : 'white',
              minWidth: 0, // ✅ 최소 너비 제한 해제
              flexGrow: 1, // ✅ 버튼 크기 자동 확장
              height: '40px', // ✅ 버튼 높이 고정
              textAlign: 'center',
              '&:hover': {
                backgroundColor:
                  selectedTime === time ? 'common.main' : 'white',
              },
            }}
          >
            <Typography
              fontSize={14}
              fontWeight={selectedTime === time ? 'bold' : 'none'}
              sx={{
                color: selectedTime === time ? 'common.white' : 'grey.300',
              }}
            >
              {time}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
}
