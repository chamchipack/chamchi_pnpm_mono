'use client';
import { useUserInfoKeys } from '@/store/userStore/state';
import BookmarkButton from './BookmarkButton';

interface Props {
  userId: string;
  sellerId: string;
  isBookmarked: boolean;
}

export default function CSR_BookmarButton({
  userId = '',
  sellerId,
  isBookmarked,
}: Props) {
  const { _id } = useUserInfoKeys(['_id']);

  if (!userId || !_id) return null;
  return (
    <>
      <BookmarkButton
        userId={userId}
        sellerId={sellerId}
        isBookmarked={isBookmarked}
      />
    </>
  );
}
