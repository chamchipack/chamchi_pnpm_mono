'use client';
import { handleNavigation } from '@/config/navigation';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  title: string;
  onChange: () => void;
  isRoutingReplace?: boolean;
  path?: string;
}

export default function HeadComponent({
  title = '',
  onChange,
  isRoutingReplace = false,
  path = '',
}: Props) {
  const router = useRouter(); // ✅ Next.js Router 사용

  const handleRouter = () => {
    const isWebView = handleNavigation({
      path: isRoutingReplace ? path : '',
      status: isRoutingReplace ? 'replace' : 'back',
    });

    // const isWebView = handleNavigation({ path: '', status: 'back' });

    if (!isWebView) {
      isRoutingReplace ? router.push(`/application/${path}`) : router.back();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // ✅ 기본적으로 가운데 정렬
        height: 50,
      }}
    >
      <IconButton onClick={handleRouter}>
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      <Typography fontSize={16} fontWeight={900}>
        {title}
      </Typography>

      <IconButton onClick={onChange}>
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
