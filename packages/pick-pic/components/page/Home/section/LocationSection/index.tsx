import HomeLocationButtons from './HomeLocationButton';
import NotificationButton from './NotificationButton';

const LocationSection = ({ userId }: { userId: string }) => {
  return (
    <>
      <div className="pl-4 pr-2">
        <div className="flex flex-row justify-between items-center">
          <p className="text-md font-bold text-gray-900">
            가까운 곳부터 찾아볼까요?
          </p>

          <NotificationButton userId={userId} />
        </div>

        <HomeLocationButtons />
      </div>
    </>
  );
};
export default LocationSection;
