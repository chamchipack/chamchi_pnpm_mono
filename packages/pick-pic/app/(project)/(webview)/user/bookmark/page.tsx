import Container from '@/components/page/User/section/UserAssetsSection/interest/Container';
import { createNoMeta } from '@/config/utils/seo/seoNoMeta';

export const metadata = createNoMeta('북마크', '개인 북마크 페이지입니다.');

interface Props {
  searchParams: {
    id: string;
  };
}
const Page = ({ searchParams }: Props) => {
  return <Container />;
};

export default Page;
