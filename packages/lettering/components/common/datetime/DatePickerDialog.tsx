'use client';
import { Box, Dialog } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  LocalizationProvider,
  DateCalendar,
  PickersDay,
} from '@mui/x-date-pickers';
import SelectTime from './SelectTime';
import { useState } from 'react';

interface DatePickerDialogProps {
  open: boolean;
  onClose: () => void;
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;
}

export default function DatePickerDialog({
  open,
  onClose,
  selectedDate,
  setSelectedDate,
}: DatePickerDialogProps) {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Dialog open={open} onClose={onClose} sx={{}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* ✅ 달력 설정 */}
          <DateCalendar
            value={selectedDate}
            minDate={dayjs().startOf('month')} // ✅ 이번 달 이전 이동 불가
            shouldDisableDate={(day) => day.isBefore(dayjs(), 'day')} // ✅ 오늘 이전 날짜 비활성화
            onChange={(newDate) => {
              if (newDate) setSelectedDate(dayjs(newDate));
            }}
            slots={{
              day: (props) => {
                const isSelected = selectedDate
                  ? selectedDate.format('YYYY-MM-DD') ===
                    dayjs(props.day).format('YYYY-MM-DD')
                  : false;
                return (
                  <PickersDay
                    selected={isSelected}
                    {...props}
                    style={{
                      borderRadius: '10%',
                      backgroundColor: isSelected ? '#F39E9E' : 'transparent',
                    }}
                  />
                );
              },
            }}
            sx={{
              '& .MuiPickersArrowSwitcher-root': {
                fontSize: 20, // ✅ 좌우 화살표 크기 조정
              },
              '& .MuiIconButton-root': {
                width: 48, // ✅ 아이콘 버튼 크기 조정
                height: 48,
              },
            }}
          />

          {/* ✅ 시간 선택 컴포넌트 */}
          <SelectTime
            onClose={onClose}
            selectedHour={selectedHour}
            selectedMinute={selectedMinute}
            setSelectedHour={setSelectedHour}
            setSelectedMinute={setSelectedMinute}
          />
        </Box>
      </Dialog>
    </LocalizationProvider>
  );
}
