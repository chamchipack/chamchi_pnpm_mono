import ModalWrapper from '@/components/common/modal/ModalWrapper';
import EmptyBox from '@/components/common/overlay/EmptyBox';
import { handleNavigation, handleStorage } from '@/config/navigation';
import { UserInfoAtom } from '@/store/userStore/state';
import { Box, Typography, CircularProgress } from '@mui/material';
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
  searchQuery?: string; // 🔹 검색어 추가
  isLoading?: boolean; // 🔹 로딩 상태 추가
}

export default function AddressSearchList({
  searchList = [],
  searchQuery = '',
  isLoading = false, // 기본값 false
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
  const [selectedAddress, setSelectedAddress] = useState<SearchList>({
    roadAddress: '',
    longitude: '',
    latitude: '',
  });

  const onClose = () => setOpen(false);

  const handleMultiple = async () => {
    try {
      const list = userInfo.location_list;
      const dataset = {
        address: selectedAddress.roadAddress,
        longitude: selectedAddress.longitude,
        latitude: selectedAddress.latitude,
      };

      const form = [...(list || []), dataset];

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

      handleStorage({ data });
      onClose();

      // const isWebview = handleNavigation({
      //   path: '',
      //   status: 'back',
      // });
      // if (!isWebview)
      return router.back();
    } catch {}
  };

  // 🔹 검색어가 없으면 아무것도 렌더링하지 않음
  if (!searchQuery.trim()) return null;

  return (
    <>
      {/* 🔹 로딩 중이면 스피너 표시 */}
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
          }}
        >
          <CircularProgress color="secondary" size={24} />
        </Box>
      ) : searchList.length === 0 ? (
        <EmptyBox title="검색 결과가 없습니다" />
      ) : (
        searchList.map(({ roadAddress = '', ...rest }) => (
          <Box
            key={roadAddress}
            sx={{
              mb: 2,
              height: 40,
              backgroundColor: 'grey.100',
              borderRadius: 2,
              p: 1,
            }}
            onClick={() => {
              setSelectedAddress({ roadAddress, ...rest });
              setOpen(true);
            }}
          >
            <Typography fontSize={14}>{roadAddress}</Typography>
          </Box>
        ))
      )}

      <ModalWrapper
        open={open}
        handleClose={onClose}
        title={selectedAddress.roadAddress}
        content="나의 위치로 설정하시겠어요?"
        processing={false}
        onClickCheck={handleMultiple}
      />
    </>
  );
}
