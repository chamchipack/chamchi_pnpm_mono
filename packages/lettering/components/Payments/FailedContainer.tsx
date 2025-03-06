'use client';

import { Box, Button, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';

export default function FailedContainer() {
  const router = useRouter();

  const handleRouter = () => {
    const isWebView = handleNavigation({
      path: 'order',
      status: 'replace',
    });

    if (!isWebView) {
      router.replace('/application/order');
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
      {/* 실패 아이콘 */}
      <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />

      {/* 주문 실패 메시지 */}
      <Typography variant="h5" fontWeight="bold">
        주문이 실패했습니다.
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: 'gray' }}>
        결제 과정에서 문제가 발생했습니다. 다시 시도해 주세요.
      </Typography>

      {/* 다시 시도하기 버튼 */}
      {/* <Button
        sx={{
          mt: 4,
          px: 4,
          py: 1,
          backgroundColor: 'error.main',
        }}
        onClick={() => router.reload()}
      >
        <Typography color={'white'} variant="subtitle1">
          다시 시도하기
        </Typography>
      </Button> */}

      {/* 홈으로 이동 버튼 */}
      <Button
        sx={{
          mt: 2,
          px: 4,
          py: 1,
          backgroundColor: 'common.main',
        }}
        onClick={handleRouter}
      >
        <Typography color={'white'} variant="subtitle1">
          이전으로 돌아가기
        </Typography>
      </Button>
    </Box>
  );
}
