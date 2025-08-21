import Container from '@/components/page/Event/Container';
import { createNoMeta } from '@/config/utils/seo/seoNoMeta';

export const metadata = createNoMeta('이벤트', '이벤트 페이지입니다.');

interface Props {
  searchParams: {
    eventId: string;
  };
}
const Page = ({ searchParams }: Props) => {
  const { eventId = '' } = searchParams || {};

  return <Container eventId={eventId} />;
};

export default Page;
