'use client';

import { useUserStore } from '@/store/userStore/store';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const Page = () => {
  const [isModalVisible, setModalVisible] = useState('');
  // const [s, d] = useREvo
  const handleRouter = () => {
    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      // ✅ WebView 환경에서 네이티브로 메시지 전송
      (window as any).ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'NAVIGATE',
          data: 'good',
        } as any),
      );
      return true; // WebView에서 처리됨
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        // const data = JSON.parse(event.data);
        // console.log('React Native에서 받은 데이터:', data);

        // if (data.type === 'INIT') {
        setModalVisible(event.data); // ✅ Zustand에 저장

        (window as any).ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'NAVIGATE',
            data: event.data,
          } as any),
        );
        // }
      } catch (error) {
        console.error('메시지 처리 오류:', error);

        (window as any).ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'NAVIGATE',
            data: 'error',
          } as any),
        );
      }
    };

    // window.ReactNativeWebView.postMessage(
    //   JSON.stringify({
    //     type: 'NAVIGATE',
    //     data: 'sssss',
    //   }),
    // );

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div>
      <Button onClick={handleRouter}>sssss</Button>
      <div>{isModalVisible}sss</div>
    </div>
  );
};

export default Page;
