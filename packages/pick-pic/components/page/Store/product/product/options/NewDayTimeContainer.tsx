'use client';

import { selectedProductAtom } from '@/store/orderStore/order-info';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import { CalendarDays } from 'lucide-react'; // 추가
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('ko');

const DatePickerDialog = dynamic(() => import('./dialog/DatePickerDialog'), {
  ssr: false,
  loading: () => null,
});

interface Props {
  seller: SellerSchema;
  vacationDates?: string[];
}

const NewDayTimeContainer = ({ seller, vacationDates }: Props) => {
  const selectedDate = useRecoilValue<string | null>(dateSelectionAtom);
  const [orderInfo, setOrderInfo] = useRecoilState(selectedProductAtom);

  const [isParcel, setIsParcel] = useState(false);

  const [localDate, setLocalDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsParcel(orderInfo?.isParcelAvailable || false);
  }, [orderInfo?.isParcelAvailable]);

  useEffect(() => {
    setLocalDate(selectedDate);
  }, [selectedDate]);

  const forms = {
    operatingDays: seller?.operatingDays || [],
    startTime: seller?.startTime,
    endTime: seller?.endTime,
    breakStartTime: seller?.breakStartTime,
    breakEndTime: seller?.breakEndTime,
    saturdayStartTime: seller?.saturdayStartTime,
    saturdayEndTime: seller?.saturdayEndTime,
    sundayStartTime: seller?.sundayStartTime,
    sundayEndTime: seller?.sundayEndTime,
    holidayStartTime: seller?.holidayStartTime,
    holidayEndTime: seller?.holidayEndTime,
    minimumReservationDate: seller?.minimumReservationDate,
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);
  const formattedDate =
    localDate && dayjs(localDate).isValid()
      ? isParcel
        ? dayjs(localDate).format('YYYY년 MM월 DD일')
        : dayjs(localDate).format('YYYY년 MM월 DD일 HH시 mm분 (dddd)')
      : '날짜를 선택해주세요';

  if (isLoading)
    return (
      <div className="px-4 mt-6">
        <div className="w-[80px] my-2 h-5 bg-gray-200 rounded-md animate-pulse" />
        <div className="w-full h-5 bg-gray-200 rounded-md animate-pulse" />
      </div>
    );

  const {
    isParcelAvailable,
    isParcelAvailableOnHoliday,
    isParcelAvailableOnSaturday,
    isParcelAvailableOnSunday,
    minimumParcelReservationDate,
  } = seller;

  return (
    <>
      <div className="flex justify-between mt-4 mb-2 pr-4">
        <p className="text-sm font-semibold px-4">
          {isParcel ? '택배날짜' : '픽업날짜'} 선택
        </p>
        {!localDate && (
          <p className="text-xs text-red-500">필수 입력값입니다</p>
        )}
      </div>

      <div className="px-4">
        <div
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-800 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <CalendarDays className="w-4 h-4 text-gray-500" />
          {formattedDate}
        </div>
      </div>

      <DatePickerDialog
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        selectedDate={localDate}
        setSelectedDate={setLocalDate}
        form={forms}
        minimumDate={
          isParcel
            ? minimumParcelReservationDate
            : seller?.minimumReservationDate
        }
        vacationDates={vacationDates}
        isParcelAvailable={isParcel}
        isParcelAvailableOnHoliday={isParcelAvailableOnHoliday}
        isParcelAvailableOnSaturday={isParcelAvailableOnSaturday}
        isParcelAvailableOnSunday={isParcelAvailableOnSunday}
      />
    </>
  );
};

export default React.memo(NewDayTimeContainer);
