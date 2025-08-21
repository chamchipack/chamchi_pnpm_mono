import Container from '@/components/page/Policy/Container';
import { createNoMeta } from '@/config/utils/seo/seoNoMeta';

export const metadata = createNoMeta('고객지원', '고객지원 페이지입니다.');

type MenuValue =
  | 'faq'
  | 'terms-and-policies'
  | 'announcement'
  | 'customer-support';

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
