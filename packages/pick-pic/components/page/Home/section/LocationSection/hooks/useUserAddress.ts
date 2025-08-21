'use client';
import { UserInfoAtom } from '@/store/userStore/state';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const useUserAddress = () => {
  const userInfo = useRecoilValue(UserInfoAtom);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (userInfo.address) setAddress(userInfo.address);
  }, [userInfo.address]);

  return address;
};
