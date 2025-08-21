'use server';
import { usePopularProducts } from '@/api/server/server-api';
import { DataStructureKey } from '@/types/schema/default';
import { cookies } from 'next/headers';

type ProductPick =
  | '_id'
  | 'name'
  | 'image'
  | 'description'
  | 'price'
  | 'rating'
  | 'sellerId';

export default async function usePopularProductData() {
  const cookieStore = await cookies();
  const latitude = cookieStore.get('latitude')?.value || '';
  const longitude = cookieStore.get('longitude')?.value || '';

  const locations =
    latitude && longitude
      ? { lat: Number(latitude), lng: Number(longitude) }
      : {};

  const { data } = await usePopularProducts<
    DataStructureKey.product,
    'Pick',
    ProductPick
  >({
    page: 1,
    limit: 6,
    field: 'name,image,description,price,rating',
    ...locations,
  });

  const { items = [] } = data || {};

  return { items };
}
