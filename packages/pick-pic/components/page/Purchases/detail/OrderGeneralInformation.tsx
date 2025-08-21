'use client';

import dayjs from 'dayjs';
import React from 'react';

interface Props {
  createdAt: Date;
  bookingDate: Date;
  orderNumber: number;
  name: string;
  phoneNumber: string;
  parcelCompany?: string;
  trackingNumber?: string;
}

const OrderGeneralInformation = ({
  createdAt,
  bookingDate,
  orderNumber,
  name,
  phoneNumber,
  parcelCompany,
  trackingNumber,
}: Props) => {
  const rows = [
    {
      label: '주문일시',
      value: dayjs(createdAt).format('YYYY년 MM월 DD일 HH시 mm분'),
    },
    {
      label: '픽업일시',
      value: dayjs(bookingDate).format('YYYY년 MM월 DD일 HH시 mm분'),
    },
    { label: '주문번호', value: orderNumber },
    { label: '주문자 이름', value: name },
    { label: '주문자 연락처', value: phoneNumber },
    { label: '택배사', value: parcelCompany },
    { label: '운송장번호', value: trackingNumber },
  ];

  return (
    <div className="mt-6 space-y-1">
      {/* {rows.map(({ label, value }, idx) => (
        <div key={idx} className="flex justify-between mb-1">
          <div className="min-w-[130px] text-xs">{label}</div>
          <div className="text-gray-500 text-xs">{value}</div>
        </div>
      ))} */}

      {rows.map(({ label, value }, idx) => {
        if (!value) return null;
        else
          return (
            <div key={idx} className="flex justify-between mb-1">
              <div className="min-w-[130px] text-xs">{label}</div>
              <div className="text-gray-500 text-xs">{value}</div>
            </div>
          );
      })}
    </div>
  );
};

export default React.memo(OrderGeneralInformation);
