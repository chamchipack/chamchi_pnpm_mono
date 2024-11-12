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
    return null;
  }

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return null;
}
