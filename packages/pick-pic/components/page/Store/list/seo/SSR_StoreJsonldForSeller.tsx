import { useSellersForJSONLD } from '@/api/server/server-api';
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

export default async function SSR_StoreJsonldForSeller(params: Props) {
  const { data: { items = [] } = {} } =
    await useSellersForJSONLD<DataStructureKey.seller>({
      page: 1,
      limit: 5,
      field:
        'marketName,location,locationDetail,lat,lng,images,alias,startTime,endTime,operatingDays,rating,reviewCount',
    });

  // 시간 포맷 함수 (e.g. 900 → "09:00")
  const formatTime = (time: number) => {
    const str = time.toString().padStart(4, '0');
    return `${str.slice(0, 2)}:${str.slice(2)}`;
  };

  // 요일 매핑
  const dayMap: Record<string, string> = {
    sun: 'Sunday',
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '인기 판매자 목록',
    itemListElement: items.map((seller, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Store',
        name: seller.marketName,
        identifier: seller._id,
        image: seller.images?.[0] || '',
        url: `https://pick-pic.co.kr/store/${seller.alias}`,
        sameAs: `https://pick-pic.co.kr/store/${seller.alias}`,
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
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: Math.max(
            1.0,
            Math.min(5.0, seller?.rating ?? 4.8),
          ).toFixed(1),
          reviewCount: seller?.reviewCount || 10,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: seller.operatingDays?.map((day: string) => dayMap[day]),
            opens: formatTime(seller.startTime),
            closes: formatTime(seller.endTime),
          },
        ],
      },
    })),
  };

  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
