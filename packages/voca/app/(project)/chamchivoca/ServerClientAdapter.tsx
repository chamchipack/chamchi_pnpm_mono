'use client';
import { darkModeState } from '@/config/stylemode';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

interface Props {
  children: React.ReactNode;
}

// 서버컴포넌트에서 글 수정 컴포넌트인지 확인
export default function ServerClientAdapter({ children }: Props) {
  const darkmode = useRecoilValue(darkModeState);

  useEffect(() => {
    document.body.style.background = darkmode ? '#3b3b3b' : '#ffffff';
  }, [darkmode]);

  return <>{children}</>;
}
