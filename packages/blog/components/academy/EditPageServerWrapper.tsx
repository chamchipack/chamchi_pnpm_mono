'use client';
import { Box, Skeleton } from '@mui/material';
import { useRecoilValue } from 'recoil';
import isEditPageon from './state';

interface Props {
  children: React.ReactNode;
}

// 서버컴포넌트 mobile 확인 감싸기
export default function EditPageServerWrapper({ children }: Props) {
  const isEditPage = useRecoilValue(isEditPageon);

  if (isEditPage) return <Box />;
  else return <>{children}</>;
}
