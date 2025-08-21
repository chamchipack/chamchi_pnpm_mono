'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    daum: any;
  }
}

export default function AddressSearchPage() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { daum } = window;
    if (!daum || !wrapRef.current) return;

    new daum.Postcode({
      oncomplete: function (data: any) {
        const fullAddress = data.address;
        // ✅ React Native WebView 연동 시
        // window.ReactNativeWebView?.postMessage(fullAddress);

        // ✅ 일반 웹 브라우저용
        // window.parent.postMessage(fullAddress, '*');
      },
      // ✅ 팝업 대신 여기 직접 렌더링
      width: '100%',
      height: '100%',
    }).embed(wrapRef.current);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ width: '100%', height: '100vh' }}
      className="bg-white"
    />
  );
}
