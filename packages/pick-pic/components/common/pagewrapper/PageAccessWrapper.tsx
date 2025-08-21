'use client';

import ErrorPage from '@/components/page/Error/ErrorPage';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
  name: string;
}

export default function PageAccessWrapper({ children, name }: Props) {
  const hasFetched = useRef(false);
  const [route, setRoute] = useState(true);

  useEffect(() => {
    if (hasFetched.current) return; // ✅ 이미 fetch 요청이 실행되었으면 종료
    hasFetched.current = true; // ✅ 첫 실행 이후 true로 변경

    const userAgent = navigator.userAgent.toLowerCase();
    const allow = sessionStorage.getItem(`access_to_${name}`);

    const isWebViewBoole =
      /wv|android.*version\/[\d.]+.*chrome\/[.\d]+ mobile/i.test(userAgent) ||
      (/iphone|ipod|ipad/i.test(userAgent) && !/safari/i.test(userAgent));

    if (isWebViewBoole) return;
    else {
      if (allow !== 'granted') setRoute(false);
    }

    sessionStorage.removeItem(`access_to_${name}`);
  }, []);

  if (!route) return <ErrorPage title="비정상적 접근입니다." />;
  return <>{children}</>;
}
