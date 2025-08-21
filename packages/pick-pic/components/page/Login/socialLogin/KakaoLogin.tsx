'use client';

import { handleLogin } from '@/config/navigation';
import { SocialProviderEnum } from '@/types/enums/enums';
import Image from 'next/image';

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;

interface Props {
  disabled: boolean;
}

export default function KakaoLogin({ disabled }: Props) {
  const onClickLogin = () => {
    if (disabled) return;
    const isWebview = handleLogin({
      type: 'LOGIN',
      data: SocialProviderEnum.kakao,
    });

    if (!isWebview) webLogin();
  };

  const webLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.replace(KAKAO_AUTH_URL);
  };

  return (
    <Image
      src="/login/kakao_login_large_wide.png"
      alt="kakao_login_large_wide"
      width={300}
      height={80}
      className="mb-1 rounded-3xl "
      onClick={onClickLogin}
      priority
    />
  );
}
