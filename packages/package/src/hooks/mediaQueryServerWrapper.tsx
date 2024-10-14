'use client';
import { Skeleton } from '@mui/material';
import { useClientSize } from 'package/src/hooks/useMediaQuery';

interface Props {
  children: React.ReactNode;
  width: number;
  height: number;
}

// 서버컴포넌트 mobile 확인 감싸기
export default function MediaQueryServerWrapper({
  children,
  width,
  height,
}: Props) {
  const mobile = useClientSize('sm');

  if (!mobile)
    return <Skeleton sx={{ width: width || 100, height: height || 40 }} />;
  else return <>{children}</>;
}
