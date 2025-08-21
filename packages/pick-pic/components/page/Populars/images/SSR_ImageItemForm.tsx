import { ProductSchema } from '@/types/schema/ProductSchema';
import Script from 'next/script';
import CSR_ProductImage from './CSR_ProductImage';

type ProductPick =
  | '_id'
  | 'name'
  | 'image'
  | 'description'
  | 'price'
  | 'rating'
  | 'sellerId';

interface Props {
  items: Pick<ProductSchema, ProductPick>[];
}

export default function SSR_ImageItemForm({ items }: Props) {
  if (!items || !items.length) return null;

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
      offers: {
        '@type': 'Offer',
        url: `https://pick-pic.co.kr/store/${product?.sellerId?.alias}`,
        priceCurrency: 'KRW',
        price: product.price || '0',
        availability: 'https://schema.org/InStock',
      },
    })),
  };

  return (
    <>
      <Script
        id="jsonld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="grid grid-cols-3 w-full">
        {items.map((item, index) => (
          <CSR_ProductImage
            key={item._id}
            product={item}
            alias={item?.sellerId?.alias}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
