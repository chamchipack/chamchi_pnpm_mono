'use client';

import { OrderStatus, OrderStatusEnum } from '@/types/schema/OrderSchema';

interface CustomChipProps {
  status: OrderStatus;
  isParcel?: boolean;
}

const StatusStyleMap: Record<
  OrderStatus,
  {
    bg: string;
    text: string;
    dot: string;
  }
> = {
  pending: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    dot: 'bg-yellow-400',
  },
  in_progress: {
    bg: 'bg-blue-100',
    text: 'text-blue-900',
    dot: 'bg-blue-500',
  },
  packed: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-900',
    dot: 'bg-indigo-500',
  },
  completed: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-900',
    dot: 'bg-emerald-500',
  },
  refund_in_progress: {
    bg: 'bg-orange-100',
    text: 'text-orange-900',
    dot: 'bg-orange-400',
  },
  refund_completed: {
    bg: 'bg-gray-200',
    text: 'text-gray-700',
    dot: 'bg-gray-400',
  },
  cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-900',
    dot: 'bg-red-500',
  },
  review_completed: {
    bg: 'bg-gray-200',
    text: 'text-gray-700',
    dot: 'bg-gray-400',
  },
  parcel_in_progress: {
    bg: 'bg-teal-100',
    text: 'text-teal-900',
    dot: 'bg-teal-500',
  },
  parcel_completed: {
    bg: 'bg-purple-100',
    text: 'text-purple-900',
    dot: 'bg-purple-500',
  },
  parcel_cancelled: {
    bg: 'bg-pink-100',
    text: 'text-pink-900',
    dot: 'bg-pink-500',
  },
};

export default function CustomChip({
  status,
  isParcel = false,
}: CustomChipProps) {
  const { bg, text, dot } = StatusStyleMap[status];

  // if (status === 'completed' && isParcel)
  //   return (
  //     <div
  //       className={`inline-flex items-center px-3 h-6 rounded-full bg-orange-100`}
  //     >
  //       <div className={`w-2 h-2 rounded-full mr-2 bg-orange-300`} />
  //       <span className={`text-xs font-bold bg-orange-400}`}>배송시작</span>
  //     </div>
  //   );

  return (
    <div className={`inline-flex items-center px-3 h-6 rounded-full ${bg}`}>
      <div className={`w-2 h-2 rounded-full mr-2 ${dot}`} />
      <span className={`text-xs font-bold ${text}`}>
        {OrderStatusEnum[status]}
      </span>
    </div>
  );
}
