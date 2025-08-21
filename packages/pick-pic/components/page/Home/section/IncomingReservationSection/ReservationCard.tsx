'use client';

import CommonImage from '@/components/common/image/CommonImage';
import { OrderSchema } from '@/types/schema/OrderSchema';
import dayjs from 'dayjs';
import DateChip from './DateChip';

type OrderPick = '_id' | 'status' | 'bookingDate' | 'sellerId' | 'productId';

export default function ReservationCard({
  item,
  onClick,
}: {
  item: Pick<OrderSchema, OrderPick>;
  onClick: () => void;
}) {
  return (
    <div
      className="flex items-center gap-4 p-3 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
      onClick={onClick}
    >
      <div className="flex flex-col">
        <DateChip bookingDate={item.bookingDate} />
      </div>

      <div className="flex flex-col justify-center flex-1 overflow-hidden">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {item?.sellerId?.marketName}
        </p>
        <p className="text-xs text-gray-600 truncate mb-2">
          {item?.productId?.name}
        </p>
        <p className="text-xs text-gray-500 truncate">
          픽업 : {dayjs(item.bookingDate).format('MM월 DD일 HH시 mm분')}
        </p>
      </div>

      <CommonImage
        src={item?.productId?.image?.[0] || ''}
        alt="케이크 이미지"
        width="70px"
        height="70px"
        rounded="rounded-md"
      />
    </div>
  );
}
