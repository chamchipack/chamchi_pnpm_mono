import Container from '@/components/OrderList/Container';
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
    query: string;
    date: string;
  };
}
const Page = ({ searchParams }: Props) => {
  console.log(searchParams);
  return <Container />;
};

export default Page;
