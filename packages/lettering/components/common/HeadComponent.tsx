'use client';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';

interface Props {
  isButtonVisable: boolean;
  title: string;
}

export default function HeadComponent({
  isButtonVisable = false,
  title = '',
}: Props) {
  const router = useRouter(); // ✅ Next.js Router 사용

  const handleRouter = () => {
    if (!isButtonVisable) return;

    const isWebView = handleNavigation({ path: '', status: 'back' });

    if (!isWebView) return router.back();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // ✅ 좌/중앙/우 정렬
        height: 50, // ✅ 적절한 높이 설정
      }}
    >
      {/* 왼쪽: 뒤로가기 아이콘 */}
      <IconButton onClick={handleRouter}>
        {isButtonVisable && <ArrowBackIosNewIcon fontSize="small" />}
      </IconButton>

      {/* 중앙: 제목 */}
      <Typography fontSize={16} fontWeight={900}>
        {title}
      </Typography>

      {/* 오른쪽: 빈 공간 */}
      <Box sx={{ width: 40 }} />
    </Box>
  );
}
