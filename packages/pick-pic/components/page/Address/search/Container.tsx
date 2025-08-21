'use client';

import HeadComponent from '@/components/common/HeadComponent';
import { useState } from 'react';
import SearchInput from '../components/SearchInput';
import AddressSearchList from './AddressSearchList';

type SearchList = {
  roadAddress: string;
  latitude: string;
  longitude: string;
};

export default function Container() {
  const [searchList, setSearchList] = useState<SearchList[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearchQuery = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);

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

      setSearchList(addList);
    } catch (error) {
      console.error('API 호출 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-4 pb-24 h-full">
      <div className="px-4">
        <HeadComponent
          isLeftButtonVisable={true}
          title="주소 찾기"
          isNativeRoute={false}
        />
      </div>

      <div className="px-4">
        <SearchInput
          isUsable={true}
          handleSearchQuery={handleSearchQuery}
          placeholder="예시) 세종대로 110, 강남구, 천안시, 성수동"
        />

        <p className="text-xs text-gray-500 mt-2">
          원하시는 주소를 자유롭게 입력해주세요
        </p>
        <p className="text-xs text-gray-500 mt-2">
          - 시/군/구 예시 : 서울시, 강남구, 성수동
        </p>
        <p className="text-xs text-gray-500 mt-2">
          - 도로명 주소 예시 : 세종대로 110
        </p>
      </div>

      <div className="px-4 mt-4">
        <AddressSearchList
          searchList={searchList}
          searchQuery={searchQuery}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
