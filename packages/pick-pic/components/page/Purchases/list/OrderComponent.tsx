'use client';

import CustomChip from '@/components/common/chip/CustomChip';
import CommonImage from '@/components/common/image/CommonImage';
import { handleNavigation } from '@/config/navigation';
import { OrderEnum, OrderSchema } from '@/types/schema/OrderSchema';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

type OrderPick =
  | '_id'
  | 'status'
  | 'productImage'
  | 'createdAt'
  | 'sellerId'
  | 'productId'
  | 'isConfirmed'
  | 'trackingNumber'
  | 'parcelCompany';

export default function OrderComponent({
  _id = '',
  status,
  productImage,
  createdAt,
  sellerId,
  productId,
  isConfirmed = false,
  trackingNumber,
  parcelCompany,
  onClickOpen = () => {},
}: Pick<OrderSchema, OrderPick> & { onClickOpen: (rs: any) => void }) {
  const router = useRouter();
  const isParcel = trackingNumber && parcelCompany ? true : false;

  // const { name, image } = productId as Omit<ProductSchema, 'name'> || {}

  const handleRouter = () => {
    const path = 'purchases/view';
    const param = { orderId: _id };

    const isWebView = handleNavigation({
      path,
      status: 'forward',
      params: JSON.stringify(param),
    });

    if (!isWebView) {
      const queryParams = new URLSearchParams(param).toString();
      router.push(`/${path}?${queryParams}`);
    }
  };

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
      <div className="flex flex-col gap-2">
        {/* 날짜 & 상세내역 버튼 */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{dayjs(createdAt).format('YYYY년 MM월 DD일 HH시 mm분')}</span>
          <span
            onClick={handleRouter}
            className="font-semibold cursor-pointer hover:underline"
          >
            상세내역
          </span>
        </div>

        {/* 가게 정보 및 이미지 */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-lg font-bold">{sellerId?.marketName}</p>
            <p className="text-xs text-gray-500">
              {sellerId?.location} {sellerId?.locationDetail}
            </p>
            <p className="text-sm text-gray-800 mt-1">{productId?.name}</p>
          </div>

          <CommonImage
            src={productId?.image?.[0] || productImage?.[0]}
            width="90px"
            height="90px"
          />
        </div>

        {/* 상태칩 및 리뷰 작성 */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-1">
            <CustomChip status={status} isParcel={isParcel} />
            {isConfirmed && (
              <div className="inline-flex items-center px-3 h-6 rounded-full border border-gray-200">
                <div className="w-2 h-2 rounded-full mr-2 bg-gray-200" />
                <span className="text-xs font-bold text-gray-500">
                  구매확정
                </span>
              </div>
            )}
          </div>

          {/* {status == OrderEnum.completed && (
            <button
              type="button"
              onClick={handleReviewRouter}
              className="text-xs text-blue-600 border border-blue-600 rounded-md px-3 py-1 bg-white hover:bg-blue-50 transition"
            >
              리뷰 쓰러가기
            </button>
          )} */}
        </div>

        {status == OrderEnum.completed && !isConfirmed && (
          <button
            type="button"
            className="px-4 mt-4 mb-2 h-7 border border-blue-400 text-blue-500 text-sm font-medium rounded-md shadow transition"
            onClick={() => onClickOpen(_id)}
          >
            구매확정하기
          </button>
        )}
      </div>

      <hr className="my-6 border-t border-gray-200" />
    </>
  );
}
