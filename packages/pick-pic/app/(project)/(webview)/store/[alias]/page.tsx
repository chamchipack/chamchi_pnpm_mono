import { useSellerForMetadata } from '@/api/server/server-api';
import Container from '@/components/page/Store/view/Container';
import { DataStructureKey } from '@/types/schema/default';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
export const dynamic = 'force-dynamic'; // ✅ 캐시 강제 비활성화

interface Props {
  searchParams: {
    sellerId: string;
    date: any;
  };
}

// ✅ SEO 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: { alias: string };
}): Promise<Metadata> {
  const { alias = '' } = params;

  try {
    const { data } = await useSellerForMetadata<
      DataStructureKey.seller,
      'Pick',
      'sellerName'
    >(alias);

    if (!data || !data.sellerName) {
      return {
        title: '판매자 상세 정보',
        description: '판매자 정보를 불러올 수 없습니다.',
        keywords: ['케이크', '판매자'],
        alternates: {
          canonical: `https://pick-pic.co.kr/store/${alias}`,
        },
      };
    }

    return {
      title: `${data.sellerName} - 레터링케이크`,
      description: `${data.sellerName} 레터링케이크 매장의 모든 정보`,
      keywords: [
        '케이크',
        '레터링케이크',
        data.sellerName,
        '광주 레터링케이크',
        '광주',
      ],
      alternates: {
        canonical: `https://pick-pic.co.kr/store/${alias}`,
      },
      openGraph: {
        title: `${data.sellerName}`,
        description: `${data.sellerName} 레터링 케이크 매장의 모든 정보`,
        url: `https://pick-pic.co.kr/store/${alias}`,
        images: [
          {
            url: data?.image || '',
            width: 800,
            height: 600,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${data.sellerName}`,
        description: `${data.sellerName} 레터링 케이크 매장의 모든 정보`,
        images: [data?.image || ''],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
      },
    };
  } catch (error) {
    console.error('메타데이터 생성 오류:', error);

    return {
      title: '판매자 상세 정보',
      description: '판매자 정보를 불러오는 중 문제가 발생했습니다.',
      keywords: ['케이크', '판매자'],
      alternates: {
        canonical: `https://pick-pic.co.kr/store/${alias}`,
      },
    };
  }
}

export async function generateStaticParams() {
  const aliases = ['bongseondong', 'keikeugage-bongseondong', 'saerounmaejang'];

  return aliases.map((alias) => ({ alias }));
}

const Page = async ({ params }: { params: { alias: string } }) => {
  const cookieStore = await cookies();
  const { alias } = params;
  const { value = '' } = cookieStore.get('user_id') || {};

  return <Container key={alias} alias={alias} userId={value} />;
};

export default Page;
