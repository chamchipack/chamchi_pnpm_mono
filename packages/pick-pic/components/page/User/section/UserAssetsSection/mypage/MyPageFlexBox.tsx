'use client';

import { handleNavigation } from '@/config/navigation';
import { Heart, Star, Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  label: string;
  onClick?: () => void;
  type: 'bookmark' | 'review' | 'coupon';
};

export default function MyPageFlexBox({ label, onClick, type }: Props) {
  const router = useRouter();

  const handleRouter = () => {
    const pathKind = {
      bookmark: 'user/bookmark',
      coupon: 'user/coupon',
      review: 'user/review',
    };
    const path = pathKind[type];
    const isWebView = handleNavigation({ path, status: 'forward' });

    if (!isWebView) router.push(`/${path}`);
  };

  // 아이콘 설정
  const iconMap = {
    review: <Star className="w-5 h-5 text-yellow-500" />,
    bookmark: <Heart className="w-5 h-5 text-pink-500" />,
    coupon: <Ticket className="w-5 h-5 text-blue-500" />,
  };

  return (
    <button
      onClick={onClick ?? handleRouter}
      className="flex flex-col items-center justify-center gap-1 bg-white p-4 rounded-xl shadow hover:bg-gray-50 w-full"
    >
      {iconMap[type]}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
