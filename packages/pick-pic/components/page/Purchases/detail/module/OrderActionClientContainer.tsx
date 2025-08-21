'use client';

import { refundRequest, useDeleteOrder } from '@/api/client/order';
import ActionConfirmationModal from '@/components/common/backdrop/ActionConfirmationModal';
import { useSmartNavigation } from '@/config/navigation';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import { ResponseStatus } from '@/types/enums/enums';
import { OrderEnum } from '@/types/schema/OrderSchema';
import { ProductSchema } from '@/types/schema/ProductSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  productId: ProductSchema;
  productImage?: string[];
  status: string;
  userId: string;
  orderId: string;
}

export default function OrderActionClientContainer({
  productId,
  productImage,
  status,
  userId,
  orderId,
}: Props) {
  const alert = useAlert();
  const router = useRouter();
  const navigator = useSmartNavigation();

  const [isAdditionalOn, setIsAdditionalOn] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* {isAdditionalOn && (
        <div className="flex flex-row gap-4 mt-4">
          {productImage && productImage.length > 0 && (
            <div className="">
              <p className="text-xs mb-1">내가 등록한 상품 이미지</p>
              <div className="flex  gap-2">
                {productImage.map((url, idx) => (
                  <CommonImage
                    key={idx}
                    src={url}
                    alt={`등록 이미지 ${idx + 1}`}
                    className="w-[72px] h-[72px] rounded object-cover"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )} */}

      {/* <div className="mt-6 flex justify-center items-center">
        <p
          className="text-sm text-gray-500 cursor-pointer"
          onClick={() => setIsAdditionalOn(!isAdditionalOn)}
        >
          {isAdditionalOn ? '닫기' : '더보기'}
        </p>
      </div> */}

      {status === OrderEnum.pending && (
        <div className="mt-6 flex justify-center items-center">
          <p
            className="text-sm text-gray-500 cursor-pointer"
            onClick={() => setDeleteOpen(true)}
          >
            주문취소하기
          </p>
        </div>
      )}

      {[OrderEnum.in_progress, OrderEnum.packed, OrderEnum.completed].includes(
        status as OrderEnum,
      ) && (
        <div className="mt-6 flex justify-center items-center">
          <p
            className="text-sm text-gray-500 cursor-pointer"
            onClick={() => setRefundOpen(true)}
          >
            환불요청하기
          </p>
        </div>
      )}

      <ActionConfirmationModal
        open={refundOpen}
        handleClose={() => setRefundOpen(false)}
        title="환불신청"
        content="환불신청을 진행합니다. 이미 제작이 완료가 된 경우에는 환불이 불가능 할 수 있습니다."
        onClickCheck={async () => {
          const { message, status } = await refundRequest(userId, orderId);
          alert({
            message,
            type: status,
          });

          setRefundOpen(false);

          if (status === ResponseStatus.success) router.refresh();
        }}
        processing={false}
      />

      <ActionConfirmationModal
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        title="주문취소"
        content="확인을 누르면 주문을 취소합니다. 이미 주문 접수가 되었다면 취소는 불가능합니다. 취소시 환불은 카드사의 일정에따라 3~5일 정도 소요될 수 있습니다"
        onClickCheck={async () => {
          setLoading(true);

          const { message, status } = await useDeleteOrder(userId, orderId);
          setDeleteOpen(false);

          alert({
            message,
            type: status,
          });
          if (status === ResponseStatus.error) return setLoading(false);

          navigator({ path: 'purchases', status: 'replace' });
        }}
        processing={false}
      />
    </>
  );
}
