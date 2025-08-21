'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchInputChips({
  type = '',
  onClick,
}: {
  type?: string;
  onClick: (value: 'store' | 'product') => void;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <button
      onClick={() => onClick(type === 'store' ? 'product' : 'store')}
      className={`h-7 px-3 rounded-full text-xs font-medium transition-colors duration-200 ${
        type === 'store' ? 'bg-main text-white' : 'bg-gray-200 text-gray-800'
      }`}
    >
      {type === 'store' ? '가게검색' : '상품검색'}
    </button>
  );
}
