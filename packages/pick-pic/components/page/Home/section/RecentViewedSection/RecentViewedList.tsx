'use client';

import { ProductSchema } from '@/types/schema/ProductSchema';
import React from 'react';
import PopularProductItem from '../PopularProductSection/PopularProductItem';

interface Props {
  items: ProductSchema[];
  isLoading: boolean;
}

const RecentViewedList = ({ items, isLoading }: Props) => {
  return (
    <>
      <div className="mb-2 px-4">
        <h2 className="text-lg font-bold text-gray-900">최근 본 상품 리스트</h2>
        <p className="text-xs text-gray-500">고객님께서 최근에 본 상품이에요</p>
      </div>

      <div className="flex overflow-x-auto pb-3 px-2 scrollbar-hidden">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col w-[180px] mr-2">
                <div className="w-full h-[180px] bg-gray-200 animate-pulse rounded-lg" />
                <div className="w-[180px] h-[20px] bg-gray-200 animate-pulse rounded mt-2" />
              </div>
            ))
          : items.map((product, index) => (
              <div
                key={product._id}
                className={`flex flex-col items-start mr-2`}
              >
                <PopularProductItem
                  key={product._id}
                  item={product}
                  index={index}
                />
              </div>
            ))}
      </div>
    </>
  );
};

export default React.memo(RecentViewedList);
