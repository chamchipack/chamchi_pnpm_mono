'use client';
import { Box, Typography } from '@mui/material';
import KakaoLogin from './socialLogin/KakaoLogin';
import AppleLogin from './socialLogin/AppleLogin';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UserInfoAtom } from '@/store/userStore/state';
import { handleLogin, handleNavigation } from '@/config/navigation';
import { useRouter } from 'next/navigation';
import useReceiveWebviewMessage from '@/config/utils/hooks/useReceiveWebviewMessage';

type ReturnType = 'webview' | 'web' | 'failed';

export default function LoginContainer() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
  const onClickButton = (type: 'kakao' | 'apple'): ReturnType => {
    if (type === 'apple') return 'failed';

    const isWebview = handleLogin({ type: 'LOGIN', data: type });

    return isWebview ? 'webview' : 'web';
  };

  useReceiveWebviewMessage((data, event) => {
    try {
      setUserInfo((prev) => ({
        ...prev,
        userId: data.userId || '',
        nickname: data.nickname || '',
        profile_image: data.profile_image || '',
        provider: data?.provider || '',
      }));
      const isWebView = handleNavigation({
        path: 'mypage',
        status: 'forward',
      });

      if (!isWebView) router.push('/application/mypage');
    } catch {}
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // ✅ 세로 중앙 정렬
        alignItems: 'center', // ✅ 가로 중앙 정렬
        textAlign: 'center', // ✅ 텍스트 중앙 정렬
        flexGrow: 1, // ✅ 부모 컨테이너 내에서 가득 차게
      }}
    >
      <Box sx={{ my: 3 }}>
        <Typography>간편하게 소셜로그인을 이용해보세요!</Typography>
      </Box>

      <Box sx={{ my: 3, px: 4, width: '100%', maxWidth: 400 }}>
        <KakaoLogin onClickButton={onClickButton} />
      </Box>

      <Box sx={{ my: 1, px: 4, width: '100%', maxWidth: 400 }}>
        <AppleLogin onClickButton={onClickButton} />
      </Box>
    </Box>
  );
}
