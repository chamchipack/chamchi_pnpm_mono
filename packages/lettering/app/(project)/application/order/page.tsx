import Container from '@/components/Order/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '애플리케이션 홈',
  description: '레터링케이크, 애플리케이션 홈',
  keywords: ['케이크'],
  alternates: {
    canonical: 'https://lettering.chamchipack.com',
  },
};

interface Props {
  searchParams: {
    sellerId: string;
    productId: string;
    type: 'custom' | 'select';
  };
}
const Page = ({ searchParams }: Props) => {
  return (
    <Container
      sellerId={searchParams.sellerId}
      productId={searchParams.productId}
      type={searchParams.type}
    />
  );
};

export default Page;
