'use client';

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import HeadComponent from './HeadComponent';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';
import SearchInput from './SearchInput';
import CurrentLocationSelector from './CurrentLocationSelector';
import AddressList from './AddressList';
import EditableAddressList from './EditableAddressList';

const addressList = [
  { id: '1', name: '위치 애칭 1', address: '경기도 성남시 수정구' },
  { id: '2', name: '위치 애칭 2', address: '서울특별시 강남구' },
  { id: '3', name: '위치 애칭 3', address: '부산광역시 해운대구' },
];

export default function ListContainer() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  const handleFindCurrentLocation = () => {
    setCurrentLocation('경기도 성남시 수정구'); // 예제 주소
  };

  const handleRegisterAddress = () => {
    setCurrentLocation(null);
  };

  const handleRouter = () => {
    let path = `/application/address/search`;
    const isWebView = handleNavigation({
      path: 'address/search',
      status: 'forward',
    });

    if (!isWebView) return router.push(path);
  };

  const onChangeEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <Box sx={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
      <HeadComponent
        title={editMode ? '편집' : '주소 설정'}
        onChange={onChangeEditMode}
      />

      {editMode ? (
        <EditableAddressList addressList={addressList} />
      ) : (
        <>
          <SearchInput handleRouter={handleRouter} isUsable={false} />
          <CurrentLocationSelector
            currentLocation={currentLocation}
            handleFindCurrentLocation={handleFindCurrentLocation}
            handleRegisterAddress={handleRegisterAddress}
          />
          <AddressList
            addressList={addressList}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        </>
      )}
    </Box>
  );
}
