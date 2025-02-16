'use client';
import { Box, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';

export default function TopFrame() {
  const router = useRouter(); // ✅ Next.js Router 사용

  const handleRouter = () => {
    let path = '/application/notification';
    const isWebView = handleNavigation({
      path: 'notification',
      status: 'forward',
    });

    if (!isWebView) return router.push(path);
  };

  return (
    <Box
      sx={{
        ...flex,
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      {/* 지역 선택 */}
      <Box sx={{ ...flex }}>
        <Typography variant="h6" fontWeight={600} fontSize={14}>
          경기도 수원시
        </Typography>
        <ArrowDropDownIcon sx={{ fontSize: 24, color: 'common.black' }} />
      </Box>

      {/* 알림 아이콘 */}
      <Box
        sx={{
          position: 'relative',
          display: 'inline-block',
        }}
        onClick={handleRouter} // ✅ 클릭 시 이동
      >
        <NotificationsIcon
          sx={{
            fontSize: 24,
            color: 'common.black',
            cursor: 'pointer', // ✅ 커서 스타일 변경
          }}
        />
        {/* 빨간 알림 표시 */}
        <CircleIcon
          sx={{
            fontSize: 10,
            color: 'red',
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        />
      </Box>
    </Box>
  );
}

const flex = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};
