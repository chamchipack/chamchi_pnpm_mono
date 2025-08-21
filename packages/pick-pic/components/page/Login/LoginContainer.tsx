'use client';

import { fetchLoginApi } from '@/api/client/auth';
import { handleNavigation, handleStorage } from '@/config/navigation';
import useReceiveWebviewMessage from '@/config/utils/hooks/useReceiveWebviewMessage';
import { UserInfoAtom } from '@/store/userStore/state';
import { SocialProviderEnum } from '@/types/enums/enums';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import AppleLogin from './socialLogin/AppleLogin';
import KakaoLogin from './socialLogin/KakaoLogin';

export default function LoginContainer() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    localStorage.removeItem('redirectAfterLogin');
  }, []);

  useReceiveWebviewMessage(async (data, event) => {
    // if (data?.provider === 'apple') return;
    setDisabled(true);

    try {
      const form = {
        socialId: data?.socialId,
        profile: data?.profile_image,
        fcmToken: data?.fcmToken || '',
        provider: data?.provider,
        isWebView: true,
      };
      const { data: APIData } = await fetchLoginApi(form);

      setUserInfo((prev) => ({
        ...prev,
        _id: APIData?._id || '',
        socialId: data.socialId || '',
        nickname: APIData?.nickname || '',
        profile_image: data.profile_image || '',
        provider: data?.provider || SocialProviderEnum.kakao,
        phoneNumber: APIData?.phoneNumber || '',
      }));

      const dataset = {
        multiple: true,
        data: [
          { key: '_id', name: APIData?._id || '' },
          { key: 'socialId', name: data.socialId || '' },
          { key: 'provider', name: data?.provider },
          { key: 'profile_image', name: data?.profile_image || '' },
          { key: 'nickname', name: APIData?.nickname || '' },
          { key: 'phoneNumber', name: APIData?.phoneNumber || '' },
        ],
      };

      handleStorage({ data: dataset });

      const isWebView = handleNavigation({
        path: 'home',
        status: 'replace',
      });

      if (!isWebView) router.push('/');
      setDisabled(false);
    } catch {
      setDisabled(false);
      // router.push('/error');
    }
  });

  return (
    <div className="flex flex-col items-center justify-center text-center flex-grow px-4 py-10">
      <div className="mb-4">
        <Image
          src="/logo/logo5_4x.png"
          alt="피크피크 로고"
          width={280}
          height={100}
          className="mb-8"
          priority
        />
        <p className="text-sm text-gray-600 text-center leading-relaxed">
          지금 로그인하고 <br />
          가장 즐거운 순간을 함께하세요 🍰
        </p>
      </div>

      <div className="mt-6 w-full max-w-[400px] flex flex-col items-center">
        <div className="flex flex-col items-center gap-3 w-full">
          <KakaoLogin disabled={disabled} />
          <AppleLogin disabled={disabled} />
        </div>
      </div>
    </div>
  );
}
