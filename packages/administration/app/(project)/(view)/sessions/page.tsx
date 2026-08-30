import Container from '@/components/page/Sessions/Container';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '기타 앤 기타 스튜디오',
  description: '학원생 관리',
  keywords: ['케이크', '레터링케이크', '맞춤제작'],
  openGraph: {
    // ...defaultOpenGraph,
    title: '기타 앤 기타 스튜디오',
    description: '학원생 관리',
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
    description: '학원생 관리',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://pick-pic.co.kr/store?keyword={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <Container />

      <Script
        id="jsonld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default Page;
