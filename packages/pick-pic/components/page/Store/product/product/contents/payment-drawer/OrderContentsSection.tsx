'use client';

import dayjs from 'dayjs';
import { CalendarIcon, StoreIcon } from 'lucide-react';
import React from 'react';

interface Props {
  storeName: string;
  location: string;
  date: string;
  isParcel: boolean;
  parcelLocation: string | null;
  parcelLocationDetail: string | null;
}

const OrderContentsSection = (props: Props) => {
  return (
    <>
      <p className="text-base font-semibold mb-2">주문 내용</p>

      <div className="flex items-center justify-between mb-4 px-3 py-2 rounded-lg border border-gray-300">
        <div className="flex items-center gap-1">
          <StoreIcon className="w-4 h-4 text-gray-700" />
          <span className="font-semibold text-gray-700 text-sm">가게 정보</span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-gray-800 font-medium">{props.storeName}</span>
          <span className="text-gray-500 text-xs">{props.location}</span>
        </div>
      </div>

      {dayjs(props?.date).isValid() && (
        <div className="flex items-center justify-between mb-4 px-3 py-2 rounded-lg border border-gray-300">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4 text-gray-700" />
            <span className="font-semibold text-gray-700 text-sm">
              {!props?.isParcel ? '상품 픽업일' : '배송 지정일'}
            </span>
          </div>

          <span className="text-gray-800 text-sm font-medium">
            {dayjs(props?.date).format('YY년 MM월 DD일 HH시 mm분')}
          </span>
        </div>
      )}

      {props?.parcelLocation && (
        <div className="flex items-center justify-between mb-4 px-3 py-2 rounded-lg border border-gray-300">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-700 text-sm">
              입력된 주소
            </span>
          </div>

          <span className="text-gray-800 text-sm font-medium truncate block max-w-[250px]">
            {props?.parcelLocation} {props?.parcelLocationDetail}
          </span>
        </div>
      )}
    </>
  );
};

export default React.memo(OrderContentsSection);
