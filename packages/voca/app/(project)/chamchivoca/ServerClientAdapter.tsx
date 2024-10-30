'use client';
import { darkModeState } from '@/config/stylemode';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  children: React.ReactNode;
}

// 서버컴포넌트에서 글 수정 컴포넌트인지 확인
export default function ServerClientAdapter({ children }: Props) {
  const [darkmode, setDarkmode] = useRecoilState(darkModeState);

  if (darkmode)
    return <body style={{ background: '#3b3b3b' }}>{children}</body>;
  else return <>{children}</>;
}
