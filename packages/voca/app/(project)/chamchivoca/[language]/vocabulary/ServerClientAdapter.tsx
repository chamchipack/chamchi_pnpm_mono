'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

// 서버컴포넌트에서 글 수정 컴포넌트인지 확인
export default function ServerClientAdapter({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const { data } = useSession();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading && !data) return <div>잠시만 기다려주세요!</div>;

  if (data) return <div>{children}</div>;
  else return <div>로그인이 필요한 서비스에요!</div>;
}
