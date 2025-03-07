'use client';

import useReceiveWebviewMessage from '@/config/utils/hooks/useReceiveWebviewMessage';
import { AddressAtom, UserInfoAtom } from '@/store/userStore/state';
import { useRecoilState } from 'recoil';

export default function Container() {
  const [, setUserInfo] = useRecoilState(UserInfoAtom);

  useReceiveWebviewMessage((data, event) => {
    try {
      setUserInfo({
        nickname: data?.nickname || '',
        address: data?.address || '',
        longitude: data?.longitude || '',
        latitude: data?.latitude || '',
        userId: data?.userId || '',
        profile_image: data?.profile_image || '',
        location_list: JSON.parse(data?.location_list) || [],
        provider: data.provider,
      });
    } catch (e) {}
  });

  return null;
}
