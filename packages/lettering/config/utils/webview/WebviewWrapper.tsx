import { Backdrop, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function WebviewWrapper({ children }: Props) {
  const [isWebView, setIsWebView] = useState<boolean | null>(false); // ✅ 초기 상태를 `null`로 설정
  const [isBackdropOpen, setIsBackdropOpen] = useState(true); // ✅ 백드롭 상태 추가

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase();
      setIsWebView(
        /wv|android.*version\/[\d.]+.*chrome\/[.\d]+ mobile/i.test(userAgent) ||
          (/iphone|ipod|ipad/i.test(userAgent) && !/safari/i.test(userAgent)),
      );
    }
  }, []);

  if (isWebView) return <>{children}</>;

  return (
    <>
      <Backdrop
        open={isBackdropOpen}
        sx={{
          zIndex: 1300,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography color="white" fontSize={18} fontWeight="bold">
          백드롭이 활성화되었습니다!
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => setIsBackdropOpen(false)}
        >
          닫기
        </Button>
      </Backdrop>

      {children}
    </>
  );
}
