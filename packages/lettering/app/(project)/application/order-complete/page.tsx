import Container from '@/components/OrderDetail/Container';
import SuccessContainer from '@/components/Payments/SuccessContainer';
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
    orderId: string;
  };
}
const Page = ({ searchParams }: Props) => {
  const { orderId = '' } = searchParams || {};
  return <SuccessContainer />;
};

export default Page;
