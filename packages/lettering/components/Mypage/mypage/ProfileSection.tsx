'use client';

import { handleNavigation } from '@/config/navigation';
import { UserInfoAtom } from '@/store/userStore/state';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type User = {
  userId: string;
  nickname: string;
};

export default function ProfileSection() {
  const router = useRouter();
  const recoilUserInfo = useRecoilValue(UserInfoAtom);

  const [loading, setLoading] = useState<'loading' | 'done'>('loading');
  const [nickname, setNickname] = useState<User>({ userId: '', nickname: '' });

  useEffect(() => {
    if (recoilUserInfo.nickname) {
      setNickname({
        nickname: recoilUserInfo.nickname,
        userId: recoilUserInfo.userId,
      });
    }
    setLoading('done');
  }, [recoilUserInfo]);

  const handleRouter = (path: string) => {
    if (!path) return;
    const isWebView = handleNavigation({ path, status: 'forward' });
    if (!isWebView) router.push(`/application/${path}`);
  };

  const textConfig = useMemo(() => {
    if (loading === 'loading') {
      return {
        text: '잠시만 기다려주세요..',
        fontWeight: 'normal',
        color: 'gray',
        size: 12,
      };
    }
    return nickname?.nickname
      ? {
          text: nickname?.nickname,
          fontWeight: 'bold',
          color: 'black',
          size: 16,
        }
      : {
          text: '로그인하고 시작하기!',
          fontWeight: 'normal',
          color: 'gray',
          size: 16,
        };
  }, [loading, nickname]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        component="img"
        src="/user.png"
        alt="User Profile"
        sx={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={flexBox}
        onClick={() => handleRouter(nickname.userId ? 'profile' : 'login')}
      >
        <Typography
          fontSize={textConfig.size}
          fontWeight={textConfig.fontWeight}
          color={textConfig.color}
        >
          {textConfig.text}
        </Typography>
        <ArrowForwardIosIcon sx={{ fontSize: 16, color: 'common.gray' }} />
      </Box>
    </Box>
  );
}

const flexBox = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};
