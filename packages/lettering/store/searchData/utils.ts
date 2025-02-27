import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatTimeAgo(timestamp: string): string {
  const now = dayjs();
  const time = dayjs(timestamp);

  const diffMinutes = now.diff(time, 'minute');
  const diffHours = now.diff(time, 'hour');
  const diffDays = now.diff(time, 'day');
  const diffMonths = now.diff(time, 'month');
  const diffYears = now.diff(time, 'year');

  if (diffMinutes === 0) return '방금';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 30) return `${diffDays}일 전`;
  if (diffMonths < 12) return `${diffMonths}달 전`;
  return `${diffYears}년 전`;
}
