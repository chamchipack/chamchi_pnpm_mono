'use client';

import CurrentLocationTypo from '@/components/common/location/CurrentLocationTypo';
import UserAddressButton from '@/components/page/Home/section/LocationSection/UserAddressButton';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  isSearching: boolean;
  searchText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  address?: string;
  latitude?: string;
  longitude?: string;
  onLocationClick?: (lat: number, lng: number) => void;
}

const AddressSearchInput = ({
  isSearching,
  searchText,
  onChange,
  address,
  latitude,
  longitude,
  onLocationClick,
}: Props) => {
  const router = useRouter();

  // if (isSearching) {
  //   return (
  //     <div className="relative w-full h-10">
  //       <input
  //         type="text"
  //         placeholder="주소검색 예) 서울, 강남구, 성수동..."
  //         value={searchText}
  //         onChange={onChange}
  //         className="w-full text-base h-full bg-transparent outline-none pr-8 placeholder:text-sm placeholder:opacity-70"
  //       />

  //       {isSearching && searchText && (
  //         <div className="absolute right-2 top-1/2 -translate-y-1/2">
  //           <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  if (address) {
    return (
      <div className="flex items-center justify-between w-full">
        <CurrentLocationTypo isClickAvailable />
        {/* <button
          className="text-main px-3 py-1 text-xs h-7 rounded hover:bg-main hover:text-white transition-colors"
          onClick={() => {
            if (latitude && longitude && onLocationClick) {
              onLocationClick(Number(latitude), Number(longitude));
            }
          }}
        >
          이동
        </button> */}
      </div>
    );
  }

  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => router.push('/address')}
    >
      <UserAddressButton />
    </div>
  );
};

export default React.memo(AddressSearchInput);
