'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';
import { handleNavigation } from '@/config/navigation';

const NAV_ITEMS = [
  { label: '메인', icon: <HomeIcon />, key: 'Home', path: '/application/home' },
  {
    label: '검색',
    icon: <SearchIcon />,
    key: 'search',
    path: '/application/search',
  },
  {
    label: '주변',
    icon: <LocationOnIcon />,
    key: 'location',
    path: '/application/location',
  },
  {
    label: '주문내역',
    icon: <ReceiptLongIcon />,
    key: 'order-list',
    path: '/application/order-list',
  },
  {
    label: '마이페이지',
    icon: <PersonIcon />,
    key: 'mypage',
    path: '/application/mypage',
  },
];

export default function NavigationBar() {
  const pathname = usePathname(); // 현재 경로 가져오기
  const router = useRouter(); // Next.js 라우터

  const SHOW_PAGES = NAV_ITEMS.map((item) => item.path);
  if (!SHOW_PAGES.includes(pathname)) return null; // 특정 페이지에서만 표시

  const handleRouter = (path: string) => {
    const isWebView = handleNavigation({ path, status: 'forward' });

    if (!isWebView) return router.push(path);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        px: 4,
        pb: 4,
        pt: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        height: 88,
        backgroundColor: 'white',
        boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Box
            key={item.key}
            onClick={() => handleRouter(item.key)} // ✅ 클릭 시 페이지 이동
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              color: isActive ? 'common.black' : 'common.gray',
            }}
          >
            <IconButton
              sx={{
                width: 24,
                height: 24,
                color: isActive ? 'common.black' : 'common.gray',
              }}
            >
              {item.icon}
            </IconButton>
            <Typography fontSize={12} fontWeight={isActive ? 'bold' : 'normal'}>
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
