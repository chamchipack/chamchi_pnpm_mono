'use client';
import { isBackdropVisable } from '@/store/otherStore/backdrop/homeBackdrop';
import { Backdrop, Button, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  children: React.ReactNode;
}

export default function WebviewWrapper({ children }: Props) {
  const [isWebView, setIsWebView] = useState<boolean | null>(false); // ✅ 초기 상태를 `null`로 설정
  const [isBackdropOpen, setIsBackdropOpen] = useState(true); // ✅ 백드롭 상태 추가
  const [useBackdrop, setUseBackdrop] = useRecoilState(isBackdropVisable);
  const [backdropState, setBackdropState] = useState(false);

  const onClickClose = () => {
    setIsBackdropOpen(false);
    setUseBackdrop(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase();
      setIsWebView(
        /wv|android.*version\/[\d.]+.*chrome\/[.\d]+ mobile/i.test(userAgent) ||
          (/iphone|ipod|ipad/i.test(userAgent) && !/safari/i.test(userAgent)),
      );
    }
    setBackdropState(useBackdrop ? true : false);
  }, []);

  if (isWebView) return <>{children}</>;

  if (!backdropState) return <>{children}</>;

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
        <Typography
          color="white"
          fontSize={18}
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          더 나은 경험을 위해 앱을 다운로드하세요!
        </Typography>

        {/* ✅ 앱 다운로드 버튼 (border: white, 배경 없음) */}
        <Box
          sx={{
            width: '80%',
            maxWidth: 300,
            padding: 2,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Button
            variant="outlined" // ✅ 테두리 스타일 적용
            fullWidth
            sx={{
              height: 50,
              color: 'white', // ✅ 텍스트 색상 흰색
              fontWeight: 'bold',
              borderColor: 'white', // ✅ 테두리 흰색
              ':hover': { borderColor: 'gray', backgroundColor: 'transparent' }, // ✅ hover 시에도 배경 없음
            }}
            onClick={() => {
              window.location.href = 'https://your-app-download-link.com'; // ✅ 앱 다운로드 링크 추가
            }}
          >
            <Typography sx={{ color: 'white', fontSize: 16 }}>
              앱 다운로드 받기
            </Typography>
          </Button>
        </Box>

        {/* ✅ 백드롭 닫기 버튼 */}
        <Button
          variant="text"
          sx={{ mt: 2, color: 'white', fontWeight: 'bold', fontSize: 12 }}
          onClick={onClickClose}
        >
          괜찮아요. 웹으로 볼게요
        </Button>
      </Backdrop>

      {children}
    </>
  );
}
