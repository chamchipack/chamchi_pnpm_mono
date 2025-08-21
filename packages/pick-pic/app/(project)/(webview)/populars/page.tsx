import Container from '@/components/page/Populars/Container';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: '인기상품 - 레터링 케이크 | 피크피크',
  description: '레터링케이크, 원하는 케이크를 찾아보세요.',
  keywords: ['케이크', '레터링케이크'],
  alternates: {
    canonical: 'https://pick-pic.co.kr',
  },
};

const Page = async () => {
  const cookieStore = await cookies();
  const { value = '' } = cookieStore.get('user_id') || {};
  const latitude = cookieStore.get('latitude')?.value;
  const longitude = cookieStore.get('longitude')?.value;

  return <Container latitude={latitude} longitude={longitude} />;
};

export default Page;
