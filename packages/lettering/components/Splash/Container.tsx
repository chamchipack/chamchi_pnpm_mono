'use client';

import { AddressAtom, UserInfoAtom } from '@/store/userStore/state';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function Container() {
  const [, setUserInfo] = useRecoilState(UserInfoAtom);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<string>) => {
      try {
        const userData = JSON.parse(event.data);

        setUserInfo({
          nickname: userData?.nickname || '',
          address: userData?.address || '',
          longitude: userData?.longitude || '',
          latitude: userData?.latitude || '',
          userId: userData?.userId || '',
          profile_image: userData?.profile_image || '',
          location_list: JSON.parse(userData?.location_list) || [],
        });

        (window as any).ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: 'ETC',
            data: 'good',
          }),
        );
      } catch (error) {
        (window as any).ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: 'ETC',
            data: 'error',
          }),
        );
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  return null;
}
