'use client';

import { MapPin } from 'lucide-react';
import React from 'react';

interface Props {
  onClick?: () => void;
  itemCount: number;
}

const ListToggleButton = ({ onClick, itemCount }: Props) => {
  const isFound = itemCount > 0;

  return (
    <div
      onClick={isFound ? onClick : undefined}
      className={`z-10 absolute bottom-[12vh] left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 max-w-[280px] w-[90%] rounded-md shadow-sm transition-colors duration-200 h-10
        ${isFound ? 'bg-white border border-[#F39E9E] text-black cursor-pointer hover:bg-[#FFF5F5]' : 'bg-gray-100 border border-dashed border-gray-300 text-gray-700 pointer-events-none'}`}
    >
      <MapPin size={18} color={isFound ? '#F39E9E' : '#888'} />

      <span className="text-[12px] leading-[1.4] break-keep break-words">
        {isFound
          ? `${itemCount}건의 주변 리스트 보기`
          : `이 주변에서는 검색 결과가 없어요`}
      </span>
    </div>
  );
};

export default React.memo(ListToggleButton);
