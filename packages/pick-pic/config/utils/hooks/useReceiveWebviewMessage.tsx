import { useEffect } from 'react';

export default function useReceiveWebviewMessage(
  callback: (data: any, rawEvent: MessageEvent<string>) => void,
) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent<string>) => {
      let parsedData = null;
      (window as any).ReactNativeWebView?.postMessage('ㅇㄴㅇㄹㄴㅇㄹ');

      try {
        parsedData = JSON.parse(event.data); // ✅ JSON 파싱 시도
      } catch (error) {
        console.warn('웹뷰 메시지 파싱 실패:', event.data); // ✅ 파싱 실패 로그
        parsedData = event.data || ''; // ✅ 원본 데이터 그대로 전달
      }

      callback(parsedData, event); // ✅ 파싱된 데이터와 원본 이벤트 전달
    };

    // window.addEventListener('message', handleMessage);
    // return () => window.removeEventListener('message', handleMessage);
    document.addEventListener('message', handleMessage as EventListener);
    window.addEventListener('message', handleMessage);

    return () => {
      document.removeEventListener('message', handleMessage as EventListener);
      window.removeEventListener('message', handleMessage);
    };
  }, [callback]);
}
