import KakaoLoginCallback from '@/components/page/Auth/KakaoLoginCallback';
import { redirect } from 'next/navigation';

const Page = async ({ searchParams }: { searchParams: { code?: string } }) => {
  const { code } = searchParams;

  if (!code) redirect('/error');

  return <KakaoLoginCallback code={code} />;
};

export default Page;
