'use client';

import { useProduct } from '@/api/client/product';
import CommonImage from '@/components/common/image/CommonImage';
import { useViewedProduct } from '@/config/utils/hooks/useViewedProduct';
import { additionalProductAtom } from '@/store/orderStore/additional';
import { selectedProductAtom } from '@/store/orderStore/order-info';
import { s3ImageAtom } from '@/store/orderStore/s3image';
import { DataStructureKey } from '@/types/schema/default';
import { ProductSchema } from '@/types/schema/ProductSchema';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

interface Props {
  additionalProduct: AdditionalProductSchema[];
  productId: string;
  sellerId: string;
  alias: string;
}

const ProductSelection = ({
  productId = '',
  additionalProduct = [],
  sellerId = '',
  alias = '',
}: Props) => {
  if (!productId) return null;

  const router = useRouter();
  const [, setAdditional] = useRecoilState(additionalProductAtom);
  const resetOrder = useResetRecoilState(selectedProductAtom);
  const resetImage = useResetRecoilState(s3ImageAtom);

  const { addViewedProduct } = useViewedProduct();

  const handleRouter = (product: ProductSchema) => {
    if (!product?._id) return;

    setAdditional(additionalProduct);
    resetOrder();
    resetImage();

    const path = `/store/${alias}/product/${product._id}`;
    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'ALIAS_PRODUCT_PRODUCTID',
          data: { alias, productId: product?._id },
        }),
      );
    } else {
      router.push(path);
    }
  };

  const { data } = useProduct<DataStructureKey.product>(productId);
  const item = data?.data;

  useEffect(() => {
    if (productId) addViewedProduct(productId);
  }, []);

  if (!item || sellerId !== item?.sellerId?._id) return null;

  return (
    <div className="w-full my-4 space-y-1">
      {/* 강조된 라벨 */}
      <div className="inline-block text-xs text-bold bg-main text-white px-3 py-1 rounded-md">
        내가 선택한 상품
      </div>

      {/* 카드형 상품 선택 박스 */}
      <div
        onClick={() => handleRouter(item)}
        className="relative w-full max-w-md h-[180px] mx-auto bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden flex transition-transform"
      >
        {/* 좌측 배경색과 정보 */}
        <div className="w-[60%] h-full bg-gradient-to-br p-5 flex flex-col justify-between">
          {/* 라벨 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {item?.rating ? (
                <div className="text-xs bg-white px-2 py-1 rounded-full border border-gray-300 text-main flex items-center gap-1 font-bold text-[12px]">
                  <svg
                    className="w-3 h-3 fill-main"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  {item.rating.toFixed(1)}
                </div>
              ) : (
                <div className="text-xs border border-gray-300 bg-white text-main font-bold px-3 py-1 rounded-full w-fit">
                  PICK!
                </div>
              )}

              {item?.reviewCount ? (
                <div className="inline-flex items-center px-2.5 py-1 rounded-sm bg-gray-100 text-xs text-gray-700">
                  <span className="mr-1 text-gray-500">리뷰</span>
                  <span className="font-semibold text-gray-900">
                    {item?.reviewCount}건
                  </span>
                </div>
              ) : null}
            </div>

            {/* 상품명 */}
            <p className="text-[18px] font-bold text-gray-800 leading-tight truncate">
              {item.name}
            </p>
          </div>

          {/* 가격 */}
          <div className="text-[16px] font-bold text-main">
            {item.price?.toLocaleString()}원
          </div>
        </div>

        {/* 우측 이미지 */}
        <div className="w-[40%] relative bg-gray-50 flex items-center justify-center overflow-hidden">
          <CommonImage
            src={item.image?.[0] || '/fallback.png'}
            alt="선택한 상품"
            width="100%"
            height="100%"
            className="object-cover scale-[1.15]"
          />

          {/* 이미지 위 라벨 */}
          <div className="absolute top-2 right-2 text-[10px] text-white bg-black bg-opacity-60 px-2 py-0.5 rounded-full">
            대표 이미지
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductSelection);
