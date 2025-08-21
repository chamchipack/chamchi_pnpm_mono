import CustomChip from '@/components/common/chip/CustomChip';
import { OrderEnum, OrderSchema } from '@/types/schema/OrderSchema';
import { AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import OrderGeneralInformation from '../OrderGeneralInformation';
import OrderSellerInformation from '../OrderSellerInformation';
import TrackingForm from '../TrackingForm';
import ReviewCreateButton from './button/ReviewCreateButton';
import OrderImagePreview from './preview/OrderImagePreview';

const OrderActionClientContainer = dynamic(
  () => import('./OrderActionClientContainer'),
  {
    ssr: false,
    loading: () => null,
  },
);

type Option = {
  name: string;
  price?: number;
  title: string;
  _id: string;
  count?: number;
  value?: number;
  type: 'image' | 'etc' | 'text';
};

export default function SSR_PurchaseInformation(order: OrderSchema) {
  const {
    sellerId,
    status,
    createdAt,
    bookingDate,
    orderNumber,
    name,
    phoneNumber,
    totalPrice,
    options,
    productId,
    couponId,
    discount,
    additionalProducts,
    productImage,
    _id,
    userId,
    isConfirmed = false,
    trackingNumber,
    parcelCompanyCode,
    parcelCompany,
  } = order;

  const isParcel = trackingNumber && parcelCompanyCode ? true : false;

  const selectedOption: Option[] =
    typeof options === 'string' ? JSON.parse(options) : [];
  const additionalOptions =
    typeof additionalProducts === 'string'
      ? JSON.parse(additionalProducts)
      : additionalProducts;

  return (
    <>
      <OrderSellerInformation seller={sellerId} />

      <div className="mt-4 mb-2 flex justify-between align-center">
        <CustomChip status={status} isParcel={isParcel} />

        <ReviewCreateButton status={status as OrderEnum} _id={_id} />
      </div>

      {isConfirmed && (
        <div className="mt-4 w-full flex items-center gap-1 bg-gray-50 text-gray-400 text-xs px-2 py-1 rounded border border-gray-200">
          <AlertCircle size={11} className="text-gray-400" />
          <span className="text-[11px]">구매확정된 상품입니다</span>
        </div>
      )}

      <OrderGeneralInformation
        createdAt={createdAt}
        bookingDate={bookingDate}
        orderNumber={orderNumber}
        name={name}
        phoneNumber={phoneNumber}
        trackingNumber={trackingNumber}
        parcelCompany={parcelCompany}
      />

      {isParcel && (
        <TrackingForm
          trackingNumber={trackingNumber}
          parcelCompanyCode={parcelCompanyCode}
        />
      )}

      <hr className="w-full border-dashed border-t border-gray-300 my-4" />

      <div>
        <div className="flex justify-between mb-2">
          {/* <p className="text-sm">{productId?.name}</p> */}
          <OrderImagePreview
            name={productId?.name}
            image={productId?.image?.[0]}
          />
          <p className="text-sm">{productId?.price.toLocaleString()} 원</p>
        </div>

        {Array.isArray(selectedOption) && selectedOption.length ? (
          <>
            <hr className="w-full border-dashed border-t border-gray-300 my-4" />

            <p className="text-sm text-bold my-2">선택한 옵션</p>

            {selectedOption.map(
              ({ name, title, value = 0, _id, type }, index) => (
                <div key={_id} className="mb-4">
                  <div className="flex justify-between">
                    {type === 'image' ? (
                      <OrderImagePreview
                        name={title}
                        image={productImage?.[index] || ''}
                      />
                    ) : (
                      <p className="text-sm">{title || ''}</p>
                    )}
                    <p className="text-sm">+{value.toLocaleString()} 원</p>
                  </div>
                  <p className="text-xs text-gray-400">{name || ''}</p>
                </div>
              ),
            )}
          </>
        ) : null}

        {Array.isArray(additionalOptions) && additionalOptions.length ? (
          <>
            <hr className="w-full border-dashed border-t border-gray-300 my-4" />

            <p className="text-sm text-bold my-2">추가상품 목록</p>
            {additionalOptions.map(({ name, price = 0, _id, count = 0 }) => (
              <div key={_id} className="flex justify-between mb-1">
                <p className="text-xs">{name}</p>
                <p className="text-xs">
                  +{(price * count).toLocaleString()} 원
                </p>
              </div>
            ))}
          </>
        ) : // : Object.entries(additionalOptions).map(
        //     ([_id, { name, price = 0, count = 0 }]: any) => (
        //       <div key={_id} className="flex justify-between mb-1">
        //         <p className="text-xs">{name}</p>
        //         <p className="text-xs">
        //           +{(price * count).toLocaleString()} 원
        //         </p>
        //       </div>
        //     ),
        //   )}
        null}

        {couponId && discount && (
          <>
            <hr className="w-full border-dashed border-t border-gray-300 my-4" />
            <div className="flex justify-between mb-1">
              <p className="text-sm">쿠폰할인적용</p>
              <p className="text-sm">-{discount.toLocaleString()} 원</p>
            </div>
          </>
        )}

        <hr className="my-4" />

        <div className="flex justify-between">
          <p className="text-base font-bold">결제 금액</p>
          <p className="text-base font-bold">
            {totalPrice.toLocaleString()} 원
          </p>
        </div>
      </div>

      <OrderActionClientContainer
        productId={productId}
        productImage={productImage}
        status={status}
        userId={userId}
        orderId={_id}
      />
    </>
  );
}
