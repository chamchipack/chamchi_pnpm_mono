import { SearchFilterValue } from '@/types/schema/SearchSchema';
import React from 'react';

type Filter = { value: SearchFilterValue; label: string };

interface ListFilterChipProps {
  onClick?: () => void; // 클릭 이벤트 (선택 사항)
  value: Filter;
}

const ListFilterChip = ({ onClick, value }: ListFilterChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`h-7 min-w-[50px] border border-gray-300 text-black rounded-full px-3 text-xs font-normal flex items-center justify-center hover:opacity-90 transition-all`}
    >
      {value?.label || '기본순'}
    </button>
  );
};

export default React.memo(ListFilterChip);
