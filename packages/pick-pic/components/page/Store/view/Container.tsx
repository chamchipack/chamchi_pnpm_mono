import { useProductsById, useSellerByAlias } from '@/api/server/server-api';
import ErrorPage from '@/components/error/ErrorPage';
import { DataStructureKey } from '@/types/schema/default';
import SSR_SellerItemsContainer from './store/item-pictures/SSR_SellerItemsContainer';
import SellerMainImageSection from './store/main-image/SellerMainImageSection';
import ProductSelection from './store/product-selection/ProductSelection';
import SSR_SellerContainer from './store/SSR_SellerContainer';
import TabContainer from './store/tab/TabContainer';

interface Props {
  alias: string;
  userId?: string;
  productId?: string;
}

const LIMIT = 15;

export default async function Container({
  alias = '',
  userId = '',
  productId = '',
}: Props) {
  const { data, result } = await useSellerByAlias<DataStructureKey.seller>(
    alias,
    userId,
  );

  const sellerId = data?._id || '';
  const additionalProduct = data?.additionalProducts || [];

  const { data: productData, result: p_result } =
    await useProductsById<DataStructureKey.product>(sellerId, LIMIT);

  if (!data || result === 'failed') return <ErrorPage />;

  const items = productData?.items || [];

  const sellerPictures = (
    <SSR_SellerItemsContainer
      marketName={data?.marketName}
      alias={alias}
      sellerId={sellerId}
      productData={items || []}
      additionalProduct={additionalProduct}
      isDeleted={data?.isDeleted || false}
    />
  );

  return (
    <>
      <div className="pb-6">
        <SellerMainImageSection
          images={data?.images}
          marketName={data?.marketName}
        />

        <div className="mt-4">
          <SSR_SellerContainer {...data} userId={userId} sellerId={sellerId} />
        </div>

        {productId && (
          <div className="px-4 my-4">
            <ProductSelection
              alias={alias}
              productId={productId}
              additionalProduct={additionalProduct}
              sellerId={sellerId}
            />
          </div>
        )}

        <TabContainer sellerPictures={sellerPictures} sellerData={data} />
      </div>
    </>
  );
}
