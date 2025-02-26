'use client';
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Backdrop } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  handleFindLocation,
  handleNavigation,
  handleStorage,
} from '@/config/navigation';
import SearchInput from '../components/SearchInput';
import CurrentLocationSelector from './CurrentLocationSelector';
import AddressList from './AddressList';
import EditableAddressList from '../EditableAddressList';
import HeadComponent from '@/components/common/HeadComponent';
import { useRecoilState } from 'recoil';
import { UserInfoAtom } from '@/store/userStore/state';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

type AddressListType = {
  address: string;
  longitude: string;
  latitude: string;
};

export default function AddressSettingContainer() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);

  const [editMode, setEditMode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [addressList, setAddressList] = useState<AddressListType[]>([
    { address: '', longitude: '', latitude: '' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { address = '', location_list = [] } = userInfo;

    (window as any).ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'ETC',
        data: location_list,
      }),
    );

    setAddressList(location_list);
    setSelectedAddress(address);
  }, [userInfo]);

  const handleRegisterAddress = () => {
    setCurrentLocation(null);
  };

  useEffect(() => {}, []);

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

  const onSelectAddress = async (item: AddressListType) => {
    setIsLoading(true);
    try {
      setUserInfo((prev) => ({
        ...prev,
        address: item.address,
        longitude: item.longitude,
        latitude: item.latitude,
      }));
      const data = {
        multiple: true,
        data: [
          { key: 'address', name: item.address },
          { key: 'longitude', name: item.longitude },
          { key: 'latitude', name: item.latitude },
        ],
      };
      handleStorage({ data });
    } catch {}

    setTimeout(() => {
      handleNavigation({ path: 'home', status: 'forward' });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box sx={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
      <HeadComponent
        isLeftButtonVisable={!editMode}
        title={editMode ? '편집' : '주소 설정'}
        onRightButtonClick={onChangeEditMode}
        path="home"
        isRoutingReplace
        isRightButtonVisable
        rightButtonIcon={editMode ? <ArrowBackIosNewIcon /> : <EditIcon />}
      />

      {editMode ? (
        <EditableAddressList addressList={addressList} />
      ) : (
        <>
          <SearchInput
            handleRouter={handleRouter}
            isUsable={false}
            placeholder="여기를 눌러 위치 찾기"
          />
          <CurrentLocationSelector
            currentLocation={currentLocation}
            handleRegisterAddress={handleRegisterAddress}
            setCurrentLocation={setCurrentLocation}
          />
          <AddressList
            addressList={addressList}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            onSelectAddress={onSelectAddress}
            loading={isLoading}
          />
        </>
      )}

      {/* ✅ 전체화면 로딩 인디케이터 */}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1, // 최상위 레이어 설정
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
