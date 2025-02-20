'use client';
import { Box } from '@mui/material';
import HeadComponent from '../../common/HeadComponent';
import SearchInput from '../SearchInput';
import { useState } from 'react';
import AddressSearchList from './AddressSearchList';

type SearchList = {
  roadAddress: string;
  latitude: string;
  longitude: string;
};

export default function Container() {
  const [searchList, setSearchList] = useState<SearchList[] | []>([]);

  const handleSearchQuery = async (query: string) => {
    try {
      const res = await fetch(`/api/geocode?query=${query}`);
      const data = await res.json();
      const { addresses = [] } = data;

      const result: SearchList[] = addresses.map(
        ({ roadAddress = '', x = '', y = '' }) => {
          return { roadAddress, longitude: x, latitude: y };
        },
      );

      setSearchList(result);
    } catch (error) {
      console.error('API 호출 오류:', error);
    }
  };
  return (
    <>
      <Box sx={{ py: 1.5, pb: 10 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isButtonVisable={true} title="주소 찾기" />
        </Box>

        <Box sx={{ px: 2 }}>
          <SearchInput isUsable={true} handleSearchQuery={handleSearchQuery} />
        </Box>

        <Box sx={{ px: 2 }}>
          <AddressSearchList searchList={searchList} />
        </Box>
      </Box>
    </>
  );
}
