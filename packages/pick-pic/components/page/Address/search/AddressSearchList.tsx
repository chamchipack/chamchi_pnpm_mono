'use client';

import ActionConfirmationModal from '@/components/common/backdrop/ActionConfirmationModal';
import EmptyDataOverlay from '@/components/common/layout/EmptyDataOverlay';
import { handleStorage } from '@/config/navigation';
import { setLocationCookie } from '@/config/utils/global';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import { UserInfoAtom } from '@/store/userStore/state';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

type SearchList = {
  roadAddress: string;
  latitude: string;
  longitude: string;
};

interface Props {
  searchList?: SearchList[];
  searchQuery?: string;
  isLoading?: boolean;
  onClickRegister?: () => void;
}

export default function AddressSearchList({
  searchList = [],
  searchQuery = '',
  isLoading = false,
  onClickRegister,
}: Props) {
  // hooks
  const router = useRouter();
  const alert = useAlert();

  // recoil
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);

  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<SearchList>({
    roadAddress: '',
    longitude: '',
    latitude: '',
  });

  const onClose = () => setOpen(false);

  const handleMultiple = async () => {
    setProcessing(true);
    try {
      const list = userInfo.location_list || [];

      const dataset = {
        address: selectedAddress.roadAddress,
        longitude: selectedAddress.longitude,
        latitude: selectedAddress.latitude,
      };

      const isDuplicate = list.some(
        (item) =>
          item.address === dataset.address &&
          item.longitude === dataset.longitude &&
          item.latitude === dataset.latitude,
      );

      const form = isDuplicate ? [...list] : [...list, dataset];

      const data = {
        multiple: true,
        data: [
          { key: 'address', name: selectedAddress.roadAddress },
          { key: 'longitude', name: selectedAddress.longitude },
          { key: 'latitude', name: selectedAddress.latitude },
          { key: 'location_list', name: form },
        ],
      };

      setUserInfo((prev) => ({
        ...prev,
        address: selectedAddress.roadAddress,
        longitude: selectedAddress.longitude,
        latitude: selectedAddress.latitude,
        location_list: form,
      }));

      setLocationCookie(selectedAddress?.latitude, selectedAddress?.longitude);
      handleStorage({ data });

      alert({
        message: '내 위치로 저장헸어요!',
        type: 'success',
      });

      if (onClickRegister) {
        onClickRegister();
        onClose();
        return;
      }

      onClose();
      setProcessing(false);
      return router.back();
    } catch {
      alert({
        message: '오류가 발생했습니다!',
        type: 'error',
      });
      setProcessing(false);
    }
  };

  if (!searchQuery.trim()) return null;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-16">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : searchList.length === 0 ? (
        <EmptyDataOverlay title="검색 결과가 없습니다" />
      ) : (
        searchList.map(({ roadAddress = '', ...rest }) => (
          <div
            key={roadAddress}
            className="mb-2 h-10 bg-gray-100 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => {
              setSelectedAddress({ roadAddress, ...rest });
              setOpen(true);
            }}
          >
            <p className="text-sm text-gray-800 truncate">{roadAddress}</p>
          </div>
        ))
      )}

      <ActionConfirmationModal
        open={open}
        handleClose={onClose}
        title={selectedAddress.roadAddress}
        content="나의 위치로 설정합니다."
        processing={processing}
        onClickCheck={handleMultiple}
      />
    </>
  );
}
