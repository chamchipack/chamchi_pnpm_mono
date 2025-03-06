'use client';

import { Box, Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';

export default function SuccessContainer() {
  const router = useRouter();

  const handleRouter = () => {
    const isWebView = handleNavigation({
      path: 'home',
      status: 'replace',
    });

    if (!isWebView) {
      router.replace(`/application/home`);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      {/* 성공 아이콘 */}
      <CheckCircleIcon sx={{ fontSize: 80, color: 'common.main', mb: 2 }} />

      {/* 결제 성공 메시지 */}
      <Typography variant="h5" fontWeight="bold">
        결제가 성공적으로 완료되었습니다!
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: 'gray' }}>
        주문이 정상적으로 처리되었습니다.
      </Typography>

      {/* 홈으로 이동 버튼 */}
      <Button
        sx={{
          mt: 4,
          px: 4,
          py: 1,
          backgroundColor: 'common.main',
        }}
        onClick={handleRouter}
      >
        <Typography color={'white'} variant="subtitle1">
          홈으로 이동
        </Typography>
      </Button>
    </Box>
  );
}
