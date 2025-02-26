'use client';

import { UserInfoAtom } from '@/store/userStore/state';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function UserAddressButton() {
  const addressValue = useRecoilValue(UserInfoAtom);
  const [address, setAddress] = useState('');

  useEffect(() => {
    setAddress(addressValue.address);
  }, [addressValue.address]);

  return (
    <>
      <Typography variant="subtitle2">
        {address || '여기를 눌러 주소를 지정해보세요!'}
      </Typography>
      <ArrowDropDownIcon sx={{ fontSize: 24, color: 'common.black' }} />
    </>
  );
}
