import Container from '@/components/Policy/detail/Container';
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
    type: MenuValue;
    id: string;
  };
}
const Page = ({ searchParams }: Props) => {
  const { type, id } = searchParams;
  return <Container type={type} id={id} />;
};

export default Page;
