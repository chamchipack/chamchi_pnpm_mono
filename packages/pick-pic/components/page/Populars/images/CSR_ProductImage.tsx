'use client';

import { useViewedProduct } from '@/config/utils/hooks/useViewedProduct';
import { ProductSchema } from '@/types/schema/ProductSchema';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

type ProductPick =
  | '_id'
  | 'name'
  | 'image'
  | 'description'
  | 'price'
  | 'rating'
  | 'sellerId';

interface Props {
  product: Pick<ProductSchema, ProductPick>;
  index: number;
  alias: string;
}

export default function CSR_ProductImage({ product, index, alias }: Props) {
  const router = useRouter();

  const { addViewedProduct } = useViewedProduct();

  const handleRouter = useCallback(() => {
    let path = `store/${alias}/${product?._id}`;

    addViewedProduct(product?._id);
    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'ALIAS',
          data: `${alias}/${product?._id}`,
        }),
      );
    } else {
      router.push(path);
    }
  }, [product, alias]);

  const url = `/store/${alias}/${product?._id}`;

  return (
    <div
      onClick={handleRouter}
      className={`relative w-full aspect-square overflow-hidden border-b-2 border-white ${
        (index + 1) % 3 !== 0 ? 'border-r-2' : ''
      } hover:cursor-pointer group h-[180px]`}
      onMouseEnter={() => router.prefetch(url)}
      onTouchStart={() => router.prefetch(url)}
      onFocus={() => router.prefetch(url)}
    >
      <img
        src={product?.image?.[0]}
        alt={product?.name}
        loading="lazy"
        className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-80"
      />
      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-b from-transparent to-black opacity-90 pointer-events-none" />
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
