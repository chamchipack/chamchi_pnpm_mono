import { useProductsForJSONLD } from '@/api/server/server-api';
import { DataStructureKey } from '@/types/schema/default';
import { SearchFilterValue } from '@/types/schema/SearchSchema';
import Script from 'next/script';

interface Props {
  params: {
    keyword: string;
    date: string | null;
    order?: SearchFilterValue;
    type?: string;
  };
}

export default async function SSR_StoreJsonldForProduct(params: Props) {
  const { data: { items = [] } = {} } =
    await useProductsForJSONLD<DataStructureKey.product>({
      page: 1,
      limit: 5,
      field: 'name,image,description,price,rating',
    });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `인기상품 - 레터링케이크`,
    itemListElement: items.map((product, index) => ({
      '@type': 'Product',
      name: `${product?.sellerId?.marketName} ${product.name}`,
      image: product.image,
      description: product.description || `${product.name} 레터링 케이크`,
      sku: product._id,
      brand: {
        '@type': 'Brand',
        name: 'pick-pic',
      },
      category: '레터링케이크',
      offers: {
        '@type': 'Offer',
        url: `https://pick-pic.co.kr/store/${product?.sellerId?.alias}`,
        priceCurrency: 'KRW',
        price: product.price || '0',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: product.rating
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating.toFixed(1),
            reviewCount: product.reviewCount || 1,
          }
        : undefined,
    })),
  };

  return (
    <>
      <Script
        id="jsonld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
