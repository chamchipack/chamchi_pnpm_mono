'use client';

import Link from 'next/link';
import { User, LogOut } from 'lucide-react';

interface Props {
  open: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

export default function HeaderMyMenuView({ open, onToggle, onLogout }: Props) {
  return (
    <div className="relative">
      {/* ✅ 동그란 마이페이지 버튼 */}
      <button
        onClick={onToggle}
        className="
          w-10
          h-10
          rounded-full
          flex
          items-center
          shadow-md
          justify-center
          bg-main
          transition
        "
      >
        <User size={20} color="white" />
      </button>

      {/* 아코디언 메뉴 */}
      <div
        className={`
    absolute
    right-0
    bottom-full
    mb-2
    w-40
    overflow-hidden
    rounded-md
    border-gray
    bg-white
    shadow-md
    transition-all
    duration-200
    ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
  `}
      >
        <Link
          href="/mypage"
          className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100"
        >
          <User size={16} />
          마이페이지
        </Link>

        <button
          onClick={onLogout}
          className="
            w-full
            flex
            items-center
            gap-2
            px-4
            py-3
            text-sm
            hover:bg-gray-100
            text-left
          "
        >
          <LogOut size={16} />
          로그아웃
        </button>
      </div>
    </div>
  );
}
