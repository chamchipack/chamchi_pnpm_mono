import Container from '@/components/Review/Container';
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
  };
}
const Page = ({ searchParams }: Props) => {
  const { sellerId = '' } = searchParams;
  return <Container sellerId={sellerId} />;
};

export default Page;
