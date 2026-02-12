'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  ClipboardList,
  BookOpen,
} from 'lucide-react';

interface Props {
  cookie: string;
}

export default function NavigationBar({ cookie }: Props) {
  const pathname = usePathname();

  const menus = [
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      label: '대시보드',
    },
    {
      href: '/students',
      icon: Users,
      label: '수강생관리',
    },
    {
      href: '/sessions',
      icon: CalendarClock,
      label: '세션관리',
    },
    {
      href: '/tasks',
      icon: ClipboardList,
      label: '작업관리',
    },
    {
      href: '/classes',
      icon: BookOpen,
      label: '클래스관리',
    },
  ];

  return (
    <nav
      className="
        fixed
        bottom-0
        left-1/2
        -translate-x-1/2
        w-full
        h-16
        bg-white
        border-t
        border-gray-100
        flex
        justify-around
        items-center
        z-50
      "
    >
      {menus.map(({ href, icon: Icon, label }) => {
        const active = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-1
            "
          >
            <Icon
              size={22}
              className={active ? 'text-main' : 'text-gray-400'}
            />

            {/* ✅ 480px 이상에서만 텍스트 표시 */}
            <span
              className={`
                text-xs
                ${active ? 'text-main' : 'text-gray-400'}
                hidden
                min-[481px]:block
              `}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
