import Script from 'next/script';
import usePopularProductData from './hooks/usePopularProductData';
import PopularProductItem from './PopularProductItem';
import PopularRouteButton from './PopularRouteButton';

const PopularProductSection = async () => {
  const { items } = await usePopularProductData();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '인기 상품 목록',
    itemListElement: items.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        image: product.image || '',
        description: product.description || `${product.name} 레터링 케이크`,
        sku: product._id,
        brand: {
          '@type': 'Brand',
          name: '피크피크',
        },
        offers: {
          '@type': 'Offer',
          url: `https://pick-pic.co.kr/store/product?productId=${product._id}`,
          priceCurrency: 'KRW',
          price: product.price || '0',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="mb-2 px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">
            인기 급 상승중인 상품!
          </h2>
          <PopularRouteButton />
        </div>
        <p className="text-xs text-gray-500">
          많은 분들이 찾고 있는 상품이에요.
        </p>
      </div>

      <div className="flex overflow-x-auto whitespace-nowrap pb-3 px-2 scrollbar-hidden">
        {items.map((item, index) => (
          <div key={item._id} className="flex flex-col items-start mr-2">
            <PopularProductItem item={item} index={index} />
            <p
              className={`text-[12px] leading-[1.66] font-normal text-gray-700 mt-1 ${
                index === 0 ? 'ml-2' : 'ml-0'
              }`}
            >
              {item?.sellerId?.marketName}
            </p>
            <p
              className={`text-[12px] leading-[1.66] font-normal text-gray-400 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap ${
                index === 0 ? 'ml-2' : 'ml-0'
              }`}
            >
              {item?.sellerId?.location}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularProductSection;
