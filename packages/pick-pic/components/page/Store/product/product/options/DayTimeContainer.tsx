'use client';
import DayTimeSelector from '@/components/page/Store/view/store/dialog/DayTimeSelector';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const DayTimeContainer = (sellerId: SellerSchema) => {
  const selectedDate = useRecoilValue<string | null>(dateSelectionAtom);

  const [localDate, setLocalDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLocalDate(selectedDate);
  }, [selectedDate]);

  const forms = {
    operatingDays: sellerId?.operatingDays || [],
    startTime: sellerId?.startTime,
    endTime: sellerId?.endTime,
    breakStartTime: sellerId?.breakStartTime,
    breakEndTime: sellerId?.breakEndTime,
    saturdayStartTime: sellerId?.saturdayStartTime,
    saturdayEndTime: sellerId?.saturdayEndTime,
    sundayStartTime: sellerId?.sundayStartTime,
    sundayEndTime: sellerId?.sundayEndTime,
    holidayStartTime: sellerId?.holidayStartTime,
    holidayEndTime: sellerId?.holidayEndTime,
    minimumReservationDate: sellerId?.minimumReservationDate,
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading)
    return (
      <div className="px-4 mt-6">
        <div className="w-[40px] my-2 h-5 bg-gray-200 rounded-md animate-pulse" />
        <div className="w-full h-5 bg-gray-200 rounded-md animate-pulse" />
      </div>
    );

  return (
    <div className="my-6">
      <DayTimeSelector
        weeksLimit={3}
        form={forms}
        initialDateTime={localDate || ''}
        validCheckVisable
      />
    </div>
  );
};

export default React.memo(DayTimeContainer);
