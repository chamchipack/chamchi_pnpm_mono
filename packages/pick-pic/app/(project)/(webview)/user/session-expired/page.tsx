'use client';
import { fetchKakaoLogout } from '@/api/client/auth';
import BackDrop from '@/components/common/backdrop/BackDrop';
import { useSmartNavigation } from '@/config/navigation';
import { UserInfoAtom } from '@/store/userStore/state';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function PaymentSuccess() {
  const router = useRouter();
  const hasFetched = useRef(false);

  const smartNavigate = useSmartNavigation();

  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
  const [isGranted, setIsGranted] = useState(true);

  const onClickLogout = async () => {
    sessionStorage.removeItem('session_to_expire');
    try {
      await fetchKakaoLogout();

      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'LOGOUT',
          data: 'logout',
        }),
      );

      setUserInfo((prev) => ({
        ...prev,
        _id: '',
        socialId: '',
        nickname: '',
        profile_image: '',
        provider: '',
        phoneNumber: '',
      }));

      setTimeout(() => {
        smartNavigate({ path: 'home', status: 'replace' });
      }, 1000);
    } catch (e) {}
  };

  useEffect(() => {
    if (hasFetched.current) return; // ✅ 이미 fetch 요청이 실행되었으면 종료
    hasFetched.current = true; // ✅ 첫 실행 이후 true로 변경

    const userAgent = navigator.userAgent.toLowerCase();

    const isWebViewBoole =
      /wv|android.*version\/[\d.]+.*chrome\/[.\d]+ mobile/i.test(userAgent) ||
      (/iphone|ipod|ipad/i.test(userAgent) && !/safari/i.test(userAgent));

    const result = sessionStorage.getItem('session_to_expire');
    if (result === 'granted' || isWebViewBoole) onClickLogout();
    else smartNavigate({ path: 'home', status: 'replace' });
  }, []);

  return <BackDrop />;
}
