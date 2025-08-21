'use client';

import useRouteFetch from './hooks/useRouteFetch';

export default function PopularRouteButton() {
  const { handlePrefetch, handleRoute } = useRouteFetch();

  return (
    <span
      className="text-sm text-gray-500 cursor-pointer hover:underline"
      onClick={handleRoute}
      onMouseEnter={handlePrefetch}
      onTouchStart={handlePrefetch}
      onFocus={handlePrefetch}
    >
      전체보기
    </span>
  );
}
