'use client';

import { fetchLoginApi } from '@/api/client/auth';
import { setLocationCookie } from '@/config/utils/global';
import { UserInfoAtom } from '@/store/userStore/state';
import { SocialProviderEnum } from '@/types/enums/enums';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  email: string;
}

export default function Container({ email }: Props) {
  const router = useRouter();
  const hasFetched = useRef(false); // ✅ fetch 중복 방지용 useRef
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);

  const navigateToError = useCallback(() => {
    router.push('/error');
  }, [router]);

  useEffect(() => {
    if (hasFetched.current) return; // ✅ 이미 fetch 요청이 실행되었으면 종료
    hasFetched.current = true; // ✅ 첫 실행 이후 true로 변경

    const fetchAuthData = async () => {
      try {
        // const params = new URLSearchParams(window.location.search);

        const { data: APIData } = await fetchLoginApi({
          socialId: email,
          provider: SocialProviderEnum.apple,
          fcmToken: '',
          profile: '',
          isWebView: false,
        });

        setLocationCookie(userInfo?.latitude, userInfo?.longitude);

        setUserInfo((prev) => ({
          ...prev,
          _id: APIData?._id || '',
          socialId: email || '',
          nickname: APIData?.nickname || '닉네임',
          profile_image: APIData?.profile_image || '',
          provider: SocialProviderEnum.apple,
          phoneNumber: APIData?.phoneNumber || '',
        }));

        const redirectPath =
          localStorage.getItem('redirectAfterLogin') || '/user';
        localStorage.removeItem('redirectAfterLogin');

        router.replace(redirectPath);
      } catch (e) {
        console.error('인증 처리 중 오류 발생:', e);
        navigateToError();
      }
    };

    if (email) fetchAuthData();
  }, [router, navigateToError]);

  return null;
}
