'use client';

import { fetchLoginApi } from '@/api/client/auth';
import AppleLogin from '@/components/page/Login/socialLogin/AppleLogin';
import KakaoLogin from '@/components/page/Login/socialLogin/KakaoLogin';
import { handleStorage } from '@/config/navigation';
import useReceiveWebviewMessage from '@/config/utils/hooks/useReceiveWebviewMessage';
import { UserInfoAtom } from '@/store/userStore/state';
import { SocialProviderEnum } from '@/types/enums/enums';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AlertLoginCallback = ({ open, onClose }: Props) => {
  if (!open) return null;

  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
  const [disabled, setDisabled] = useState(false);

  useReceiveWebviewMessage(async (data, event) => {
    if (!data) return onClose();
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

      setTimeout(() => {
        onClose();
        router.refresh();
      }, 1000);
      setDisabled(false);
    } catch {
      onClose();
      setDisabled(false);
      // router.push('/error');
    }
  });

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="relative w-full max-w-[380px] bg-white rounded-xl shadow-2xl border border-gray-200 px-4 py-8 flex flex-col items-center">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          >
            <X size={20} />
          </button>

          {/* 아이콘 or 장식 원 */}
          <img
            rel="preload"
            src="/logo/logo4_4x.png"
            alt="앱 미리보기"
            className="h-20 object-cover rounded mb-4 mx-auto"
          />

          {/* 제목 */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">로그인</h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            로그인하고 다양한 서비스를 이용해보세요!
          </p>

          {/* 카카오 로그인 버튼 */}
          <div className="w-full flex flex-col items-center gap-2">
            <KakaoLogin disabled={disabled} />
            <AppleLogin disabled={disabled} />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(AlertLoginCallback);
