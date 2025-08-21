'use client';

import { Clock } from 'lucide-react';

interface Props {
  minimumReservationDate: number;
}

export default function MinimumReservationNotice({
  minimumReservationDate,
}: Props) {
  return (
    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-2 py-1 text-xs text-gray-600">
      <Clock size={16} className="text-blue-500 mr-1" />
      <span>
        상품준비에는 최소&nbsp;
        <span className="font-bold text-sm text-gray-800">
          {minimumReservationDate}일
        </span>
        &nbsp;이 필요합니다.
      </span>
    </div>
  );
}
