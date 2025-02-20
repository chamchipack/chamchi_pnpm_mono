'use client';
import { Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleIcon from '@mui/icons-material/Circle';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';
import UserAddressButton from './address/UserAddressButton';

export default function TopFrame() {
  const router = useRouter(); // ✅ Next.js Router 사용

  const handleRouter = (path: string) => {
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
      <Box sx={{ ...flex }} onClick={() => handleRouter('address')}>
        <UserAddressButton />
      </Box>

      <Box
        sx={{
          position: 'relative',
          display: 'inline-block',
        }}
        onClick={() => handleRouter('notification')}
      >
        <NotificationsIcon
          sx={{
            fontSize: 24,
            color: 'common.black',
            cursor: 'pointer',
          }}
        />
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
