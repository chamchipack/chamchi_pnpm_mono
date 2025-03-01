import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko'; // ✅ 한국어 로케일 적용

dayjs.extend(relativeTime);
dayjs.locale('ko'); // ✅ 한국어로 설정

/**
 * 날짜를 '방금 전', 'n분 전', 'n시간 전' 등으로 변환하는 함수
 * @param timestamp 변환할 날짜 (string | Date)
 * @returns 상대적인 시간 문자열
 */
export function formatTimeAgo(timestamp: string | Date): string {
  const now = dayjs();
  const time = dayjs(timestamp);

  const diffMinutes = now.diff(time, 'minute');
  const diffHours = now.diff(time, 'hour');
  const diffDays = now.diff(time, 'day');
  const diffMonths = now.diff(time, 'month');
  const diffYears = now.diff(time, 'year');

  if (diffMinutes === 0) return '방금 전';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 30) return `${diffDays}일 전`;
  if (diffMonths < 12) return `${diffMonths}달 전`;
  return `${diffYears}년 전`;
}
