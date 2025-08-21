'use client';

import { globalMaxWidth, setLocationCookie } from '@/config/utils/global';
import usePageHistory from '@/config/utils/hooks/usePageHistory';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import { UserInfoAtom } from '@/store/userStore/state';
import { ClipboardList, Home, MapPin, Search, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

const NAV_ITEMS = [
  { label: '메인', icon: Home, key: '', path: '/' },
  { label: '검색', icon: Search, key: 'search', path: '/search' },
  { label: '주변', icon: MapPin, key: 'location', path: '/location' },
  {
    label: '주문내역',
    icon: ClipboardList,
    key: 'purchases',
    path: '/purchases',
  },
  { label: '마이', icon: User, key: 'user', path: '/user' },
];

const NavigationBar = ({ cookie = '' }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
  const resetDate = useResetRecoilState(dateSelectionAtom);
  const [inset, setInset] = useState<number>(0);

  const activeIndex = NAV_ITEMS.findIndex((item) => item.path === pathname);
  const tabWidth = 100 / NAV_ITEMS.length;

  usePageHistory(pathname);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 100);
  }, [pathname]);

  useEffect(() => {
    setInset(Number(userInfo?.bottomInsets) || 0);
  }, [userInfo?.bottomInsets]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase();
      const isWebViewBoole =
        /wv|android.*version\/[\d.]+.*chrome\/[.\d]+ mobile/i.test(userAgent) ||
        (/iphone|ipod|ipad/i.test(userAgent) && !/safari/i.test(userAgent));

      setLocationCookie(userInfo?.latitude, userInfo?.longitude);

      if (!isWebViewBoole && !cookie && userInfo._id) {
        setUserInfo((prev) => ({
          ...prev,
          _id: '',
          nickname: '',
          socialId: '',
          profile_image: '',
          provider: '',
          fcmToken: '',
          phoneNumber: '',
        }));
        resetDate();
      }
    }
  }, []);

  const SHOW_PAGES = NAV_ITEMS.map((item) => item.path);

  if (!SHOW_PAGES.includes(pathname) || pathname === '/location') return null;

  return (
    <div
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[${globalMaxWidth}px] px-4 pb-4 bg-white border-t border-gray-100 z-[100] flex justify-between items-center`}
      style={{
        height: `${70 + inset}px`,
        paddingBottom: `${inset}px`,
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.key}
            href={item.path}
            prefetch
            onFocus={() => router.prefetch(item.path)} // 키보드 접근성
            onTouchStart={() => router.prefetch(item.path)} // 모바일 터치 대응
            data-testid={`navigator-${item.key}`}
            className="flex flex-col items-center cursor-pointer text-xs"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                isActive ? 'text-main' : 'text-gray-400'
              }`}
            >
              <Icon size={24} />
            </div>
            <span
              className={`text-[12px] px-2 py-1 rounded-full transition-colors
    ${isActive ? 'bg-main text-white font-bold' : 'text-gray-500'}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default React.memo(NavigationBar);
