import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '피크피크 : 나만의 레터링 케이크 주문 제작 플랫폼',
  description:
    '세상에 하나뿐인 레터링 케이크, 피크피크에서 간편하게 주문하세요.',
  keywords: ['케이크', '레터링케이크', '맞춤제작'],
  openGraph: {
    // ...defaultOpenGraph,
    title: '피크피크 : 나만의 레터링 케이크 주문 제작 플랫폼',
    description:
      '세상에 하나뿐인 레터링 케이크, 피크피크에서 간편하게 주문하세요.',
    url: 'https://pick-pic.co.kr/',
  },
  // robots: defaultRobots,
  // alternates: defaultAlternates,
};

const Page = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '피크피크',
    url: 'https://pick-pic.co.kr',
    description:
      '세상에 하나뿐인 레터링 케이크, 피크피크에서 간편하게 주문하세요.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://pick-pic.co.kr/store?keyword={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <div>classes</div>

      <Script
        id="jsonld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default Page;
