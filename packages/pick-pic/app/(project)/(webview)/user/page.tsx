import UserContainer from '@/components/page/User/UserContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '내 정보 관리',
  robots: {
    index: false,
    follow: false,
  },
};

const Page = async () => {
  return <UserContainer />;
};

export default Page;
