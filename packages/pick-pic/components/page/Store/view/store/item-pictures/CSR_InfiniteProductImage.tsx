'use client';
import { useInfiniteScroll } from '@/config/utils/hooks/infinite-scroll/useInfiniteScroll';
import { useIntersectionObserver } from '@/config/utils/hooks/infinite-scroll/useIntersectionObserver';
import { ProductSchema } from '@/types/schema/ProductSchema';
import React, { useRef } from 'react';
import CSR_ProductImage from './CSR_ProductImage';

interface Props {
  sellerId: string;
  initialPage: number;
  alias: string;
  additionalProduct: AdditionalProductSchema[];
  isDeleted: boolean;
}

const CSR_InfiniteProductImage = ({
  sellerId,
  initialPage = 2,
  alias,
  additionalProduct,
  isDeleted,
}: Props) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/product/${sellerId}`;

  const { data, size, setSize, isValidating, allItems, isReachingEnd } =
    useInfiniteScroll<any, ProductSchema>({
      baseUrl,
      initialPage,
      limit: 15,
    });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver(
    observerRef,
    () => setSize((prev) => prev + 1),
    !isValidating && !isReachingEnd,
  );

  return (
    <>
      {isValidating && size === 1 ? (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="mb-px mx-0.5">
              <div className="w-full h-[160px] bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </>
      ) : allItems?.length ? (
        <>
          {allItems.map((item, index) => (
            <CSR_ProductImage
              alias={alias}
              key={item._id}
              product={item}
              index={index}
              additionalProduct={additionalProduct}
              isDeleted={isDeleted}
            />
          ))}
        </>
      ) : null}

      {!isReachingEnd && <div ref={observerRef} className="h-10" />}

      {/* {isValidating && (
        <p className="text-center text-sm text-gray-400 mt-2">불러오는 중...</p>
      )}
      {isReachingEnd && (
        <p className="text-center text-sm text-gray-400 mt-2">
          모든 상품을 불러왔습니다.
        </p>
      )} */}
    </>
  );
};

export default React.memo(CSR_InfiniteProductImage);
