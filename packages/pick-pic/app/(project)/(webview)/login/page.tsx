import Container from '@/components/page/Login/Container';
import { createNoMeta } from '@/config/utils/seo/seoNoMeta';

export const metadata = createNoMeta('로그인', '개인 로그인 페이지입니다.');

interface Props {
  searchParams: {
    id: string;
  };
}
const Page = ({ searchParams }: Props) => {
  return <Container />;
};

export default Page;
