'use client';
import { handleNavigation } from '@/config/navigation';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Props {
  isButtonVisable: boolean;
  title: string;
  isRoutingReplace?: boolean;
  path?: string;
}

export default function HeadComponent({
  isButtonVisable = false,
  title = '',
  isRoutingReplace = false,
  path = '',
}: Props) {
  const router = useRouter(); // ✅ Next.js Router 사용

  const handleRouter = () => {
    if (!isButtonVisable) return;

    const isWebView = handleNavigation({
      path: isRoutingReplace ? path : '',
      status: isRoutingReplace ? 'replace' : 'back',
    });

    if (!isWebView) {
      isRoutingReplace ? router.push(`/application/${path}`) : router.back();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // ✅ 기본적으로 가운데 정렬
        height: 50,
        position: 'relative', // ✅ 아이콘과 타이포 위치 조정
      }}
    >
      {isButtonVisable && (
        <IconButton
          onClick={handleRouter}
          sx={{ position: 'absolute', left: 0 }} // ✅ 왼쪽 고정
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      )}

      <Typography fontSize={16} fontWeight={900}>
        {title}
      </Typography>
    </Box>
  );
}
