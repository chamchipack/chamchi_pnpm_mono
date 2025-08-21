import Container from '@/components/page/Search/Container';
import { defaultAlternates, defaultRobots } from '@/config/utils/seo/seoMeta';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '검색',
  description:
    '세상에 하나뿐인 레터링 케이크, 피크피크에서 간편하게 주문하세요.',
  keywords: ['케이크'],
  robots: defaultRobots,
  alternates: defaultAlternates,
};

const Page = () => {
  return <Container />;
};

export default Page;
