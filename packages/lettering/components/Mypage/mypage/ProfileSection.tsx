'use client';

import { handleNavigation } from '@/config/navigation';
import { NickNameAtom } from '@/store/userStore/state';
import { useUserStore } from '@/store/userStore/store';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function ProfileSection() {
  const router = useRouter();
  const { nickname } = useUserStore();
  const recoilNickname = useRecoilValue(NickNameAtom);

  const [clientNickname, setClientNickname] = useState<string | null>(null);

  useEffect(() => {
    setClientNickname(recoilNickname); // ✅ 클라이언트에서 Recoil 값 업데이트
  }, [recoilNickname]);

  const handleRouter = () => {
    let path = `/application/profile?id=${'query'}`;
    const isWebView = handleNavigation({ path: 'profile', status: 'forward' });

    if (!isWebView) return router.push(path);
  };

  const cachedNickname = useMemo(
    () => clientNickname ?? '로딩 중...',
    [clientNickname],
  );

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
      <Box>
        <Typography fontSize={16} fontWeight="bold">
          {cachedNickname}
        </Typography>
        <Typography
          fontSize={14}
          sx={{ color: 'common.gray' }}
          onClick={handleRouter}
        >
          자세히 보기
        </Typography>
      </Box>
    </Box>
  );
}
