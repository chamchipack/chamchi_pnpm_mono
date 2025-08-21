import SuccessContainer from '@/components/page/Payments/order-result/SuccessContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '애플리케이션 홈',
  description: '레터링케이크, 애플리케이션 홈',
  keywords: ['케이크'],
  alternates: {
    canonical: 'https://pick-pic.co.kr',
  },
};

const Page = () => {
  return <SuccessContainer />;
};

export default Page;
