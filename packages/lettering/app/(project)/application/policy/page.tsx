import Container from '@/components/Policy/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '애플리케이션 홈',
  description: '레터링케이크, 애플리케이션 홈',
  keywords: ['케이크'],
  alternates: {
    canonical: 'https://lettering.chamchipack.com',
  },
};

type MenuValue = 'faq' | 'terms-and-policies' | 'notices' | 'customer-support';

interface Props {
  searchParams: {
    policy: MenuValue;
  };
}
const Page = ({ searchParams }: Props) => {
  const { policy } = searchParams;
  return <Container policy={policy} />;
};

export default Page;
