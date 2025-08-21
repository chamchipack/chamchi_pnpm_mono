import { Metadata } from 'next';

export const defaultOpenGraph = {
  siteName: '피크피크',
  locale: 'ko_KR',
  type: 'website',
  images: [
    {
      url: 'https://pick-pic.co.kr/logo/logo3_4x.png',
      width: 1200,
      height: 630,
      alt: '피크피크 레터링 케이크',
    },
  ],
};

export const defaultRobots: Metadata['robots'] = {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
  },
};

export const defaultAlternates: Metadata['alternates'] = {
  canonical: 'https://pick-pic.co.kr/',
};
