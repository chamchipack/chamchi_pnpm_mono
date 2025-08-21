'use client';

import { useSmartNavigation } from '@/config/navigation';
import { useRouter } from 'next/navigation';

interface Props {
  count: number;
  sellerId: string;
}

export default function ReviewCount({ count = 0, sellerId }: Props) {
  const smartNavigate = useSmartNavigation();
  const router = useRouter();

  const handleRouter = () => {
    const path = `store/review`;
    const params = { sellerId };

    smartNavigate({ path, status: 'forward', params });
  };

  if (!count) {
    return <p className="text-xs text-gray-500">아직 작성된 리뷰가 없어요!</p>;
  }

  return (
    <p
      onMouseEnter={() => router.prefetch(`/store/review?sellerId=${sellerId}`)}
      onClick={handleRouter}
      className="text-sm underline cursor-pointer text-gray-800 hover:text-main"
    >
      리뷰 <span className="font-medium">{count}</span>개
    </p>
  );
}
