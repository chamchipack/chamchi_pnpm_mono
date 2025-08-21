'use client';
import HeadComponent from '@/components/common/HeadComponent';
import { handleStorage } from '@/config/navigation';
import { setLocationCookie } from '@/config/utils/global';
import { UserInfoAtom } from '@/store/userStore/state';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import SearchInput from '../components/SearchInput';
import AddressList from './AddressList';
import CurrentLocationSelector from './CurrentLocationSelector';
import EditableAddressList from './edit/EditableAddressList';

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

    setAddressList(location_list);
    setSelectedAddress(address);
  }, [userInfo]);

  const handleRegisterAddress = () => {
    setCurrentLocation(null);
  };

  useEffect(() => {}, []);

  const handleRouter = () => {
    let path = `/address/search`;
    return router.push(path);
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
      setLocationCookie(item?.latitude, item?.longitude);
      handleStorage({ data });
      router.refresh();
    } catch {}

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full h-full bg-white">
      <HeadComponent
        isLeftButtonVisable={!editMode}
        title={editMode ? '편집' : '주소 설정'}
        onRightButtonClick={onChangeEditMode}
        // path="home"
        // isRoutingReplace
        isRightButtonVisable={true}
        rightButtonIcon={
          editMode ? <ArrowLeft /> : <Pencil width={20} height={20} />
        }
        isNativeRoute={false}
      />

      <div>
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
      </div>

      {/* ✅ 전체화면 로딩 인디케이터 */}
      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // 5% 투명한 검정
        >
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
