'use client';

import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import weekday from 'dayjs/plugin/weekday';
import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

dayjs.extend(weekday);
dayjs.extend(isToday);

interface Props {
  weeksLimit: number;
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
  initialDateTime?: string; // 'YYYYMMDDHHmm'
  validCheckVisable?: boolean;
}

const DayTimeSelector = ({
  weeksLimit = 3,
  form,
  initialDateTime,
  validCheckVisable = false,
}: Props) => {
  const setGlobalDate = useSetRecoilState(dateSelectionAtom);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const today = dayjs();
  const minSelectable = today.add(form.minimumReservationDate, 'day');
  const maxSelectable = today.add(weeksLimit * 7, 'day');

  const dateRange = Array.from(
    { length: maxSelectable.diff(today, 'day') + 1 },
    (_, i) => today.add(i, 'day'),
  );

  const visibleDates = dateRange.filter((date) => {
    const dayKey = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][
      date.day()
    ];
    return (
      !date.isBefore(minSelectable, 'day') &&
      form.operatingDays.includes(dayKey)
    );
  });

  const getTimeSlots = (date: dayjs.Dayjs): string[] => {
    const day = date.day();
    let start = form.startTime;
    let end = form.endTime;

    if (day === 6 && form.saturdayStartTime !== undefined) {
      start = form.saturdayStartTime;
      end = form.saturdayEndTime!;
    } else if (day === 0 && form.sundayStartTime !== undefined) {
      start = form.sundayStartTime;
      end = form.sundayEndTime!;
    }

    const slots: string[] = [];

    for (let time = start; time <= end; time += 30) {
      const isInBreakTime =
        typeof form.breakStartTime === 'number' &&
        typeof form.breakEndTime === 'number' &&
        time >= form.breakStartTime &&
        time < form.breakEndTime;

      if (isInBreakTime) continue;

      const hour = Math.floor(time / 60)
        .toString()
        .padStart(2, '0');
      const minute = (time % 60).toString().padStart(2, '0');
      slots.push(`${hour}:${minute}`);
    }

    return slots;
  };

  const dateRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const timeRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    if (selectedDate && dateRefs.current[selectedDate]) {
      dateRefs.current[selectedDate]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime && timeRefs.current[selectedTime]) {
      timeRefs.current[selectedTime]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedTime]);

  useEffect(() => {
    if (initialDateTime && initialDateTime.length === 12) {
      const parsed = dayjs(initialDateTime, 'YYYYMMDDHHmm');
      setSelectedDate(parsed.format('YYYY-MM-DD'));
      setSelectedTime(parsed.format('HH:mm'));
      setHasInitialized(true);
    } else if (!hasInitialized) setHasInitialized(true);
  }, [initialDateTime]);

  useEffect(() => {
    if (selectedDate && selectedTime && hasInitialized) {
      const date = dayjs(selectedDate);
      const [hour, minute] = selectedTime.split(':').map(Number);
      const combined = date.hour(hour).minute(minute).format('YYYYMMDDHHmm');
      setGlobalDate(combined);
    }
  }, [selectedDate, selectedTime, hasInitialized]);

  return (
    <div className="">
      <div className="flex justify-between mb-2 pr-4">
        <p className="text-sm font-semibold px-4">픽업날짜 선택</p>
        {(!selectedDate || !selectedTime) && validCheckVisable && (
          <p className="text-xs text-red-500">필수 입력값입니다</p>
        )}
      </div>
      <div className="flex overflow-x-auto gap-1 pb-2 whitespace-nowrap scrollbar-hidden mr-2">
        {visibleDates.map((d, idx) => {
          const dateStr = d.format('YYYY-MM-DD');
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={dateStr}
              ref={(el) => {
                dateRefs.current[dateStr] = el;
              }}
              onClick={() => {
                setSelectedDate(dateStr);
                setSelectedTime(null);
                setGlobalDate(dateStr);
              }}
              style={{ marginLeft: idx === 0 ? '12px' : '4px' }}
              className={`inline-block min-w-[75px] max-w-[80px] py-1 px-2 rounded border text-sm font-normal ${
                isSelected
                  ? 'bg-main text-white border-transparent'
                  : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <div className="flex flex-row items-center gap-1">
                <span>{d.format('MM/DD')}</span>
                <span className="font-bold">
                  {['일', '월', '화', '수', '목', '금', '토'][d.day()]}
                </span>
              </div>
            </button>
          );
        })}

        {/* visibleDates에 없는 selectedDate를 표시 */}
        {selectedDate &&
          !visibleDates.some(
            (d) => d.format('YYYY-MM-DD') === selectedDate,
          ) && (
            <>
              <span>…</span>

              <button
                key="selected-outside-range"
                className="inline-block min-w-[75px] max-w-[80px] py-1 px-2 rounded border text-sm font-normal bg-main text-white border-transparent"
                disabled
              >
                <div className="flex flex-row items-center gap-1">
                  <span>{dayjs(selectedDate).format('MM/DD')}</span>
                  <span className="font-bold">
                    {
                      ['일', '월', '화', '수', '목', '금', '토'][
                        dayjs(selectedDate).day()
                      ]
                    }
                  </span>
                </div>
              </button>
            </>
          )}
      </div>

      {selectedDate && (
        <>
          <div className="flex overflow-x-auto gap-1 pb-2 whitespace-nowrap no-scrollbar scrollbar-hidden mr-2">
            {getTimeSlots(dayjs(selectedDate)).map((time, idx) => (
              <button
                key={time}
                ref={(el) => {
                  timeRefs.current[time] = el;
                }}
                onClick={() => setSelectedTime(time)}
                style={{ marginLeft: idx === 0 ? '12px' : '4px' }}
                className={`inline-block h-[30px] px-3 text-sm rounded border ${
                  selectedTime === time
                    ? 'bg-main text-white border-transparent'
                    : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </>
      )}

      {selectedDate && selectedTime && (
        <div className="px-4">
          <div className="border border-gray-200 bg-gray-100 rounded px-2 py-2 mt-4 text-sm text-gray-400">
            선택된 날짜{' '}
            <span className="font-normal text-black">
              {dayjs(selectedDate).format('YYYY년 MM월 DD일')} {selectedTime}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default DayTimeSelector;
