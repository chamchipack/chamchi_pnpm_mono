import HeadComponent from '@/components/common/HeadComponent';
import NotificationContainer from './list/NotificationContainer';

export default function Container({ userId = '' }: { userId: string }) {
  return (
    <div className="py-4">
      <div className="px-4">
        <HeadComponent
          isLeftButtonVisable={true}
          title="알림"
          isNativeRoute={false}
        />
      </div>

      <div className="px-4 my-4">
        <NotificationContainer userId={userId} />
      </div>
    </div>
  );
}
