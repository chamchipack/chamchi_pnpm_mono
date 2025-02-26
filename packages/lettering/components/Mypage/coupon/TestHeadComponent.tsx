'use client';

import { handleNavigation } from '@/config/navigation';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import SettingsIcon from '@mui/icons-material/Settings';
import { ReactNode } from 'react';

interface Props {
  isLeftButtonVisable?: boolean;
  title: string;
  isRoutingReplace?: boolean;
  path?: string;
  isRightButtonVisable?: boolean;
  rightButtonIcon?: ReactNode; // ✅ 아이콘을 prop으로 받음
  onRightButtonClick?: () => void; // ✅ 우측 버튼 클릭 핸들러
}

export default function HeadComponent({
  isLeftButtonVisable = false,
  title = '',
  isRoutingReplace = false,
  path = '',
  isRightButtonVisable = false,
  rightButtonIcon = <SettingsIcon fontSize="small" />, // 기본값
  onRightButtonClick,
}: Props) {
  const router = useRouter(); // ✅ Next.js Router 사용

  const handleRouter = () => {
    if (!isLeftButtonVisable) return;

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
        justifyContent: 'space-between', // ✅ 좌, 중, 우 정렬
        height: 50,
        position: 'relative',
      }}
    >
      {/* 좌측 버튼 (뒤로 가기) */}
      <Box sx={{ width: 40 }}>
        {isLeftButtonVisable && (
          <IconButton onClick={handleRouter}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* 중앙 타이틀 */}
      <Typography
        fontSize={16}
        fontWeight={900}
        sx={{ flex: 1, textAlign: 'center' }}
      >
        {title}
      </Typography>

      {/* 우측 버튼 (커스텀 아이콘) */}
      <Box sx={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>
        {isRightButtonVisable && (
          <IconButton onClick={onRightButtonClick}>
            {rightButtonIcon}
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
