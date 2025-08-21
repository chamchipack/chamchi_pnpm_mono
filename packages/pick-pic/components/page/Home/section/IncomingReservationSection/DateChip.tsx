'use client';

import dayjs from 'dayjs';

export default function DateChip({ bookingDate }: { bookingDate: Date }) {
  const now = dayjs();
  const booking = dayjs(bookingDate);
  const diff = booking.diff(now, 'day');
  const display =
    diff === 0 ? 'D-0' : diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;

  return (
    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full w-auto whitespace-nowrap">
      {display}
    </span>
  );
}
