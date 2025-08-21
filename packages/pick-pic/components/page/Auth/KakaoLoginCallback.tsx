'use client';

import { fetchKakaoAuthClient, fetchLoginApi } from '@/api/client/auth';
import { setLocationCookie } from '@/config/utils/global';
import { UserInfoAtom } from '@/store/userStore/state';
import { SocialProviderEnum } from '@/types/enums/enums';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

const KakaoLoginCallback = ({ code = '' }) => {
  const hasFetched = useRef(false); // ✅ fetch 중복 방지용 useRef
  const router = useRouter();
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

        const data = await fetchKakaoAuthClient(code);
        const { user: { id = 0, kakao_account = {} } = {} } = data;

        const { data: APIData } = await fetchLoginApi({
          socialId: id.toString(),
          provider: SocialProviderEnum.kakao,
          fcmToken: data?.fcmToken || '',
          profile: kakao_account?.profile?.profile_image_url,
          isWebView: false,
        });

        setLocationCookie(userInfo?.latitude, userInfo?.longitude);

        setUserInfo((prev) => ({
          ...prev,
          _id: APIData?._id || '',
          socialId: id.toString() || '',
          nickname: APIData?.nickname || kakao_account?.profile?.nickname || '',
          profile_image:
            APIData?.profile_image ||
            kakao_account?.profile?.profile_image_url ||
            '',
          provider: SocialProviderEnum.kakao,
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

    fetchAuthData();
  }, [router, navigateToError]);

  return null;
};

export default React.memo(KakaoLoginCallback);
