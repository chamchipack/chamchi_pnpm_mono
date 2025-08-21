import HeadComponent from '@/components/common/HeadComponent';
import { cookies } from 'next/headers';
import ReviewListContainer from './MyReviewListContainer';

export default async function Container() {
  const cookieStore = await cookies();
  const { value = '' } = cookieStore.get('user_id') || {};

  return (
    <div className="py-4">
      <div className="px-4">
        <HeadComponent isLeftButtonVisable={true} title="나의 리뷰" />
      </div>

      <div className="px-4">
        <ReviewListContainer userId={value} />
      </div>
    </div>
  );
}
