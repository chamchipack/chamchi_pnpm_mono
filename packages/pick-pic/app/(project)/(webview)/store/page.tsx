import Container from '@/components/page/Store/list/Container';
import { SearchFilterValue } from '@/types/schema/SearchSchema';
import { Metadata } from 'next';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Props['searchParams'];
}): Promise<Metadata> {
  const keyword = searchParams.keyword || '레터링 케이크';

  const url = `https://pick-pic.co.kr/store?keyword=${encodeURIComponent(keyword)}`;

  return {
    title: `${keyword} - 레터링 케이크 매장 찾기 | 피크피크`,
    description: `${keyword} 관련 레터링 케이크 매장을 간편하게 찾아보세요.`,
    keywords: ['케이크', '레터링케이크', keyword],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${keyword} - 레터링 케이크 매장 찾기 | 피크피크`,
      description: `${keyword} 관련 레터링 케이크 매장을 간편하게 찾아보세요.`,
      url,
      siteName: '피크피크',
      images: [
        {
          url: 'https://pick-pic.co.kr/logo/logo3_4x.png',
          width: 1200,
          height: 630,
          alt: '레터링 케이크 매장 찾기 | 피크피크',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${keyword} - 레터링 케이크 매장 찾기 | 피크피크`,
      description: `${keyword} 관련 레터링 케이크 매장을 간편하게 찾아보세요.`,
      images: ['https://pick-pic.co.kr/logo/logo3_4x.png'],
    },
    robots: {
      index: !!keyword,
      follow: true,
    },
  };
}

interface Props {
  searchParams: {
    keyword: string;
    date: string;
    order?: SearchFilterValue;
    type?: string;
  };
}
const Page = ({ searchParams }: Props) => {
  const params = searchParams;
  return <Container params={params} />;
};

export default Page;
