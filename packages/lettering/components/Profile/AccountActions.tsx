'use client';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import ModalWrapper from '../common/modal/ModalWrapper';
import { useRecoilState } from 'recoil';
import { UserInfoAtom } from '@/store/userStore/state';
import { handleNavigation } from '@/config/navigation';
import { useRouter } from 'next/navigation';

export default function AccountActions() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const onClickLogout = async () => {
    try {
      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'LOGOUT',
          data: 'logout',
        }),
      );

      setUserInfo((prev) => ({
        ...prev,
        userId: '',
        nickname: '',
        profile_image: '',
      }));
      handleClose();

      const isWebView = handleNavigation({ path: 'mypage', status: 'forward' });

      if (!isWebView) router.push('/application/mypage');
    } catch (e) {
    } finally {
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          my: 10,
        }}
      >
        <Typography
          fontSize={14}
          sx={{ color: 'common.gray', cursor: 'pointer' }}
        >
          회원 탈퇴
        </Typography>
        <Typography
          fontSize={14}
          sx={{ color: 'common.gray', cursor: 'pointer' }}
          onClick={() => setOpen(true)}
        >
          로그아웃
        </Typography>
      </Box>

      <ModalWrapper
        open={open}
        handleClose={handleClose}
        onClickCheck={onClickLogout}
        title="로그아웃"
        content="로그아웃을 하시겠어요?"
        processing={false}
      ></ModalWrapper>
    </>
  );
}
