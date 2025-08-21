import { usePopularProducts } from '@/api/server/server-api';
import HeadComponent from '@/components/common/HeadComponent';
import { DataStructureKey } from '@/types/schema/default';
import CSR_PopularList from './images/CSR_PopularList';
import SSR_ImageItemForm from './images/SSR_ImageItemForm';

interface Props {
  latitude?: string;
  longitude?: string;
}

type ProductPick =
  | '_id'
  | 'name'
  | 'image'
  | 'description'
  | 'price'
  | 'rating'
  | 'sellerId';

const LIMIT = 6;

export default async function Container({ latitude, longitude }: Props) {
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
    limit: LIMIT,
    field: 'name,image,description,price,rating',
    ...locations,
  });
  const items = data?.items ?? [];

  return (
    <div className="pb-40">
      <div className="px-4">
        <HeadComponent
          isLeftButtonVisable={true}
          title="인기상품"
          isNativeRoute={false}
        />
      </div>

      <SSR_ImageItemForm items={items} />

      <CSR_PopularList initialPage={2} limit={LIMIT} />

      {/* <PopularList /> */}
    </div>
  );
}
