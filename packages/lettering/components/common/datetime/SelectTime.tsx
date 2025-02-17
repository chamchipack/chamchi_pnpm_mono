'use client';
import { useState } from 'react';
import TimePicker from './TimePicker';
import { Box, Typography, Button } from '@mui/material';

interface SelectTimeProps {
  //   onTimeSelect: (time: string) => void;
  onClose: () => void;
  selectedHour: string;
  selectedMinute: string;
  setSelectedHour: (hour: string) => void;
  setSelectedMinute: (minute: string) => void;
}

const hours = [...Array(24)].map((_, i) => i.toString().padStart(2, '0'));
const minutes = [...Array(6)].map((_, i) =>
  (i * 10).toString().padStart(2, '0'),
);

export default function SelectTime({
  //   onTimeSelect,
  onClose,
  selectedHour,
  selectedMinute,
  setSelectedHour,
  setSelectedMinute,
}: SelectTimeProps) {
  const handleHourScroll = (e: React.UIEvent<HTMLDivElement>) => {
    console.log(e.currentTarget);
    const index = Math.round(e.currentTarget.scrollTop / 40);
    setSelectedHour(hours[index] || '00');
  };

  const handleMinuteScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const index = Math.round(e.currentTarget.scrollTop / 40);
    setSelectedMinute(minutes[index] || '00');
  };

  const handleConfirm = () => {
    // onTimeSelect(`${selectedHour}:${selectedMinute}`);
    onClose();
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TimePicker
          time={hours}
          handleTimeScroll={handleHourScroll}
          selectedTime={selectedHour}
          setSelectedTime={setSelectedHour} // ✅ 부모에서 받은 setState 사용
        />
        <Typography sx={{ fontSize: 24, mx: 2 }}>:</Typography>
        <TimePicker
          time={minutes}
          handleTimeScroll={handleMinuteScroll}
          selectedTime={selectedMinute}
          setSelectedTime={setSelectedMinute} // ✅ 부모에서 받은 setState 사용
        />
      </Box>
    </Box>
  );
}
