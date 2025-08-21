import Container from '@/components/page/Review/MyReview/Container';
import { createNoMeta } from '@/config/utils/seo/seoNoMeta';

export const metadata = createNoMeta('나의 리뷰', '개인 리뷰 페이지입니다');

interface Props {
  searchParams: {
    id: string;
  };
}
const Page = ({ searchParams }: Props) => {
  return <Container />;
};

export default Page;
