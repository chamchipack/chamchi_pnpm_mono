'use client';

import { handleNavigation } from '@/config/navigation';
import { OrderEnum } from '@/types/schema/OrderSchema';
import { useRouter } from 'next/navigation';

const ReviewCreateButton = ({
  status,
  _id,
}: {
  _id: string;
  status: OrderEnum;
}) => {
  const router = useRouter();

  const handleReviewRouter = () => {
    const path = `/store/review/create?orderId=${_id}`;
    const isWebView = handleNavigation({
      path: 'store/review/create',
      status: 'forward',
      params: JSON.stringify({ orderId: _id }),
    });

    if (!isWebView) router.push(path);
  };
  return (
    <>
      {status == OrderEnum.completed && (
        <button
          type="button"
          onClick={handleReviewRouter}
          className="text-xs text-blue-600 border border-blue-600 rounded-md px-3 py-1 bg-white hover:bg-blue-50 transition"
        >
          리뷰 쓰러가기
        </button>
      )}
    </>
  );
};

export default ReviewCreateButton;
