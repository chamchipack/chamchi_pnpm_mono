'use client';

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { NickNameAtom } from '@/store/userStore/state';

const WebViewMessageHandler = () => {
  const [, setNickName] = useRecoilState(NickNameAtom);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<string>) => {
      try {
        console.log('📩 WebView에서 받은 메시지:', event.data);
        setNickName(event.data); // ✅ Zustand 또는 Recoil에 저장

        (window as any).ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: 'ETC',
            data: event.data,
          }),
        );
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

  return null; // ✅ UI가 필요 없는 이벤트 핸들러이므로 `null` 반환
};

export default WebViewMessageHandler;
