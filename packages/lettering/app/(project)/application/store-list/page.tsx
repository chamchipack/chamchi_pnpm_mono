import Container from '@/components/StoreList/Container';
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
    date: any;
  };
}
const Page = ({ searchParams }: Props) => {
  const params = searchParams;
  return <Container params={params} />;
};

export default Page;
