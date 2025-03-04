'use client';
import { Box, Typography } from '@mui/material';
import HeadComponent from '../../common/HeadComponent';
import SearchInput from '../components/SearchInput';
import { useState } from 'react';
import AddressSearchList from './AddressSearchList';

type SearchList = {
  roadAddress: string;
  latitude: string;
  longitude: string;
};

export default function Container() {
  const [searchList, setSearchList] = useState<SearchList[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // 🔹 로딩 상태 추가

  const handleSearchQuery = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true); // 🔹 검색 시작 시 로딩 활성화

    try {
      // const res = await fetch(`/api/geocode?query=${query}`);
      const response = await fetch(`/api/kakao-geocode?query=${query}`);
      const list = await response.json();
      // const data = await res.json();

      // const { addresses = [] } = data;
      const { documents = [] } = list;

      const addList: SearchList[] = documents.map(
        ({ x = '', y = '', address_name = '' }) => ({
          roadAddress: address_name,
          longitude: x,
          latitude: y,
        }),
      );

      // const result: SearchList[] = addresses.map(
      //   ({ roadAddress = '', x = '', y = '' }) => ({
      //     roadAddress,
      //     longitude: x,
      //     latitude: y,
      //   }),
      // );

      setSearchList(addList);
    } catch (error) {
      console.error('API 호출 오류:', error);
    } finally {
      setIsLoading(false); // 🔹 검색 종료 후 로딩 비활성화
    }
  };

  return (
    <>
      <Box sx={{ py: 1.5, pb: 10 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isLeftButtonVisable={true} title="주소 찾기" />
        </Box>

        <Box sx={{ px: 2 }}>
          <SearchInput
            isUsable={true}
            handleSearchQuery={handleSearchQuery}
            placeholder="예시) 강남구, 천안시, 성수동"
          />

          <Typography fontSize={12} color={'gray'} sx={{ my: 1 }}>
            원하시는 주소를 시군구 혹은 읍면동 단위로 입력해주세요
          </Typography>
        </Box>

        <Box sx={{ px: 2 }}>
          <AddressSearchList
            searchList={searchList}
            searchQuery={searchQuery}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </>
  );
}
