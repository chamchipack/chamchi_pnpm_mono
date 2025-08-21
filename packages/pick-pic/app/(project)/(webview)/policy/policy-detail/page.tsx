import Container from '@/components/page/Policy/detail/Container';
import { createNoMeta } from '@/config/utils/seo/seoNoMeta';

export const metadata = createNoMeta('고객지원', '고객지원 페이지입니다.');

type MenuValue =
  | 'faq'
  | 'terms-and-policies'
  | 'announcement'
  | 'customer-support';

interface Props {
  searchParams: {
    type: MenuValue;
    _id: string;
  };
}
const Page = ({ searchParams }: Props) => {
  const { type, _id } = searchParams;
  return <Container type={type} _id={_id} />;
};

export default Page;
