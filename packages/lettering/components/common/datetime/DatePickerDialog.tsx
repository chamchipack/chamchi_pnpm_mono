'use client';
import { Box, Button, Drawer, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  LocalizationProvider,
  DateCalendar,
  PickersDay,
} from '@mui/x-date-pickers';
import SelectTime from './SelectTime';
import { useEffect, useState } from 'react';

interface DatePickerDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;
  isTimeSelectable: boolean;
  isTimeForPast: boolean;
}

export default function DatePickerDialog({
  open,
  onClose,
  selectedDate,
  setSelectedDate,
  isTimeSelectable,
  isTimeForPast,
}: DatePickerDrawerProps) {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');

  const disabledCondition = () => {
    if (!isTimeSelectable) return selectedDate ? false : true;
    else return !selectedDate || (!selectedHour && !selectedMinute);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Drawer
        anchor="bottom" // ✅ 아래에서 위로 올라오는 Drawer
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            backgroundColor: 'background.default',
            width: '100%',
            height: '100%',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            minHeight: '60vh',
            maxHeight: !isTimeSelectable ? '60vh' : '90vh', // ✅ 최대 높이 설정
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            py: 1,
          }}
        >
          {/* ✅ 달력 설정 */}
          <Box>
            <DateCalendar
              value={selectedDate}
              minDate={isTimeForPast ? undefined : dayjs().startOf('month')} // ✅ 과거 날짜 선택 가능
              maxDate={isTimeForPast ? dayjs().endOf('month') : undefined} // ✅ 미래 날짜 선택 가능
              shouldDisableDate={(day) =>
                isTimeForPast
                  ? day.isAfter(dayjs(), 'day')
                  : day.isBefore(dayjs(), 'day')
              }
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
                width: '100%',
                height: '100%',
                '& .MuiPickersDay-dayWithMargin': {
                  width: '55px',
                  height: '40px',
                  aspectRatio: '1',
                  fontSize: '1.0em',
                },
                '& .MuiTypography-root.MuiDayCalendar-weekDayLabel': {
                  width: '55px',
                  height: '40px',
                  color: 'black',
                },
                '& .MuiPickersArrowSwitcher-root': {
                  fontSize: 20, // ✅ 좌우 화살표 크기 조정
                },
                '& .MuiIconButton-root': {
                  width: 48, // ✅ 아이콘 버튼 크기 조정
                  height: 48,
                },
              }}
            />

            {isTimeSelectable && (
              <SelectTime
                onClose={onClose}
                selectedHour={selectedHour}
                selectedMinute={selectedMinute}
                setSelectedHour={setSelectedHour}
                setSelectedMinute={setSelectedMinute}
              />
            )}
          </Box>
          <Box
            sx={{
              mt: 1,
              p: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={14} color="common.black">
              {selectedDate
                ? `${selectedDate.format('YYYY년 MM월 DD일')} ${isTimeSelectable ? `${selectedHour}시 ${selectedMinute}분` : ''} `
                : '날짜를 선택해주세요'}
            </Typography>

            <Button
              disabled={disabledCondition()}
              sx={{
                width: '30%',
                height: 40,
                backgroundColor: disabledCondition()
                  ? 'common.gray'
                  : 'common.main',
                color: 'white',
                fontSize: 14,
                fontWeight: 'bold',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: disabledCondition()
                    ? 'common.gray'
                    : 'common.main',
                  opacity: 0.8,
                },
              }}
              onClick={() => {
                if (selectedDate && selectedHour && selectedMinute) {
                  const updatedDate = selectedDate
                    .hour(Number(selectedHour))
                    .minute(Number(selectedMinute));
                  setSelectedDate(updatedDate);
                }
                onClose();
              }}
            >
              선택
            </Button>
          </Box>
        </Box>
      </Drawer>
    </LocalizationProvider>
  );
}
