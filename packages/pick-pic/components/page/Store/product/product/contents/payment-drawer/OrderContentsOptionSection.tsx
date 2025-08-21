'use client';

import CommonImage from '@/components/common/image/CommonImage';
import { AdditionalProduct, OptionItem } from '@/store/orderStore/order-info';
import { GiftIcon, ImageIcon, X } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
  productName: string;
  productPrice: number;
  optionList: [string, OptionItem][];
  imageFiles: Record<string, File>;
  additionalProduct: AdditionalProduct;
  couponId: string;
  discount: number;
  storeRequest: string;
  totalPrice: number;
  parcelFee: number;
}

const OrderContentsOptionSection = (props: Props) => {
  const [openImage, setOpenImage] = useState<string | null>(null);

  return (
    <>
      <div className="px-3 py-2 rounded-xl bg-white border border-gray-300">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            {/* 상품 아이콘(원하면 lucide-react의 Gift, Box 등) */}
            <GiftIcon className="w-4 h-4 text-gray-500" />
            <p className="font-semibold text-gray-700">{props.productName}</p>
          </div>
          <p className="font-bold text-lg text-gray-700">
            {props.productPrice.toLocaleString()} 원
          </p>
        </div>

        {props?.optionList.map(([title, { name, value, _id, type }]) => {
          const file = props?.imageFiles?.[_id]; // 이미지 파일 가져오기
          const imageUrl = file ? URL.createObjectURL(file) : null;

          return (
            <div key={_id} className="my-2">
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-gray-700">{title}</p>
                <p className="text-sm text-gray-700">
                  +{value.toLocaleString()} 원
                </p>
              </div>

              {type === 'image' ? (
                <>
                  <div className="flex items-center gap-1 mt-1">
                    <ImageIcon className="w-4 h-4 text-blue-500 shrink-0" />
                    <button
                      onClick={() => {
                        if (imageUrl) setOpenImage(imageUrl);
                      }}
                      className="text-xs text-gray-600 underline hover:text-blue-800"
                    >
                      {name}
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-xs text-gray-600 mt-1">{name}</p>
              )}
            </div>
          );
        })}

        {props?.additionalProduct &&
          Object.entries(props.additionalProduct).length > 0 && (
            <>
              {/* 구분선 + 타이틀 */}
              <div className="w-full border-t border-dashed border-gray-400 my-4" />
              <p className="text-sm font-semibold text-gray-700 mb-2">
                추가상품
              </p>

              {Object.entries(props.additionalProduct).map(
                ([_id, { name, price, count }]) => (
                  <div key={_id} className="flex justify-between mt-2">
                    <p className="text-sm text-primary-600">{name}</p>
                    <p className="text-sm text-primary-600">
                      +{(price * count).toLocaleString()} 원
                    </p>
                  </div>
                ),
              )}
            </>
          )}

        {props?.couponId && props?.discount && (
          <>
            <hr className="my-3 border-primary-100" />
            <div className="flex justify-between mb-1">
              <p className="text-sm text-gray-500 font-semibold">
                쿠폰 할인 적용
              </p>
              <p className="text-sm text-gray-500 font-semibold">
                -{props?.discount.toLocaleString()} 원
              </p>
            </div>
            <hr className="my-3 border-gray-300" />
          </>
        )}

        {props?.parcelFee ? (
          <>
            <hr className="my-3 border-primary-100" />
            <div className="flex justify-between mb-1">
              <p className="text-sm text-gray-500 font-semibold">택배 비용</p>
              <p className="text-sm text-gray-500 font-semibold">
                +{props?.parcelFee.toLocaleString()} 원
              </p>
            </div>
          </>
        ) : null}

        <hr className="my-3 border-gray-300" />

        {/* 총액 */}
        <div className="flex justify-between items-center">
          <p className="text-base font-bold text-gray-700">총액</p>
          <p className="text-xl font-extrabold text-gray-700">
            {props?.totalPrice.toLocaleString()} 원
          </p>
        </div>

        <hr className="my-3 border-gray-300" />

        {/* 요청사항 */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">요청사항</p>
          <p className="text-sm text-gray-500">
            {props?.storeRequest || '요청사항 없음'}
          </p>
        </div>
      </div>

      {openImage && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg max-w-sm w-80">
            {/* X 버튼 위치 개선 */}
            <button
              className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-black z-10"
              onClick={() => setOpenImage(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <CommonImage
              src={openImage}
              alt="옵션 이미지 미리보기"
              className="w-full h-auto rounded"
              rounded="rounded-md"
              height="h-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(OrderContentsOptionSection);
