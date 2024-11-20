'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { CircularProgress, Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import AuthComponent from '@/components/layout/Footer/AuthComponent';
import NeedAuthOverlay from 'package/src/Overlay/NeedAuthOverlay';

interface Props {
  children: React.ReactNode;
}

export default function ServerClientAdapter({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="secondary" />
        <Typography variant="h6" mt={2}>
          잠시만 기다려주세요!
        </Typography>
      </Box>
    );
  }

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return (
    <NeedAuthOverlay>
      <AuthComponent />
      <Typography variant="subtitle2" color="text.primary">
        아이콘을 눌러 로그인을 진행해보세요!
      </Typography>
      <Typography
        component="div"
        variant="caption"
        color="text.secondary"
        sx={{ cursor: 'pointer', my: 4 }}
        onClick={() => router.back()}
      >
        여기를 눌러 이전페이지로 돌아가기
      </Typography>
    </NeedAuthOverlay>
  );
}
