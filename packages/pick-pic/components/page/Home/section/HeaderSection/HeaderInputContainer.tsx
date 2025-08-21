'use client';

import useSearchInput from './hooks/useSearchInput';

const HeaderInputContainer = () => {
  const { handleRouter, handlePrefetch } = useSearchInput();
  return (
    <div className="w-full relative">
      <input
        type="text"
        placeholder="예약가능한 곳을 찾아보세요!"
        onClick={handleRouter}
        onMouseEnter={handlePrefetch}
        onTouchStart={handlePrefetch}
        onFocus={handlePrefetch}
        className="w-full px-4 py-2 pr-10 bg-gray-100 rounded-md text-base focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-main cursor-pointer"
        readOnly
      />

      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeaderInputContainer;
