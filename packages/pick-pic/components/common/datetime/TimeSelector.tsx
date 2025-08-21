'use client';

import { useMemo } from 'react';

interface TimeSelectorProps {
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
}

export default function TimeSelector({
  startTime,
  endTime,
  selectedTime,
  setSelectedTime,
}: TimeSelectorProps) {
  const timeSlots = useMemo(() => {
    const result: string[] = [];
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const current = new Date(start);

    while (current < end) {
      result.push(current.toTimeString().slice(0, 5)); // HH:MM
      current.setMinutes(current.getMinutes() + 30);
    }

    return result;
  }, [startTime, endTime]);

  return (
    <div className="w-full px-4 mt-3">
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide whitespace-nowrap scrollbar-hidden">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`min-w-[64px] h-[35px] px-3 rounded-md flex items-center justify-center border text-sm
              ${
                selectedTime === time
                  ? 'bg-main text-white border-main font-semibold'
                  : 'bg-white text-gray-600 border-gray-300'
              }
              hover:opacity-90 transition`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}
