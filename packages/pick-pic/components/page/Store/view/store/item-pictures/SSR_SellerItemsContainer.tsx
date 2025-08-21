import { ProductSchema } from '@/types/schema/ProductSchema';
import Box from '@mui/material/Box';
import Script from 'next/script';
import CSR_InfiniteProductImage from './CSR_InfiniteProductImage';
import CSR_ProductImage from './CSR_ProductImage';

interface Props {
  alias: string;
  productData: ProductSchema[];
  sellerId: string;
  additionalProduct: AdditionalProductSchema[];
  marketName: string;
  isDeleted: boolean;
}

export default async function SSR_SellerItemsContainer({
  productData = [],
  additionalProduct = [],
  alias,
  marketName,
  sellerId,
  isDeleted,
}: Props) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${marketName}의 상품 목록`,
    itemListElement: productData.map((product, index) => ({
      '@type': 'Product',
      name: product.name,
      aggregateRating: product.rating || 0,
      image: product.image,
      description: product.description || `${product.name} 레터링 케이크`,
      sku: product._id,
      brand: {
        '@type': 'Brand',
        name: 'pick-pic',
      },
      offers: {
        '@type': 'Offer',
        url: `https://pick-pic.co.kr/store/product?productId=${product._id}`,
        priceCurrency: 'KRW',
        price: product.price || '0',
        availability: 'https://schema.org/InStock',
      },
    })),
  };

  return (
    <>
      {/* ✅ JSON-LD 구조화 데이터 삽입 */}
      <Script
        id="jsonld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          width: '100%',
        }}
      >
        {productData.map((product, index) => (
          <CSR_ProductImage
            alias={alias}
            key={product._id}
            product={product}
            index={index}
            additionalProduct={additionalProduct}
            isDeleted={isDeleted}
          />
        ))}

        <CSR_InfiniteProductImage
          sellerId={sellerId}
          initialPage={2}
          alias={alias}
          additionalProduct={additionalProduct}
          isDeleted={isDeleted}
        />
      </Box>
    </>
  );
}
