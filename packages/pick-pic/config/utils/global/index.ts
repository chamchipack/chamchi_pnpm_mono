export const globalMaxWidth = 480;

export function setLocationCookie(
  lat: number | string = 0,
  lng: number | string = 0,
) {
  if (typeof document === 'undefined') return;

  const latitude = Number(lat);
  const longitude = Number(lng);

  // 유효성 검사: 숫자 + 한국 범위 내
  const isValidLatitude = !isNaN(latitude) && latitude >= 33 && latitude <= 39;
  const isValidLongitude =
    !isNaN(longitude) && longitude >= 124 && longitude <= 131;

  if (!isValidLatitude || !isValidLongitude) return;

  document.cookie = `latitude=${latitude}; path=/`;
  document.cookie = `longitude=${longitude}; path=/`;
}

// - 공휴일 시작 종료시간 있으면 → 영업함
// - 공휴일 시작 종료시간 있는데 휴무다 → 무조건 휴무
// - 공휴일 시작종료시간 없으면 → 휴무처리

export const ph: Record<string, string[]> = {
  '2025': [
    '2025-08-15',
    '2025-10-03',
    '2025-10-05',
    '2025-10-06',
    '2025-10-07',
    '2025-10-08',
    '2025-10-09',
    '2025-12-25',
  ],
  '2026': [
    '2026-01-01',
    '2026-02-16',
    '2026-02-17',
    '2026-02-18',
    '2026-03-02',
    '2026-05-05',
    '2026-05-25',
    '2026-08-17',
    '2026-09-24',
    '2026-09-25',
    '2026-09-26',
    '2026-10-05',
    '2026-10-09',
    '2026-12-25',
  ],
};
