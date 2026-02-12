'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';

export default function HeaderMyMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div
      ref={ref}
      className="
        fixed
        top-0
        right-0
        z-50
        h-16
        px-4
        flex
        items-center
      "
    >
      <div className="relative">
        {/* 마이페이지 버튼 */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="
            flex
            items-center
            gap-2
            px-3
            py-2
            rounded-md
            hover:bg-gray-100
            transition
          "
        >
          <User size={20} />
        </button>

        {/* 아코디언 메뉴 */}
        <div
          className={`
            absolute
            right-0
            mt-2
            w-40
            overflow-hidden
            rounded-md
            border
            bg-white
            shadow-md
            transition-all
            duration-200
            ${
              open
                ? 'max-h-40 opacity-100'
                : 'max-h-0 opacity-0 pointer-events-none'
            }
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
            className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100 text-left"
            onClick={() => {
              // 여기에 로그아웃 로직 연결
              console.log('logout');
            }}
          >
            <LogOut size={16} />
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
