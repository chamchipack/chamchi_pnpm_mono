'use client';

import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import CommonSwipeableDrawer from '@/components/common/backdrop/CommonSwipeableDrawer';
import { ph } from '@/config/utils/global';
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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

dayjs.extend(utc);
dayjs.extend(timezone);

interface DatePickerDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  form: {
    operatingDays: string[];
    startTime: number;
    endTime: number;
    saturdayStartTime?: number;
    saturdayEndTime?: number;
    sundayStartTime?: number;
    sundayEndTime?: number;
    holidayStartTime?: number;
    holidayEndTime?: number;
    breakStartTime?: number;
    breakEndTime?: number;
    minimumReservationDate: number;
  };
  minimumDate: number;
  vacationDates?: string[]; // ✅ 추가
  isParcelAvailable?: boolean;
  isParcelAvailableOnHoliday?: boolean;
  isParcelAvailableOnSaturday?: boolean;
  isParcelAvailableOnSunday?: boolean;
}

const DatePickerDialog = ({
  open,
  onClose,
  onOpen,
  selectedDate,
  setSelectedDate,
  form,
  vacationDates = [], // ✅ 기본값
  minimumDate,
  isParcelAvailable = false,
  isParcelAvailableOnHoliday = false,
  isParcelAvailableOnSaturday = false,
  isParcelAvailableOnSunday = false,
}: DatePickerDrawerProps) => {
  const setGlobalDate = useSetRecoilState(dateSelectionAtom);
  const resetGlobalDate = useResetRecoilState(dateSelectionAtom);

  const [selectedTime, setSelectedTime] = useState('');
  const [pickedDate, setPickedDate] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDate && selectedDate.length === 12) {
      const datePart = selectedDate.slice(0, 8); // YYYYMMDD
      const hour = selectedDate.slice(8, 10);
      const min = selectedDate.slice(10, 12);
      setPickedDate(datePart);
      setSelectedTime(`${hour}:${min}`);
    }
  }, [selectedDate]);

  useEffect(() => {
    setPickedDate(null);
  }, [isParcelAvailable]);

  const disabledCondition = () =>
    isParcelAvailable ? !pickedDate : !pickedDate || !selectedTime;

  useLockBodyScroll(open);

  const onApply = useCallback(() => {
    if (pickedDate && selectedTime) {
      const [selectedHour, selectedMinute] = selectedTime
        .split(':')
        .map(Number);

      const updatedDate = dayjs(pickedDate)
        .hour(selectedHour)
        .minute(selectedMinute);

      const formatted = updatedDate.format('YYYYMMDDHHmm');
      setSelectedDate(formatted);
      setGlobalDate(formatted);
    } else if (pickedDate) {
      const formatted = dayjs(pickedDate).format('YYYYMMDD');
      if (isParcelAvailable) setGlobalDate(formatted);

      setSelectedDate(pickedDate);
    }
    onClose();
  }, [pickedDate, selectedTime, setSelectedDate, onClose, isParcelAvailable]);

  const dayStringToNumber = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };

  const minSelectableDate = dayjs().add(minimumDate, 'day').startOf('day');

  // const allowedWeekdays = useMemo(
  //   () =>
  //     form.operatingDays
  //       .map((day) => dayStringToNumber[day as keyof typeof dayStringToNumber])
  //       .filter((v) => v !== undefined),
  //   [form.operatingDays],
  // );

  const allowedWeekdays = useMemo(() => {
    // 1. 먼저 문자열 요일 리스트 준비
    let days = [...form.operatingDays];

    if (isParcelAvailable) {
      // 토요일 처리
      if (isParcelAvailableOnSaturday) {
        if (!days.includes('sat')) days.push('sat');
      } else {
        days = days.filter((d) => d !== 'sat');
      }

      // 일요일 처리
      if (isParcelAvailableOnSunday) {
        if (!days.includes('sun')) days.push('sun');
      } else {
        days = days.filter((d) => d !== 'sun');
      }
    }

    // 2. 문자열 요일을 숫자로 변환
    return days
      .map((day) => dayStringToNumber[day as keyof typeof dayStringToNumber])
      .filter((v) => v !== undefined);
  }, [
    form.operatingDays,
    isParcelAvailable,
    isParcelAvailableOnSaturday,
    isParcelAvailableOnSunday,
  ]);

  const disabledDatesSet = useMemo(() => {
    return new Set(vacationDates); // string[] of 'YYYY-MM-DD'
  }, [vacationDates]);

  // useMemo로 holidaySet 생성
  const holidaySet = useMemo(() => {
    const result = new Set<string>();
    Object.values(ph)
      .flat()
      .forEach((date) => result.add(date));
    return result;
  }, []);

  const targetDay = useMemo(() => dayjs(pickedDate).day(), [pickedDate]);
  const formattedDate = useMemo(
    () => dayjs(pickedDate).format('YYYY-MM-DD'),
    [pickedDate],
  );
  const currentYear = useMemo(
    () => dayjs(pickedDate).format('YYYY'),
    [pickedDate],
  );

  const isHoliday = useMemo(
    () => ph[currentYear]?.includes(formattedDate),
    [formattedDate, currentYear],
  );

  const timeOptions = useMemo(() => {
    if (!pickedDate || isParcelAvailable) return [];

    let start = form.startTime;
    let end = form.endTime;

    if (isHoliday && form.holidayStartTime && form.holidayEndTime) {
      start = form.holidayStartTime;
      end = form.holidayEndTime;
    } else if (
      targetDay === 0 &&
      form.sundayStartTime !== undefined &&
      form.sundayEndTime !== undefined
    ) {
      start = form.sundayStartTime;
      end = form.sundayEndTime;
    } else if (
      targetDay === 6 &&
      form.saturdayStartTime !== undefined &&
      form.saturdayEndTime !== undefined
    ) {
      start = form.saturdayStartTime;
      end = form.saturdayEndTime;
    }

    const result: string[] = [];
    for (let t = start; t <= end; t += 30) {
      const hour = String(Math.floor(t / 60)).padStart(2, '0');
      const min = String(t % 60).padStart(2, '0');
      result.push(`${hour}:${min}`);
    }

    return result;
  }, [
    pickedDate,
    targetDay,
    isHoliday,
    form.startTime,
    form.endTime,
    form.holidayStartTime,
    form.holidayEndTime,
    form.sundayStartTime,
    form.sundayEndTime,
    form.saturdayStartTime,
    form.saturdayEndTime,
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <CommonSwipeableDrawer
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        minHeight="600px"
        maxHeight="600px"
      >
        <div className="w-[50px] h-[5px] bg-gray-300 rounded-md mx-auto my-2" />
        <div className="flex justify-end items-center pt-3 pb-2 px-4 h-[25px]">
          <div
            onClick={() => {
              setPickedDate(null);
              setSelectedTime('');
              setSelectedDate(null);
              resetGlobalDate();
            }}
            className="flex items-center text-sm rounded-full cursor-pointer mr-4"
          >
            <RefreshCcw width={16} height={16} className="mr-1" />
            날짜 초기화
          </div>
          <button className="pr-2" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="flex flex-col justify-between h-full py-2">
          <div>
            <DateCalendar
              views={['day']}
              value={dayjs.isDayjs(pickedDate) ? dayjs(pickedDate) : null}
              minDate={minSelectableDate}
              maxDate={dayjs().add(60, 'day')}
              shouldDisableDate={(day) => {
                const weekday = day.day();
                const isVacation = disabledDatesSet.has(
                  day.format('YYYY-MM-DD'),
                );
                return !allowedWeekdays.includes(weekday) || isVacation;
              }}
              onChange={(newDate) => {
                if (newDate) {
                  setPickedDate(dayjs(newDate).format('YYYYMMDD'));
                  setSelectedTime('');
                }
              }}
              slots={{
                switchViewButton: () => null,
                day: (props) => {
                  const currentDay = dayjs(props.day);
                  const formattedDate = currentDay.format('YYYY-MM-DD');
                  const selectedKey = currentDay.format('YYYYMMDD');

                  const isSelected = pickedDate === selectedKey;
                  const isHoliday = holidaySet.has(formattedDate);

                  const isVacation = disabledDatesSet.has(formattedDate);

                  const isDisabledHoliday =
                    isHoliday &&
                    (!form.holidayStartTime || !form.holidayEndTime);

                  const baseDisabled = isVacation || props.disabled;
                  const isDisabled =
                    isParcelAvailable && isParcelAvailableOnHoliday
                      ? baseDisabled
                      : baseDisabled || isDisabledHoliday;

                  return (
                    <PickersDay
                      selected={isSelected}
                      {...props}
                      disabled={isDisabled}
                      style={{
                        borderRadius: '10%',
                        backgroundColor: isSelected ? '#e83b64' : 'transparent',
                        color: isDisabled
                          ? '#d1d5db'
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
                '&.MuiDateCalendar-root': { maxHeight: 360 },
                '& .MuiPickersSlideTransition-root': { height: 290 },
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
                '& .MuiPickersArrowSwitcher-root': { fontSize: 20 },
                '& .MuiIconButton-root': { width: 48, height: 48 },
              }}
            />

            {pickedDate && (
              <div className="mt-4 px-4">
                <div className="overflow-x-auto whitespace-nowrap scrollbar-hidden space-x-2 flex pb-2 scrollbar-none">
                  {timeOptions.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-1 rounded-full border text-sm ${
                        selectedTime === time
                          ? 'bg-main text-white border-main'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-2 px-4 py-2 flex justify-between items-center">
            <p
              className={`flex items-center gap-2 px-4 py-2 rounded-md border text-md transition-colors
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
                ? `${dayjs(pickedDate).format('YYYY년 MM월 DD일')} ${selectedTime}`
                : '픽업날짜를 선택해주세요'}
            </p>

            <button
              onClick={onApply}
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
