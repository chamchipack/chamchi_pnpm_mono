'use client';

import dayjs from 'dayjs';

interface PickupTimeChipProps {
  onClick?: () => void;
  value: string | null;
  isTimeSelectable: boolean;
}

export default function PickupTimeChip({
  onClick,
  value,
  isTimeSelectable,
}: PickupTimeChipProps) {
  const hasValue = Boolean(value);

  const widthClass = () => {
    if (isTimeSelectable) return value ? 'min-w-[140px]' : 'min-w-[80px]';
    else return 'min-w-[80px]';
  };

  return (
    <button
      onClick={onClick}
      className={`h-7 ${widthClass()} border border-gray-300 text-black rounded-full px-3 text-xs font-normal flex items-center justify-center hover:opacity-90 transition-all`}
    >
      {hasValue ? dayjs(value).format('MM월 DD일 HH시 mm분') : '예약시간선택'}
    </button>
  );
}
