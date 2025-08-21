import PaymentProcessing from '@/components/page/Payments/webview/PaymentProcessing';
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

const Page = async () => {
  const cookieStore = await cookies();
  const { value = '' } = cookieStore.get('user_id') || {};
  return <PaymentProcessing userId={value} />;
};

export default Page;
