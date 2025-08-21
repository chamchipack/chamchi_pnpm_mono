import Script from 'next/script';
import useSellerData from './hooks/useSellerData';
import PopularSellerItem from './PopularSellerItem';

const PopularSellerSection = async ({ userId = '' }: { userId: string }) => {
  const { items } = await useSellerData(userId);

  if (!items.length) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '인기 판매자 목록',
    itemListElement: items.map((seller, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Store',
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${seller?.location} ${seller?.locationDetail || ''}`,
          addressCountry: 'KR',
          addressLocality: seller?.location || '',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: seller.lat,
          longitude: seller.lng,
        },
        name: seller.marketName,
        image: seller.images?.[0] || '',
        url: `https://pick-pic.co.kr/store/${seller.alias}`,
        sameAs: `https://pick-pic.co.kr/store/${seller.alias}`,
        identifier: seller._id,
      },
    })),
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mb-2 px-4">
        <h2 className="text-lg font-bold text-gray-900">
          주목받는 인기 매장이에요!
        </h2>
        <p className="text-xs text-gray-500">
          고객님들이 많이 찾는 매장을 모았어요
        </p>
      </div>

      <div className="flex overflow-x-auto whitespace-nowrap pb-3 px-2 scrollbar-hidden">
        {items.map((item, index) => {
          const typedItem = item as SellerSchema & {
            rating: number;
            isBookmarked: boolean;
          };

          return (
            <PopularSellerItem
              key={item._id}
              alias={typedItem.alias}
              image={typedItem.images?.[0]}
              marketName={typedItem.marketName}
              rating={typedItem.rating}
              location={typedItem.location}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default PopularSellerSection;
