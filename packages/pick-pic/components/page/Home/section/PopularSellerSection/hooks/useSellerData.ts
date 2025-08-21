import { useSellers } from '@/api/server/server-api';
import { DataStructureKey } from '@/types/schema/default';

type SellerPick =
  | 'alias'
  | 'images'
  | 'marketName'
  | 'location'
  | 'locationDetail'
  | 'rating'
  | 'reviewCount'
  | 'lat'
  | 'lng'
  | '_id';

const useSellerData = async (userId: string) => {
  const { data } = await useSellers<
    DataStructureKey.seller,
    'Pick',
    SellerPick
  >({
    page: 1,
    limit: 5,
    order: 'popular',
    field:
      'alias,images,marketName,location,locationDetail,rating,reviewCount,lat,lng',
    userId,
  });

  const { items = [] } = data || {};
  return { items };
};

export default useSellerData;
