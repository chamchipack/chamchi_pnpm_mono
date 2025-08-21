'use client';

import { CalendarCheck } from 'lucide-react';

interface Props {
  operatingDays: string[]; // 예: ['mon', 'tue', 'wed']
}

const dayOptions = [
  { label: '일', value: 'sun' },
  { label: '월', value: 'mon' },
  { label: '화', value: 'tue' },
  { label: '수', value: 'wed' },
  { label: '목', value: 'thu' },
  { label: '금', value: 'fri' },
  { label: '토', value: 'sat' },
];

export default function OperatingDaysBadge({ operatingDays }: Props) {
  const filteredDays = dayOptions.filter((day) =>
    operatingDays.includes(day.value),
  );

  return (
    <div className="flex items-center flex-wrap gap-2 my-2">
      <CalendarCheck size={14} className="text-gray-600" />
      <span className="text-[12px] min-w-[45px]">운영일</span>
      <div className="flex flex-wrap gap-1">
        {filteredDays.map((day) => (
          <div
            key={day.value}
            className="w-[22px] h-[22px] bg-gray-100 text-black rounded flex items-center justify-center text-xs"
          >
            {day.label}
          </div>
        ))}
      </div>
    </div>
  );
}
