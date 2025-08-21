'use client';

import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import useReceiveWebviewMessage from '@/config/utils/hooks/useReceiveWebviewMessage';
import { useUserInfoKeys } from '@/store/userStore/state';
import { useRouter } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react';
import AddressSearchInput from './head/AddressSearchInput';
import BackButton from './head/BackButton';

interface SearchList {
  roadAddress: string;
  longitude: string;
  latitude: string;
}

interface Props {
  onClick?: (lat: number, lng: number) => void;
}

const MapHeadContainer = ({ onClick }: Props) => {
  const router = useRouter();
  const alert = useAlert();

  const { address, latitude, longitude } = useUserInfoKeys([
    'address',
    'latitude',
    'longitude',
  ]);

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<SearchList[]>([]);
  const [absoluteHeight, setAbsoluteHeight] = useState<number>(16);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchQuery = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(`/api/kakao-geocode?query=${query}`);
        const list = await response.json();
        const { documents = [] } = list;

        const addList: SearchList[] = documents.map(
          ({ x = '', y = '', address_name = '' }) => ({
            roadAddress: address_name,
            longitude: x,
            latitude: y,
          }),
        );

        setSearchResults(addList);

        if (!addList.length) {
          alert({
            message: '검색 결과가 없습니다!',
            type: 'warning',
          });
        }
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    },
    [alert],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchText(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        handleSearchQuery(value);
      }, 1000);
    },
    [handleSearchQuery],
  );

  const handleSelectResult = useCallback(
    (lat: number, lng: number) => {
      setIsSearching(false);
      setSearchText('');
      onClick?.(lat, lng);
    },
    [onClick],
  );

  const toggleSearch = useCallback(() => {
    setIsSearching((prev) => !prev);
    setSearchText('');
    setSearchResults([]);
  }, []);

  useReceiveWebviewMessage(async (data, event) => {
    setAbsoluteHeight(Number(data) + 16);
  });

  return (
    <>
      <div
        className="absolute left-3 z-10 h-[40px] flex items-center justify-center bg-white rounded-full shadow-md"
        style={{ top: `${absoluteHeight}px` }}
      >
        <BackButton onClick={() => router.back()} />
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 z-10 h-[40px] min-w-[150px] flex items-center px-6 bg-white rounded-lg shadow-md"
        style={{ top: `${absoluteHeight}px` }}
      >
        <AddressSearchInput
          isSearching={isSearching}
          searchText={searchText}
          onChange={handleChange}
          address={address}
          latitude={latitude}
          longitude={longitude}
          onLocationClick={onClick}
        />
      </div>

      {/* <div
        className="absolute right-3 z-10 h-[50px] flex items-center justify-center px-3 bg-white rounded-lg shadow-md"
        style={{ top: `${absoluteHeight}px` }}
      >
        <SearchToggleButton isSearching={isSearching} onToggle={toggleSearch} />
      </div> */}

      {/* {isSearching && searchResults.length > 0 && (
        <SearchResultDropdown
          list={searchResults}
          onSelect={handleSelectResult}
        />
      )} */}
    </>
  );
};

export default React.memo(MapHeadContainer);
