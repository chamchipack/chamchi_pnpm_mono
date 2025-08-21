import Container from '@/components/page/Notifications/Container';
import { createNoMeta } from '@/config/utils/seo/seoNoMeta';
import { cookies } from 'next/headers';

export const metadata = createNoMeta('알림', '개인 알림 페이지입니다.');

const Page = async () => {
  const cookieStore = await cookies();
  const { value = '' } = cookieStore.get('user_id') || {};

  return <Container userId={value} />;
};

export default Page;
