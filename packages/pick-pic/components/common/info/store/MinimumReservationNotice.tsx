'use client';

import { Clock } from 'lucide-react'; // AccessTimeIcon 대체

interface Props {
  minimumReservationDate: number;
}

export default function MinimumReservationNotice({
  minimumReservationDate,
}: Props) {
  return (
    <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-2 py-1 mt-2 w-fit">
      <Clock className="text-blue-500 w-4 h-4 mr-2" />

      <p className="text-xs text-gray-600">
        상품준비에는 최소&nbsp;
        <span className="font-semibold text-sm text-gray-800">
          {minimumReservationDate}일
        </span>
        &nbsp;이 필요합니다.
      </p>
    </div>
  );
}
