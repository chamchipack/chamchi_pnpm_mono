'use client';

import { AddressAtom, UserInfoAtom } from '@/store/userStore/state';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function Container() {
  const [, setUserInfo] = useRecoilState(UserInfoAtom);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<string>) => {
      try {
        console.log('📩 WebView에서 받은 메시지:', event.data);
        const userData = JSON.parse(event.data);

        setUserInfo({
          nickname: userData?.nickname || '',
          address: userData?.address || '',
          longitude: userData?.longitude || '',
          latitude: userData?.latitude || '',
        });
      } catch (error) {
        console.error('❌ 메시지 처리 오류:', error);
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
