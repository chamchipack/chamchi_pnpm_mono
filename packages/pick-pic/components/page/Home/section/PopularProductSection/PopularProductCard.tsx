'use client';

import CommonImage from '@/components/common/image/CommonImage';
import type { ProductSchema } from '@/types/schema/ProductSchema';

type ProductPick =
  | '_id'
  | 'name'
  | 'image'
  | 'description'
  | 'price'
  | 'rating'
  | 'sellerId';

interface Props {
  item: Pick<ProductSchema, ProductPick>;
  index: number;
  imageSrc: string | null;
  onClick: () => void;
  onPrefetch: () => void;
}

export default function PopularProductCard({
  item,
  index,
  imageSrc,
  onClick,
  onPrefetch,
}: Props) {
  return (
    <div
      data-testid={`home-popular-product-${index}`}
      onClick={onClick}
      className={`relative w-[180px] h-[180px] shrink-0 overflow-hidden rounded-md bg-gray-200 ${
        index === 0 ? 'ml-2' : 'ml-0'
      } group cursor-pointer`}
      onMouseEnter={onPrefetch}
      onTouchStart={onPrefetch}
      onFocus={onPrefetch}
    >
      <CommonImage
        src={imageSrc || ''}
        alt={`${item?.sellerId?.marketName} ${item?.name}`}
        width="100%"
        height="100%"
      />

      <div className="absolute bottom-0 left-0 w-full h-[45%] bg-gradient-to-b from-transparent to-black opacity-90 z-[5]" />

      <div className="absolute bottom-2 left-2 right-2 text-white z-10 text-sm leading-tight">
        <p className="text-xs mb-1 truncate">{item?.name}</p>

        <div className="flex justify-between items-center text-xs">
          <p className="truncate">
            {item?.price?.toLocaleString('ko-KR') || '-'}원
          </p>

          {item?.rating && (
            <div className="flex items-center bg-white rounded-full px-2 py-0.5 text-main text-[12px] font-medium ml-2">
              <svg
                className="w-3 h-3 mr-1 fill-main"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {item.rating.toFixed(1)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
