'use client';

import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';

interface Props {
  title?: string;
}

const ErrorPage = ({ title }: Props) => {
  const router = useRouter();

  const handleRouter = () => {
    const isWebView = handleNavigation({ path: 'home', status: 'forward' });
    if (!isWebView) return router.push('/application/home');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: '#F39E9E' }} />
      <Typography
        variant="h4"
        sx={{ mt: 2, color: '#F39E9E', fontWeight: 'bold' }}
      >
        {title ?? '잘못된 접근입니다'}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: 'gray' }}>
        요청하신 페이지를 확인할 수 없습니다.
      </Typography>

      {/* ✅ 홈으로 이동하는 버튼 추가 */}
      <Box
        sx={{
          mt: 3,
          backgroundColor: '#F39E9E',
          '&:hover': { backgroundColor: '#e08585' },
          p: 2,
          borderRadius: 3,
        }}
        onClick={handleRouter}
      >
        <Typography color="common.white" fontWeight={'bold'}>
          홈으로 이동
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorPage;
