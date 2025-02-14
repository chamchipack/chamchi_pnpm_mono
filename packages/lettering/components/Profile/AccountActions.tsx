'use client';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import ModalWrapper from '../common/modal/ModalWrapper';

export default function AccountActions() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

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
        onClickCheck={() => {}}
        title="로그아웃"
        content="로그아웃을 하시겠어요?"
        processing={false}
      ></ModalWrapper>
    </>
  );
}
