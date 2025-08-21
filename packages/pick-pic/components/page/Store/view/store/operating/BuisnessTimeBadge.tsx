'use client';

import dayjs from 'dayjs';
import { Clock } from 'lucide-react';

interface Props {
  startTime?: number | null; // ex. 1110 → 18시 30분
  endTime?: number | null;
  title: string;
}

export default function BusinessTimeBadge({
  startTime,
  endTime,
  title,
}: Props) {
  if (startTime == null) return null;

  if (!startTime && !endTime) return null;

  const isTimeValid =
    typeof startTime === 'number' && typeof endTime === 'number';

  // ✅ 분 단위를 HH:mm 형식으로 변환
  const formatTime = (totalMinutes: number) =>
    dayjs('2025-01-01 00:00').add(totalMinutes, 'minute').format('HH:mm');

  return (
    <div className="flex items-center gap-2 flex-wrap my-2">
      <Clock size={14} className="text-gray-500" />
      <span className="text-xs min-w-[45px]">{title || '운영시간'}</span>
      {isTimeValid ? (
        <span className="text-sm text-gray-400">
          {formatTime(startTime)} ~ {formatTime(endTime!)}
        </span>
      ) : (
        <span className="text-sm text-gray-400">
          시간이 등록되지 않았습니다
        </span>
      )}
    </div>
  );
}
