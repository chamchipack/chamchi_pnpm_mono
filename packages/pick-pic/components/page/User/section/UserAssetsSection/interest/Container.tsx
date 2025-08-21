import HeadComponent from '@/components/common/HeadComponent';
import { cookies } from 'next/headers';
import MyBookmarkListContainer from './MyBookmarkListContainer';

export default async function Container() {
  const cookieStore = await cookies();
  const { value = '' } = cookieStore.get('user_id') || {};

  return (
    <div className="py-4">
      <div className="px-4">
        <HeadComponent isLeftButtonVisable={true} title="찜 리스트" />
      </div>

      <div className="px-4 mt-6">
        <MyBookmarkListContainer userId={value} />
      </div>
    </div>
  );
}
