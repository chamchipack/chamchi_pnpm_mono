'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Typography, IconButton } from '@mui/material';
import { Home, Search, MapPin, ClipboardList, User } from 'lucide-react'; // ✅ Lucide 아이콘 import
import { handleNavigation } from '@/config/navigation';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  {
    label: '메인',
    icon: <Home size={32} />,
    key: 'home',
    path: '/application/home',
  }, // ✅ 아이콘 크기 32px로 설정
  {
    label: '검색',
    icon: <Search size={32} />,
    key: 'search',
    path: '/application/search',
  },
  {
    label: '주변',
    icon: <MapPin size={32} />,
    key: 'location',
    path: '/application/location',
  },
  {
    label: '주문내역',
    icon: <ClipboardList size={32} />,
    key: 'order-list',
    path: '/application/order-list',
  },
  {
    label: '마이',
    icon: <User size={32} />,
    key: 'mypage',
    path: '/application/mypage',
  },
];

export default function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isWebView, setIsWebView] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase();
      setIsWebView(
        /wv|android.*version\/[\d.]+.*chrome\/[.\d]+ mobile/i.test(userAgent) ||
          (/iphone|ipod|ipad/i.test(userAgent) && !/safari/i.test(userAgent)),
      );
    }
  }, []);

  const handleRouter = (path: string) => {
    const isWebView = handleNavigation({ path, status: 'forward' });

    if (!isWebView) return router.push(path);
  };

  const SHOW_PAGES = NAV_ITEMS.map((item) => item.path);
  if (!SHOW_PAGES.includes(pathname)) return null;

  if (isWebView) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'inherit',
        maxWidth: 500,
        px: 4,
        pb: 4,
        pt: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        height: 88,
        backgroundColor: 'white',
        borderTop: '1px solid #d9dbdb',
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Box
            key={item.key}
            onClick={() => handleRouter(item.path)} // ✅ 클릭 시 path로 이동
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              color: isActive ? '#964F66' : 'common.gray',
            }}
          >
            <IconButton
              sx={{
                width: 40, // ✅ 아이콘 크기와 맞춰서 버튼 크기도 조정
                height: 40,
                color: isActive ? '#964F66' : 'common.gray',
              }}
            >
              {item.icon} {/* ✅ Lucide 아이콘 적용 */}
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
