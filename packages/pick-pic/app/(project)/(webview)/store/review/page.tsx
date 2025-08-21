import { useSellerMetaDataById } from '@/api/server/server-api';
import Container from '@/components/page/Review/Container';
import { DataStructureKey } from '@/types/schema/default';
import { Metadata } from 'next';

interface Props {
  searchParams: {
    sellerId: string;
  };
}

type MetadataPick = 'alias' | 'marketName' | '_id';

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { sellerId } = searchParams;

  if (!sellerId) {
    return {
      title: '매장 리뷰',
      description: '고객님들이 작성한 매장 리뷰를 확인해보세요.',
    };
  }

  try {
    const { data } = await useSellerMetaDataById<
      DataStructureKey.seller,
      'Pick',
      MetadataPick
    >(sellerId);

    return {
      title: `${data?.marketName}`,
      description: `${data?.marketName} 매장의 고객 리뷰를 확인하고 생생한 후기를 만나보세요.`,
      keywords: [
        '레터링케이크',
        `${data?.marketName} 리뷰`,
        `${data?.marketName} 후기`,
      ],
      alternates: {
        canonical: `https://pick-pic.co.kr/store/${data?.alias}`,
      },
    };
  } catch (error) {
    console.error('SEO 메타데이터 생성 실패:', error);

    return {
      title: '매장 리뷰',
      description: '고객님들이 작성한 매장 리뷰를 확인해보세요.',
    };
  }
}

const Page = ({ searchParams }: Props) => {
  const { sellerId = '' } = searchParams;
  return <Container sellerId={sellerId} />;
};

export default Page;
