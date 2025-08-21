import Container from '@/components/page/CreateReview/Container';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: '애플리케이션 홈',
  description: '레터링케이크, 애플리케이션 홈',
  keywords: ['케이크'],
  alternates: {
    canonical: 'https://pick-pic.co.kr',
  },
};

interface Props {
  searchParams: {
    orderId: string;
  };
}
const Page = async ({ searchParams }: Props) => {
  const { orderId = '' } = searchParams;
  const cookieStore = await cookies();

  const { value = '' } = cookieStore.get('user_id') || {};

  return <Container userId={value} orderId={orderId} />;
};

export default Page;
