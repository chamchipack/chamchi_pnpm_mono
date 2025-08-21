'use client';
import { fetchLoginApi } from '@/api/client/auth';
import { handleLogin, handleStorage } from '@/config/navigation';
import useReceiveWebviewMessage from '@/config/utils/hooks/useReceiveWebviewMessage';
import { UserInfoAtom } from '@/store/userStore/state';
import { SocialProviderEnum } from '@/types/enums/enums';
import Image from 'next/image';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

type Provider = SocialProviderEnum.apple | SocialProviderEnum.kakao;

export default function Container() {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);

  const initiateSignin = (provider: Provider | 'none') => {
    if (!disabled) return;

    if (provider === 'none')
      return (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'INITIALIZE_SIGNIN',
          data: 'success',
        }),
      );

    handleLogin({
      type: 'LOGIN',
      data: provider,
    });
  };

  useReceiveWebviewMessage(async (data, event) => {
    try {
      const form = {
        socialId: data?.socialId,
        profile: data?.profile_image,
        fcmToken: data?.fcmToken || '',
        provider: data?.provider,
        isMarketingAlarm: data?.isMarketingAlarm === 'true' ? true : false,
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
        isMarketingAlarm: data?.isMarketingAlarm === 'true' ? true : false,
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

      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'INITIALIZE_SIGNIN',
          data: 'success',
        }),
      );

      setDisabled(false);
    } catch {
      setDisabled(false);
    }
  });
  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-10 bg-gradient-to-b from-yellow-30 to-white">
      {/* 상단 로고 + 환영 메시지 */}
      <div className="flex flex-col items-center animate-fade-in mt-10">
        <Image
          src="/logo/logo5_4x.png"
          alt="피크피크 로고"
          width={280}
          height={100}
          className="mb-8"
          priority
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">
          피크피크에 오신 걸 환영해요!
        </h1>
        <p className="text-sm text-gray-600 text-center leading-relaxed">
          지금 로그인하고 <br />
          가장 맛있는 순간을 함께하세요 🍰
        </p>
      </div>

      {/* 로그인 버튼들 */}
      <div className="w-full max-w-sm space-y-4 mt-8">
        <div className="flex justify-center">
          <Image
            src="/login/kakao_login_large_wide.png"
            alt="kakao_login_large_wide"
            width={300}
            height={80}
            className="mb-1 rounded-3xl "
            onClick={() => initiateSignin(SocialProviderEnum.kakao)}
            priority
          />
        </div>
        <div className="flex justify-center">
          <Image
            src="/login/appleid_button_black.png"
            alt="appleid_button"
            width={300}
            height={40}
            className="mb-2 rounded-3xl"
            onClick={() => initiateSignin(SocialProviderEnum.apple)}
            priority
          />
        </div>
        {/* 로그인 안 하고 시작하기 */}
        <div className="text-center mt-2">
          <button
            className="text-sm text-gray-500 underline hover:text-gray-700 transition"
            onClick={() => initiateSignin('none')}
          >
            로그인 안 하고 둘러볼게요
          </button>
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="text-center text-xs text-gray-400 mt-auto pt-12">
        {/* 로그인 시 <span className="underline">서비스 이용약관</span> 및{' '}
        <span className="underline">개인정보 처리방침</span>에 동의한 것으로
        간주됩니다. */}
      </div>
    </div>
  );
}
