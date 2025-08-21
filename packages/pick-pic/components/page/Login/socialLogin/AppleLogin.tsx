'use client';

import { handleLogin } from '@/config/navigation';
import { SocialProviderEnum } from '@/types/enums/enums';
import Image from 'next/image';

interface Props {
  disabled: boolean;
}

export default function AppleLogin({ disabled }: Props) {
  const onClickLogin = () => {
    if (disabled) return;
    const isWebview = handleLogin({
      type: 'LOGIN',
      data: SocialProviderEnum.apple,
    });

    if (!isWebview) webLogin();
  };

  const webLogin = () => {
    const params = new URLSearchParams({
      response_type: 'code id_token',
      response_mode: 'form_post',
      client_id: 'co.kr.pickpic',
      redirect_uri: 'https://pick-pic.co.kr/api/auth/apple',
      scope: 'name email',
      state: 'csrf_token_sample', // 실제 구현 시 무작위 토큰
    });

    const APPLE_AUTH_URL = `https://appleid.apple.com/auth/authorize?${params}`;
    window.location.href = APPLE_AUTH_URL;
  };

  return (
    <Image
      src="/login/appleid_button_black.png"
      alt="appleid_button"
      width={300}
      height={40}
      className="mb-2 rounded-3xl"
      onClick={onClickLogin}
      priority
    />
  );
}
