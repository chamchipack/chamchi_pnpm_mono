import {
  useProductForMetadata,
  useSellerForMetadata,
} from '@/api/server/server-api';
import Container from '@/components/page/Store/product/SSR_ProductContainer';
import { DataStructureKey } from '@/types/schema/default';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

interface Props {
  alias: string;
  productId: string;
}

type SellerPick = 'sellerName';
type ProductPick = 'name' | 'image';

// ✅ SEO 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: { alias: string; productId: string };
}): Promise<Metadata> {
  const { alias = '', productId } = params;

  try {
    const { data } = await useSellerForMetadata<
      DataStructureKey.seller,
      'Pick',
      SellerPick
    >(alias);

    const { data: productData } = await useProductForMetadata<
      DataStructureKey.product,
      'Pick',
      ProductPick
    >(productId);

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
      title: `${data.sellerName} - ${productData?.name}`,
      description: `${data.sellerName} 매장의 인기 상품 "${productData?.name}" 레터링 케이크를 만나보세요. ${'다양한 문구와 디자인 선택이 가능합니다.'}`,
      keywords: [
        '케이크',
        '레터링케이크',
        data.sellerName,
        productData?.name || '',
      ],
      alternates: {
        canonical: `https://pick-pic.co.kr/store/${alias}/${productId}`,
      },
      openGraph: {
        title: `${data.sellerName} - ${productData?.name}`,
        description: `${data.sellerName} 매장의 인기 상품 "${productData?.name}" 레터링 케이크를 만나보세요. ${'다양한 문구와 디자인 선택이 가능합니다.'}`,
        url: `https://pick-pic.co.kr/store/${alias}/${productId}`,
        images: [
          {
            url: productData?.image || '',
            width: 800,
            height: 600,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${data.sellerName} - ${productData?.name}`,
        description: `${data.sellerName} 매장의 인기 상품 "${productData?.name}" 레터링 케이크를 만나보세요. ${'다양한 문구와 디자인 선택이 가능합니다.'}`,
        images: [productData?.image || ''],
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
      keywords: ['케이크', '레터링케이크'],
      alternates: {
        canonical: `https://pick-pic.co.kr/store/${alias}/${productId}`,
      },
    };
  }
}

const Page = async ({ params }: { params: Props }) => {
  const cookieStore = await cookies();
  const { productId } = params;
  const { value = '' } = cookieStore.get('user_id') || {};

  return <Container userId={value} productId={productId} />;
};

export default Page;
