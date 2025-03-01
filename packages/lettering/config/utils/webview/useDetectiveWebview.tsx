import { useEffect, useState } from 'react';

export default function useDetectiveWebview() {
  const [isWebView, setIsWebView] = useState<boolean | null>(false); // ✅ 초기 상태를 `null`로 설정
  const [isBackdropOpen, setIsBackdropOpen] = useState(true); // ✅ 백드롭 상태 추가

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase();
      setIsWebView(
        /wv|android.*version\/[\d.]+.*chrome\/[.\d]+ mobile/i.test(userAgent) ||
          (/iphone|ipod|ipad/i.test(userAgent) && !/safari/i.test(userAgent)),
      );
    }
  }, []);

  return isWebView;
}
