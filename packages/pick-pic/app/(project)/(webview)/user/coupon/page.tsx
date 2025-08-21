import Container from '@/components/page/User/section/UserAssetsSection/coupon/Container';
import { createNoMeta } from '@/config/utils/seo/seoNoMeta';
import { cookies } from 'next/headers';

export const metadata = createNoMeta('쿠폰', '개인 쿠폰 페이지입니다.');

interface Props {
  searchParams: {
    id: string;
  };
}
const Page = async ({ searchParams }: Props) => {
  const cookieStore = await cookies();

  const { value = '' } = cookieStore.get('user_id') || {};
  return <Container userId={value} />;
};

export default Page;
