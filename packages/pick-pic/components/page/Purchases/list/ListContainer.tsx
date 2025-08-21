'use client';

import { confirmOrder, useOrderListInfinite } from '@/api/client/order';
import ErrorCommonComponent from '@/components/common/layout/error/ErrorCommonComponent';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import useInfiniteScrollObserver from '@/config/utils/hooks/infinite-scroll/useInfiniteScrollObserver';
import { DataStructureKey } from '@/types/schema/default';
import dynamic from 'next/dynamic';
import EmptyDataOverlay from 'package/src/Overlay/empty/EmptyDataOverlay';
import { useRef, useState } from 'react';
import PurchaseSkeleton from '../PurchaseSkeleton';
import OrderComponent from './OrderComponent';

const ActionConfirmationModal = dynamic(
  () => import('@/components/common/backdrop/ActionConfirmationModal'),
  {
    ssr: false,
    loading: () => null,
  },
);

interface Props {
  userId: string;
  query: string;
  date: string;
}

type OrderPick =
  | '_id'
  | 'status'
  | 'productImage'
  | 'createdAt'
  | 'sellerId'
  | 'isConfirmed'
  | 'productId'
  | 'trackingNumber'
  | 'parcelCompany';

export default function ListContainer({ userId, query, date }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const alert = useAlert();

  const [selectedId, setSelectedId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  if (!userId) {
    return (
      <ErrorCommonComponent
        title="로그인 후 확인할 수 있어요!"
        height="50vh"
        isSigninAvailable={true}
        isBackwardAvailable={false}
        isHomeRouteAvailable={false}
        isNativeStackInitialize={false}
      />
    );
  }

  const limit = 5;
  const { data, size, setSize, isValidating, mutate } = useOrderListInfinite<
    DataStructureKey.order,
    'Pick',
    OrderPick
  >({
    page: 1,
    limit,
    userId,
    query,
    date,
    field:
      'status,productImage,createdAt,isConfirmed,trackingNumber,parcelCompany',
  });

  const items =
    data && data[0]?.message !== 'error'
      ? data.flatMap((page) => page.data.items)
      : [];

  const observerRef = useRef(null);
  const totalPage = Math.ceil((data?.[0]?.data?.totalCount ?? 0) / limit);
  const currentPage = size;

  useInfiniteScrollObserver({
    observerRef,
    isValidating,
    currentPage,
    totalPage,
    loadMore: () => setSize(size + 1),
  });

  const handleConfirmOrder = async (orderId: string) => {
    if (!orderId) return;

    const { message = '', status } = await confirmOrder(orderId, userId);

    let text = status === 'success' ? '구매 확정되었습니다' : message;

    alert({ message: text, type: status });

    setOpen(false);
    mutate();
  };

  return (
    <>
      <div className="my-4">
        {isValidating && size === 1 ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="my-10">
              <PurchaseSkeleton />
              <hr className="my-6 border-t border-gray-200" />
            </div>
          ))
        ) : items.length ? (
          <>
            {items.map((item) => (
              <div key={item._id} className="my-6">
                <OrderComponent
                  {...item}
                  onClickOpen={(orderId) => {
                    setOpen(true);
                    setSelectedId(orderId);
                  }}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="mt-[50%] h-[200px]">
            <EmptyDataOverlay title="검색된 주문내역이 없어요!" />
          </div>
        )}

        {currentPage < totalPage && (
          <div
            ref={observerRef}
            className="flex justify-center my-4 w-full h-8 items-center"
          >
            {isValidating && (
              <svg
                className="animate-spin h-6 w-6 text-main"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            )}
          </div>
        )}
      </div>

      <ActionConfirmationModal
        open={open}
        handleClose={() => setOpen(false)}
        title={'구매확정'}
        content="구매를 확정하시겠어요? 구매 확정 완료 후에는 환불이 불가능합니다."
        processing={loading}
        onClickCheck={(orderId) => handleConfirmOrder(selectedId)}
      />
    </>
  );
}
