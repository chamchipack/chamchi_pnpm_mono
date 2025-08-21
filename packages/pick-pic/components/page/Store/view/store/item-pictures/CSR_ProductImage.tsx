'use client';

import { useViewedProduct } from '@/config/utils/hooks/useViewedProduct';
import { additionalProductAtom } from '@/store/orderStore/additional';
import { selectedProductAtom } from '@/store/orderStore/order-info';
import { s3ImageAtom } from '@/store/orderStore/s3image';
import { ProductSchema } from '@/types/schema/ProductSchema';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

interface Props {
  product: ProductSchema;
  additionalProduct: AdditionalProductSchema[];
  index: number;
  alias: string;
  isDeleted: boolean;
}

export default function CSR_ProductImage({
  product,
  index,
  additionalProduct,
  alias,
  isDeleted,
}: Props) {
  const router = useRouter();

  const [, setAdditional] = useRecoilState(additionalProductAtom);
  const resetOrder = useResetRecoilState(selectedProductAtom);
  const resetImages = useResetRecoilState(s3ImageAtom);
  const [recoilList, setRecoilList] = useRecoilState(selectedProductAtom);

  const { addViewedProduct } = useViewedProduct();

  const handleRouter = useCallback(
    (product: ProductSchema) => {
      if (isDeleted) return;
      // resetOrder();
      setRecoilList((prev: any) => {
        if (!prev) return prev;

        return {
          price: 0, // ✅ 덮어쓰기
          productPrice: 0,
          totalPrice: 0,
          productName: product?.name,
          location: product?.sellerId?.location,
          storeName: product?.sellerId?.marketName,
          productId: product?._id,
          sellerId: product?.sellerId?._id,
          parcelLocation: null,
          parcelLocationDetail: null,
          isParcelAvailable: false,
          parcelFee: 0,
        };
      });
      resetImages();
      if (!product?._id) return;

      addViewedProduct(product._id);
      setAdditional(additionalProduct);

      const path = `/store/${alias}/product/${product._id}`;
      // router.push(path);
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
    },
    [addViewedProduct, additionalProduct, router],
  );

  const url = `/store/${alias}/product/${product._id}`;

  return (
    <div
      key={product?._id}
      onMouseEnter={() => router.prefetch(url)}
      onClick={() => handleRouter(product)}
      className={`relative w-full aspect-square overflow-hidden border-b-2 border-white ${
        (index + 1) % 3 !== 0 ? 'border-r-2' : ''
      } hover:cursor-pointer group h-[180px]`}
    >
      {/* 이미지 */}
      <img
        src={product?.image?.[0]}
        alt={product?.name}
        loading="lazy"
        className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-80"
      />

      {/* 그라디언트 오버레이 */}
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-b from-transparent to-black opacity-90 pointer-events-none" />

      {/* 텍스트 (이름 + 가격) */}
      <div className="absolute bottom-2 left-2 right-2 text-white z-10 text-sm leading-tight">
        <p className="text-xs mb-1 truncate">{product?.name}</p>

        <div className="flex justify-between items-center text-xs">
          <p className="truncate">
            {product?.price?.toLocaleString('ko-KR') || '-'}원
          </p>

          {product?.rating && (
            <div className="flex items-center bg-white rounded-full px-2 py-0.5 text-main text-[12px] font-medium ml-2">
              <svg
                className="w-3 h-3 mr-1 fill-main"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {product.rating.toFixed(1)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
