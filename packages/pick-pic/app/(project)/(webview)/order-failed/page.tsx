import FailedContainer from '@/components/page/Payments/order-result/FailedContainer';
import { createNoMeta } from '@/config/utils/seo/seoNoMeta';

export const metadata = createNoMeta('결제실패', '결제실패');

interface Props {
  searchParams: {
    orderId: string;
  };
}
const Page = ({ searchParams }: Props) => {
  const { orderId = '' } = searchParams || {};
  return <FailedContainer />;
};

export default Page;
