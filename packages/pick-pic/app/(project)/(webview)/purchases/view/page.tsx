import Container from '@/components/page/Purchases/detail/Container';
import { createNoMeta } from '@/config/utils/seo/seoNoMeta';

export const metadata = createNoMeta('주문상세', '개인 주문상세 페이지입니다.');

interface Props {
  searchParams: {
    orderId: string;
  };
}
const Page = ({ searchParams }: Props) => {
  const { orderId = '' } = searchParams || {};
  return <Container orderId={orderId} />;
};

export default Page;
