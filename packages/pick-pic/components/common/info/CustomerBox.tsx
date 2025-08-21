'use client';

import { handleNavigation } from '@/config/navigation';
import { useRouter } from 'next/navigation';

const menuItemsMap = {
  faq: '자주 묻는 질문',
  'terms-and-policies': '약관 및 정책',
  announcement: '공지사항',
  // 'customer-support': '고객센터',
};

export default function CustomerBox() {
  const router = useRouter();

  const handleRouter = (params: string) => {
    const path = 'policy';
    const rs = JSON.stringify({ policy: params });
    const isWebView = handleNavigation({ path, status: 'forward', params: rs });

    if (!isWebView) router.push(`/${path}?policy=${params}`);
  };

  const menuItems = Object.entries(menuItemsMap);

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {menuItems.map(([value, label]) => (
        <div
          key={value}
          onClick={() => handleRouter(value)}
          className="cursor-pointer select-none text-xs text-gray-700 border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 transition"
        >
          {label}
        </div>
      ))}
    </div>
  );
}
