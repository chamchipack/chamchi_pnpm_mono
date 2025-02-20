import ModalWrapper from '@/components/common/modal/ModalWrapper';
import EmptyBox from '@/components/common/overlay/EmptyBox';
import { handleNavigation, handleStorage } from '@/config/navigation';
import { UserInfoAtom } from '@/store/userStore/state';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

type SearchList = {
  roadAddress: string;
  latitude: string;
  longitude: string;
};

interface Props {
  searchList?: SearchList[];
}

export default function AddressSearchList({ searchList = [] }: Props) {
  const [open, setOpen] = useState(false);
  const [, setUserInfo] = useRecoilState(UserInfoAtom);
  const [selectedAddress, setSelectedAddress] = useState<SearchList>({
    roadAddress: '',
    longitude: '',
    latitude: '',
  });

  const onClose = () => setOpen(false);

  const handleMultiple = async () => {
    const form = {
      address: selectedAddress.roadAddress,
      longitude: selectedAddress.longitude,
      latitude: selectedAddress.latitude,
    };
    const data = {
      multiple: true,
      data: [
        { key: 'address', name: selectedAddress.roadAddress },
        { key: 'longitude', name: selectedAddress.longitude },
        { key: 'latitude', name: selectedAddress.latitude },
      ],
    };

    setUserInfo((prev) => ({
      ...prev,
      address: selectedAddress.roadAddress,
      longitude: selectedAddress.longitude,
      latitude: selectedAddress.latitude,
    }));

    handleStorage({ data });
    onClose();

    handleNavigation({ path: 'address', status: 'forward' });
  };
  if (!searchList.length) return <EmptyBox title="검색 결과가 없습니다" />;

  return (
    <>
      {searchList.map(({ roadAddress = '', ...rest }) => (
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
      ))}

      <ModalWrapper
        open={open}
        handleClose={onClose}
        title={selectedAddress.roadAddress}
        content="나의 위치로 설정하시겠어요?"
        processing={false}
        onClickCheck={handleMultiple}
      ></ModalWrapper>
    </>
  );
}
