'use client';

import { usePopularSellerLogic } from './hooks/usePopularSellerLogic';
import PopularSellerCard from './PopularSellerCard';

interface Props {
  alias: string;
  image: string;
  marketName: string;
  rating: number;
  index: number;
  location: string;
}

export default function PopularSellerItem(props: Props) {
  const logic = usePopularSellerLogic(props.alias);

  return (
    <PopularSellerCard
      {...props}
      imageSrc={props.image}
      onClick={logic.handleRouter}
      onPrefetch={logic.handlePrefetch}
    />
  );
}
