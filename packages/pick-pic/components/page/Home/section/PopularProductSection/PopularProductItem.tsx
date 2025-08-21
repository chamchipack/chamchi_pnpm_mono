'use client';

import type { ProductSchema } from '@/types/schema/ProductSchema';
import PopularProductCard from './PopularProductCard';
import { usePopularProductLogic } from './hooks/usePopularProductLogic';

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
}

export default function PopularProductItem({ item, index }: Props) {
  const logic = usePopularProductLogic(item);

  return (
    <PopularProductCard
      item={item}
      index={index}
      imageSrc={logic.imageSrc}
      onClick={logic.handleRouter}
      onPrefetch={logic.handlePrefetch}
    />
  );
}
