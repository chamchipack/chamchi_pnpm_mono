'use client';

import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import CommonSwipeableDrawer from '@/components/common/backdrop/CommonSwipeableDrawer';
import ChipButtonRow from '@/components/common/datetime/ChipButtonRow';
import TimeSelector from '@/components/common/datetime/TimeSelector';
import useLockBodyScroll from '@/config/utils/hooks/useLockBodyScroll';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Calendar, RefreshCcw, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

dayjs.extend(utc);
dayjs.extend(timezone);

interface DatePickerDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  isTimeSelectable: boolean;
  isTimeForPast: boolean;
  autoSearched?: boolean;
}

const DatePickerDialog = ({
  open,
  onClose,
  onOpen,
  selectedDate,
  setSelectedDate,
  isTimeSelectable,
  isTimeForPast,
  autoSearched,
}: DatePickerDrawerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setGlobalDate = useSetRecoilState(dateSelectionAtom);
  const resetGloblDate = useResetRecoilState(dateSelectionAtom);

  const [selectedTime, setSelectedTime] = useState('');
  const [timeRange, setTimeRange] = useState({ start: '14:00', end: '21:30' });

  const [pickedDate, setPickedDate] = useState<string | null>(selectedDate);

  const disabledCondition = () => {
    if (!isTimeSelectable) return pickedDate ? false : true;
    else return !pickedDate || !selectedTime;
  };

  useEffect(() => {
    if (selectedDate) {
      setPickedDate(dayjs(selectedDate).format('YYYYMMDD'));
      setSelectedTime(dayjs(selectedDate).format('HH:mm'));
    }
  }, [selectedDate]);

  useLockBodyScroll(open);

  const searchRouter = useCallback(() => {
    if (!pickedDate || !selectedTime) {
      const omit = new URLSearchParams(Array.from(searchParams.entries()));
      omit.delete('date');
      return router.replace(`${pathname}?${omit.toString()}`);
    }

    const [hour, minute] = selectedTime.split(':');

    const dateString = dayjs(pickedDate)
      .hour(Number(hour))
      .minute(Number(minute))
      .second(0)
      .tz('Asia/Seoul')
      .format('YYYY-MM-DDTHH:mmZ');

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const targetDate = dayjs(dateString).format('YYYYMMDDHHmm');
    current.set('date', targetDate);

    setGlobalDate(targetDate);
    router.replace(`${pathname}?${current.toString()}`);
  }, [pickedDate, selectedTime, searchParams, setGlobalDate, pathname, router]);

  const onChangeData = useCallback(() => {
    if (pickedDate && selectedTime) {
      const [selectedHour, selectedMinute] = selectedTime
        .split(':')
        .map(Number);

      const updatedDate = dayjs(pickedDate)
        .hour(Number(selectedHour))
        .minute(Number(selectedMinute));

      setSelectedDate(updatedDate.format('YYYYMMDDHHmm'));
    } else if (pickedDate) {
      setSelectedDate(pickedDate);
    }
    onClose();

    if (autoSearched) searchRouter();
  }, [
    pickedDate,
    selectedTime,
    setSelectedDate,
    onClose,
    autoSearched,
    searchRouter,
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <CommonSwipeableDrawer
        open={open}
        onClose={() => {
          onChangeData();
          onClose();
        }}
        onOpen={onOpen}
        minHeight="600px"
        maxHeight={!isTimeSelectable ? '600px' : '600px'}
      >
        <div
          style={{
            width: '50px',
            height: '5px',
            backgroundColor: '#ccc',
            borderRadius: '10px',
            margin: '8px auto', // 중앙 정렬
          }}
        />
        <div className="flex justify-end items-center pt-3 pb-2 px-4 h-[25px]">
          <div
            onClick={() => {
              setPickedDate(null);
              setSelectedTime('');
              setSelectedDate(null);
            }}
            className="flex items-center text-sm rounded-full cursor-pointer mr-4"
          >
            <RefreshCcw width={16} height={16} className="mr-1" />
            날짜 초기화
          </div>

          <button
            className="pr-2"
            onClick={() => {
              if (!pickedDate && !selectedTime) {
                resetGloblDate();
              }
              onChangeData();
              onClose();
            }}
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col justify-between h-full py-2">
          {/* ✅ 달력 설정 */}
          <div>
            <DateCalendar
              views={['day']}
              value={dayjs.isDayjs(pickedDate) ? dayjs(pickedDate) : null}
              minDate={isTimeForPast ? undefined : dayjs().startOf('month')} // ✅ 과거 날짜 선택 가능
              maxDate={
                isTimeForPast
                  ? dayjs().endOf('month')
                  : // : dayjs().add(2, 'month').endOf('month')
                    dayjs().add(60, 'day')
              } // ✅ 미래 날짜 선택 가능
              shouldDisableDate={(day) =>
                isTimeForPast
                  ? day.isAfter(dayjs(), 'day')
                  : day.isBefore(dayjs(), 'day')
              }
              onChange={(newDate) => {
                if (newDate) setPickedDate(dayjs(newDate).format('YYYYMMDD'));
              }}
              slots={{
                switchViewButton: () => null, // ✅ 연도 선택 버튼을 숨김
                day: (props) => {
                  const isSelected = pickedDate
                    ? pickedDate === dayjs(props.day).format('YYYYMMDD')
                    : false;
                  return (
                    <PickersDay
                      selected={isSelected}
                      {...props}
                      style={{
                        borderRadius: '10%',
                        backgroundColor: isSelected ? '#e83b64' : 'transparent',
                        color: props.disabled
                          ? '#d1d5db' // 연한 회색 (Tailwind 기준 text-gray-300 정도)
                          : isSelected
                            ? 'white'
                            : undefined,
                      }}
                    />
                  );
                },
              }}
              sx={{
                width: '100%',
                height: '100%',
                '&.MuiDateCalendar-root': {
                  maxHeight: 360,
                },
                '& .MuiPickersSlideTransition-root': {
                  height: 290,
                },
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
              <div className="px-4">
                <ChipButtonRow
                  setTimeRange={setTimeRange}
                  setSelectedTime={setSelectedTime}
                />
              </div>
            )}

            {isTimeSelectable && (
              <TimeSelector
                startTime={timeRange.start}
                endTime={timeRange.end}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            )}
          </div>
          <div className="mt-2 px-4 py-2 flex justify-between items-center">
            <p
              className={`flex items-center gap-2 px-4 py-2 rounded-md border text-base transition-colors
    ${
      pickedDate
        ? 'bg-rose-50 border-rose-200 text-rose-700'
        : 'bg-gray-100 border-gray-200 text-gray-500'
    }
  `}
            >
              <Calendar
                className={`w-5 h-5 transition-colors ${
                  pickedDate ? 'text-rose-500' : 'text-gray-400'
                }`}
              />
              {pickedDate
                ? `${dayjs(pickedDate).format('YYYY년 MM월 DD일')}${
                    isTimeSelectable ? ` ${selectedTime}` : ''
                  }`
                : '날짜를 선택해주세요'}
            </p>

            <button
              onClick={onChangeData}
              disabled={disabledCondition()}
              className={`w-[30%] h-10 rounded-md font-normal text-white transition-opacity ${
                disabledCondition()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-main hover:opacity-80'
              }`}
            >
              적용하기
            </button>
          </div>
        </div>
      </CommonSwipeableDrawer>
    </LocalizationProvider>
  );
};

export default React.memo(DatePickerDialog);
