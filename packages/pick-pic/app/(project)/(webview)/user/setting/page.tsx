import Container from '@/components/page/Setting/Container';
import { createNoMeta } from '@/config/utils/seo/seoNoMeta';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = createNoMeta('설정', '개인 설정 페이지입니다.');

const Page = () => {
  const userId = cookies().get('user_id')?.value;

  if (!userId) redirect('/login');

  return <Container />;
};

export default Page;
