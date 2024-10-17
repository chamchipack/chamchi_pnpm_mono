'use client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, IconButton, Modal } from '@mui/material';
import { useSession } from 'next-auth/react';
import ModalWrapper from 'package/src/Modal/ModalWrapper';
import { useState } from 'react';
import Signin from './auth/Signin';
import UserInfo from './auth/UserInfo';

const AuthComponent = () => {
  const { data } = useSession();
  const [modal, setModal] = useState(false);
  return (
    <>
      <IconButton color="inherit" onClick={() => setModal(true)}>
        <AccountCircleIcon
          sx={{ color: data?.user?.id ? 'info.main' : 'text.disabled' }}
        />
      </IconButton>

      <ModalWrapper
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: data ? '20vh' : '50vh', // 모달 창의 고정 높이 설정 (뷰포트의 70%)
            bgcolor: 'background.default',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflowY: 'auto', // 콘텐츠가 넘칠 경우 스크롤
          }}
        >
          {!data ? (
            <Signin setModal={setModal} />
          ) : (
            <UserInfo setModal={setModal} />
          )}
        </Box>
      </ModalWrapper>
    </>
  );
};

export default AuthComponent;
