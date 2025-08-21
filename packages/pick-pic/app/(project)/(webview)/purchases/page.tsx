import Container from '@/components/page/Purchases/Container';
import { createNoMeta } from '@/config/utils/seo/seoNoMeta';
import { cookies } from 'next/headers';

export const metadata = createNoMeta('주문내역', '개인 주문내역 페이지입니다.');

interface Props {
  searchParams: {
    query: string;
    date: string;
  };
}
const Page = async ({ searchParams }: Props) => {
  const cookieStore = await cookies();

  const { value = '' } = cookieStore.get('user_id') || {};
  const { query, date } = searchParams;

  return <Container userId={value} query={query} date={date} />;
};

export default Page;
