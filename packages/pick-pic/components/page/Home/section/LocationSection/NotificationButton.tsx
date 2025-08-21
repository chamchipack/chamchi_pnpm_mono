'use client';

import { useCheckAlarm } from './fetch';
import { useNotificationFetch } from './hooks/useNotificationFetch';
import { useResetLocationContext } from './hooks/useResetContext';

const NotificationButton = ({ userId = '' }: { userId: string }) => {
  const { data } = useCheckAlarm(userId);

  useResetLocationContext();

  const { handleClick, handlePrefetch } = useNotificationFetch();

  if (!userId) return <div className="relative w-12 h-12" />;

  return (
    <>
      <div
        className="relative w-12 h-12 cursor-pointer"
        onClick={handleClick}
        onMouseEnter={handlePrefetch}
        onTouchStart={handlePrefetch}
        onFocus={handlePrefetch}
      >
        <img
          src="/icons/alarm.png"
          alt="알람 아이콘"
          className="w-24 h-24 object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        {data?.data === true && (
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full absolute top-1 right-2" />
        )}
      </div>
    </>
  );
};

export default NotificationButton;
