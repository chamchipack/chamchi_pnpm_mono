import HomeContainer from '@/components/Home/HomeContainer';
import { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: '픽토리 홈',
  description: '레터링케이크, 애플리케이션 홈',
  keywords: ['케이크', '레터링케이크', '맞춤제작'],
  alternates: {
    canonical: 'https://lettering.chamchipack.com',
  },
  openGraph: {
    title: '레터링 케이크 주문 - 픽토리',
    description: '맞춤 제작 레터링 케이크를 간편하게 주문하세요!',
    url: 'https://lettering.chamchipack.com',
    siteName: '픽토리',
    images: [
      {
        url: 'https://lettering.chamchipack.com/og-image.jpg', // 대표 이미지
        width: 1200,
        height: 630,
        alt: '픽토리 레터링 케이크',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

const Page = () => {
  return (
    <>
      <HomeContainer />;
    </>
  );
};

export default Page;
