'use client';

import React from 'react';

interface SearchList {
  roadAddress: string;
  longitude: string;
  latitude: string;
}

interface Props {
  list: SearchList[];
  onSelect: (lat: number, lng: number) => void;
}

const SearchResultDropdown = ({ list, onSelect }: Props) => {
  if (!list.length) return null;

  return (
    <div className="absolute top-[66px] left-1/2 transform -translate-x-1/2 z-30 w-[90%] max-w-[400px] max-h-[300px] overflow-y-auto bg-white rounded-md shadow-lg">
      {list.map((item, index) => (
        <div
          key={`${item.roadAddress}-${index}`}
          className="px-4 py-2 border-b border-gray-100 hover:bg-gray-100 cursor-pointer text-sm font-md"
          onClick={() =>
            onSelect(Number(item.latitude), Number(item.longitude))
          }
        >
          {item.roadAddress}
        </div>
      ))}
    </div>
  );
};

export default React.memo(SearchResultDropdown);
