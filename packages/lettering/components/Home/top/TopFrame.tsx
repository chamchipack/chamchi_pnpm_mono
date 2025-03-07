'use client';
import { Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleIcon from '@mui/icons-material/Circle';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';
import UserAddressButton from './address/UserAddressButton';

export default function TopFrame() {
  const router = useRouter(); // ✅ Next.js Router 사용

  const handleRouter = (path: string, forWebview: boolean) => {
    if (!forWebview) return router.push(`/application/${path}`);

    const isWebView = handleNavigation({
      path,
      status: 'forward',
    });

    if (!isWebView) return router.push(`/application/${path}`);
  };

  return (
    <Box
      sx={{
        ...flex,
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <Box
        sx={{ ...flex, '&:hover': { cursor: 'pointer' } }}
        onClick={() => handleRouter('address', false)}
      >
        <UserAddressButton />
      </Box>

      <Box
        sx={{
          position: 'relative',
          display: 'inline-block',
          cursor: 'pointer',
          padding: 0,
          width: 24, // ✅ 부모 Box의 크기 고정
          height: 24,
          overflow: 'hidden', // ✅ 내부 이미지가 넘칠 경우 숨김 처리
        }}
        onClick={() => handleRouter('notification', true)}
      >
        {/* ✅ alram.png 이미지 크기 조절 */}
        <Box
          component="img"
          src="/alram.png"
          alt="알람 아이콘"
          sx={{
            width: 48, // ✅ 이미지 크기는 48px
            height: 48,
            objectFit: 'contain',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // ✅ 부모 중앙 정렬
          }}
        />
        {/* ✅ 기존 CircleIcon 유지 */}
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
