'use client';

import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import CommonSwipeableDrawer from '@/components/common/backdrop/CommonSwipeableDrawer';
import useLockBodyScroll from '@/config/utils/hooks/useLockBodyScroll';
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Calendar, RefreshCw, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

interface DatePickerDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  isTimeForPast: boolean;
  autoSearched?: boolean;
}

const DatePickerDialog = ({
  open,
  onClose,
  onOpen,
  selectedDate,
  setSelectedDate,
  isTimeForPast,
  autoSearched,
}: DatePickerDrawerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [pickedDate, setPickedDate] = useState<string | null>(selectedDate);

  useLockBodyScroll(open);

  const searchRouter = () => {
    if (!pickedDate) return;

    const date = dayjs(pickedDate).hour(0).minute(0).second(0).tz('Asia/Seoul');
    const dateString = date.format('YYYY-MM-DDTHH:mmZ');
    const targetDate = dayjs(dateString).format('YYYYMMDDHHmm');

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('date', targetDate);

    router.replace(`${pathname}?${current.toString()}`);
  };

  const onChangeData = () => {
    if (pickedDate) {
      setSelectedDate(pickedDate);
    }
    onClose();
    if (autoSearched) searchRouter();
  };

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
        maxHeight={'600px'}
      >
        <div
          style={{
            width: '50px',
            height: '5px',
            backgroundColor: '#ccc',
            borderRadius: '10px',
            margin: '8px auto',
          }}
        />
        <div className="flex justify-end items-center pt-3 pb-2 px-4 h-[25px]">
          <div
            onClick={() => {
              setPickedDate(null);
              setSelectedDate(null);
              // router.replace(`${pathname}`);
            }}
            className="flex items-center text-sm rounded-full cursor-pointer mr-4"
          >
            <RefreshCw width={16} height={16} className="mr-1" /> 날짜 초기화
          </div>

          <button
            className="pr-2"
            onClick={() => {
              // if (!pickedDate || !selectedDate) onChangeData();
              onClose();
            }}
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col justify-between h-full py-2">
          <div>
            <DateCalendar
              views={['day']}
              value={dayjs.isDayjs(pickedDate) ? dayjs(pickedDate) : null}
              minDate={isTimeForPast ? undefined : dayjs().startOf('month')}
              maxDate={isTimeForPast ? dayjs().endOf('month') : undefined}
              shouldDisableDate={(day) =>
                isTimeForPast
                  ? day.isAfter(dayjs(), 'day')
                  : day.isBefore(dayjs(), 'day')
              }
              onChange={(newDate) => {
                if (newDate) setPickedDate(dayjs(newDate).format('YYYYMMDD'));
              }}
              slots={{
                switchViewButton: () => null,
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
                        backgroundColor: isSelected ? '#F39E9E' : 'transparent',
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
                  fontSize: 20,
                },
                '& .MuiIconButton-root': {
                  width: 48,
                  height: 48,
                },
              }}
            />
          </div>

          <div className="mt-1 mb-0 p-4 flex justify-between items-center">
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
                ? `${dayjs(pickedDate).format('YYYY년 MM월 DD일')}`
                : '날짜를 선택해주세요'}
            </p>

            <button
              disabled={!pickedDate}
              onClick={onChangeData}
              className={`w-[30%] h-10 rounded-md font-normal text-white transition-opacity ${
                pickedDate
                  ? 'bg-main hover:opacity-80'
                  : 'bg-gray-400 cursor-not-allowed'
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
