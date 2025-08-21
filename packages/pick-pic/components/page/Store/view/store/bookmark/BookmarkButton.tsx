'use client';

import { updateBookmark } from '@/api/client/bookmark';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  userId: string;
  sellerId: string;
  isBookmarked: boolean;
}

export default function BookmarkButton({
  userId,
  sellerId,
  isBookmarked,
}: Props) {
  const router = useRouter();
  const alert = useAlert();

  const [bookmark, setBookmark] = useState<boolean | null>(null);

  useEffect(() => {
    setBookmark(isBookmarked);
  }, []);

  const handleToggleBookmark = async () => {
    const { message = '' } = await updateBookmark(userId, sellerId);
    if (message === 'success') {
      alert({
        message: bookmark ? '찜을 취소했습니다!' : '찜했어요!',
        type: 'success',
      });

      setBookmark(!bookmark);
      router.refresh();
    }
  };

  if (bookmark === null) return null;

  return (
    <button
      onClick={handleToggleBookmark}
      className={`w-8 h-8 flex items-center justify-center rounded-full transition
      ${bookmark ? 'bg-red-100 hover:bg-red-200' : 'bg-gray-100 hover:bg-gray-200'}`}
      aria-label="북마크"
    >
      <Heart
        className={`w-[20px] h-[20px] ${bookmark ? 'text-red-500' : 'text-gray-500'}`}
      />
    </button>
  );
}
