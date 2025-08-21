'use client';

import EmptyDataOverlay from '@/components/common/layout/EmptyDataOverlay';
import { handleStorage } from '@/config/navigation';
import { setLocationCookie } from '@/config/utils/global';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import { UserInfoAtom } from '@/store/userStore/state';
import { Delete, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LoadingProgressBackDrop from 'package/src/Overlay/loading/LoadingProgressBackDrop';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

type AddressListType = {
  address: string;
  longitude: string;
  latitude: string;
};

interface EditableAddressListProps {
  addressList: AddressListType[];
}

export default function EditableAddressList({
  addressList,
}: EditableAddressListProps) {
  // hooks
  const router = useRouter();
  const alert = useAlert();

  const [list, setList] = useState<AddressListType[]>(addressList);
  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);

  const handleDelete = (address: string) => {
    setList((prev) => prev.filter((i) => i.address !== address));
    if (!clicked) setClicked(true);
  };

  const handleSave = async (isEmpty: boolean) => {
    setIsLoading(true);

    const { address } = userInfo;
    const result = list.find((i) => i.address === address);
    const current = result ?? (list.length ? list[0] : null);

    const updatedUserInfo = isEmpty
      ? { address: '', longitude: '', latitude: '', location_list: [] }
      : { ...(current || {}), location_list: list };

    setUserInfo((prev) => ({ ...prev, ...updatedUserInfo }));

    const data = {
      multiple: true,
      data: [
        { key: 'address', name: current?.address || '' },
        { key: 'longitude', name: current?.longitude || '' },
        { key: 'latitude', name: current?.latitude || '' },
        { key: 'location_list', name: list },
      ],
    };

    setLocationCookie(current?.latitude, current?.longitude);
    handleStorage({ data });
    router.refresh();

    setTimeout(() => {
      alert({
        message: '저장되었습니다',
        type: 'success',
      });
      setClicked(false);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {list.length === 0 ? (
        <>
          <EmptyDataOverlay title="저장된 주소가 없습니다" />
          <SaveButton onClick={() => handleSave(true)} disabled={!clicked} />
        </>
      ) : (
        <div className="mt-4 space-y-3">
          {list.map((item) => (
            <div
              key={item.address}
              className="flex items-center justify-between px-3 py-3 border border-stone-200 rounded-md"
            >
              <div className="flex">
                <MapPin size={20} className="text-gray-600 mr-3 shrink-0" />
                <p className="text-sm font-medium text-black truncate">
                  {item.address}
                </p>
              </div>
              {list.length === 1 ? (
                <div />
              ) : (
                <button
                  onClick={() => handleDelete(item.address)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Delete size={18} />
                </button>
              )}
            </div>
          ))}
          <SaveButton onClick={() => handleSave(false)} disabled={!clicked} />
        </div>
      )}
      <div className="h-screen">
        <LoadingProgressBackDrop isLoading={isLoading} />
      </div>
    </>
  );
}

/** ✅ 저장 버튼 컴포넌트 */
const SaveButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full h-10 mt-4 rounded-md font-normal transition-colors ${
      disabled
        ? 'bg-gray-300 text-white cursor-not-allowed'
        : 'bg-main text-white hover:bg-red-300'
    }`}
  >
    저장하기
  </button>
);
