import Container from '@/components/page/Location/Container';
import { Metadata } from 'next';

export async function generateMetadata({}: {}): Promise<Metadata> {
  const keyword = '레터링 케이크';
  return {
    title: `${keyword} - 레터링 케이크 매장 찾기 | 피크피크`,
    description: `${keyword} 관련 레터링 케이크 매장을 간편하게 찾아보세요.`,
    keywords: ['케이크', '레터링케이크', keyword],
    alternates: {
      canonical: `https://pick-pic.co.kr/store?keyword=${encodeURIComponent(keyword)}`,
    },
  };
}

interface Props {
  searchParams: {
    lat?: string;
    lng?: string;
  };
}

const Page = ({ searchParams }: Props) => {
  return <Container />;
};

export default Page;
